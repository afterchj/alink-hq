package com.tpadsz.after.realm;

import com.tpadsz.after.constants.MemcachedObjectType;
import com.tpadsz.after.dao.UserExtendDao;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.utils.Digests;
import com.tpadsz.after.utils.Encodes;
import com.tpadsz.after.utils.Encryption;
import com.tpadsz.after.utils.GenerateUtils;
import net.rubyeye.xmemcached.MemcachedClient;
import net.rubyeye.xmemcached.exception.MemcachedException;
import org.apache.log4j.Logger;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.concurrent.TimeoutException;


public class ShiroDbRealm extends AuthorizingRealm {

    private static final int INTERATIONS = 1024;
    private static final int SALT_SIZE = 8;
    private static final String ALGORITHM = "SHA-1";

    @Autowired
    private UserExtendDao userExtendDao;
    @Autowired
    private MemcachedClient memcachedClient;

    private Logger logger = Logger.getLogger(this.getClass());

    /**
     * 登录之后用于授权
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String username = (String) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.setRoles(new HashSet<>(userExtendDao.getRoles(username)));
        authorizationInfo.setStringPermissions(new HashSet<>(userExtendDao.getPermissions(username)));
        return authorizationInfo;
    }

    /**
     * 用于验证身份
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
        String username = (String) token.getPrincipal();
        logger.info("username=" + username);
        User user = userExtendDao.selectByUsername(username);
        String uid = user.getId();
        String key = MemcachedObjectType.CACHE_HQ_TOKEN.getPrefix() + uid;
        AuthenticationInfo info = null;
        if (null != user) {
            if (user.getStatus() == 0) {
                throw new DisabledAccountException("该账号已禁用！");
            } else if (user.isLocked() == 1) {
                throw new LockedAccountException("该账号在别处登入！");
            }
        } else {
            throw new UnknownAccountException("登录名错误");
        }
        try {
            memcachedClient.set(key, 0, GenerateUtils.generateToken());
            byte[] salt = Encodes.decodeHex(user.getSalt());
            info = new SimpleAuthenticationInfo(username, user.getPwd(), ByteSource.Util.bytes(salt), getName());
        } catch (TimeoutException e) {
            logger.error(e);
        } catch (InterruptedException e) {
            logger.error(e);
        } catch (MemcachedException e) {
            logger.error(e);
        } catch (Exception e) {
            throw new IncorrectCredentialsException("账号密码不正确！");
        }
        return info;
    }

    @PostConstruct
    public void initCredentialsMatcher() {
        HashedCredentialsMatcher matcher = new RetryLimitHashedCredentialsMatcher();
        matcher.setHashIterations(INTERATIONS);
        setCredentialsMatcher(matcher);
    }

    public HashPassword encrypt(String plainText) {
        HashPassword result = new HashPassword();
        byte[] salt = Digests.generateSalt(SALT_SIZE);
        result.salt = Encodes.encodeHex(salt);
        byte[] hashPassword = Digests.sha1(plainText.getBytes(), salt, INTERATIONS);
        result.password = Encodes.encodeHex(hashPassword);
        return result;
    }

    public static class HashPassword {
        public String salt;
        public String password;
    }

    public static void main(String[] args) {
        HashPassword hashPassword = new ShiroDbRealm().encrypt(Encryption.getMD5Str("123456"));
        System.out.println(hashPassword.password + "\t" + hashPassword.salt);
    }
}
package com.tpadsz.after.service;


import com.tpadsz.after.constants.MemcachedObjectType;
import com.tpadsz.after.exception.InvalidCodeException;
import com.tpadsz.after.utils.HttpUtils;
import com.tpadsz.after.utils.email.SendMailUtil;
import net.rubyeye.xmemcached.MemcachedClient;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * Created by after on 2018/12/12.
 */
@Service
public class ValidationService {

    private Logger logger = Logger.getLogger(this.getClass());
    @Autowired
    private MemcachedClient client;

    public String sendCode(String appid, String mobile) throws Exception {
        String key = String.format(MemcachedObjectType.CACHE_MESSAGE_VERIFICATION.getPrefix(), mobile);
        String code = prepare(key);
        HttpUtils.sendSms(appid, mobile, code);
        return code;
    }

    public String sendEmailCode(String email, String flag) throws Exception {
        String key = String.format(MemcachedObjectType.CACHE_MESSAGE_VERIFICATION.getPrefix(), email);
        String code = prepare(key);
        SendMailUtil.sendCode(code, email, flag);
        return code;
    }

    public void checkCode(String code, String mobile) throws InvalidCodeException {
        String key = String.format(MemcachedObjectType.CACHE_MESSAGE_VERIFICATION.getPrefix(), mobile);
        String value = null;
        try {
            value = client.get(key);
        } catch (Exception e) {
            logger.info("checkCode:" + e.getMessage());
        }
        if (value == null) {
            throw new InvalidCodeException("500", "验证码已过期！");
        }
        if (!StringUtils.equals(code, value)) {
            throw new InvalidCodeException("300", "验证码不正确！");
        }
    }

    private String prepare(String key) throws Exception {
        String code = client.get(key) == null ? getRandomNum(6) : client.get(key);
        client.set(key, MemcachedObjectType.CACHE_MESSAGE_VERIFICATION.getExpiredTime(), code);
        return code;
    }

    private String getRandomNum(int len) {
        Random r = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < len; i++) {
            sb.append(r.nextInt(10));
        }
        return sb.toString();
    }
}

package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.MyAccountDao;
import com.tpadsz.after.entity.MyAccount;
import com.tpadsz.after.service.MyAccountService;
import com.tpadsz.after.utils.Encryption;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @program: blt-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-04-02 10:34
 **/
@Service("myAccountService")
public class MyAccountServiceImpl implements MyAccountService {

    @Resource
    private MyAccountDao myAccountDao;

    @Override
    public MyAccount getAllByAccount(String account) {
        return myAccountDao.getAllByAccount(account);
    }

    @Override
    public boolean updatePwd(String account, String newPwd) {
        //两次加密与app保持一致
//        String plainPwd = Encryption.getMD5Str(Encryption.getMD5Str(newPwd));
        String plainPwd = Encryption.getMD5Str(newPwd);
        Encryption.HashPassword hashPassword = Encryption.encrypt(plainPwd);
        String password = hashPassword.getPassword();
        String salt = hashPassword.getSalt();
        MyAccount myAccount = new MyAccount();
        myAccount.setAccount(account);
        myAccount.setPassword(password);
        myAccount.setSalt(salt);
        int i=0;
        i = myAccountDao.updatePwd(myAccount);
        //修改失败
        if (i==0){
            return false;
        }
        return true;
    }

    @Override
    public boolean updateUserName(String account, String uname) {
        int i = myAccountDao.updateUserName(account, uname);
        if (i==0){
            return false;
        }
        return true;
    }

    @Override
    public int getMobile(String mobile) {
        return myAccountDao.getMobile(mobile);
    }

    @Override
    public boolean updateMobile(String account, String mobile) {
        int i = myAccountDao.updateMobile(account, mobile);
        if (i==0){
            return false;
        }
        return true;
    }

    @Override
    public int getEamil(String email) {
        return myAccountDao.getEmail(email);
    }

    @Override
    public boolean updateEmail(String account, String email) {
        int i = myAccountDao.updateEmail(account, email);
        if (i==0){
            return false;
        }
        return true;
    }

    @Override
    public boolean getUserName(String uname) {
        int i = myAccountDao.getUserName(uname);
        if (i==0){
            return false;
        }
        return true;
    }
}

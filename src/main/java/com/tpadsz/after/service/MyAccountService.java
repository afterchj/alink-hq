package com.tpadsz.after.service;

import com.tpadsz.after.entity.MyAccount;

/**
 * @program: blt-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-04-02 10:33
 **/
public interface MyAccountService {
    MyAccount getAllByAccount(String account);

    boolean updatePwd(String account, String newPwd);

    boolean updateUserName(String account, String uname);

    int getMobile(String mobile);

    boolean updateMobile(String account, String mobile);

    int getEamil(String email);

    boolean updateEmail(String account, String email);

    boolean getUserName(String uname);
}

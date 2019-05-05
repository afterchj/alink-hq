package com.tpadsz.after.dao;

import com.tpadsz.after.entity.MyAccount;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @program: blt-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-04-02 10:35
 **/
@Repository
public interface MyAccountDao {

    MyAccount getAllByAccount(@Param("account") String account);

    int updatePwd(MyAccount myAccount);

    int updateUserName(@Param("account") String account, @Param("uname") String uname);

    int getMobile(@Param("mobile") String mobile);

    int updateMobile(@Param("account") String account, @Param("mobile") String mobile);

    int getEmail(@Param("email") String email);

    int updateEmail(@Param("account") String account, @Param("email") String email);

    int getUserName(@Param("uname") String uname);//查询用户名
}

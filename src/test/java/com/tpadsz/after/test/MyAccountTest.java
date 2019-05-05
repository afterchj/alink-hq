package com.tpadsz.after.test;

import com.tpadsz.after.service.MyAccountService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-05 13:32
 **/
public class MyAccountTest {

    ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");

    MyAccountService myAccountService = ac.getBean("myAccountService", MyAccountService.class);

    @Test
    public void reginPwdTest(){
        myAccountService.updatePwd("tpad1d12","123456");
    }
}

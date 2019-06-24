package com.tpadsz.after.test;

import com.tpadsz.after.service.RolePermissionInfoService;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:52
 **/
public class RoleTest {
    static ApplicationContext ac;

    static {
        ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
    }

    RolePermissionInfoService roleManageService = ac.getBean("roleManageService",RolePermissionInfoService.class);

    public static SqlSession getSession() {
        SqlSessionFactory factory = (SqlSessionFactory) ac.getBean
                ("sqlSessionFactory");
        return factory.openSession();
    }

    @Test
    public void getPermissionsTest(){
        List<String> permissions = roleManageService.getPermissions("tpad1d12");
        permissions.stream().forEach(System.out::println);
    }

    @Test
    public void authorizationTest(){
        List<String> permissions = new ArrayList<>();
        permissions.add("viewProject");
        permissions.add("createProject");
        permissions.add("11");
        roleManageService.authorization(permissions);
    }

    @Test
    public void getRolePermissionsTest(){
        List<Map<String, String>> tpad1d12 = roleManageService.getUsers("tpad1d12");
        List<Map<String, String>> tpad1d121 = roleManageService.getRolePermissions("tpad1d12");
        tpad1d12.stream().forEach(System.out::println);
        tpad1d121.stream().forEach(System.out::println);
    }

    @Test
    public void test(){
        List<String> permissionsByRid = roleManageService.getPermissionsByRid("2");
        permissionsByRid.stream().forEach(System.out::println);
    }


}

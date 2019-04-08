package com.tpadsz.after.test;

import com.tpadsz.after.entity.User;
import org.junit.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/3.
 */
public class MainTest {

    private SqlSessionTemplate getSqlSessionTemplate() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        SqlSessionTemplate sqlSessionTemplate = (SqlSessionTemplate) ctx.getBean("sqlSessionTemplate");
        return sqlSessionTemplate;
    }

    @Test
    public void testSqlSessionTemplate() {
        Map map = new HashMap();
        map.put("uname", "管理员");
        map.put("account", "admin");
        User user = getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserExtendDao.selectByUsername", "超级管理员");
        System.out.println("user:" + getSqlSessionTemplate().selectList("com.tpadsz.after.dao.UserExtendDao.getPermissions", "超级管理员"));
    }
}

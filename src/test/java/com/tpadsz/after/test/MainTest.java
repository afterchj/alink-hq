package com.tpadsz.after.test;

import com.alibaba.fastjson.JSON;
import com.tpadsz.after.entity.User;
import net.rubyeye.xmemcached.XMemcachedClient;
import net.rubyeye.xmemcached.exception.MemcachedException;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.*;
import java.util.concurrent.TimeoutException;

/**
 * Created by hongjian.chen on 2019/4/3.
 */
public class MainTest {

    private static Logger logger = Logger.getLogger(MainTest.class);

    private SqlSessionTemplate getSqlSessionTemplate() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        SqlSessionTemplate sqlSessionTemplate = (SqlSessionTemplate) ctx.getBean("sqlSessionTemplate");
        return sqlSessionTemplate;
    }

    @Test
    public void testSqlSessionTemplate() {
        Map map = new HashMap();
        map.put("uname", "test");
//        map.put("account", "admin");
//        map.put("mobile", "18170756879");
        map.put("email", "after@tpadsz.com");
        User user = new User();
        user.setMobile("18170756879");
//        User user = getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserExtendDao.selectByUsername", "超级管理员");
//        System.out.println("user:" + getSqlSessionTemplate().selectList("com.tpadsz.after.dao.UserExtendDao.getPermissions", "超级管理员"));
        System.out.println("user=" + getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserDao.selectByUsername", "test").toString());
//        System.out.println("count:" + getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserDao.getCount", map));
        System.out.println("user:" + getSqlSessionTemplate().selectList("com.tpadsz.after.dao.MeshDao.getByMap", null).size());
        System.out.println("count:" + getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.MeshDao.getCountByTable", "f_mesh"));
    }

    @Test
    public void testMemcachedClient() throws InterruptedException, MemcachedException, TimeoutException {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        XMemcachedClient xMemcachedClient = (XMemcachedClient) ctx.getBean("memcachedClient");
        // set: 第一个参数是key，第二个参数是超时时间，第三个参数是value
        xMemcachedClient.set("first", 3, "tianjin");//添加或者更新
        xMemcachedClient.set("second", 2, "chengdu");//添加,key不存在添加成功返回true,否则返回false
        xMemcachedClient.replace("first", 3, "Beijing");//替换,key已经存在替换成功返回true,不存在返回false
        System.out.println("first=======================" + xMemcachedClient.get("first"));
        System.out.println("second======================" + xMemcachedClient.get("second"));
        System.out.println("--------------------------------------------------------------");

        Thread.sleep(5000);
        System.out.println("first========================" + xMemcachedClient.get("first"));
        System.out.println("second=======================" + xMemcachedClient.get("second"));
        System.out.println("demo=======================" + xMemcachedClient.get("test"));
    }

    @Test
    public void testMesh(){
        Map map=new HashMap();
        map.put("role","admin");
        map.put("uid",4);
        List<Map> list=getSqlSessionTemplate().selectList("com.tpadsz.after.dao.MeshDao.getByMap", map);
        System.out.println(JSON.toJSONString(list));
    }
    public static void main(String[] args) {
        int size = 8;
        int total = 46;
        int totalPage = total / size == 0 ? total / size : total / size + 1;
        logger.info("total=" + total + ",totalPage=" + totalPage);
        String mids = "55,57,65,66,67";
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        for (String id:list){
            System.out.println(id);
        }
    }
}

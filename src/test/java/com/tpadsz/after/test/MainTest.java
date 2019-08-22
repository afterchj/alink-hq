package com.tpadsz.after.test;

import com.alibaba.fastjson.JSON;
import com.tpadsz.after.dao.MeshDao;
import com.tpadsz.after.dao.RoleDao;
import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.FileService;
import com.tpadsz.after.service.GroupService;
import com.tpadsz.after.service.MeshService;
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
    public void testMesh() {
        SqlSessionTemplate sqlSessionTemplate = getSqlSessionTemplate();
        String role = sqlSessionTemplate.getMapper(RoleDao.class).selectById("1488");
        logger.info("role=" + role);
        SearchDict dict = new SearchDict();
        dict.setUid("1488");
        dict.setRole(role);
        Map map = new HashMap();
        map.put("role", "user");
        map.put("uid", 1488);
//        map.put("id", 307);
//        map.put("mid", 0);
//        map.put("name", "testNewType");
//        map.put("type", "家庭照明");
//        map.put("projectId", 248);
//        map.put("pid", 4);
//        int count = sqlSessionTemplate.selectOne("com.tpadsz.after.dao.MeshDao.getCount", map);
//        sqlSessionTemplate.selectOne("com.tpadsz.after.dao.MeshDao.save", map);
//        logger.info("result=" + map.get("mid"));
//        logger.info("count=" + count);

//        int count = getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.PlaceDao.getCount", map);
//        logger.info(count);
//        getSqlSessionTemplate().insert("com.tpadsz.after.dao.PlaceDao.save", map);
        List<Map> list = sqlSessionTemplate.getMapper(MeshDao.class).getByMap(dict);
//        String role = getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.RoleDao.selectById", 21);
//        List<Role> roles = getSqlSessionTemplate().selectList("com.tpadsz.after.dao.RoleDao.getAll");
//        OptionList optionList = sqlSessionTemplate.selectOne("com.tpadsz.after.dao.MeshDao.getProject", map);
//        CooperationInfo params=new CooperationInfo();
//        params.setId(8);
//        params.setStatus(true);
//        params.setConame("苏州诚彩智能科技有限公司");
//        sqlSessionTemplate.update("com.tpadsz.after.dao.CooperateDao.saveUpdate",params);
//        MeshInfo meshInfo = sqlSessionTemplate.selectOne("com.tpadsz.after.dao.LightDao.getLightInfo",1598);
//        List<MeshInfo> list = sqlSessionTemplate.selectList("com.tpadsz.after.dao.LightDao.getSceneInfo",1598);
//        List<String> name = new ArrayList<>();
//        for (MeshInfo info:list) {
//            name.add(info.getSname());
//        }
//        meshInfo.setSname(name.toString());
//        logger.info("name=" + meshInfo.getSname());
//        CooperationInfo info=sqlSessionTemplate.selectOne("com.tpadsz.after.dao.CooperateDao.getCooperationInfo",8);
//        List<Map> list=sqlSessionTemplate.selectList("com.tpadsz.after.dao.CooperateDao.getByMap");
//        List<OptionList> lists = getSqlSessionTemplate().selectList("com.tpadsz.after.dao.GroupDao.getPlaces",map);
//        logger.info("role=" + role);
//        logger.info("roles=" + roles);
        logger.info("lists=" + list.size());
//        logger.info("lists=" + JSON.toJSONString(info));
//        logger.info("lists=" + JSON.toJSONString(meshInfo));
    }

    @Test
    public void testDao() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        Map map = new HashMap();
//        map.put("role", "manager");
//        map.put("uid", 18);
        map.put("mid", 0);
        MeshService meshService = (MeshService) ctx.getBean("meshServiceImpl");
        FileService fileService = (FileService) ctx.getBean("fileServiceImpl");
        FileDTO info=new FileDTO();
        info.setOid(28);
        info.setOtaVersion("v1.0.1");
        try {
            System.out.println(fileService.getCount(info));;
        } catch (RepetitionException e) {
            e.printStackTrace();
        }
//        GroupService groupService = (GroupService) ctx.getBean("groupServiceImpl");
//        List<OptionList> lists = meshService.getProjects(map);
//        OptionList optionList = meshService.getProject(map);
//        List<OptionList> lists = groupService.getPlaces(map);
//        logger.info("lists=" + JSON.toJSONString(lists));
//        logger.info("lists=" + JSON.toJSONString(optionList));
    }

    @Test
    public void test() {
        String str = "2019-08-01 - 2019-08-02";
        String begin = str.substring(0, 10);
        String end = str.substring(str.length() - 10);
        System.out.println("begin=" + begin + ",end=" + end+",str"+new Date(begin));
        Calendar calendar=Calendar.getInstance();
    }

    public static void main(String[] args) {
        int size = 8;
        int total = 46;
        int totalPage = total / size == 0 ? total / size : total / size + 1;
        logger.info("total=" + total + ",totalPage=" + totalPage);
        String mids = "55,57,65,66,67";
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        for (String id : list) {
            System.out.println(id);
        }
    }
}

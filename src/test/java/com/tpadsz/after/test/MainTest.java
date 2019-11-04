package com.tpadsz.after.test;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.tpadsz.after.dao.MeshDao;
import com.tpadsz.after.dao.RoleDao;
import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.CooperationTemplate;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.CooperateService;
import com.tpadsz.after.utils.Encryption;
import com.tpadsz.after.utils.GenerateUtils;
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
//        Map map = new HashMap();
//        map.put("uname", "test");
////        map.put("account", "admin");
////        map.put("mobile", "18170756879");
//        map.put("email", "after@tpadsz.com");
//        User user = new User();
//        user.setMobile("18170756879");
////        User user = getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserExtendDao.selectByUsername", "超级管理员");
////        System.out.println("user:" + getSqlSessionTemplate().selectList("com.tpadsz.after.dao.UserExtendDao.getPermissions", "超级管理员"));
//        System.out.println("user=" + getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserDao.selectByUsername", "test").toString());
////        System.out.println("count:" + getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.UserDao.getCount", map));
//        System.out.println("user:" + getSqlSessionTemplate().selectList("com.tpadsz.after.dao.MeshDao.getByMap", null).size());
//        System.out.println("count:" + getSqlSessionTemplate().selectOne("com.tpadsz.after.dao.MeshDao.getCountByTable", "f_mesh"));
        SqlSessionTemplate sqlSessionTemplate = getSqlSessionTemplate();
        List<CooperationTemplate> parentList = sqlSessionTemplate.selectList("com.tpadsz.after.dao.CooperateDao.getCompanyByUid", "2730");
        List<CooperationTemplate> childList = sqlSessionTemplate.selectList("com.tpadsz.after.dao.CooperateDao.getCompanyByFid", 40);
        logger.warn(JSON.toJSONString(parentList) + "\t" + JSON.toJSONString(childList));
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
//        Map map = new HashMap();
//        map.put("role", "manager");
//        map.put("uid", 18);
//        map.put("fid", 26);
//        map.put("status", 0);
//        MeshService meshService = (MeshService) ctx.getBean("meshServiceImpl");
//        FileService fileService = (FileService) ctx.getBean("fileServiceImpl");
        CooperateService cooperateService = (CooperateService) ctx.getBean("cooperateServiceImpl");
        int parentId = 0;
        String uid = "18";
        Map map = new HashMap();
        if (parentId != 0) {
            map.put("parentId", parentId);
        } else {
            map.put("uid", uid);
        }
        CooperationTemplate parent = cooperateService.getParentCompany(map);
//        CooperationTemplate parent1 = cooperateService.getParent(1);
//        logger.warn("result=" + JSON.toJSONString(parent1));
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        StringBuilder stringBuilder = new StringBuilder();
//        if (parent.getStatus() == 0) {
//            stringBuilder.append(String.format("%s_%s_%s", parent.getConame(), "终止", dateFormat.format(new Date())));
//        } else {
//            stringBuilder.append(String.format("%s_%s_%s", parent.getConame(), "合作", dateFormat.format(new Date())));
//        }
//        System.out.println(stringBuilder.toString());
        cooperateService.buildExcelData(parent);
        Map<Integer, List<CooperationTemplate>> company = cooperateService.buildExcelData(parent);
        logger.warn("\n" + JSONObject.toJSONString(company) + "\n" + company.size());
        logger.warn("\n"+JSON.toJSONString(company) + "\n"+JSON.toJSONString(parent));
//        cooperateService.updateUser(map);
//        GroupService groupService = (GroupService) ctx.getBean("groupServiceImpl");
//        groupService.deleteGroup(map);
//        logger.info("result=" + map.get("result"));
//        SearchDict dict = new SearchDict();
//        FileDTO info = fileService.getFileInfo(53);
//        BeanUtils.copyProperties(info, dict);
//        logger.info("dict=" + JSON.toJSONString(dict));

//        FileDTO info=new FileDTO();
//        info.setOid(28);
//        info.setOtaVersion("v1.0.1");
//        try {
//            System.out.println(fileService.getCount(info));
//        } catch (RepetitionException e) {
//            e.printStackTrace();
//        }
//        GroupService groupService = (GroupService) ctx.getBean("groupServiceImpl");
//        List<OptionList> lists = meshService.getProjects(map);
//        OptionList optionList = meshService.getProject(map);
//        List<OptionList> lists = groupService.getPlaces(map);
//        logger.info("lists=" + JSON.toJSONString(lists));
//        logger.info("lists=" + JSON.toJSONString(optionList));
    }

    @Test
    public void test() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        CooperateService cooperateService = (CooperateService) ctx.getBean("cooperateServiceImpl");
        CooperationInfo info = new CooperationInfo();
        info.setConame("test有限公司");
        info.setAddress("中国苏州菜");
        info.setCode("12341243123");
        info.setMobile("12580");
        info.setPhoto("test.img");
        info.setParent_id(1);
        Map param = JSONObject.parseObject(JSON.toJSONString(info));
        param.put("account", GenerateUtils.generateAccount(GenerateUtils.getCharAndNumr(8)));
        Encryption.HashPassword password = Encryption.encrypt(Encryption.getMD5Str("123456"));
        param.put("pwd", password.getPassword());
        param.put("salt", password.getSalt());
        cooperateService.save(param);
//        String str = "2019-08-01 - 2019-08-02";
//        String begin = str.substring(0, 10);
//        String end = str.substring(str.length() - 10);
//        System.out.println("begin=" + begin + ",end=" + end + ",str" + new Date(begin));
//        Calendar calendar = Calendar.getInstance();
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

    @Test
    public void testStr() {
        String id = "[\"20234\",\"20233\",\"20232\",\"20229\",\"20228\",\"20225\",\"20224\",\"20222\",\"20221\",\"20219\"]";
        logger.warn("id=" + id);
        List array = JSON.parseArray(id);
        String[] idArray = id.split(",");

        logger.warn("ids="+JSON.toJSONString(array));

    }
}

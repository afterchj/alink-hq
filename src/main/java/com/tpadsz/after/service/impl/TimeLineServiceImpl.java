package com.tpadsz.after.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.dao.TimeLineDao;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.TimeBean;
import com.tpadsz.after.entity.TimeLine;
import com.tpadsz.after.entity.TimePoint;
import com.tpadsz.after.service.TimeLineService;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:39
 **/
@Service("timeLineService")
public class TimeLineServiceImpl implements TimeLineService {

    @Resource
    private TimeLineDao timeLineDao;

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public ProjectList getProjectNameByMid(int id) {
        return timeLineDao.getProjectNameByMid(id);
    }

    @Override
    public PageInfo<TimeLine> getTimeLineByMid(int id, Integer pageNum, Integer pageSize, String timeFlag, String tname, String createDate, String endTime,String state) {
        if (pageNum==null){
            pageNum = 1;//默认第一页
        }
        if (pageNum<=0){
            pageNum = 1;
        }
        if (pageSize == null){
            pageSize= 10;//默认显示10页
        }
        PageHelper.startPage(pageNum,pageSize);
        List<TimeLine> timeLineList = new ArrayList<>();
        if (StringUtils.isNotBlank(state)){
            if (state.equals("0")){
                state="";//全部
            }else if (state.equals("1")){
                state="1";//启用
            }else if (state.equals("2")){
                state="0";//停用
            }
        }
        if (timeFlag==null||timeFlag.length()<1){
            timeLineList = timeLineDao.getTimeLineByMid(id,tname,createDate,endTime,state);
        }else if (timeFlag.equals("creToTop")){
            timeLineList = timeLineDao.getTimeLineByMidOrderByCreateDate(id,tname,createDate,endTime,state);
        }else if (timeFlag.equals("creToBottom")){
            timeLineList = timeLineDao.getTimeLineByMidOrderByCreateDateDesc(id,tname,createDate,endTime,state);
        }else if (timeFlag.equals("upToTop")){
            timeLineList = timeLineDao.getTimeLineByMidOrderByUpdateDate(id,tname,createDate,endTime,state);
        }else if (timeFlag.equals("upToBottom")){
            timeLineList = timeLineDao.getTimeLineByMid(id,tname,createDate,endTime,state);
        }
        StringBuffer sb;
        for (TimeLine timeLine:timeLineList){
            sb = new StringBuffer();
            String dayObj = timeLine.getDayObj();
//            System.out.println(dayObj);
            JSONObject jsonObject = JSONObject.parseObject(dayObj);
            if (jsonObject.getInteger("mon").equals(1)){
                sb.append("周一、");
            }
            if (jsonObject.getInteger("tus").equals(1)){
                sb.append("周二、");
            }
            if (jsonObject.getInteger("wed").equals(1)){
                sb.append("周三、");
            }
            if (jsonObject.getInteger("thr").equals(1)){
                sb.append("周四、");
            }
            if (jsonObject.getInteger("fri").equals(1)){
                sb.append("周五、");
            }
            if (jsonObject.getInteger("sat").equals(1)){
                sb.append("周六、");
            }
            if (jsonObject.getInteger("sun").equals(1)){
                sb.append("周日、");
            }
            String sbStr = sb.toString().substring(0,sb.toString().lastIndexOf("、"));
            timeLine.setWeek(sbStr);
        }
        PageInfo<TimeLine> pageInfo = new PageInfo<>(timeLineList);
        return pageInfo;
    }

    @Override
    public void batchInsertTimeLine(List<TimeLine> timeLines) {
        SqlSession sqlSession = sqlSessionTemplate.getSqlSessionFactory().openSession(ExecutorType.BATCH);
        TimeLineDao timeLineDao1 = sqlSession.getMapper(TimeLineDao.class);
        try {
            for (int i=1;i<=timeLines.size();i++){
                timeLineDao1.insertTimeLine(timeLines.get(i-1));
            }
            sqlSession.commit();
            sqlSession.clearCache();
        }catch (Exception e){
            sqlSession.rollback();
        }finally {
            sqlSession.close();
        }


    }

    @Override
    public void updateTnameById(int id, String tname, int mid) {
        timeLineDao.updateTnameById(id,tname);
        TimeBean timeBean = timeLineDao.getTimeJson(id,mid);
        String json = timeBean.getJson();
        JSONObject jsonObject = JSONObject.parseObject(json);
        jsonObject.remove("tname");
        jsonObject.put("tname", tname);
        jsonObject.remove("item_title");
        jsonObject.put("item_title", tname);
        json = jsonObject.toJSONString();
        timeLineDao.updateTimeJson(id,mid, json);
    }

    @Override
    public boolean getTnameById(int mid, String tname) {
        int count = timeLineDao.getTnameById(mid,tname);
        boolean flag = false;
        if (count>0){
            flag = true;
        }
        return flag;
    }

    @Override
    public TimeLine getTimeLineById(int id) {
        return timeLineDao.getTimeLineById(id);
    }

    @Override
    public List<TimePoint> getTimePointByTsid(int id) {
        return timeLineDao.getTimePointByTsid(id);
    }

    @Override
    public ProjectList getProjectByProjectId(int projectId) {
        return timeLineDao.getProjectByProjectId(projectId);
    }
}

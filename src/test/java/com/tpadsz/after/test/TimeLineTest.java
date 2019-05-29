package com.tpadsz.after.test;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.TimeLine;
import com.tpadsz.after.service.TimeLineService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;
import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:52
 **/
public class TimeLineTest {
    ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");

    TimeLineService timeLineService = ac.getBean("timeLineService", TimeLineService.class);

    @Test
    public void getProjectNameByMidTest(){
        String projectName = timeLineService.getProjectNameByMid(19936);
        System.out.println("projectName: "+projectName);
    }

    @Test
    public void getTimeLineByMidTest(){
//        List<TimeLine> timeLineList =  timeLineService.getTimeLineByMid(id, pageNum, 19936);
//        timeLineList.stream().forEach(System.out::println);
        PageInfo pageInfo = timeLineService.getTimeLineByMid(19936,1,10,null);
        List<TimeLine> timeLineList = pageInfo.getList();
        timeLineList.stream().forEach(System.out::println);
    }

    @Test
    public void batchInsertTimeLineTest(){
        List<TimeLine> timeLineList = new ArrayList<>();
        TimeLine timeLine;
        for (int i=0;i<=100;i++){
            timeLine = new TimeLine();
            timeLine.setTname("timeline_00"+(i+14));
            timeLine.setTid(i+14);
            timeLineList.add(timeLine);
        }

        timeLineService.batchInsertTimeLine(timeLineList);
    }

    @Test
    public void test(){
        boolean timeline_000 = timeLineService.getTnameById(19936, "timeline_000");
        System.out.println(timeline_000);
    }
}

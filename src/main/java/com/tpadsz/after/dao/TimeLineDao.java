package com.tpadsz.after.dao;

import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.TimeBean;
import com.tpadsz.after.entity.TimeLine;
import com.tpadsz.after.entity.TimePoint;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:46
 **/
public interface TimeLineDao {
    ProjectList getProjectNameByMid(@Param("id") int id);

    List<TimeLine> getTimeLineByMid(@Param("id") int id, @Param("tname") String tname, @Param("createDate") String createDate, @Param("updateDate") String updateDate,@Param("state") String state);

    void insertTimeLine(TimeLine timeLine);

    void updateTnameById(@Param("id") int id, @Param("tname") String tname);

    int getTnameById(@Param("mid") int mid, @Param("tname") String tname);

    List<TimeLine> getTimeLineByMidOrderByCreateDateDesc(@Param("id") int id, @Param("tname") String tname, @Param("createDate") String createDate, @Param("updateDate") String updateDate,@Param("state") String state);

    List<TimeLine> getTimeLineByMidOrderByCreateDate(@Param("id") int id, @Param("tname") String tname, @Param("createDate") String createDate, @Param("updateDate") String updateDate,@Param("state") String state);

    List<TimeLine> getTimeLineByMidOrderByUpdateDate(@Param("id") int id, @Param("tname") String tname, @Param("createDate") String createDate, @Param("updateDate") String updateDate,@Param("state") String state);

    TimeLine getTimeLineById(@Param("id") int id);

    ProjectList getProjectByProjectId(@Param("projectId") int projectId);

    List<TimePoint> getTimePointByTsid(@Param("id") int id);

    TimeBean getTimeJson(@Param("tid") int id, @Param("mid") int mid);

    void updateTimeJson(@Param("tid")int id, @Param("mid")int mid, @Param("json") String json);
}

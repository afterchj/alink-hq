package com.tpadsz.after.dao;

import com.tpadsz.after.entity.TimeLine;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:46
 **/
public interface TimeLineDao {
    String getProjectNameByMid(@Param("id") int id);

    List<TimeLine> getTimeLineByMid(@Param("id") int id);

    void insertTimeLine(TimeLine timeLine);

    void updateTnameById(@Param("id") int id, @Param("tname") String tname);

    int getTnameById(@Param("mid") int mid, @Param("tname") String tname);

    List<TimeLine> getTimeLineByMidOrderByCreateDateDesc(@Param("id")int id);

    List<TimeLine> getTimeLineByMidOrderByCreateDate(@Param("id")int id);

//    List<TimeLine> getTimeLineByMidOrderByUpdateDateDesc(@Param("id")int id);

    List<TimeLine> getTimeLineByMidOrderByUpdateDate(@Param("id")int id);
}

package com.tpadsz.after.service;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.TimeLine;
import com.tpadsz.after.entity.TimeListPage;
import com.tpadsz.after.entity.TimePoint;

import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:38
 **/
public interface TimeLineService {
    ProjectList getProjectNameByMid(int id);

    PageInfo<TimeLine> getTimeLineByMid(TimeListPage timeListPage);

    void batchInsertTimeLine(List<TimeLine> timeLines);

    void updateTnameById(int id, String tname, int mid);

    boolean getTnameById(int mid, String tname);

    TimeLine getTimeLineById(int id);

    List<TimePoint> getTimePointByTsid(int id);

    ProjectList getProjectByProjectId(int projectId);
}

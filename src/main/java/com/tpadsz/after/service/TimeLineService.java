package com.tpadsz.after.service;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.TimeLine;

import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-05-28 10:38
 **/
public interface TimeLineService {
    String getProjectNameByMid(int id);

    PageInfo<TimeLine> getTimeLineByMid(int id, Integer pageNum, Integer pageSize,String timeFlag);

    void batchInsertTimeLine(List<TimeLine> timeLines);

    void updateTnameById(int id, String tname);

    boolean getTnameById(int mid, String tname);
}

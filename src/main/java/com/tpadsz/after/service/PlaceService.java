package com.tpadsz.after.service;

import com.tpadsz.after.entity.OptionList;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/23.
 */
public interface PlaceService {

    List<Map> selectByMap(Map map);

    List<Map> getByMap(Map map);

    List<Map> selectByPid(List list);

    List<OptionList> getMesh(Map map);

    void deleteByIds(List list);

    void rename(Map map);
}
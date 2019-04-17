package com.tpadsz.after.service;

import com.tpadsz.after.entity.OptionList;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface MeshService {
    List<Map> selectByMap(Map map);

    List<Map> getByMap(Map map);

    List<Map> selectByMid(List list);
    List<OptionList> getProjects();
}

package com.tpadsz.after.service;

import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface MeshService {
    List<Map> selectByMap(SearchDict dict);

    List<Map> getByMap(SearchDict map);

    List<Map> selectByMid(List list);
    void saveUpdate(Map map);
    List<OptionList> getProjects(Map map);
}

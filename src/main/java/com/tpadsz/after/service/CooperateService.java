package com.tpadsz.after.service;

import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface CooperateService {

    List<Map> getByMap(SearchDict dict);

    CooperationInfo getCooperationInfo(int id);

    void save(CooperationInfo info);

    void saveUpdate(CooperationInfo info);

    void deleteCooperationById(int id);
}

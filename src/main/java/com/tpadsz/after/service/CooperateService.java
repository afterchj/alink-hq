package com.tpadsz.after.service;

import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.CooperationTemplate;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface CooperateService {

    List<Map> getByMap(SearchDict dict);

    CooperationInfo getCooperationInfo(int id);

    List<CooperationTemplate> getChildCompanyByFid(int fid);

    List<CooperationTemplate> getChildCompanyByUid(String uid);

    int getCount(int id);

    CooperationTemplate getParentCompany(String uid);

    void save(Map info);

    void saveUpdate(CooperationInfo info);

    void updateUser(Map map);

    void deleteCooperationById(int id);

    Map buildExcelData(CooperationTemplate parent);

    String parseName(CooperationTemplate cooperationInfo);
}

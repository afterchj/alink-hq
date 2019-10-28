package com.tpadsz.after.dao;

import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.CooperationTemplate;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface CooperateDao {

    List<Map> getByMap(SearchDict dict);

    CooperationInfo getCooperationInfo(int id);

    List<CooperationTemplate> getCompanyByFid(int fid);

    List<CooperationTemplate> getCompanyByUid(String Uid);

    int getCount(int id);

    CooperationTemplate getParentCompany(String uid);

    void saveCooperation(Map map);

    void saveUpdate(CooperationInfo info);

    void updateUser(Map map);

    void deleteCooperationById(int id);
}

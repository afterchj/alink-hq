package com.tpadsz.after.dao;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface LightDao {

    List<Map> getByMap(SearchDict dict);

    List<Map> selectByLid(List list);

    List<OptionList> getGroups(Map map);

    MeshInfo getLightInfo(int id);

    void saveUpdate(Map map);

    void saveRename(Map map);

    void deleteLightByIds(List list);
}

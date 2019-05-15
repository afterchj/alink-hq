package com.tpadsz.after.service;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/30.
 */
public interface LightService {
    List<Map> getByMap(SearchDict dict);

    List<Map> selectByLid(List list);

    List<OptionList> getGroups(Map map);

    MeshInfo getLightInfo(int id);

    List<MeshInfo> getSceneInfo(int id);

    void saveUpdate(Map map);

    void saveRename(Map map);

    void deleteLightByIds(List list);
}

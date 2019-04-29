package com.tpadsz.after.service;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/23.
 */
public interface PlaceService {

    List<Map> selectByMap(Map map);

    List<Map> getByMap(SearchDict dict);

    List<Map> selectByPid(List list);

    List<OptionList> getMesh(Map map);
    MeshInfo getPlaceInfo(int id);
    void deleteByIds(List list);

    void saveRename(Map map);
}

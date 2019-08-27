package com.tpadsz.after.service;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface GroupService {
    List<Map> selectByMap(SearchDict dict);

    List<Map> getByMap(SearchDict map);

    List<Map> selectByGid(List list);

    MeshInfo getGroupInfo(int id);

    int getCount(SearchDict map);

    void save(SearchDict dict) throws RepetitionException;

    void saveUpdate(Map map);

    void saveRename(SearchDict map) throws RepetitionException;

    void deleteGroupByIds(List list);

    void deleteGroup(Map map);

    List<OptionList> getPlaces(Map map);

    List<OptionList> getMesh(Map map);
}

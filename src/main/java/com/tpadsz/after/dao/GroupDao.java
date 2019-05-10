package com.tpadsz.after.dao;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface GroupDao {

    List<Map> selectByMap(SearchDict dict);

    List<Map> getByMap(SearchDict dict);

    List<Map> selectByGid(List list);

    List<OptionList> getPlaces(Map map);

    List<OptionList> getMesh(Map map);

    MeshInfo getGroupInfo(int id);

    int getCount(SearchDict map);

    void save(SearchDict dict);

    void saveUpdate(Map map);

    void saveRename(SearchDict map);

    void deleteGroupByIds(List list);
}

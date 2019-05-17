package com.tpadsz.after.dao;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface MeshDao {


    List<Map> getByMap(SearchDict dict);

    List<Map> selectByMid(List list);

    MeshInfo getMeshInfo(int id);

    int getCount(Map map);

    List<OptionList> getMesh(Map map);

    OptionList getProject(SearchDict dict);

    List<OptionList> getProjects(Map map);

    int getCountByTable(String tableName);

    void save(Map dict);

    void saveUpdate(Map map);

    void saveRename(Map map);

    void deleteMeshByIds(List list);
}

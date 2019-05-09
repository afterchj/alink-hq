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

    List<Map> selectByMap(SearchDict dict);

    List<Map> getByMap(SearchDict dict);

    List<Map> selectByMid(List list);

    MeshInfo getMeshInfo(int id);

    int getCount(Map map);

    OptionList getProject(int projectId);

    List<OptionList> getProjects(Map map);

    int getCountByTable(String tableName);

    void saveUpdate(Map map);

    void saveRename(Map map);

    void deleteMeshByIds(List list);
}

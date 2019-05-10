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
public interface MeshService {

    List<Map> getByMap(SearchDict map);

    List<Map> selectByMid(List list);

    MeshInfo getMeshInfo(Integer id);

    int getCount(Map map);

    void save(Map dict);

    void saveUpdate(Map map);

    void saveRename(Map map)throws RepetitionException;

    OptionList getProject(int projectId);

    void deleteMeshByIds(List list);

    List<OptionList> getProjects(Map map);
}

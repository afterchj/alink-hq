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
    List<Map> selectByMap(SearchDict dict);

    List<Map> getByMap(SearchDict map);

    List<Map> selectByMid(List list);

    MeshInfo getMeshInfo(Integer id);

    int getCount(Map map);

    void saveUpdate(Map map);

    void saveRename(Map map)throws RepetitionException;

    void deleteMeshByIds(List list);

    List<OptionList> getProjects(Map map);
}

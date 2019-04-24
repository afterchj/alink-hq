package com.tpadsz.after.dao;

import com.tpadsz.after.entity.OptionList;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface MeshDao {

    List<Map> selectByMap(Map map);

    List<Map> getByMap(Map map);

    List<Map> selectByMid(List list);

    List<OptionList> getProjects(Map map);

    int getCountByTable(String tableName);

    void saveUpdate(Map map);
}

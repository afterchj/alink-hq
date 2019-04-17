package com.tpadsz.after.dao;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface MeshDao {

    List<Map> selectByMap(Map map);

    List<Map> getByMap(Map map);

    int getCountByTable(String tableName);
}

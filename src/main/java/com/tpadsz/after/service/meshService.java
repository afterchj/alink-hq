package com.tpadsz.after.service;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface meshService {
    List<Map> selectByMap(Map map);

    List<Map> getByMap(Map map);
}

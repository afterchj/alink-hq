package com.tpadsz.after.service;

import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface PCService {

    List<Map> getByMap(SearchDict dict);

    List<Map> getPCFile(SearchDict dict);

}

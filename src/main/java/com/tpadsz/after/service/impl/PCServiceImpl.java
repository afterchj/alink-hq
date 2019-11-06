package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.PCDao;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.FileService;
import com.tpadsz.after.service.PCService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author hongjian.chen
 * @date 2019/8/1 9:56
 */

@Service
public class PCServiceImpl implements PCService {

    @Autowired
    private PCDao fileDao;

    @Override
    public List<Map> getByMap(SearchDict dict) {
        return fileDao.getByMap(dict);
    }

    @Override
    public List<Map> getPCFile(SearchDict dict) {
        return fileDao.getPCFile(dict);
    }
}

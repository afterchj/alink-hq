package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.MeshDao;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.service.MeshService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */

@Service
public class MeshServiceImpl implements MeshService {
    @Resource
    private MeshDao meshDao;

    @Override
    public List<Map> selectByMap(Map map) {
        return meshDao.selectByMap(map);
    }

    @Override
    public List<Map> getByMap(Map map) {
        return meshDao.getByMap(map);
    }

    @Override
    public List<Map> selectByMid(List list) {
        return meshDao.selectByMid(list);
    }

    @Override
    public void saveUpdate(Map map) {
        meshDao.saveUpdate(map);
    }

    @Override
    public List<OptionList> getProjects() {
        return meshDao.getProjects();
    }
}

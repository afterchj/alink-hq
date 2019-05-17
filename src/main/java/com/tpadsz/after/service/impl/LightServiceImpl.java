package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.LightDao;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.LightService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/30.
 */

@Service
public class LightServiceImpl implements LightService {

    @Resource
    private LightDao lightDao;

    @Override
    public List<Map> getByMap(SearchDict dict) {
        return lightDao.getByMap(dict);
    }

    @Override
    public List<Map> selectByLid(List list) {
        return lightDao.selectByLid(list);
    }

    @Override
    public List<OptionList> getGroups(Map map) {
        return lightDao.getGroups(map);
    }

    @Override
    public MeshInfo getLightInfo(int id) {
        return lightDao.getLightInfo(id);
    }

    @Override
    public List<MeshInfo> getSceneInfo(int id) {
        return lightDao.getSceneInfo(id);
    }

    @Override
    public void saveUpdate(Map map) {
        lightDao.saveUpdate(map);
    }

    @Override
    public void saveRename(Map map) {
        lightDao.saveRename(map);
    }

    @Override
    public void deleteLightByIds(List list) {
        lightDao.deleteLightByIds(list);
    }
}

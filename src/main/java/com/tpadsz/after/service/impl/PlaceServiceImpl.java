package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.PlaceDao;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.PlaceService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/23.
 */

@Service
public class PlaceServiceImpl implements PlaceService {

    @Resource
    private PlaceDao placeDao;

    @Override
    public List<Map> selectByMap(Map map) {
        return placeDao.selectByMap(map);
    }

    @Override
    public List<Map> getByMap(SearchDict dict) {
        return placeDao.getByMap(dict);
    }

    @Override
    public List<Map> selectByPid(List list) {
        return placeDao.selectByPid(list);
    }

    @Override
    public List<OptionList> getMesh(Map map) {
        return placeDao.getMesh(map);
    }

    @Override
    public MeshInfo getPlaceInfo(int id) {
        return placeDao.getPlaceInfo(id);
    }

    @Override
    public void save(Map map) {
        placeDao.save(map);
    }

    @Override
    public int getCount(Map map) {
        return placeDao.getCount(map);
    }

    @Override
    public void deleteByIds(List list) {
        placeDao.deleteByIds(list);
    }

    @Override
    public void deleteGroup(Map map) {
        placeDao.deleteGroup(map);
    }

    @Override
    public void saveRename(Map map) throws RepetitionException {
        int count = placeDao.getCount(map);
        if (count > 0) {
            throw new RepetitionException(301, "名字已存在！");
        }
        placeDao.saveRename(map);
    }
}

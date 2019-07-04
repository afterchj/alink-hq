package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.CooperateDao;
import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.CooperateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/5/29.
 */

@Service
public class CooperateServiceImpl implements CooperateService {

    @Resource
    private CooperateDao cooperateDao;

    @Override
    public List<Map> getByMap(SearchDict dict) {
        return cooperateDao.getByMap(dict);
    }

    @Override
    public CooperationInfo getCooperationInfo(int id) {
        return cooperateDao.getCooperationInfo(id);
    }

    @Override
    public int getCount(int id) {
        return cooperateDao.getCount(id);
    }

    @Override
    public void save(CooperationInfo info) {
        cooperateDao.save(info);
    }

    @Override
    public void saveUpdate(CooperationInfo info) {
        cooperateDao.saveUpdate(info);
    }

    @Override
    public void deleteCooperationById(int id) {
        cooperateDao.deleteCooperationById(id);
    }
}

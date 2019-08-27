package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.GroupDao;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.GroupService;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */

@Service
public class GroupServiceImpl implements GroupService {
    @Resource
    private GroupDao groupDao;

    @Override
    public List<Map> selectByMap(SearchDict dict) {
        return groupDao.selectByMap(dict);
    }

    @Override
    public List<Map> getByMap(SearchDict map) {
        return groupDao.getByMap(map);
    }

    @Override
    public List<Map> selectByGid(List list) {
        return groupDao.selectByGid(list);
    }

    @Override
    public MeshInfo getGroupInfo(int id) {
        return groupDao.getGroupInfo(id);
    }

    @Override
    public int getCount(SearchDict map) {
        return groupDao.getCount(map);
    }

    @Override
    public void save(SearchDict dict) throws RepetitionException {
        int count = groupDao.getCount(dict);
        if (count > 0) {
            throw new RepetitionException(301, "名字已存在！");
        }
        groupDao.save(dict);
    }

    @Override
    public void saveUpdate(Map map) {
        groupDao.saveUpdate(map);
    }

    @Override
    public void saveRename(SearchDict map) throws RepetitionException {
        int count = groupDao.getCount(map);
        if (count > 0) {
            throw new RepetitionException(301, "名字已存在！");
        }
        groupDao.saveRename(map);
    }

    @Override
    public void deleteGroupByIds(List list) {
        groupDao.deleteGroupByIds(list);
    }

    @Override
    public void deleteGroup(Map map) {
        groupDao.deleteGroup(map);
    }

    @Override
    public List<OptionList> getPlaces(Map map) {
        return groupDao.getPlaces(map);
    }

    @Override
    public List<OptionList> getMesh(Map map) {
        return groupDao.getMesh(map);
    }
}

package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.GroupDao;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.GroupService;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthorizedException;
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
    public void saveUpdate(Map map) {
        groupDao.saveUpdate(map);
    }

    @Override
    public void saveRename(Map map){
        groupDao.saveRename(map);
    }

    @Override
    @RequiresPermissions("delete")
    public void deleteGroupByIds(List list) throws AuthorizationException {
        groupDao.deleteGroupByIds(list);
    }

    @Override
    public List<OptionList> getPlaces(Map map) {
        return groupDao.getPlaces(map);
    }
}

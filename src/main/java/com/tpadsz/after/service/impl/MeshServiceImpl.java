package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.MeshDao;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
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
    public List<Map> getByMap(SearchDict map) {
        return meshDao.getByMap(map);
    }

    @Override
    public List<Map> selectByMid(List list) {
        return meshDao.selectByMid(list);
    }

    @Override
    public MeshInfo getMeshInfo(Integer id) {
        return meshDao.getMeshInfo(id);
    }

    @Override
    public int getCount(Map map) {
        return meshDao.getCount(map);
    }

    @Override
    public void save(Map dict) throws RepetitionException {
        int count = meshDao.getCount(dict);
        if (count > 0) {
            throw new RepetitionException(301, "名字已存在！");
        }
        meshDao.save(dict);
    }

    @Override
    public void saveUpdate(Map map) {
        meshDao.saveUpdate(map);
    }

    @Override
    public void saveRename(Map map) throws RepetitionException {
        int count = meshDao.getCount(map);
        if (count > 0) {
            throw new RepetitionException(301, "名字已存在！");
        }
        meshDao.saveRename(map);
    }

    @Override
    public OptionList getProject(int projectId) {
        return meshDao.getProject(projectId);
    }

    @Override
    public void deleteMeshByIds(List list) {
        meshDao.deleteMeshByIds(list);
    }

    @Override
    public List<OptionList> getProjects(Map map) {
        return meshDao.getProjects(map);
    }
}

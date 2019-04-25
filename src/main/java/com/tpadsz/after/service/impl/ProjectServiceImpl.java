package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.ProjectDao;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.service.ProjectService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/8.
 */

@Service("projectService")
public class ProjectServiceImpl implements ProjectService {
    @Resource
    private ProjectDao projectDao;

    @Override
    public List<ProjectList> search(String projectName, String account, String create_date, String
            update_date) {
        return projectDao.search(projectName);
    }

    @Override
    public List<ProjectList> searchBySuper(String account, String projectName, String startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate) {
        return projectDao.searchBySuper(account,projectName,startCreateDate,endCreateDate,startUpdateDate,endUpdateDate);
    }

    @Override
    public List<ProjectList> searchByManager(String account, String projectName, String startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate, List<Integer> ids) {
        return projectDao.searchByManager(account,projectName,startCreateDate,endCreateDate,startUpdateDate,endUpdateDate,ids);
    }

    @Override
    public List<Integer> findProjectList(String uid) {
        return projectDao.findProjectList(uid);
    }

    @Override
    public List<ProjectList> searchByUser(String account, String projectName, String startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate, String uid) {
        return projectDao.searchByUser(account,projectName,startCreateDate,endCreateDate,startUpdateDate,endUpdateDate,uid);
    }

    @Override
    public void createProject(String projectName, String uid) {
        projectDao.createProject(projectName,uid);
    }

    @Override
    public void renameProject(String projectId, String projectName) {
        projectDao.renameProject(projectId,projectName);
    }


}

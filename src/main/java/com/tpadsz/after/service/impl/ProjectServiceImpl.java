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
    public List<ProjectList> findProList() {
        return projectDao.findProList();
    }

    @Override
    public List<ProjectList> search(String projectName, String account, String create_date, String
            update_date) {
        return projectDao.search(projectName);
    }

    @Override
    public List<ProjectList> findProListByUids(List<String> uids) {
        return projectDao.findProListByUids(uids);
    }

    @Override
    public List<ProjectList> findProListByUid(String uid) {
        return projectDao.findProListByUid(uid);
    }

    @Override
    public List<ProjectList> searchBySuper(String account, String projectName, String startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate) {
        return projectDao.searchBySuper(account,projectName,startCreateDate,endCreateDate,startUpdateDate,endUpdateDate);
    }

    @Override
    public List<ProjectList> searchByManager(List<String> uids) {
        return projectDao.searchByManager();
    }

    @Override
    public List<ProjectList> searchByUser(String uid) {
        return projectDao.searchByUser();
    }


}

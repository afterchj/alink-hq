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
    public Integer findRoleIdByUid(String uid) {
        return projectDao.findRoleIdByUid(uid);
    }

    @Override
    public List<String> findFirmUid(String uid) {
        return projectDao.findFirmUid(uid);
    }

    @Override
    public List<ProjectList> findProListByUids(List<String> uids) {
        return projectDao.findProListByUids(uids);
    }

    @Override
    public List<ProjectList> findProListByUid(String uid) {
        return projectDao.findProListByUid(uid);
    }


}

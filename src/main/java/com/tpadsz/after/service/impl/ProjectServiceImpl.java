package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.ProjectDao;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.service.ProjectService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by chenhao.lu on 2019/4/8.
 */

@Service("projectService")
public class ProjectServiceImpl implements ProjectService {
    @Resource
    private ProjectDao projectDao;

    @Override
    public List<ProjectList> searchBySuper(String account, String uname, String projectName, String coname, String
            startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate, String sortFlag) {
        return projectDao.searchBySuper(account, uname, projectName,coname, startCreateDate, endCreateDate, startUpdateDate,
                endUpdateDate, sortFlag);
    }

    @Override
    public List<ProjectList> searchByManager(String account, String uname, String projectName, String coname, String
            startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate, List<Integer> ids, String sortFlag) {
        return projectDao.searchByManager(account, uname, projectName,coname, startCreateDate, endCreateDate, startUpdateDate,
                endUpdateDate, ids, sortFlag);
    }

    @Override
    public List<Integer> findProjectList(String uid) {
        return projectDao.findProjectList(uid);
    }

    @Override
    public List<ProjectList> searchByUser(String account, String uname, String projectName, String coname, String
            startCreateDate, String
            endCreateDate, String startUpdateDate, String endUpdateDate, String uid, String sortFlag) {
        return projectDao.searchByUser(account, uname, projectName,coname, startCreateDate, endCreateDate, startUpdateDate,
                endUpdateDate, uid, sortFlag);
    }

    @Override
    public int createProject(String projectName, User user) {
        int flag;
        int count = projectDao.findRepeatNameByAccount(user.getAccount(), projectName);
        if (count == 1) {
            flag = 0;
        } else {
            projectDao.createProject(projectName, user.getId());
            flag = 1;
        }
        return flag;
    }

    @Override
    public int renameProject(String account, Integer projectId, String projectName) {
        int flag;
        int count = projectDao.findRepeatNameByAccount(account, projectName);
        if (count == 1) {
            flag = 0;
        } else {
            projectDao.renameProject(projectId, projectName);
            flag = 1;
        }
        return flag;
    }

    @Override
    public void transferProject(int id, String uid) {
        projectDao.transferProject(id, uid);
    }

    @Override
    public void delete(String uid, Integer projectId) {
        List<Integer> sids = projectDao.querySidByPid(projectId, uid);
        if (sids.size() != 0) {
            projectDao.deleteSceneByPid(projectId, uid);
            projectDao.deleteLightSettingBySid(sids);
        }
        projectDao.deleteGroupByPid(projectId, uid);
        projectDao.deleteProByPid(projectId, uid);
        projectDao.deleteLightByPid(projectId, uid);
        projectDao.deleteMeshByPid(projectId, uid);
    }

    @Override
    public int findPlaceNum(Integer projectId) {
        return projectDao.findPlaceNum(projectId);
    }

    @Override
    public int findGroupNum(Integer projectId) {
        return projectDao.findGroupNum(projectId);
    }

    @Override
    public int findLightNum(Integer projectId) {
        return projectDao.findLightNum(projectId);
    }

    @Override
    public List<ProjectList> findNumAndUid(Integer projectId) {
        return projectDao.findNumAndUid(projectId);
    }

    @Override
    public ProjectList findAccountAndConame(String uid) {
        return projectDao.findAccountAndConame(uid);
    }

    @Override
    public int findProjectByProjectId(int id) {
        return projectDao.findProjectByProjectId(id);
    }

    @Override
    public List<Map> selectByPid(List<String> list) {
        return projectDao.selectByPid(list);
    }

    @Override
    public int findLightByPid(int id, String uid) {
        return projectDao.findLightByPid(id,uid);
    }


}

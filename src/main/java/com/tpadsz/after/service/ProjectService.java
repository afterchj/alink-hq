package com.tpadsz.after.service;

import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.User;

import java.util.List;
import java.util.Map;

/**
 * Created by chenhao.lu on 2019/4/8.
 */
public interface ProjectService {

    List<ProjectList> searchBySuper(String account, String uname, String projectName,String coname, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate,String sortFlag);

    List<ProjectList> searchByManager(String account, String uname, String projectName,String coname, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate,List<Integer> ids,String sortFlag);

    List<Integer> findProjectList(String uid);

    List<ProjectList> searchByUser(String account, String uname, String projectName,String coname, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate, String uid,String sortFlag);

    int createProject(String projectName, User user);

    int renameProject(String account,Integer projectId, String projectName);

    void transferProject(int id, String uid);

    void delete(String uid,Integer projectId);

    int findPlaceNum(Integer projectId);

    int findGroupNum(Integer projectId);

    int findLightNum(Integer projectId);

    List<ProjectList> findNumAndUid(Integer projectId);

    ProjectList findAccountAndConame(String uid);

    int findProjectByProjectId(int id);

    List<Map> selectByPid(List<String> list);
}

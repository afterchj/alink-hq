package com.tpadsz.after.service;

import com.tpadsz.after.entity.ProjectList;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/8.
 */
public interface ProjectService {

    List<ProjectList> search(String projectName, String account, String create_date, String update_date);

    List<ProjectList> searchBySuper(String account, String projectName, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate,String sortFlag);

    List<ProjectList> searchByManager(String account, String projectName, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate,List<Integer> ids,String sortFlag);

    List<Integer> findProjectList(String uid);

    List<ProjectList> searchByUser(String account, String projectName, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate, String uid,String sortFlag);

    void createProject(String projectName, String uid);

    void renameProject(String projectId, String projectName);
}

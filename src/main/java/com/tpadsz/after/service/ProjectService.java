package com.tpadsz.after.service;

import com.tpadsz.after.entity.ProjectList;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/8.
 */
public interface ProjectService {

    List<ProjectList> findProList();

    List<ProjectList> search(String projectName, String account, String create_date, String update_date);

    List<ProjectList> findProListByUids(List<String> uids);

    List<ProjectList> findProListByUid(String uid);

    List<ProjectList> searchBySuper(String account, String projectName, String startCreateDate, String endCreateDate, String
            startUpdateDate, String endUpdateDate);

    List<ProjectList> searchByManager(List<String> uids);

    List<ProjectList> searchByUser(String uid);
}

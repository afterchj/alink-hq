package com.tpadsz.after.dao;

import com.tpadsz.after.entity.ProjectList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/8.
 */
public interface ProjectDao {

    List<ProjectList> findProList();

    List<ProjectList> search(@Param("projectName") String projectName);

    List<ProjectList> findProListByUids(List<String> uids);

    List<ProjectList> findProListByUid(@Param("uid") String uid);

    List<ProjectList> searchBySuper(@Param("account")String account, @Param("projectName")String projectName, @Param("startCreateDate")String startCreateDate, @Param("endCreateDate")String endCreateDate, @Param("startUpdateDate")String
            startUpdateDate, @Param("endUpdateDate")String endUpdateDate);

    List<ProjectList> searchByManager();

    List<ProjectList> searchByUser();
}

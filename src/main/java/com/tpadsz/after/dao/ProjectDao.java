package com.tpadsz.after.dao;

import com.tpadsz.after.entity.ProjectList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/8.
 */
public interface ProjectDao {

    List<ProjectList> search(@Param("projectName") String projectName);

    List<ProjectList> searchBySuper(@Param("account") String account, @Param("name") String projectName, @Param("startCreateDate") String startCreateDate, @Param("endCreateDate") String endCreateDate, @Param("startUpdateDate") String startUpdateDate, @Param("endUpdateDate") String endUpdateDate);

    List<Integer> findProjectList(@Param("uid") String uid);

    List<ProjectList> searchByManager(@Param("account") String account, @Param("name") String projectName, @Param("startCreateDate") String startCreateDate, @Param("endCreateDate") String endCreateDate, @Param("startUpdateDate") String startUpdateDate, @Param("endUpdateDate") String endUpdateDate, @Param("list")List<Integer> ids);


    List<ProjectList> searchByUser(@Param("account")String account, @Param("name")String projectName, @Param("startCreateDate")String startCreateDate, @Param("endCreateDate")String endCreateDate, @Param("startUpdateDate")String
            startUpdateDate, @Param("endUpdateDate")String endUpdateDate, @Param("uid")String uid);
}

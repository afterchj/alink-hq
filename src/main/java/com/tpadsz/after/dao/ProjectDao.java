package com.tpadsz.after.dao;

import com.tpadsz.after.entity.ProjectList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/8.
 */
public interface ProjectDao {

    List<ProjectList> searchBySuper(@Param("account") String account, @Param("uname") String uname, @Param("name")
            String projectName,@Param("coname") String coname, @Param("startCreateDate") String startCreateDate, @Param("endCreateDate") String
            endCreateDate, @Param("startUpdateDate") String startUpdateDate, @Param("endUpdateDate") String
            endUpdateDate, @Param("sortFlag") String sortFlag);

    List<Integer> findProjectList(@Param("uid") String uid);

    List<ProjectList> searchByManager(@Param("account") String account, @Param("uname") String uname, @Param("name")
            String projectName,@Param("coname") String coname, @Param("startCreateDate") String startCreateDate, @Param("endCreateDate") String
            endCreateDate, @Param("startUpdateDate") String startUpdateDate, @Param("endUpdateDate") String
            endUpdateDate, @Param("list") List<Integer> ids, @Param("sortFlag") String sortFlag);


    List<ProjectList> searchByUser(@Param("account") String account, @Param("uname") String uname, @Param("name")
            String projectName, @Param("coname") String coname,@Param("startCreateDate") String startCreateDate, @Param("endCreateDate") String
            endCreateDate, @Param("startUpdateDate") String
            startUpdateDate, @Param("endUpdateDate") String endUpdateDate, @Param("uid") String uid, @Param
            ("sortFlag") String sortFlag);

    void createProject(@Param("name") String projectName, @Param("uid") String uid);

    void renameProject(@Param("projectId") Integer projectId, @Param("name") String projectName);

    void transferProject(@Param("id") int id, @Param("uid") String uid);

    int findRepeatNameByAccount(@Param("account") String account, @Param("name") String projectName);

    List<Integer> querySidByPid(@Param("id") Integer projectId, @Param("uid") String uid);

    void deleteSceneByPid(@Param("id") Integer projectId, @Param("uid") String uid);

    void deleteLightSettingBySid(List<Integer> sids);

    void deleteGroupByPid(@Param("id") Integer projectId, @Param("uid") String uid);

    void deleteProByPid(@Param("id") Integer projectId, @Param("uid") String uid);

    void deleteLightByPid(@Param("id") Integer projectId, @Param("uid") String uid);

    void deleteMeshByPid(@Param("id") Integer projectId, @Param("uid") String uid);

    int findPlaceNum(@Param("id") Integer projectId);

    int findGroupNum(@Param("id") Integer projectId);

    int findLightNum(@Param("id") Integer projectId);

    List<ProjectList> findNumAndUid(@Param("id") Integer projectId);

    ProjectList findAccountAndConame(@Param("uid") String uid);

    int findProjectByProjectId(@Param("id") int id);

}

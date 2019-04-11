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

    Integer findRoleIdByUid(@Param("uid") String uid);

    List<String> findFirmUid(@Param("uid") String uid);

    List<ProjectList> findProListByUids(List<String> uids);

    List<ProjectList> findProListByUid(@Param("uid") String uid);
}

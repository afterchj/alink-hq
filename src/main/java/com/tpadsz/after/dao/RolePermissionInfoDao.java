package com.tpadsz.after.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-20 15:12
 **/

public interface RolePermissionInfoDao {

    void authorization(@Param("permission") String permission, @Param("role_id") String roleId);

    void deleteRolePermission(@Param("role_id") String roleId);

    String getRoleName(@Param("rid") String rid);

    List<Map<String,String>> getUsers(@Param("account") String account);

    List<Map<String,String>> getRolePermissions(@Param("account") String account);

    List<Map<String, String>> getPermissionsByRid(@Param("rid") String rid);
}

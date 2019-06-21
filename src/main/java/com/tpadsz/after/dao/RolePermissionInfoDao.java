package com.tpadsz.after.dao;

import org.apache.ibatis.annotations.Param;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-20 15:12
 **/

public interface RolePermissionInfoDao {

    void authorization(@Param("permission") String permission, @Param("role_id") String roleId);

    void deleteRolePermission(@Param("role_id") String roleId);
}

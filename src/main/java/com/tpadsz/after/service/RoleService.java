package com.tpadsz.after.service;

import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.RoleList;

import java.util.List;

public interface RoleService {

	List<Role> getAll();
	//根据角色名获取id
	Integer getIdByRoleName(String roleName);

	String selectById(String uid);

	List<RoleList> selectRoleList(Integer roleId,String roleName);

    int rename(String roleName, Integer roleId);

    void delete(Integer roleId);
}

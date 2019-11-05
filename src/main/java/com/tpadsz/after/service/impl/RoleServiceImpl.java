package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.RoleDao;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.RoleList;
import com.tpadsz.after.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleDao roleDao;

	@Override
	public List<Role> getAll() {
		return roleDao.getAll();
	}

	@Override
	public Integer getIdByRoleName(String roleName) {
		return roleDao.selectIdByName(roleName);
	}

	@Override
	public String selectById(String uid) {
		return roleDao.selectById(uid);
	}

	@Override
	public List<RoleList> selectRoleList(Integer roleId,String roleName) {
		return roleDao.selectRoleList(roleId,roleName);
	}

	@Override
	public int rename(String roleName, Integer roleId) {
		int flag;
		int count = roleDao.findRepeatName(roleName);
		if (count == 1) {
			flag = 0;
		} else {
			roleDao.rename(roleId, roleName);
			flag = 1;
		}
		return flag;
	}

	@Override
	public void delete(Integer roleId) {
		roleDao.delete(roleId);
	}

	@Override
	public List<Integer> findViewPermission(Integer role_id) {
		return roleDao.findViewPermission(role_id);
	}

}

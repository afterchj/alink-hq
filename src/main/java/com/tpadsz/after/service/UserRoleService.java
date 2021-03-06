package com.tpadsz.after.service;


import com.tpadsz.after.entity.UserRole;

/**
 * @author losho
 * @date 2017年1月10日
 */
public interface UserRoleService {

	UserRole selectByUserId(Integer userId);
	
	void insert(UserRole record);
	
	void deleteById(Integer id);
	
}

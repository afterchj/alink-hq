package com.tpadsz.after.dao;


import com.tpadsz.after.entity.UserRole;

/**
 * @author losho
 * @date 2017年1月9日
 */
public interface UserRoleDao {
	
	void deleteById(Integer id);
	
	void insert(UserRole record);
	
	int insertSelective(UserRole record);
	
	UserRole selectById(Integer id);
	
	UserRole selectByUserId(Integer userId);
	
	int updateByIdSelective(UserRole record);
	
	int updateById(UserRole record);
	
}

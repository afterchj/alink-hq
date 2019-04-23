package com.tpadsz.after.dao;


import com.tpadsz.after.entity.Role;

import java.util.List;

public interface RoleDao {

    List<Role> getAll();

    int selectIdByName(String roleName);

    int deleteById(Integer id);

    int insert(Role record);

    int insertSelective(Role record);

    String selectById(Integer uid);

    int updateByIdSelective(Role record);

    int updateById(Role record);


}

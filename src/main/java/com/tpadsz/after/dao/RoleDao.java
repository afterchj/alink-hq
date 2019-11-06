package com.tpadsz.after.dao;


import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.RoleList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleDao {

    List<Role> getAll();

    int selectIdByName(String roleName);

    int deleteById(Integer id);

    int insert(Role record);

    int insertSelective(Role record);

    String selectById(String uid);

    int updateByIdSelective(Role record);

    int updateById(Role record);

    List<RoleList> selectRoleList(@Param("roleId")Integer roleId,@Param("roleName")String roleName);

    int findRepeatName(@Param("roleName")String roleName);

    void rename(@Param("roleId")Integer roleId, @Param("roleName")String roleName);

    void delete(@Param("roleId")Integer roleId);

    List<Integer> findViewPermission(@Param("roleId")Integer role_id);
}

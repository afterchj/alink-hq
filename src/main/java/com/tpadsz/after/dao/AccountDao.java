package com.tpadsz.after.dao;

import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.UserList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public interface AccountDao {


    List<UserList> findUserListByAdmin();

    List<UserList> findUserListByManager(List<String> uids);

    List<Firm> findFirmList();

    List<Role> findRoleList();

    List<UserList> searchByAdmin(@Param("account")String account,@Param("fid")Integer fid,@Param("roleId")Integer roleId,@Param("startDate")String startDate,@Param("endDate")String endDate);


    List<UserList> searchByManager(@Param("account")String account,@Param("list")List<String> uids,@Param("roleId")Integer roleId,@Param("startDate")String startDate,@Param("endDate")String endDate);
}

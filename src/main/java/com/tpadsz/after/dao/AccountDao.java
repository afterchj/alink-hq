package com.tpadsz.after.dao;

import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.UserList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public interface AccountDao {

    Integer findRoleIdByUid(@Param("uid") String uid);

    List<UserList> findUserListBySuper();

    List<UserList> findUserListByAdmin();

    List<UserList> findUserListByManager(List<String> uids);

    List<Firm> findFirmList();

    List<Role> findRoleList();

    List<UserList> searchBySuper(@Param("account")String account,@Param("fid")Integer fid,@Param("roleId")Integer roleId,@Param("startDate")String startDate,@Param("endDate")String endDate);

    List<UserList> searchByAdmin(@Param("account")String account, @Param("fid")Integer fid, @Param("roleId")Integer roleId, @Param("startDate")String startDate, @Param("endDate")String endDate);

    List<UserList> searchByManager(@Param("account")String account,@Param("list")List<String> uids,@Param("startDate")String startDate,@Param("endDate")String endDate);

    List<String> findFirmUid(@Param("uid") String uid);

    List<String> findFirmUidOfUser(@Param("uid") String uid);

    int createAccount(User user);

    void createFirmInfo(@Param("uid")Integer uid,@Param("fid")Integer fid);

    void createRoleInfo(@Param("uid")Integer uid, @Param("roleId")Integer roleId);

    void generateDefaultNetwork(@Param("uid")String uid);

    User findByAccount(@Param("account")String account);

    void updateAccount(@Param("pwd")String password, @Param("salt")String salt,@Param("account")String account);

    void transferAccount(@Param("uid")String uid, @Param("fid")Integer fid);

    void updateTransferedAccount(@Param("pwd")String password, @Param("salt")String salt, @Param("uid")String uid);

    void delete(@Param("uid")String uid);

    void enable(@Param("uid")String uid,@Param("status")Integer status);

    List<Firm> findFirmByUid(@Param("uid")String uid);
}

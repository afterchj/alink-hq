package com.tpadsz.after.dao;

import com.tpadsz.after.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public interface AccountDao {

    Integer findRoleIdByUid(@Param("uid") String uid);

    List<Firm> findFirmList();

    List<Role> findRoleList();

    List<UserList> searchBySuper(@Param("account")String account,@Param("uname")String uname,@Param("fid")Integer fid,@Param("roleId")Integer roleId,@Param("startDate")String startDate,@Param("endDate")String endDate);

    List<UserList> searchByAdmin(@Param("account")String account, @Param("uname")String uname,@Param("fid")Integer fid, @Param("roleId")Integer roleId, @Param("startDate")String startDate, @Param("endDate")String endDate);

    List<UserList> searchByManager(@Param("account")String account,@Param("uname")String uname, @Param("fid")Integer fid, @Param("roleId")Integer roleId, @Param("list")List<String> uids,@Param("startDate")String startDate,@Param("endDate")String endDate);

    List<String> findFirmUidOfUser(@Param("uid") String uid);

    int createAccount(User user);

    void createFirmInfo(@Param("uid")Integer uid,@Param("fid")Integer fid);

    void createRoleInfo(@Param("uid")Integer uid, @Param("roleId")Integer roleId);

    void generateDefaultNetwork(MeshInfo meshInfo);

    User findByAccount(@Param("account")String account);

    void updateAccount(@Param("pwd")String password, @Param("salt")String salt,@Param("account")String account);

    void transferAccount(@Param("account")String account, @Param("fid")Integer fid);

    void updateTransferedAccount(@Param("pwd")String password, @Param("salt")String salt, @Param("account")String account);

    void delete(@Param("uid")String uid);

    int enable(User user);

    List<Firm> findFirmByUid(@Param("uid")String uid);

    int findProjectByUid(@Param("uid")String uid);

    Integer findFirmUid(@Param("uid")String uid, @Param("userId")String userId);

    List<User> findAccountByFid(@Param("fid")Integer fid);

    void createDefaultPlace(SceneList sceneList);

    int findDefaultNetworkByUid(@Param("uid")String uid);

    void saveMemo(@Param("account") String account, @Param("memo") String content);

    void createDefaultGroup(SceneList sceneList);

    List<ProjectList> findAssociateProjectsList(@Param("uid")String uid);

    void unassociated(@Param("uid")String uid,@Param("list")List<String> list);

    void resetUserProject(@Param("uid")String uid);

    List<String> findAccountsOfCooperateFirms(@Param("firms")List<Firm> firms);

    List<Firm> findCooperateFirms(@Param("uid")String uid);
}

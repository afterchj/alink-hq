package com.tpadsz.after.service;

import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.UserList;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public interface AccountService {

    Integer findRoleIdByUid(String uid);

    List<UserList> findUserListBySuper();

    List<UserList> findUserListByAdmin();

    List<UserList> findUserListByManager(List<String> uids);

    List<Firm> findFirmList();

    List<Role> findRoleList();

    List<UserList> searchBySuper(String account,Integer fid,Integer roleId,String startDate,String endDate);

    List<UserList> searchByAdmin(String account, Integer fid, Integer roleId, String startDate, String endDate);

    List<UserList> searchByManager(String account, List<String> uids, String startDate, String endDate);

    List<String> findFirmUidOfUser(String uid);

    List<String> findFirmUid(String uid);

    void createAccount(User user,Integer fid, Integer roleId);

    User findByAccount(String account);
}

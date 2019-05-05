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

    List<Firm> findFirmList();

    List<Role> findRoleList();

    List<Firm> findFirmByUid(String uid);

    List<UserList> searchBySuper(String account,Integer fid,Integer roleId,String startDate,String endDate);

    List<UserList> searchByAdmin(String account, Integer fid, Integer roleId, String startDate, String endDate);

    List<UserList> searchByManager(String account, List<String> uids, String startDate, String endDate);

    List<String> findFirmUidOfUser(String uid);

    void createAccount(User user,Integer fid, Integer roleId);

    User findByAccount(String account);

    void updateAccount(String account, String randomPwd);

    void transferAccount(String account, Integer fid, String randomPwd);

    int delete(String account);

    void enable(User user);

    Integer findFirmUid(String uid, String userId);

    List<User> findAccountByFid(Integer fid);
}

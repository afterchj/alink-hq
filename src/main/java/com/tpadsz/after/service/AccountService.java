package com.tpadsz.after.service;

import com.tpadsz.after.entity.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public interface AccountService {

    Integer findRoleIdByUid(String uid);

    List<Firm> findFirmList();

    List<Role> findRoleList();

    List<Firm> findFirmByUid(String uid);

    List<UserList> searchBySuper(String account,String uname,Integer fid,Integer roleId,String startDate,String endDate);

    List<UserList> searchByAdmin(String account,String uname, Integer fid, Integer roleId, String startDate, String endDate);

    List<UserList> searchByManager(String account,String uname, List<String> uids, String startDate, String endDate);

    List<String> findFirmUidOfUser(String uid);

    void createAccount(User user,Integer fid, Integer roleId);

    User findByAccount(String account);

    void updateAccount(String account, String randomPwd);

    void transferAccount(String account, Integer fid, String randomPwd);

    int delete(String uid);

    void enable(User user);

    Integer findFirmUid(String uid, String userId);

    List<User> findAccountByFid(Integer fid);

    void saveMemo(String account, String content);

    List<ProjectList> findAssociateProjectsList(String uid);

    void unassociated(String uid,List<String> list);

    void resetUserProject(String uid);

    List<DownloadExcelData> setDownloadExcelData(HttpSession session, String account, String uname, Integer fid, Integer roleId, String startDate, String endDate);

    List<String> findAccountsOfCooperateFirms(String uid);
}

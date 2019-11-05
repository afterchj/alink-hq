package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.AccountDao;
import com.tpadsz.after.entity.*;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.utils.Encryption;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */

@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Resource
    private AccountDao accountDao;


    @Override
    public Integer findRoleIdByUid(String uid) {
        return accountDao.findRoleIdByUid(uid);
    }

    @Override
    public List<Firm> findFirmList() {
        return accountDao.findFirmList();
    }

    @Override
    public List<Role> findRoleList() {
        return accountDao.findRoleList();
    }

    @Override
    public List<Firm> findFirmByUid(String uid) {
        return accountDao.findFirmByUid(uid);
    }

    @Override
    public List<UserList> searchBySuper(String account, String uname,Integer fid, Integer roleId, String startDate, String endDate) {
        return accountDao.searchBySuper(account, uname,fid, roleId, startDate, endDate);
    }

    @Override
    public List<UserList> searchByAdmin(String account, String uname,Integer fid, Integer roleId, String startDate, String endDate) {
        return accountDao.searchByAdmin(account, uname,fid, roleId, startDate, endDate);
    }

    @Override
    public List<UserList> searchByManager(String account,String uname, Integer fid, Integer roleId, List<String> uids, String startDate, String
            endDate) {
        return accountDao.searchByManager(account, uname,fid,roleId,uids, startDate, endDate);
    }

    @Override
    public List<String> findFirmUidOfUser(String uid) {
        return accountDao.findFirmUidOfUser(uid);
    }

    @Override
    public void createAccount(User user, Integer fid, Integer roleId) {
        accountDao.createAccount(user);
        accountDao.createFirmInfo(Integer.parseInt(user.getId()), fid);
        accountDao.createRoleInfo(Integer.parseInt(user.getId()), roleId);
        int count = accountDao.findDefaultNetworkByUid(user.getId());
        if(count==0) {
            MeshInfo meshInfo = new MeshInfo();
            meshInfo.setMname("1122");
            meshInfo.setMesh_id(11223344);
            meshInfo.setPcount(Integer.parseInt(user.getId()));
            accountDao.generateDefaultNetwork(meshInfo);
            SceneList sceneList = new SceneList();
            sceneList.setUid(user.getId());
            sceneList.setMid(meshInfo.getId());
            accountDao.createDefaultPlace(sceneList);
            accountDao.createDefaultGroup(sceneList);
        }
    }

    @Override
    public User findByAccount(String account) {
        return accountDao.findByAccount(account);
    }

    @Override
    public void updateAccount(String account, String randomPwd) {
        Encryption.HashPassword password = Encryption.encrypt(Encryption.getMD5Str(randomPwd));
        accountDao.updateAccount(password.getPassword(), password.getSalt(), account);
    }

    @Override
    public void transferAccount(String account, Integer fid, String randomPwd) {
        accountDao.transferAccount(account, fid);
        Encryption.HashPassword password = Encryption.encrypt(Encryption.getMD5Str(randomPwd));
        accountDao.updateTransferedAccount(password.getPassword(), password.getSalt(), account);
    }

    @Override
    public int delete(String uid) {
        int count = accountDao.findProjectByUid(uid);
        if (count == 0) {
            accountDao.delete(uid);
        }
        return count;
    }

    @Override
    public void enable(User user) {
        accountDao.enable(user);
    }

    @Override
    public Integer findFirmUid(String uid, String userId) {
        return accountDao.findFirmUid(uid, userId);
    }

    @Override
    public List<User> findAccountByFid(Integer fid) {
        return accountDao.findAccountByFid(fid);
    }

    @Override
    public void saveMemo(String account, String content) {
        accountDao.saveMemo(account,content);
    }

    @Override
    public List<ProjectList> findAssociateProjectsList(String uid) {
        return accountDao.findAssociateProjectsList(uid);
    }

    @Override
    public void unassociated(String uid,List<String> list) {
        accountDao.unassociated(uid,list);
    }

    @Override
    public void resetUserProject(String uid) {
        accountDao.resetUserProject(uid);
    }

    public List<DownloadExcelData> setDownloadExcelData(HttpSession session, String account, String uname, Integer fid, Integer roleId, String startDate, String endDate) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        Integer role_id = accountDao.findRoleIdByUid(uid);
        List<UserList> userList = new ArrayList<>();
        if (role_id == 1) {
            userList = accountDao.searchBySuper(account, uname, fid, roleId, startDate, endDate);
        } else if (role_id == 2) {
            userList = accountDao.searchByAdmin(account, uname, fid, roleId, startDate, endDate);
        } else if (role_id == 3) {
            List<String> uids = accountDao.findFirmUidOfUser(uid);
            if (uids.size() != 0) {
                userList = accountDao.searchByManager(account, uname, fid, roleId, uids, startDate, endDate);
            }
        }
        List<DownloadExcelData> downloadExcelDatas = new ArrayList<>();
        DownloadExcelData downloadExcelData;
        if (userList.size() > 0) {
            for (UserList user : userList) {
                downloadExcelData = new DownloadExcelData();
                downloadExcelData.setAccount(user.getAccount());
                if (StringUtils.isNotBlank(user.getUname())) {
                    downloadExcelData.setUname(user.getUname());
                }
                if (StringUtils.isNotBlank(user.getMobile())) {
                    downloadExcelData.setMobile(user.getMobile());
                }
                if (StringUtils.isNotBlank(user.getEmail())) {
                    downloadExcelData.setEmail(user.getEmail());
                }
                if (StringUtils.isNotBlank(user.getConame())) {
                    downloadExcelData.setConame(user.getConame());
                }
                String otherRoleId = user.getRole_id();
                if (StringUtils.isNoneBlank(otherRoleId)) {
                    switch (otherRoleId) {
                        case "1":
                            downloadExcelData.setRole("超级管理员");
                            break;
                        case "2":
                            downloadExcelData.setRole("管理员");
                            break;
                        case "3":
                            downloadExcelData.setRole("乙方管理员");
                            break;
                        case "4":
                            downloadExcelData.setRole("施工人员");
                            break;
                        case "13":
                            downloadExcelData.setRole("固件管理员");
                            break;
                        case "14":
                            downloadExcelData.setRole("普通用户");
                            break;
                    }
                }
                if (StringUtils.isNotBlank(user.getCreate_date())) {
                    downloadExcelData.setCreate_date(user.getCreate_date());
                }
                if (StringUtils.isNotBlank(user.getStatus())) {
                    if ("1".equals(user.getStatus())) {
                        downloadExcelData.setStatus("启用");
                    } else {
                        downloadExcelData.setStatus("禁用");
                    }
                }
                downloadExcelDatas.add(downloadExcelData);
            }
        }
        return downloadExcelDatas;
    }

    @Override
    public List<String> findAccountsOfCooperateFirms(String uid) {
        List<Firm> firms = accountDao.findCooperateFirms(uid);
        return accountDao.findAccountsOfCooperateFirms(firms);
    }

    @Override
    public List<Firm> findCooperateFirms(String uid) {
        return accountDao.findCooperateFirms(uid);
    }
}

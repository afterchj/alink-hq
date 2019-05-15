package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.AccountDao;
import com.tpadsz.after.entity.*;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.utils.Encryption;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
    public List<UserList> searchBySuper(String account, Integer fid, Integer roleId, String startDate, String endDate) {
        return accountDao.searchBySuper(account, fid, roleId, startDate, endDate);
    }

    @Override
    public List<UserList> searchByAdmin(String account, Integer fid, Integer roleId, String startDate, String endDate) {
        return accountDao.searchByAdmin(account, fid, roleId, startDate, endDate);
    }

    @Override
    public List<UserList> searchByManager(String account, List<String> uids, String startDate, String
            endDate) {
        return accountDao.searchByManager(account, uids, startDate, endDate);
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
        MeshInfo meshInfo = new MeshInfo();
        meshInfo.setMname("1122");
        meshInfo.setMesh_id(11223344);
        meshInfo.setPcount(Integer.parseInt(user.getId()));
        int count = accountDao.findDefaultNetworkByUid(user.getId());
        if(count==0) {
            accountDao.generateDefaultNetwork(meshInfo);
            accountDao.createPlace(user.getId(),meshInfo.getId());
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


}

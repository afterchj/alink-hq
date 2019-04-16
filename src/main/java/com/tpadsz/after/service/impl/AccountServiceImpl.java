package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.AccountDao;
import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.UserList;
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
    public List<UserList> findUserListBySuper() {
        return accountDao.findUserListBySuper();
    }

    @Override
    public List<UserList> findUserListByAdmin() {
        return accountDao.findUserListByAdmin();
    }

    @Override
    public List<UserList> findUserListByManager(List<String> uids) {
        return accountDao.findUserListByManager(uids);
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
    public List<UserList> searchBySuper(String account,Integer fid,Integer roleId,String startDate,String endDate) {
        return accountDao.searchBySuper(account,fid,roleId,startDate,endDate);
    }

    @Override
    public List<UserList> searchByAdmin(String account, Integer fid, Integer roleId, String startDate, String endDate) {
        return accountDao.searchByAdmin(account,fid,roleId,startDate,endDate);
    }

    @Override
    public List<UserList> searchByManager(String account, List<String> uids,String startDate, String
            endDate) {
        return accountDao.searchByManager(account,uids,startDate,endDate);
    }

    @Override
    public List<String> findFirmUidOfUser(String uid) {
        return accountDao.findFirmUidOfUser(uid);
    }

    @Override
    public List<String> findFirmUid(String uid) {
        return accountDao.findFirmUid(uid);
    }

    @Override
    public void createAccount(User user,Integer fid, Integer roleId) {
        accountDao.createAccount(user);
        accountDao.createFirmInfo(Integer.parseInt(user.getId()),fid);
        accountDao.createRoleInfo(Integer.parseInt(user.getId()),roleId);
        accountDao.generateDefaultNetwork(user.getId());
    }

    @Override
    public User findByAccount(String account) {
        return accountDao.findByAccount(account);
    }

    @Override
    public void updateAccount(String account, String randomPwd) {
        Encryption.HashPassword password = Encryption.encrypt(Encryption.getMD5Str(randomPwd));
        accountDao.updateAccount(password.getPassword(),password.getSalt(),account);
    }

    @Override
    public void transferAccount(String uid, Integer fid, String randomPwd) {
        accountDao.transferAccount(uid,fid);
        Encryption.HashPassword password = Encryption.encrypt(Encryption.getMD5Str(randomPwd));
        accountDao.updateTransferedAccount(password.getPassword(),password.getSalt(),uid);
    }

    @Override
    public void delete(String uid) {
        accountDao.delete(uid);
    }

    @Override
    public void enable(String uid,Integer status) {
        accountDao.enable(uid,status);
    }


}

package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.AccountDao;
import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.UserList;
import com.tpadsz.after.service.AccountService;
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
    public List<UserList> searchByAdmin(String account,Integer fid,Integer roleId,String startDate,String endDate) {
        return accountDao.searchByAdmin(account,fid,roleId,startDate,endDate);
    }

    @Override
    public List<UserList> searchByManager(String account, List<String> uids, Integer roleId, String startDate, String
            endDate) {
        return accountDao.searchByManager(account,uids,roleId,startDate,endDate);
    }


}

package com.tpadsz.after.service;

import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.UserList;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public interface AccountService {


    List<UserList> findUserListByAdmin();

    List<UserList> findUserListByManager(List<String> uids);

    List<Firm> findFirmList();

    List<Role> findRoleList();

}

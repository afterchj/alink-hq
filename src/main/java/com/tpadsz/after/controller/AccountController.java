package com.tpadsz.after.controller;

import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.UserList;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.ProjectService;
import com.tpadsz.after.utils.GenerateUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/4/9.
 */

@Controller
@RequestMapping("/account")
public class AccountController {
    @Resource
    private AccountService accountService;

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public String list(String uid, Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Role> roleList = new ArrayList<>();
        List<Firm> firmList = new ArrayList<>();
        List<UserList> userList = new ArrayList<>();
        if (role_id == 1) {
            userList = accountService.findUserListBySuper();
            roleList = accountService.findRoleList();
            roleList.remove(0);
            firmList = accountService.findFirmList();
        } else if(role_id == 2){
            userList = accountService.findUserListByAdmin();
            roleList = accountService.findRoleList();
            for(int i=0;i<role_id;i++) {
                roleList.remove(0);
            }
            firmList = accountService.findFirmList();
        }else if (role_id == 3) {
            List<String> uids = accountService.findFirmUidOfUser(uid);
            uids.remove(uid);
            if (uids.size() != 0) {
                userList = accountService.findUserListByManager(uids);
            }
            roleList = accountService.findRoleList();
            for(int i=0;i<role_id;i++) {
                roleList.remove(0);
            }
        }
        return null;
    }


    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public void search(String uid, String account, Integer fid, Integer roleId, String startDate, String endDate,
                       Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<UserList> list = new ArrayList<>();
        if (role_id == 1) {
            list = accountService.searchBySuper(account, fid, roleId, startDate, endDate);
        } else if(role_id == 2){
            list = accountService.searchByAdmin(account, fid, roleId, startDate, endDate);
        } else if (role_id == 3) {
            List<String> uids = accountService.findFirmUidOfUser(uid);
            uids.remove(uid);
            if (uids.size() != 0) {
                list = accountService.searchByManager(account, uids, startDate, endDate);
            }
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public void create(String uid, Integer fid, Integer roleId, String num,
                       Model model) {
        List<UserList> list = new ArrayList<>();
        String account;


        do {
            account = GenerateUtils.getCharAndNumr(8);
        } while (!GenerateUtils.check(account));
        System.out.println(account);

    }


}

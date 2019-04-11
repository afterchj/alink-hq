package com.tpadsz.after.controller;

import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.UserList;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chenhao.lu on 2019/4/9.
 */

@Controller
@RequestMapping("/account")
public class AccountController {
    @Resource
    private AccountService accountService;

    @Resource
    private ProjectService projectService;

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public String list(String uid, Model model) {
        Integer role_id = projectService.findRoleIdByUid(uid);
        List<Role> roleList = new ArrayList<>();
        List<Firm> firmList = new ArrayList<>();
        List<UserList> userList = new ArrayList<>();
        if (role_id == 1) {
            userList = accountService.findUserListByAdmin();
            roleList = accountService.findRoleList();
            roleList.remove(0);
            firmList = accountService.findFirmList();
        } else if (role_id == 2) {
            List<String> uids = projectService.findFirmUid(uid);
            uids.remove(uid);
            if (uids.size() != 0) {
                userList = accountService.findUserListByManager(uids);
            }
            roleList = accountService.findRoleList();
            roleList.remove(0);
            roleList.remove(0);
        }

        return null;
    }


    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public void search(String uid, String account, Integer fid, Integer roleId, String startDate, String endDate,
                       Model model) {
        Integer role_id = projectService.findRoleIdByUid(uid);
        List<UserList> list = new ArrayList<>();
        if (role_id == 1) {
            list = accountService.searchByAdmin(account, fid, roleId, startDate, endDate);
        } else if (role_id == 2) {
            List<String> uids = projectService.findFirmUid(uid);
            uids.remove(uid);
            if (uids.size() != 0) {
                list = accountService.searchByManager(account, uids, roleId, startDate, endDate);
            }
        }
    }

}

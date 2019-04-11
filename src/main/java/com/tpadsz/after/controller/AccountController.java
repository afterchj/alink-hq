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

    @Resource
    private ProjectService projectService;

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public String list(String uid, Model model) {
        String roleId = projectService.findRoleIdByUid(uid);
        List<UserList> userList = new ArrayList<>();
        if("1".equals(roleId)){
            userList = accountService.findUserListByAdmin();
        }else if("2".equals(roleId)){
            List<String> uids = projectService.findFirmUid(uid);
            uids.remove(uid);
            if(uids.size()!=0) {
                userList = accountService.findUserListByManager(uids);
            }
        }
        List<Firm> firmList = accountService.findFirmList();
        List<Role> roleList = accountService.findRoleList();
        return null;
    }


    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public String search(String account,String fid,String roleId,String startTime,String endTime, Model model) {
        List<UserList> list = new ArrayList<>();

        return null;
    }

}

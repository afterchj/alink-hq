package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.UserList;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.utils.GenerateUtils;
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

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(String uid,Integer pageNum,Integer pageSize,Model model) {
            if (pageNum == null) {
                pageNum = 1;   //设置默认当前页
            }
            if (pageNum <= 0) {
                pageNum = 1;
            }
        if(pageSize == null){
            pageSize = 10;    //设置默认每页显示的数据数
        }
        try {
            Integer role_id = accountService.findRoleIdByUid(uid);
            List<Role> roleList = new ArrayList<>();
            List<Firm> firmList = new ArrayList<>();
            List<UserList> userList = new ArrayList<>();
            if (role_id == 1) {
                PageHelper.startPage(pageNum, pageSize);
                userList = accountService.findUserListBySuper();
                roleList = accountService.findRoleList();
                roleList.remove(0);
                firmList = accountService.findFirmList();
            } else if (role_id == 2) {
                PageHelper.startPage(pageNum, pageSize);
                userList = accountService.findUserListByAdmin();
                roleList = accountService.findRoleList();
                for (int i = 0; i < role_id; i++) {
                    roleList.remove(0);
                }
                firmList = accountService.findFirmList();
            } else if (role_id == 3) {
                List<String> uids = accountService.findFirmUidOfUser(uid);
                uids.remove(uid);
                if (uids.size() != 0) {
                    PageHelper.startPage(pageNum, pageSize);
                    userList = accountService.findUserListByManager(uids);
                }
                roleList = accountService.findRoleList();
                for (int i = 0; i < role_id; i++) {
                    roleList.remove(0);
                }
            }
            PageInfo<UserList> pageInfo = new PageInfo<UserList>(userList, pageSize);
            model.addAttribute("pageInfo", pageInfo);
            model.addAttribute("firmList", firmList);
            model.addAttribute("roleList", roleList);
        }catch (Exception e){

        }
        return "userManage/useList";
    }


    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public void search(String uid, String account, Integer fid, Integer roleId, String startDate, String endDate,
                       Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<UserList> list = new ArrayList<>();
        if (role_id == 1) {
            list = accountService.searchBySuper(account, fid, roleId, startDate, endDate);
        } else if (role_id == 2) {
            list = accountService.searchByAdmin(account, fid, roleId, startDate, endDate);
        } else if (role_id == 3) {
            List<String> uids = accountService.findFirmUidOfUser(uid);
            uids.remove(uid);
            if (uids.size() != 0) {
                list = accountService.searchByManager(account, uids, startDate, endDate);
            }
        }
    }

    @RequestMapping(value = "/createAccount", method = RequestMethod.GET)
    public String createAccount(String uid,
                              Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Role> roleList = new ArrayList<>();
        List<Firm> firmList = new ArrayList<>();
        if (role_id == 1) {
            firmList = accountService.findFirmList();
        }else if(role_id==2){
            firmList = accountService.findFirmList();
        }else if(role_id==3){
            firmList = accountService.findFirmByUid(uid);
        }
        model.addAttribute("firmList", firmList);
        return "userManage/createAccount";

    }


    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public void create(Integer fid, Integer roleId, Integer num,
                       Model model) {
        String account;
        for (int i = 0; i < num; i++) {
            User user = new User();
            User user2 = new User();
            do {
                account = GenerateUtils.getCharAndNumr(8);
                user2 = accountService.findByAccount(account);
            } while (!GenerateUtils.check(account) || (user2 != null));
            user.setAccount(account);
            user.setPwd("dc10cc20d435f846425f1f7a31b5d293cb39e590");
            user.setSalt("0e9cc6f31100af96");
            accountService.createAccount(user, fid, roleId);
        }
    }

    @RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
    @ResponseBody
    public void resetPwd(String account, Model model) {
        String randomPwd = GenerateUtils.randomPwd();
        accountService.updateAccount(account, randomPwd);
    }


    @RequestMapping(value = "/transferPage", method = RequestMethod.GET)
    public String transferPage(String uid, Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Firm> firmList = new ArrayList<>();
        if (role_id == 1) {
            firmList = accountService.findFirmList();
        }else if(role_id==2){
            firmList = accountService.findFirmList();
        }else if(role_id==3){
            firmList = accountService.findFirmByUid(uid);
        }
        model.addAttribute("firmList", firmList);
        return "userManage/useTurnOver";
    }

    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> transfer(String uid, Integer fid, Model model) {
        Map<String,String> map = new HashMap<>();
        String randomPwd = GenerateUtils.randomPwd();
        String info;
        try {
            accountService.transferAccount(uid, fid, randomPwd);
            info="移交账号成功";
        }catch (Exception e){
            info="移交账号失败";
        }
        map.put("result",info);
        return map;
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public void delete(String uid, Model model) {
        accountService.delete(uid);
    }

    @RequestMapping(value = "/enable", method = RequestMethod.POST)
    @ResponseBody
    public void enable(String uid,Integer status, Model model) {
        accountService.enable(uid,status);
    }


}

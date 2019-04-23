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
    public String list(String uid, Integer pageNum, Integer pageSize, String account, Integer fid, Integer roleId,
                       String startDate, String endDate,Model model) {
        if (pageNum == null) {
            pageNum = 1;   //设置默认当前页
        }
        if (pageNum <= 0) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 10;    //设置默认每页显示的数据数
        }
        try {
            Integer role_id = accountService.findRoleIdByUid(uid);
            List<Role> roleList = new ArrayList<>();
            List<Firm> firmList = getFirmInfo(role_id, uid);
            List<UserList> userList = new ArrayList<>();
            if (role_id == 1) {
                PageHelper.startPage(pageNum, pageSize);
                userList = accountService.searchBySuper(account, fid, roleId, startDate, endDate);
                roleList = accountService.findRoleList();
                roleList.remove(0);
            } else if (role_id == 2) {
                PageHelper.startPage(pageNum, pageSize);
                userList = accountService.searchByAdmin(account, fid, roleId, startDate, endDate);
                roleList = accountService.findRoleList();
                for (int i = 0; i < role_id; i++) {
                    roleList.remove(0);
                }
            } else if (role_id == 3) {
                List<String> uids = accountService.findFirmUidOfUser(uid);
                uids.remove(uid);
                if (uids.size() != 0) {
                    PageHelper.startPage(pageNum, pageSize);
                    userList = accountService.searchByManager(account, uids, startDate, endDate);
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
            model.addAttribute("account", account);
            model.addAttribute("fid", fid);
            model.addAttribute("roleId", roleId);
            model.addAttribute("startDate", startDate);
            model.addAttribute("endDate", endDate);
        } catch (Exception e) {
        }
        return "userManage/useList";
    }

    @RequestMapping(value = "/createAccount", method = RequestMethod.GET)
    public String createAccount(String uid,
                                Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Firm> firmList = getFirmInfo(role_id, uid);
        model.addAttribute("firmList", firmList);
        return "userManage/createAccount";
    }


    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> create(Integer fid, Integer roleId, Integer num) {
        String account;
        Map<String, String> map = new HashMap<>();
        String info;
        try {
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
            info = "创建账号成功";
        } catch (Exception e) {
            info = "创建账号失败";
        }
        map.put("result", info);
        return map;
    }

    @RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> resetPwd(String account, Model model) {
        Map<String, String> map = new HashMap<>();
        String randomPwd = GenerateUtils.randomPwd();
        String info;
        try {
            accountService.updateAccount(account, randomPwd);
            info = "重置密码成功";
        } catch (Exception e) {
            info = "重置密码失败";
        }
        map.put("result", info);
        return map;
    }


    @RequestMapping(value = "/transferPage", method = RequestMethod.GET)
    public String transferPage(String uid, Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Firm> firmList = getFirmInfo(role_id, uid);
        model.addAttribute("firmList", firmList);
        return "userManage/useTurnOver";
    }


    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> transfer(String uid, Integer fid) {
        Map<String, String> map = new HashMap<>();
        String randomPwd = GenerateUtils.randomPwd();
        String info;
        try {
            accountService.transferAccount(uid, fid, randomPwd);
            info = "移交账号成功";
        } catch (Exception e) {
            info = "移交账号失败";
        }
        map.put("result", info);
        return map;
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(String uid, Model model) {
        Map<String, String> map = new HashMap<>();
        String info;
        try {
            int count = accountService.delete(uid);
            if (count == 0) {
                info = "名下无项目，成功";
            } else {
                info = "名下有项目，跳转";
            }
        } catch (Exception e) {
            info = "删除账号失败";
        }
        map.put("result", info);
        return map;
    }

    @RequestMapping(value = "/enable", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> enable(String uid, Integer status, Model model) {
        Map<String, String> map = new HashMap<>();
        String info;
        try {
            accountService.enable(uid, status);
            info = "启/禁用账号成功";
        } catch (Exception e) {
            info = "启/禁用账号失败";
        }
        map.put("result", info);
        return map;
    }


    private List<Firm> getFirmInfo(Integer role_id, String uid) {
        List<Firm> firmList = new ArrayList<>();
        if (role_id == 1) {
            firmList = accountService.findFirmList();
        } else if (role_id == 2) {
            firmList = accountService.findFirmList();
        } else if (role_id == 3) {
            firmList = accountService.findFirmByUid(uid);
        }
        return firmList;
    }

}

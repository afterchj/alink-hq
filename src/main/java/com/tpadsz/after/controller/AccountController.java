package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.constants.MemcachedObjectType;
import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.Role;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.UserList;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.utils.GenerateUtils;
import net.rubyeye.xmemcached.MemcachedClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
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

    @Autowired
    private MemcachedClient client;


    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String account, Integer fid, Integer roleId, String
            startDate, String endDate, HttpSession session, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        if (pageNum == null) {
            pageNum = 1;   //设置默认当前页
        }
        if (pageNum <= 0) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 20;    //设置默认每页显示的数据数
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
            if (pageInfo.getList().size() > 0) {
                model.addAttribute("pageInfo", pageInfo);
            }
            model.addAttribute("firmList", firmList);
            model.addAttribute("roleList", roleList);
            model.addAttribute("account", account);
            model.addAttribute("fid", fid);
            model.addAttribute("roleId", roleId);
            model.addAttribute("startDate", startDate);
            model.addAttribute("endDate", endDate);
        } catch (Exception e) {
        }
        return "userManage/userList";
    }

    @RequestMapping(value = "/createAccount", method = RequestMethod.GET)
    public String createAccount(HttpSession session,
                                Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
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
        List<String> list = new ArrayList<>();
        if (fid == null || roleId == null || num == null || num > 100) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
            return map;
        }
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
                list.add(account);
            }
            map.put("result", ResultDict.SUCCESS.getCode());
            map.put("accountList", JSON.toJSONString(list));
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> resetPwd(String account) {
        Map<String, String> map = new HashMap<>();
        String randomPwd = GenerateUtils.randomPwd();
        try {
            accountService.updateAccount(account, randomPwd);
            map.put("result", ResultDict.SUCCESS.getCode());
            map.put("account", account);
            map.put("pwd", randomPwd);
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }


    @RequestMapping(value = "/transferPage", method = RequestMethod.GET)
    public String transferPage(HttpSession session, String account, String coname, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Firm> firmList = getFirmInfo(role_id, uid);
        model.addAttribute("firmList", firmList);
        model.addAttribute("account", account);
        model.addAttribute("coname", coname);
        return "userManage/userTurnOver";
    }


    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> transfer(HttpSession session, String account, Integer fid) {
        Map<String, String> map = new HashMap<>();
        String randomPwd = "";
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        try {
            Integer role_id1 = accountService.findRoleIdByUid(uid);
            User user = accountService.findByAccount(account);
            Integer role_id2 = accountService.findRoleIdByUid(user.getId());
            if (role_id1 < 3 && role_id1 < role_id2) {
                randomPwd = GenerateUtils.randomPwd();
                accountService.transferAccount(account, fid, randomPwd);
                map.put("account", account);
            } else if (role_id1 == 3) {
                randomPwd = GenerateUtils.randomPwd();
                List<String> uids = accountService.findFirmUidOfUser(uid);
                if (uids.contains(user.getId())) {
                    accountService.transferAccount(account, fid, randomPwd);
                    map.put("account", account);
                }
            }
            map.put("result", ResultDict.SUCCESS.getCode());
            map.put("pwd", randomPwd);
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(String account) {
        Map<String, String> map = new HashMap<>();
        try {
            int count = accountService.delete(account);
            if (count == 0) {
                map.put("result", ResultDict.SUCCESS.getCode());
            } else {
                map.put("result", ResultDict.PROJECT_EXISTED.getCode());
            }
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/enable", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> enable(String account, Integer status) {
        Map<String, String> map = new HashMap<>();
        User user = new User();
        user.setAccount(account);
        user.setStatus(status);
        try {
            accountService.enable(user);
            if (status == 1) {
                String key = MemcachedObjectType.CACHE_TOKEN.getPrefix() + user.getId();
                client.set(key, 0, "disabled");
            }
            map.put("result", ResultDict.SUCCESS.getCode());
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }


    private List<Firm> getFirmInfo(Integer role_id, String uid) {
        List<Firm> firmList = new ArrayList<>();
        if (role_id == 1 || role_id == 2) {
            firmList = accountService.findFirmList();
        } else if (role_id == 3) {
            firmList = accountService.findFirmByUid(uid);
        }
        return firmList;
    }

}

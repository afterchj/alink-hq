package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.ProjectService;
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
 * Created by chenhao.lu on 2019/4/8.
 */

@Controller
@RequestMapping("/project")
public class ProjectController {
    @Resource
    private ProjectService projectService;

    @Resource
    private AccountService accountService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String account, String projectName,
                       String startCreateDate, String endCreateDate, String startUpdateDate, String endUpdateDate,String sortFlag,HttpSession session, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
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
            List<ProjectList> list = new ArrayList<>();
            if (role_id == 1 || role_id == 2) {
                PageHelper.startPage(pageNum, pageSize);
                list = projectService.searchBySuper(account, projectName, startCreateDate, endCreateDate,
                        startUpdateDate, endUpdateDate,sortFlag);
            } else if (role_id == 3) {
                List<Integer> ids = projectService.findProjectList(uid);
                if (ids.size() != 0) {
                    PageHelper.startPage(pageNum, pageSize);
                    list = projectService.searchByManager(account, projectName, startCreateDate, endCreateDate,
                            startUpdateDate, endUpdateDate, ids,sortFlag);
                }
            } else if (role_id == 4) {
                PageHelper.startPage(pageNum, pageSize);
                list = projectService.searchByUser(account, projectName, startCreateDate, endCreateDate,
                        startUpdateDate, endUpdateDate, uid,sortFlag);
            }
            PageInfo<ProjectList> pageInfo = new PageInfo<>(list, pageSize);
            model.addAttribute("pageInfo", pageInfo);
            model.addAttribute("account", account);
            model.addAttribute("projectName", projectName);
            model.addAttribute("startCreateDate", startCreateDate);
            model.addAttribute("endCreateDate", endCreateDate);
            model.addAttribute("startUpdateDate", startUpdateDate);
            model.addAttribute("endUpdateDate", endUpdateDate);
        } catch (Exception e) {
        }
        return "projectManage/projectList";
    }

    @RequestMapping(value = "/createProject", method = RequestMethod.GET)
    public String createAccount(HttpSession session, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        Integer role_id = accountService.findRoleIdByUid(uid);
        if (role_id == 4) {
            model.addAttribute("account", loginUser.getAccount());
        }
        return "projectManage/createProject";
    }


    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> create(HttpSession session, String projectName, String account) {
        Map<String, String> map = new HashMap<>();
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        try {
            User user = accountService.findByAccount(account);
            if (user == null) {
                map.put("result", ResultDict.ACCOUNT_NOT_EXISTED.getCode());
                return map;
            }
            Integer role_id = accountService.findRoleIdByUid(uid);
            if (role_id == 3) {
                Integer firmUid = accountService.findFirmUid(uid, user.getId());
                if (firmUid == null) {
                    map.put("result", ResultDict.NOT_SAME_COMPANY.getCode());
                    return map;
                }
            }
            projectService.createProject(projectName, user.getId());
            map.put("result", ResultDict.SUCCESS.getCode());
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/rename", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> rename(String projectId, String projectName) {
        Map<String, String> map = new HashMap<>();
        try {
            projectService.renameProject(projectId, projectName);
            map.put("result", ResultDict.SUCCESS.getCode());
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/transferPage", method = RequestMethod.GET)
    public String transferPage(HttpSession session, String projectInfo, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        List<ProjectList> projectList = JSONArray.parseArray(projectInfo, ProjectList.class);
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<Firm> firmList = getFirmInfo(role_id, uid);
        model.addAttribute("projectList", projectList);
        model.addAttribute("firmList", firmList);
        return "userManage/useTurnOver";
    }

    @RequestMapping(value = "/findAccountByFid", method = RequestMethod.GET)
    public String findAccountByFid(Integer fid, Model model) {
        List<User> accounts = accountService.findAccountByFid(fid);
        model.addAttribute("accounts", accounts);
        return "userManage/useTurnOver";
    }


    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> transfer(String account, Integer fid) {
        Map<String, String> map = new HashMap<>();
        try {
//          accountService.transferAccount(account, fid);
            map.put("result", ResultDict.SUCCESS.getCode());
            map.put("account", account);
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

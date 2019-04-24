package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

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
                       String startCreateDate, String endCreateDate, String startUpdateDate, String endUpdateDate,
                       HttpSession session, Model model) {
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
                        startUpdateDate, endUpdateDate);
            } else if (role_id == 3) {
                List<Integer> ids = projectService.findProjectList(uid);
                if (ids.size() != 0) {
                    PageHelper.startPage(pageNum, pageSize);
                    list = projectService.searchByManager(account, projectName, startCreateDate, endCreateDate,
                            startUpdateDate, endUpdateDate,ids);
                }
            } else if (role_id == 4) {
                PageHelper.startPage(pageNum, pageSize);
                list = projectService.searchByUser(account, projectName, startCreateDate, endCreateDate,
                        startUpdateDate, endUpdateDate,uid);
            }
            PageInfo<ProjectList> pageInfo = new PageInfo<ProjectList>(list, pageSize);
            model.addAttribute("pageInfo", pageInfo);
        } catch (Exception e) {
        }
        return "projectManage/projectList";
    }

    @RequestMapping(value = "/createProject", method = RequestMethod.GET)
    public String createAccount(HttpSession session,
                                Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        Integer role_id = accountService.findRoleIdByUid(uid);
//        List<Firm> firmList = getFirmInfo(role_id, uid);
//        model.addAttribute("firmList", firmList);
        return "userManage/createAccount";
    }




}

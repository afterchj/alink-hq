package com.tpadsz.after.controller;

import com.tpadsz.after.entity.User;
import com.tpadsz.after.service.RolePermissionInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-19 15:03
 **/
@Controller()
@RequestMapping("role")
public class RolePermissionInfoController {

    @Resource
    private RolePermissionInfoService roleManageService;

    /**
     * 跳转到角色权限详情
     */
    @RequestMapping(value = "/showRolePermissionManage", method = RequestMethod.GET)
    public String showRolePermissionManage(HttpSession session, Model model){
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        List<String> permissions = roleManageService.getPermissions(account);
        model.addAttribute("permissions",permissions);
        return "showPermissionManage";
    }


    /**
     * 修改角色权限
     */
    @RequestMapping(value = "/updateRolePermission" ,method = RequestMethod.POST)
    @ResponseBody
    public void updateRolePermission(@RequestBody List<String> permissions){
//        permissions.stream().forEach(System.out::println);
        roleManageService.authorization(permissions);

    }

}

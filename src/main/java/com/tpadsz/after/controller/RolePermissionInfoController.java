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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-19 15:03
 **/
@Controller()
@RequestMapping("/rolePer")
public class RolePermissionInfoController {

    @Resource
    private RolePermissionInfoService roleManageService;

    /**
     * 跳转到角色权限详情
     */
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String roleDetail(String rid,HttpSession session, Model model){
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        List<String> permissions = roleManageService.getPermissions(account);
        String roleName = roleManageService.getRoleName(rid);
        List<Map<String,String>> users = roleManageService.getUsers(account);
        List<Map<String,String>> rolePermissions = roleManageService.getRolePermissions(account);
//        List<String> rolePermissionList = roleManageService.getPermissionsByRid(rid);//点击角色的权限
        List<Map<String,String>> rolePermissionList = roleManageService.getPermissionsByRid(rid);//点击角色的权限
        model.addAttribute("permissions",permissions);
        model.addAttribute("rid",rid);
        model.addAttribute("roleName",roleName);
        model.addAttribute("users",users);
        model.addAttribute("rolePermissions",rolePermissions);
        model.addAttribute("rolePermissionList",rolePermissionList);

        return "roleManage/roleDetail";
    }


    /**
     * 修改角色权限
     */
    @RequestMapping(value = "/updateRolePermission" ,method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> updateRolePermission(@RequestBody List<String> permissions){
//        permissions.stream().forEach(System.out::println);
        roleManageService.authorization(permissions);
        Map<String,String>  map = new HashMap<>();
        map.put("result","success");
        return map;
    }

    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public String show(){
        return "showPermissionManage";
    }

    @RequestMapping(value = "/showPermissionManage", method = RequestMethod.POST)
    @ResponseBody
    public String showPermissionManage(@RequestBody List<String> permissions){
        permissions.stream().forEach(System.out::println);
        return "showPermissionManage";
    }

}

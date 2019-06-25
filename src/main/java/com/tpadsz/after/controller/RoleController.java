package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.RoleList;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chenhao.lu on 2019/6/20.
 */

@Controller
@RequestMapping("/role")
public class RoleController {
    @Resource
    private RoleService roleService;

    @Resource
    private AccountService accountService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String roleName, HttpSession session, Model model) {
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
            if (role_id < 4) {
                PageHelper.startPage(pageNum, pageSize);
                List<RoleList> roleList = roleService.selectRoleList(role_id, roleName);
                PageInfo<RoleList> pageInfo = new PageInfo<>(roleList, pageSize);
                if (pageInfo.getList().size() > 0) {
                    model.addAttribute("pageInfo", pageInfo);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "roleManage/roleList";
    }

    @RequestMapping(value = "/rename", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> rename(String roleName, Integer roleId) {
        Map<String, String> map = new HashMap<>();
        try {
            int flag = roleService.rename(roleName, roleId);
            if (flag == 0) {
                map.put("result", ResultDict.REPEAT_ROLE_NAME.getCode());
            } else if (flag == 1) {
                map.put("result", ResultDict.SUCCESS.getCode());
            }
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/createRole", method = RequestMethod.GET)
    public String createProject() {
        return "roleManage/createRole";
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(Integer roleId) {
        Map<String, String> map = new HashMap<>();
        try {
            roleService.delete(roleId);
            map.put("result", ResultDict.SUCCESS.getCode());
        }catch (Exception e){
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

}

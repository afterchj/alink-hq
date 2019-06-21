package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.RoleList;
import com.tpadsz.after.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/6/20.
 */

@Controller
@RequestMapping("/role")
public class RoleController {
    @Resource
    private RoleService roleService;


    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum,Integer pageSize,String roleName,Model model) {
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
            PageHelper.startPage(pageNum, pageSize);
            List<RoleList> roleList = roleService.selectRoleList(roleName);
            PageInfo<RoleList> pageInfo = new PageInfo<>(roleList, pageSize);
            if (pageInfo.getList().size() > 0) {
                model.addAttribute("pageInfo", pageInfo);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return "roleManage/roleList";
    }

    @RequestMapping(value = "/createRole", method = RequestMethod.GET)
    public String createProject() {
        return "roleManage/createRole";
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail() {
        return "roleManage/roleDetail";
    }


}

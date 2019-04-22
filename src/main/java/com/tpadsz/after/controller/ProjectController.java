package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSONObject;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public String list(String uid, Model model) {
        Integer role_id = accountService.findRoleIdByUid(uid);
        List<ProjectList> list = new ArrayList<>();
        if(role_id==1){
            list = projectService.findProList();
        }else if(role_id==3){
            List<String> uids = accountService.findFirmUid(uid);
            list = projectService.findProListByUids(uids);
        }else if(role_id==4){
            list = projectService.findProListByUid(uid);
        }
        try {

        } catch (Exception e) {
//            model.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return null;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(String uid, Integer pageNum, Integer pageSize, String projectName, Integer fid, Integer roleId,
                       String startDate, String endDate,Model model) {

        try {
//            List<ProjectList> list = projectService.search(projectName, account, create_date, update_date);
            model.addAttribute("result", ResultDict.SUCCESS.getCode());
//            model.put("data", list);
        } catch (Exception e) {
            model.addAttribute("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return null;
    }


}

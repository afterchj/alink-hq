package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSONObject;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public String list(String uid, Model model) {
        Integer role_id = projectService.findRoleIdByUid(uid);
        List<ProjectList> list = new ArrayList<>();
        if(role_id==1){
            list = projectService.findProList();
        }else if(role_id==2){
            List<String> uids = projectService.findFirmUid(uid);
            list = projectService.findProListByUids(uids);
        }else if(role_id==3){
            list = projectService.findProListByUid(uid);
        }
        try {

        } catch (Exception e) {
//            model.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return null;
    }

    @RequestMapping("/search")
    public String search(@ModelAttribute("decodedParams") JSONObject params, ModelMap model) {
        String uid = params.getString("uid");
        String projectName = params.getString("projectName");
        String account = params.getString("account");
        String create_date = params.getString("create_date");
        String update_date = params.getString("update_date");

        try {
//            List<ProjectList> list = projectService.search(projectName, account, create_date, update_date);
            model.put("result", ResultDict.SUCCESS.getCode());
//            model.put("data", list);
        } catch (Exception e) {
            model.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return null;
    }


}

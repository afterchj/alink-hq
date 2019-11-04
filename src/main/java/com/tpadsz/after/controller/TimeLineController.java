package com.tpadsz.after.controller;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.*;
import com.tpadsz.after.service.RolePermissionInfoService;
import com.tpadsz.after.service.SceneService;
import com.tpadsz.after.service.TimeLineService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
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
 * @program: alink-hq
 * @description: 定时任务
 * @author: Mr.Ma
 * @create: 2019-05-28 10:14
 **/
@Controller
@RequestMapping("/timer")
public class TimeLineController {

    @Resource
    private TimeLineService timeLineService;

    @Resource
    private RolePermissionInfoService rolePermissionInfoService;

    @Resource
    private SceneService sceneService;

    /**
     * 跳转到timerList.html
     * @param model
     * @return
     */
    @RequestMapping("/list")
    public String timerList(Model model, @ModelAttribute("timeListPage") TimeListPage timeListPage, HttpSession
                                    session) {
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        ProjectList projectList= timeLineService.getProjectNameByMid(timeListPage.getId());
        List<String> permissions = rolePermissionInfoService.getPermissions(account);
        PageInfo<TimeLine> pageInfo = timeLineService.getTimeLineByMid(timeListPage);
        model.addAttribute("permissions",permissions);
        model.addAttribute("pageInfo",pageInfo);
        model.addAttribute("projectName",projectList.getName());
        model.addAttribute("projectId",projectList.getId());
        model.addAttribute("id",timeListPage.getId());
        model.addAttribute("tname",timeListPage.getTname());
        model.addAttribute("createDate",timeListPage.getCreateDate());
        model.addAttribute("updateDate",timeListPage.getUpdateDate());
        model.addAttribute("state",timeListPage.getState());
        model.addAttribute("timeFlag",timeListPage.getTimeFlag());
        return "timerManage/timerList";
    }

    @RequestMapping("/updateTname")
    @ResponseBody
    public Map<String,String> updateTname(int id,String tname,int mid){
        Map<String,String> map = new HashMap<>();
        map.put("flag","true");
        boolean flag = timeLineService.getTnameById(mid,tname);
        if (!flag){
            //名称不唯一
            map.put("flag","false");
            timeLineService.updateTnameById(id,tname,mid);
            map.put("success","success");
        }
        return map;
    }

    /**
     * 跳转到timerDetail.html
     * @return
     */
    @RequestMapping("/detail")
    public String timerDetail(int id,int projectId,Model model) {
        ProjectList projectList= timeLineService.getProjectByProjectId(projectId);
        TimeLine timeLine = timeLineService.getTimeLineById(id);
        List<TimePoint> timePointList = timeLineService.getTimePointByTsid(id);
        model.addAttribute("timePointList",timePointList);//定时点
        model.addAttribute("projectName",projectList.getName());
        model.addAttribute("projectId",projectList.getId());
        model.addAttribute("timeLine",timeLine);
        return "timerManage/timerDetail";
    }


    @RequestMapping(value = "/sceneDetail",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> sceneDetail(Integer sid, Integer lid, String sceneName, Integer sceneId, String meshName, String meshId){

        Map<String,Object> map = new HashMap<>();
        MeshInfo meshInfo = sceneService.findProjectByMeshId(meshId);
        List<MeshInfo> placeList = sceneService.findPlaceBySid(sid);
        List<MeshInfo> lightList = new ArrayList<>();
        List<MeshInfo> groupList = new ArrayList<>();
        int lidFlag = 0;
        for(int i=0;i<placeList.size();i++) {
            List<MeshInfo> groupList1 = sceneService.findGroupByPid(placeList.get(i).getPid());
            int samePlaceXY = 1;
            String groupX = "";
            String groupY = "";
            for (int j = 0; j < groupList1.size(); j++) {
                List<MeshInfo> list2 = sceneService.findXYByGid(groupList1.get(j).getGid(), sid);
                //该组xy值相同则list2的size为1
                if (list2.size() == 1) {
                    if (!"".equals(groupX) && groupX != null && groupY != null) {
                        if (!groupX.equals(list2.get(0).getX()) || !groupY.equals(list2.get(0).getY())) {
                            samePlaceXY = 0;
                        }
                    }
                    groupX = list2.get(0).getX();
                    groupY = list2.get(0).getY();
                    if (groupX == null || groupY == null) {
                        samePlaceXY = 0;
                    }
                    groupList1.get(j).setX(groupX);
                    groupList1.get(j).setY(groupY);
                } else {
                    samePlaceXY = 0;
                }
            }

            if (samePlaceXY == 1 && groupList1.size() != 0) {
                placeList.get(i).setX(groupList1.get(0).getX());
                placeList.get(i).setY(groupList1.get(0).getY());
            }
            if(lidFlag==0) {
                if (lid == null) {
                    if (groupList1.size() > 0) {
                        lightList = sceneService.findLightByGid(groupList1.get(0).getGid(), sid);
                    }
                    groupList = groupList1;
                    lidFlag = 1;
                } else {
                    MeshInfo lightInfo = sceneService.findLightInfoByLid(lid);
                    lightList = sceneService.findLightByGid(lightInfo.getGid(), sid);
                    map.put("lightInfo", lightInfo);
                    if(placeList.get(i).getPid()==lightInfo.getPid()){
                        groupList = groupList1;
                        lidFlag = 1;
                    }
                }
            }
        }
        map.put("sceneName", sceneName);
        map.put("sceneId", sceneId);
        map.put("projectName", meshInfo.getName());
        map.put("projectId", meshInfo.getProject_id());
        map.put("meshName", meshName);
        map.put("meshId", meshId);
        map.put("mid", meshInfo.getMid());
        map.put("placeList", placeList);
        map.put("groupList", groupList);
        map.put("lightList", lightList);
        return map;
    }

}

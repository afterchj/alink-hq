package com.tpadsz.after.controller;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.TimeLine;
import com.tpadsz.after.entity.TimePoint;
import com.tpadsz.after.service.SceneService;
import com.tpadsz.after.service.TimeLineService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.*;

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

    /**
     * 跳转到timerList.html
     * @param model
     * @return
     */
    @RequestMapping("/list")
    public String timerList(Model model, int id,Integer pageNum,Integer pageSize,String timeFlag,String tname,String
            createDate,String endTime,String state) {
        ProjectList projectList= timeLineService.getProjectNameByMid(id);
        PageInfo<TimeLine> pageInfo = timeLineService.getTimeLineByMid(id,pageNum,pageSize,timeFlag,tname,createDate,
                endTime, state);
        model.addAttribute("pageInfo",pageInfo);
        model.addAttribute("projectName",projectList.getName());
        model.addAttribute("projectId",projectList.getId());
        model.addAttribute("id",id);
        model.addAttribute("tname",tname);
        model.addAttribute("createDate",createDate);
        model.addAttribute("endTime",endTime);
        model.addAttribute("state",state);
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
            timeLineService.updateTnameById(id,tname);
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

    @Resource
    private SceneService sceneService;

    @RequestMapping(value = "/sceneDetail",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> sceneDetail(Integer sid, Integer lid, String sceneName, Integer sceneId, String meshName, String meshId){

        Map<String,Object> map = new HashMap<>();
        MeshInfo meshInfo = sceneService.findProjectByMeshId(meshId);
        List<MeshInfo> placeList = sceneService.findPlaceBySid(sid);
        List<MeshInfo> groupList = sceneService.findGroupByPid(placeList.get(0).getPid());
        List<MeshInfo> lightList = new ArrayList<>();
        if (lid == null) {
            if(groupList.size()>0) {
                lightList = sceneService.findLightByGid(groupList.get(0).getGid(), sid);
            }
        } else {
            MeshInfo lightInfo = sceneService.findLightInfoByLid(lid);
            lightList = sceneService.findLightByGid(lightInfo.getGid(),sid);
            map.put("lightInfo",lightInfo);
        }

        List<MeshInfo> list1 = sceneService.findXYBySid(sid);
        List<MeshInfo> groupXYList;
        if (list1.size() == 1) {
            map.put("px", list1.get(0).getX());
            map.put("py", list1.get(0).getY());
        } else {
            groupXYList = addGroupXYList(groupList,sid);
            if (groupXYList.size() > 0) {
                map.put("groupXYList", groupXYList);
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

    public List<MeshInfo> addGroupXYList(List<MeshInfo> groupList,Integer sid){
        List<MeshInfo> groupXYList = new ArrayList<>();
        for (int i = 0; i < groupList.size(); i++) {
            List<MeshInfo> list2 = sceneService.findXYByGid(groupList.get(i).getGid(),sid);
            if (list2.size() == 1) {
                MeshInfo groupXY = new MeshInfo();
                groupXY.setY(list2.get(0).getY());
                groupXY.setX(list2.get(0).getX());
                groupXY.setGid(groupList.get(i).getGid());
                groupXYList.add(groupXY);
            }
        }
        return groupXYList;
    }


}

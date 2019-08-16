package com.tpadsz.after.controller;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.*;
import com.tpadsz.after.service.ProductService;
import com.tpadsz.after.service.RolePermissionInfoService;
import com.tpadsz.after.service.SceneService;
import com.tpadsz.after.service.TimeLineService;
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
 * @program: alink-hq
 * @description: 产品管理
 * @author: Mr.Ma
 * @create:
 **/
@Controller
@RequestMapping("/product")
public class ProductController {

    @Resource
    private TimeLineService timeLineService;

    @Resource
    private RolePermissionInfoService rolePermissionInfoService;
    
    @Resource
    private ProductService productService;

    /**
     * 跳转到productList.html
     * @param type 产品品类/代码号(产品ID)
     * @param coname 隶属公司
     * @return
     */
    @RequestMapping("/list")
    public String productList(Model model, Integer pageNum, Integer pageSize, String type,String coname){
        PageInfo<Product> pageInfo = productService.getProductList(pageNum,pageSize,type,coname);
        return "productManage/productList";
    }

    /**
     * 跳转到timerList.html
     * @param model
     * @return
     */
    @RequestMapping("/list")
    public String timerList(Model model, int id, Integer pageNum, Integer pageSize, String timeFlag, String tname, String
            createDate, String endTime, String state, HttpSession session) {
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        ProjectList projectList= timeLineService.getProjectNameByMid(id);
        List<String> permissions = rolePermissionInfoService.getPermissions(account);
        PageInfo<TimeLine> pageInfo = timeLineService.getTimeLineByMid(id,pageNum,pageSize,timeFlag,tname,createDate,
                endTime, state);
        model.addAttribute("permissions",permissions);
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

        int samePlaceXY = 1;
        String groupX = "";
        String groupY = "";
        for (int i = 0; i < groupList.size(); i++) {
            List<MeshInfo> list2 = sceneService.findXYByGid(groupList.get(i).getGid(), sid);
            if (list2.size() == 1) {
                if (!"".equals(groupX) && groupX != null && groupY != null) {
                    if (!groupX.equals(list2.get(0).getX()) || !groupY.equals(list2.get(0).getY())) {
                        samePlaceXY = 0;
                    }
                }
                groupY = list2.get(0).getY();
                groupX = list2.get(0).getX();

                if (groupX == null || groupY == null) {
                    samePlaceXY = 0;
                }
                groupList.get(i).setX(groupX);
                groupList.get(i).setY(groupY);
            } else {
                samePlaceXY = 0;
            }
        }

        if (samePlaceXY == 1) {
            placeList.get(0).setX(groupList.get(0).getX());
            placeList.get(0).setY(groupList.get(0).getY());
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

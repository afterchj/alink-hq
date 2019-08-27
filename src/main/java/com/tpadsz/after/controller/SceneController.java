package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.SceneList;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.SceneService;
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
 * Created by chenhao.lu on 2019/5/7.
 */

@Controller
@RequestMapping("/scene")
public class SceneController {
    @Resource
    private SceneService sceneService;

    @Resource
    private AccountService accountService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String sceneName, Integer sceneId, Integer lid, String
            meshName,String projectName, String meshId, Integer mid, HttpSession session, Model model) {
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
                Integer role_id2 = sceneService.findRoleIdByMid(mid);
                if(role_id<role_id2) {
                    PageHelper.startPage(pageNum, pageSize);
                    List<SceneList> list = sceneService.searchSceneList(sceneName, sceneId, lid, meshName, meshId, mid);
                    PageInfo<SceneList> pageInfo = new PageInfo<>(list, pageSize);
                    if (pageInfo.getList().size() > 0) {
                        model.addAttribute("pageInfo", pageInfo);
                    }
                    if (role_id == 1) {
                        model.addAttribute("flag", 0);
                    }
                    model.addAttribute("mid", mid);
                    model.addAttribute("meshName", meshName);
                    model.addAttribute("projectName", projectName);
                    model.addAttribute("sceneName", sceneName);
                    model.addAttribute("sceneId", sceneId);
                }
        } catch (Exception e) {
        }
        return "sceneManage/sceneList";
    }


    @RequestMapping(value = "/rename", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> rename(String sceneName, Integer sid) {
        Map<String, String> map = new HashMap<>();
        try {
            int flag = sceneService.renameScene(sceneName, sid);
            if (flag == 0) {
                map.put("result", ResultDict.REPEAT_SCENE_NAME.getCode());
            } else if (flag == 1) {
                map.put("result", ResultDict.SUCCESS.getCode());
            }
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(HttpSession session,String sceneInfo) {
        Map<String, String> map = new HashMap<>();
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        List<SceneList> sceneList = JSONArray.parseArray(sceneInfo, SceneList.class);
        Integer flag;
        try {
            for (SceneList scene : sceneList) {
                if (scene.getSceneId() > 3) {
                    sceneService.deleteSid(scene.getId());
                    flag =1;
                } else {
                    String sceneName = "场景" + (scene.getSceneId() + 1);
                    sceneService.saveSceneName(sceneName, scene.getId());
                    flag = 0;
                }
                sceneService.deleteXY(scene.getId(),scene.getSceneId(),scene.getMid(),flag);
                sceneService.saveDeleteLog(uid,scene.getSceneId(),scene.getMid());
            }
            map.put("result", ResultDict.SUCCESS.getCode());
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(Integer sid, Integer lid, String sceneName, Integer sceneId, String meshName, String meshId,Model model) {
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
                    model.addAttribute("lightInfo", lightInfo);
                    if(placeList.get(i).getPid()==lightInfo.getPid()){
                        groupList = groupList1;
                        lidFlag = 1;
                    }
                }
            }
        }
        model.addAttribute("sceneName", sceneName);
        model.addAttribute("sceneId", sceneId);
        model.addAttribute("projectName", meshInfo.getName());
        model.addAttribute("projectId", meshInfo.getProject_id());
        model.addAttribute("meshName", meshName);
        model.addAttribute("meshId", meshId);
        model.addAttribute("mid", meshInfo.getMid());
        model.addAttribute("placeList", placeList);
        model.addAttribute("groupList", groupList);
        model.addAttribute("lightList", lightList);
        return "sceneManage/sceneDetail";
    }



    @RequestMapping(value = "/groupDetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, List> groupDetail(Integer gid, Integer sid) {
        Map<String, List> map = new HashMap<>();
        List<MeshInfo> lightList = sceneService.findLightByGid(gid, sid);
        map.put("lightList", lightList);
        return map;
    }

    @RequestMapping(value = "/placeDetail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, List> placeDetail(Integer pid, Integer sid) {
        Map<String, List> map = new HashMap<>();
        List<MeshInfo> groupList = sceneService.findGroupByPid(pid);
        String groupX = "";
        String groupY = "";
        for (int j = 0; j < groupList.size(); j++) {
            List<MeshInfo> list2 = sceneService.findXYByGid(groupList.get(j).getGid(), sid);
            if (list2.size() == 1) {
                if (!"".equals(groupX) && groupX != null && groupY != null) {
                }
                groupX = list2.get(0).getX();
                groupY = list2.get(0).getY();
                groupList.get(j).setX(groupX);
                groupList.get(j).setY(groupY);
            }
        }
        map.put("groupList", groupList);
        return map;
    }

}

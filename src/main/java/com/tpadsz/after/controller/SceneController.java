package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.SceneList;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.SceneService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String sceneName, Integer sceneId,Integer lid, String meshName,String meshId,Integer mid,Model model) {
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
            List<SceneList> list = sceneService.searchSceneList(sceneName, sceneId,lid,meshName,meshId,mid);
            PageInfo<SceneList> pageInfo = new PageInfo<>(list, pageSize);
            if (pageInfo.getList().size() > 0) {
                model.addAttribute("pageInfo", pageInfo);
            }
            model.addAttribute("sceneName", sceneName);
            model.addAttribute("sceneId", sceneId);

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
    public Map<String, String> delete(String sceneInfo) {
        Map<String, String> map = new HashMap<>();
        List<SceneList> sceneList = JSONArray.parseArray(sceneInfo, SceneList.class);
        try {
            for (SceneList scene : sceneList) {
                if (scene.getSceneId() > 3) {
                    sceneService.delete(scene.getId());
                }else {
                    String sceneName = "场景" + (scene.getSceneId()+1);
                    sceneService.saveSceneName(sceneName,scene.getId());
                }
            }
            map.put("result", ResultDict.SUCCESS.getCode());
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(Integer sid,Integer lid,String sceneName, Integer sceneId, String meshName, String meshId, Model model) {
        ProjectList projectList = sceneService.findProjectByMeshId(meshId);
        if(lid==null) {
            List<MeshInfo> placeList = sceneService.findPlaceBySid(sid);
            List<MeshInfo> groupList = sceneService.findGroupByPid(placeList.get(0).getPid());
            List<MeshInfo> lightList = sceneService.findLightByGid(groupList.get(0).getGid());
        }
//        if (account != null) {
//            user = accountService.findByAccount(account);
//            if (meshNum > 0) {
//                placeNum = projectService.findPlaceNum(projectId);
//
//                groupNum = projectService.findGroupNum(projectId);
//                lightNum = projectService.findLightNum(projectId);
//            }
//        }
//        model.addAttribute("placeNum", placeNum);
        return "sceneManage/sceneDetail";
    }

}

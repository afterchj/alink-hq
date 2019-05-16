package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.LightService;
import com.tpadsz.after.service.MeshService;
import com.tpadsz.after.service.RoleService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by hongjian.chen on 2019/4/15.
 */

@Controller
@RequestMapping("/light")
public class LightController {

    @Resource
    private LightService lightService;
    @Resource
    private RoleService roleService;
    @Resource
    private MeshService meshService;

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String list(SearchDict dict, ModelMap modelMap) {
        String role = roleService.selectById(dict.getUid());
        dict.setRole(role);
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> meshList = lightService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(meshList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
//        Integer id = dict.getMid();
//        int projectId = id == null ? dict.getProjectId() : id;
//        OptionList project = meshService.getProject(projectId);
//        dict.setMid(project.getMid());
//        modelMap.put("project", project);
        modelMap.put("dict", dict);
        return "meshTemp/lightList";
    }

    @RequestMapping("/info")
    public String info(int id, ModelMap modelMap) {
        MeshInfo meshInfo = lightService.getLightInfo(id);
        List<MeshInfo> sceneInfo = lightService.getSceneInfo(id);
        modelMap.put("meshInfo", meshInfo);
        modelMap.put("sceneInfo", sceneInfo);
        return "meshTemp/lightInfo";
    }

    @RequestMapping("/move")
    public String move(String projectName, Integer mid, String ids, ModelMap modelMap) {
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        List<Map> lightMap = lightService.selectByLid(list);
        modelMap.put("lightMap", lightMap);
        modelMap.put("projectName", projectName);
        modelMap.put("mid", mid);
        modelMap.put("ids", ids);
        return "meshTemp/lightMove";
    }

    @ResponseBody
    @RequestMapping("/saveUpdate")
    public String saveUpdate(String ids, String gid) {
        logger.info("ids=" + ids + ",pid=" + gid);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        Map map = new HashMap();
        map.put("gid", gid);
        map.put("list", list);
        lightService.saveUpdate(map);
        return "ok";
//        return "redirect:/light/list";
    }

    @RequestMapping("/delete")
    public String delete(String projectName,Integer uid,String ids) {
        logger.info("ids=" + ids);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        try {
            lightService.deleteLightByIds(list);
        } catch (Exception e) {
            logger.warn(e);
            return "authError";
        }
        return "redirect:/light/list?uid="+uid+"&projectName="+projectName;
    }

    @ResponseBody
    @RequestMapping("/rename")
    public String rename(String name, Integer id) {
        Map map = new HashMap();
        map.put("name", name);
        map.put("id", id);
        lightService.saveRename(map);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/getGroup")
    public List<OptionList> getGroups(Integer id) {
        Map map = new HashMap();
        map.put("id", id);
        List<OptionList> meshMap = lightService.getGroups(map);
        return meshMap;
    }
}

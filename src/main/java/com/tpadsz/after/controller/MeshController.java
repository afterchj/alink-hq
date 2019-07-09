package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.MeshService;
import com.tpadsz.after.service.RoleService;
import com.tpadsz.after.utils.AppUtils;
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
@RequestMapping("/mesh")
public class MeshController {

    @Resource
    private MeshService meshService;
    @Resource
    private RoleService roleService;

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String list(SearchDict dict, ModelMap modelMap) {
        String uid = AppUtils.getUserID();
        String role = roleService.selectById(uid);
        dict.setUid(uid);
        dict.setRole(role);
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> meshList = meshService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(meshList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "meshTemp/meshList";
    }


    @RequestMapping("/info")
    public String info(Integer id, ModelMap modelMap) {
        MeshInfo meshInfo = meshService.getMeshInfo(id);
        modelMap.put("meshInfo", meshInfo);
        return "meshTemp/meshInfo";
    }

    @RequestMapping("/create")
    public String create(SearchDict dict, ModelMap modelMap) {
        modelMap.put("dict", dict);
        return "meshTemp/meshCreate";
    }

    @ResponseBody
    @RequestMapping("/save")
    public String saveMesh(SearchDict dict) {
        logger.info(JSON.toJSONString(dict));
        Map map = new HashMap();
        map.put("id", dict.getId());
        map.put("uid", dict.getUid());
        map.put("name", dict.getName());
        map.put("type", dict.getMtype());
        map.put("projectId", dict.getId());
        try {
            meshService.save(map);
        } catch (RepetitionException e) {
            e.printStackTrace();
            return "fail";
        } catch (Exception e) {
            e.printStackTrace();
            return "netFail";
        }
        return "ok";
//        return "redirect:/mesh/list";
    }

    @RequestMapping("/move")
    public String move(String ids, ModelMap modelMap) {
        String[] idArray = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(idArray));
        List<Map> meshMap = meshService.selectByMid(list);
        modelMap.put("meshMap", meshMap);
        modelMap.put("ids", ids);
        return "meshTemp/meshMove";
    }

    @ResponseBody
    @RequestMapping("/saveUpdate")
    public String saveUpdate(String ids, String pid) {
        logger.info("ids=" + ids + ",pid=" + pid);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        Map map = new HashMap();
        map.put("pid", pid);
        map.put("list", list);
        meshService.saveUpdate(map);
//        return "redirect:/mesh/list";
        return "ok";
    }

    @RequestMapping("/delete")
    public String delete(Integer uid, String ids) {
        logger.info("ids=" + ids);
        String[] idArray = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(idArray));
        meshService.deleteMeshByIds(list);
        return "redirect:/mesh/list?uid" + uid;
    }


    @ResponseBody
    @RequestMapping("/rename")
    public String rename(String name, Integer id) {
        Map map = new HashMap();
        map.put("name", name);
        map.put("id", id);
        try {
            meshService.saveRename(map);
        } catch (RepetitionException e) {
            logger.error(e);
            return "fail";
        }
        return "success";
    }

    @ResponseBody
    @RequestMapping("/getProjects")
    public List<OptionList> show(String uid) {
        Map map = new HashMap();
        if (uid != null) {
            String role = roleService.selectById(uid);
            map.put("role", role);
            map.put("uid", uid);
        }
        List<OptionList> meshMap = meshService.getProjects(map);
        return meshMap;
    }
}

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
        String role = roleService.selectById(dict.getUid());
        dict.setRole(role);
        logger.info("dict=" + JSON.toJSONString(dict));
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
    public String create(Integer id, ModelMap modelMap) {
        MeshInfo meshInfo = meshService.getMeshInfo(id);
        modelMap.put("meshInfo", meshInfo);
        return "meshTemp/meshCreate";
    }

    @RequestMapping("/save")
    public String saveMesh(Integer pid) {
        logger.info("pid=" + pid);
        return "redirect:/mesh/list";
    }

    @RequestMapping("/move")
    public String move(String mids, ModelMap modelMap) {
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        List<Map> meshMap = meshService.selectByMid(list);
        modelMap.put("meshMap", meshMap);
        modelMap.put("mids", mids);
        return "meshTemp/meshMove";
    }

    @RequestMapping("/saveUpdate")
    public String save(String mids, String pid) {
        logger.info("mids=" + mids + ",pid=" + pid);
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        Map map = new HashMap();
        map.put("pid", pid);
        map.put("list", list);
        meshService.saveUpdate(map);
        return "redirect:/mesh/list";
    }

    @RequestMapping("/delete")
    public String saveDelete(String mids) {
        logger.info("mids=" + mids);
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        meshService.deleteMeshByIds(list);
        return "redirect:/mesh/list";
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
    public List<OptionList> show(Integer uid) {
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

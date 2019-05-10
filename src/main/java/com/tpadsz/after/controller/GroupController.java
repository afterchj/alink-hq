package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.GroupService;
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
@RequestMapping("/group")
public class GroupController {

    @Resource
    private GroupService groupService;
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
        List<Map> meshList = groupService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(meshList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "meshTemp/groupList";
    }

    @RequestMapping("/info")
    public String info(int id, ModelMap modelMap) {
        MeshInfo meshInfo = groupService.getGroupInfo(id);
        modelMap.put("meshInfo", meshInfo);
        return "meshTemp/groupInfo";
    }

    @RequestMapping("/move")
    public String move(String ids, ModelMap modelMap) {
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        List<Map> groupMap = groupService.selectByGid(list);
        modelMap.put("groupMap", groupMap);
        modelMap.put("ids", ids);
        return "meshTemp/groupMove";
    }

    @RequestMapping("/create")
    public String create(Integer projectId, ModelMap modelMap) {
        OptionList project = meshService.getProject(projectId);
        modelMap.put("project", project);
        logger.info("project=" + JSON.toJSONString(project));
        return "meshTemp/groupCreate";
    }

    @RequestMapping("/save")
    public String saveGroup(SearchDict dict) {
        logger.info("pid=" + dict.getMid());
        return "redirect:/group/list";
    }

    @ResponseBody
    @RequestMapping("/saveUpdate")
    public String saveUpdate(String ids, String pid) {
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        Map map = new HashMap();
        map.put("pid", pid);
        map.put("list", list);
        groupService.saveUpdate(map);
        return "ok";
//        return "redirect:/group/list";
    }

    @RequestMapping("/delete")
    public String delete(String ids) {
        logger.info("ids=" + ids);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        try {
            groupService.deleteGroupByIds(list);
        } catch (Exception e) {
            logger.warn(e);
            return "authError";
        }
        return "redirect:/group/list";
    }

    @ResponseBody
    @RequestMapping("/rename")
    public String rename(String name, Integer id) {
        Map map = new HashMap();
        map.put("name", name);
        map.put("id", id);
        try {
            groupService.saveRename(map);
        } catch (RepetitionException e) {
            return "fail";
        }
        return "ok";
    }

    @ResponseBody
    @RequestMapping("/getPlace")
    public List<OptionList> getPlaces(Integer uid) {
        Map map = new HashMap();
        if (uid != null) {
            String role = roleService.selectById(uid);
            map.put("role", role);
            map.put("uid", uid);
        }
        List<OptionList> meshMap = groupService.getPlaces(map);
        return meshMap;
    }

    @ResponseBody
    @RequestMapping("/getMesh")
    public List<OptionList> getMesh(Integer uid) {
        Map map = new HashMap();
        if (uid != null) {
            String role = roleService.selectById(uid);
            map.put("role", role);
            map.put("uid", uid);
        }
        List<OptionList> meshMap = groupService.getMesh(map);
        return meshMap;
    }
}

package com.tpadsz.after.controller;

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
//        OptionList project = meshService.getProject(dict);
//        modelMap.put("project", project);
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
    public String move(Integer mid, String ids, ModelMap modelMap) {
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        List<Map> groupMap = groupService.selectByGid(list);
        modelMap.put("groupMap", groupMap);
        modelMap.put("mid", mid);
        modelMap.put("ids", ids);
        return "meshTemp/groupMove";
    }

    @RequestMapping("/create")
    public String create(SearchDict dict, ModelMap modelMap) {
        Map map = new HashMap();
        map.put("projectId", dict.getProjectId());
        modelMap.put("mid", dict.getMid());
        OptionList project = meshService.getProject(map);
        modelMap.put("project", project);
        modelMap.put("dict", dict);
        return "meshTemp/groupCreate";
    }

    @ResponseBody
    @RequestMapping("/save")
    public String saveGroup(SearchDict dict) {
        try {
            groupService.save(dict);
        } catch (RepetitionException e) {
            return "fail";
        } catch (Exception e) {
            return "netFail";
        }
        return "ok";
//        return "redirect:/group/list";
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
    public String delete(Integer mid, String ids) {
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        groupService.deleteGroupByIds(list);
        return "redirect:/group/list?mid=" + mid;
    }

    @ResponseBody
    @RequestMapping("/rename")
    public String rename(SearchDict dict) {
        try {
            groupService.saveRename(dict);
        } catch (RepetitionException e) {
            return "fail";
        }
        return "ok";
    }

    @ResponseBody
    @RequestMapping("/getPlace")
    public List<OptionList> getPlaces(Integer mid, Integer projectId) {
        Map map = new HashMap();
        map.put("projectId", projectId);
        map.put("mid", mid);
        List<OptionList> meshMap = groupService.getPlaces(map);
        return meshMap;
    }

    @ResponseBody
    @RequestMapping("/getMesh")
    public List<OptionList> getMesh(Integer projectId) {
        Map map = new HashMap();
        map.put("projectId", projectId);
        List<OptionList> meshMap = meshService.getMesh(map);
        return meshMap;
    }
}

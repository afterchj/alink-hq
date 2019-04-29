package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.GroupService;
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

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String groupList(SearchDict dict, ModelMap modelMap) {
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
    public String move(String gids, ModelMap modelMap) {
        String[] ids = gids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        List<Map> groupMap = groupService.selectByGid(list);
        modelMap.put("groupMap", groupMap);
        modelMap.put("gids", gids);
        return "meshTemp/groupMove";
    }

    @RequestMapping("/saveUpdate")
    public String save(String gids, String pid) {
        logger.info("gids=" + gids + ",pid=" + pid);
        String[] ids = gids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        Map map = new HashMap();
        map.put("pid", pid);
        map.put("list", list);
        groupService.saveUpdate(map);
        return "redirect:/group/list";
    }

    @RequestMapping("/delete")
    public String save(String gids) {
        logger.info("gids=" + gids);
        String[] ids = gids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
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
        groupService.saveRename(map);
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
}

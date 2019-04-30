package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.LightService;
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
        modelMap.put("dict", dict);
        return "meshTemp/lightList";
    }
    @RequestMapping("/info")
    public String info(int id, ModelMap modelMap) {
        MeshInfo meshInfo = lightService.getLightInfo(id);
        modelMap.put("meshInfo", meshInfo);
        return "meshTemp/lightInfo";
    }

    @RequestMapping("/move")
    public String move(String ids, ModelMap modelMap) {
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        List<Map> groupMap = lightService.selectByLid(list);
        modelMap.put("groupMap", groupMap);
        modelMap.put("ids", ids);
        return "meshTemp/lightMove";
    }
    @RequestMapping("/create")
    public String create(Integer id, ModelMap modelMap) {
        return "meshTemp/groupCreate";
    }

    @RequestMapping("/save")
    public String savePlace(Integer pid) {
        logger.info("pid=" + pid);
        return "redirect:/group/list";
    }
    @RequestMapping("/saveUpdate")
    public String saveUpdate(String ids, String gid) {
        logger.info("ids=" + ids + ",pid=" + gid);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        Map map = new HashMap();
        map.put("gid", gid);
        map.put("list", list);
        lightService.saveUpdate(map);
        return "redirect:/light/list";
    }

    @RequestMapping("/delete")
    public String delete(String ids) {
        logger.info("ids=" + ids);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        try {
            lightService.deleteLightByIds(list);
        } catch (Exception e) {
            logger.warn(e);
            return "authError";
        }
        return "redirect:/light/list";
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
    public List<OptionList> getPlaces(Integer uid) {
        Map map = new HashMap();
        if (uid != null) {
            String role = roleService.selectById(uid);
            map.put("role", role);
            map.put("uid", uid);
        }
        List<OptionList> meshMap = lightService.getGroups(map);
        return meshMap;
    }
}

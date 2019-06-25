package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.MeshService;
import com.tpadsz.after.service.PlaceService;
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
@RequestMapping("/place")
public class PlaceController {

    @Resource
    private PlaceService placeService;
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
        List<Map> placeList = placeService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(placeList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
//        OptionList project = meshService.getProject(dict);
//        modelMap.put("project", project);
        modelMap.put("dict", dict);
        return "meshTemp/placeList";
    }

    @RequestMapping("/info")
    public String info(int id, ModelMap modelMap) {
        MeshInfo meshInfo = placeService.getPlaceInfo(id);
        modelMap.put("meshInfo", meshInfo);
        return "meshTemp/placeInfo";
    }

    @RequestMapping("/create")
    public String create() {
        return "meshTemp/placeCreate";
    }

//    @ResponseBody
    @RequestMapping("/save")
    public String savePlace(SearchDict dict) {
        String str=dict.getMesh_id();
        int mid= Integer.parseInt(str.substring(0,str.indexOf("_")));
        Map map = new HashMap();
        map.put("uid",dict.getUid());
        map.put("name",dict.getPname());
        map.put("mid",mid);
        try {
            placeService.save(map);
        } catch (RepetitionException e) {
            return "fail";
        } catch (Exception e) {
            return "netFail";
        }
//        return "ok";
        return "redirect:/place/list";
//        return "redirect:/place/list?uid="+dict.getUid();
    }

    @RequestMapping("/move")
    public String delete(String ids) {
        logger.info("ids=" + ids);
        String[] ids1 = ids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        placeService.deleteByIds(list);
        return "redirect:/place/list";
    }

    @ResponseBody
    @RequestMapping("/rename")
    public String save(String name, Integer id) {
        Map map = new HashMap();
        map.put("id", id);
        map.put("name", name);
        try {
            placeService.saveRename(map);
        } catch (RepetitionException e) {
            return "fail";
        }
        return "success";
    }

    @ResponseBody
    @RequestMapping("/getMesh")
    public List<OptionList> show(Integer uid) {
        logger.info("uid=" + uid);
        Map map = new HashMap();
        map.put("uid", uid);
        List<OptionList> placeMap = meshService.getMesh(map);
        return placeMap;
    }
}

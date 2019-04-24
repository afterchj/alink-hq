package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.SearchDict;
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

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String list(SearchDict dict, ModelMap modelMap) {
        String role = roleService.selectById(dict.getUid());
        dict.setRole(role);
        logger.info("dict=" + JSON.toJSONString(dict));
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> placeList = placeService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(placeList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        logger.info("total=" + pageInfo.getTotal() + ",pages=" + pageInfo.getPages());
        return "meshTemp/placeList";
    }

    @RequestMapping("/move")
    public String move(String pids) {
        logger.info("pids=" + pids);
        String[] ids = pids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        placeService.deleteByIds(list);
        return "redirect:/place/list";
    }

    @ResponseBody
    @RequestMapping("/rename")
    public String save(String name, Integer id) {
        Map map = new HashMap();
        map.put("id", id);
        map.put("name", name);
        placeService.saveRename(map);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/getMesh")
    public List<OptionList> show(Integer uid) {
        logger.info("uid=" + uid);
        Map map = new HashMap();
        if (uid != null) {
            String role = roleService.selectById(uid);
            map.put("role", role);
            map.put("uid", uid);
        }
        List<OptionList> placeMap = placeService.getMesh(map);
        return placeMap;
    }
}

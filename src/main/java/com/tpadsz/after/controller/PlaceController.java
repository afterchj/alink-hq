package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.service.PlaceService;
import com.tpadsz.after.service.RoleService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public String list(Integer uid, Integer pid, Integer mid, @RequestParam(required = false, defaultValue = "1") Integer pageNum, @RequestParam(required = false, defaultValue = "10") Integer pageSize, ModelMap modelMap) {
        logger.info("page=" + pageNum + ",size=" + pageSize);
        Map map = new HashMap();
        if (uid != null) {
            String role = roleService.selectById(uid);
            map.put("role", role);
            map.put("uid", uid);
        }
        if (pid != null) {
            map.remove("uid");
            map.put("pid", pid);
        }
        if (mid != null) {
            map.remove("uid");
            map.put("mid", mid);
        }
        PageHelper.startPage(pageNum, pageSize);
        List<Map> placeList = placeService.getByMap(map);
        PageInfo<Map> pageInfo = new PageInfo(placeList, pageSize);
        modelMap.put("pageInfo", pageInfo);
        logger.info("total=" + pageInfo.getTotal() + ",pages=" + pageInfo.getPages());
        return "meshTemp/placeList";
    }

    @ResponseBody
    @RequestMapping("/delete")
    public String move(String pids) {
        String[] ids = pids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        placeService.deleteByIds(list);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/rename")
    public String save(String name, Integer id) {
        Map map = new HashMap();
        map.put("id", id);
        map.put("name", name);
        placeService.rename(map);
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

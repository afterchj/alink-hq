package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.UserList;
import com.tpadsz.after.service.MeshService;
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
@RequestMapping("/mesh")
public class MeshController {

    @Resource
    private MeshService meshService;

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String list(@RequestParam(required = false, defaultValue = "1") Integer pageNum, @RequestParam(required = false, defaultValue = "10") Integer pageSize, ModelMap modelMap) {
        logger.info("page=" + pageNum + ",size=" + pageSize);
        PageHelper.startPage(pageNum, pageSize);
        List<Map> meshList = meshService.getByMap(null);
        PageInfo<Map> pageInfo = new PageInfo(meshList, pageSize);
        modelMap.put("pageInfo", pageInfo);
        logger.info("total=" + pageInfo.getTotal() + ",pages=" + pageInfo.getPages());
        return "meshTemp/meshList";
    }

    @RequestMapping("/move")
    public String move(String mids, ModelMap modelMap) {
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        List<Map> meshMap = meshService.selectByMid(list);
        logger.info("result=" + JSON.toJSONString(meshMap));
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

    @ResponseBody
    @RequestMapping("/getProjects")
    public List<OptionList> show() {
        List<OptionList> meshMap = meshService.getProjects();
        return meshMap;
    }
}

package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.tpadsz.after.entity.OptionList;
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
    public String list(@RequestParam(required = false, defaultValue = "1") Integer page, @RequestParam(required = false, defaultValue = "10") Integer size, ModelMap modelMap) {
        logger.info("page=" + page + ",size=" + size);
        int total = meshService.getByMap(null).size();
        int totalPage = total / size == 0 ? total / size : total / size + 1;
        PageHelper.startPage(page, size);
        List<Map> meshList = meshService.getByMap(null);
        modelMap.put("page", page);
        modelMap.put("size", size);
        modelMap.put("totalPage", totalPage);
        modelMap.put("meshList", meshList);
        logger.info("total=" + total + ",totalPage=" + totalPage);
        return "meshTemp/meshList";
    }

    @RequestMapping("/move")
    public String move(String mids, ModelMap modelMap) {
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        List<Map> meshMap = meshService.selectByMid(list);
        logger.info("result=" + JSON.toJSONString(meshMap));
        modelMap.put("meshMap", meshMap);
        return "meshTemp/meshMove";
    }

    @RequestMapping("/saveUpdate")
    public String save(String mids,String pid, ModelMap modelMap) {
        String[] ids = mids.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids));
        Map map=new HashMap();
        List<Map> meshMap = meshService.selectByMid(list);
        logger.info("result=" + JSON.toJSONString(meshMap));
        modelMap.put("meshMap", meshMap);
        return "redirect:/mesh/list";
    }

    @ResponseBody
    @RequestMapping("/getProjects")
    public List<OptionList> show() {
        List<OptionList> meshMap = meshService.getProjects();
        return meshMap;
    }
}

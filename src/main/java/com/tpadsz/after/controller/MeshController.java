package com.tpadsz.after.controller;

import com.tpadsz.after.service.MeshService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */

@Controller
@RequestMapping("/mesh")
public class MeshController {

    @Resource
    private MeshService meshService;

    @RequestMapping("/list")
    public String list(ModelMap modelMap) {

        List<Map> meshList = meshService.getByMap(null);
        modelMap.put("page",1);
        modelMap.put("meshList", meshList);
        return "meshTemp/meshList";
    }
}

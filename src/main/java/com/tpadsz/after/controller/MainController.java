package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.tpadsz.after.service.LightService;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author hongjian.chen
 * @date 2019/10/29 9:11
 */

@RestController
@RequestMapping("/main")
public class MainController {

    @Resource
    private LightService lightService;
    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/checkCount")
    public String rename(String id) {
        logger.warn("array=" + id);
        String[] ids = id.split(",");
        List array;
        try {
            array = JSON.parseArray(id);
        } catch (Exception e) {
            array = new ArrayList(Arrays.asList(ids));
        }
        int count = lightService.getLightCount(array);
        if (count > 0) {
            return "fail";
        }
        return "ok";
    }
}

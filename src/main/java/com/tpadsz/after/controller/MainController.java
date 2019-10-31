package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.tpadsz.after.service.LightService;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
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
        List array = JSON.parseArray(id);
        logger.warn("array=" + JSON.toJSONString(array));
        int count = lightService.getLightCount(array);
        if (count > 0) {
            return "fail";
        }
        return "ok";
    }
}

package com.tpadsz.after.controller;

import com.tpadsz.after.service.LightService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author hongjian.chen
 * @date 2019/10/29 9:11
 */

@RestController
@RequestMapping("/main")
public class MainController {

    @Resource
    private LightService lightService;

    @RequestMapping("/checkCount")
    public String rename(Integer id) {
        int count = lightService.getLightCount(id);
        if (count > 0) {
            return "fail";
        }
        return "ok";
    }
}

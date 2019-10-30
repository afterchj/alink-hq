package com.tpadsz.after.controller;

import com.tpadsz.after.service.LightService;
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

    @RequestMapping("/checkCount")
    public String rename(String id) {
        String[] idArray = id.split(",");
        List<String> list = new ArrayList(Arrays.asList(idArray));
        int count = lightService.getLightCount(list);
        if (count > 0) {
            return "fail";
        }
        return "ok";
    }
}

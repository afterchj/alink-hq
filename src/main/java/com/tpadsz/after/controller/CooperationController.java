package com.tpadsz.after.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hongjian.chen on 2019/4/3.
 */
@Controller
@RequestMapping("/cooperate")
public class CooperationController {

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String cooperateList() {
        return "cooperateManage/cooperateList";
    }

    @RequestMapping("/info")
    public String cooperationInfo() {
        return "cooperateManage/cooperateInfo";
    }

    @RequestMapping("/create")
    public String cooperationCreate() {
        return "cooperateManage/cooperateCreate";
    }


}

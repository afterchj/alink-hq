package com.tpadsz.after.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

/**
 * Created by chenhao.lu on 2019/6/20.
 */

@Controller
@RequestMapping("/role")
public class RoleController {

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list() {

        return "roleManage/roleList";
    }





}

package com.tpadsz.after.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hongjian.chen on 2019/4/15.
 */

@Controller
@RequestMapping("/mesh")
public class MeshController {

    @RequestMapping("/list")
    public String list(){

        return "meshTemp/meshList";
    }
}

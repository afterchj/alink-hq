package com.tpadsz.after.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author hongjian.chen
 * @date 2019/7/26 9:30
 */

@Controller
@RequestMapping("/file")
public class FileController {

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/OTAFile")
    public String OTAFile() {
        return "fileManage/otaFile";
    }

    @RequestMapping("/PCFile")
    public String PCFile() {
        return "fileManage/pcFile";
    }

    @RequestMapping("/addOta")
    public String addOta() {
        return "fileManage/addOta";
    }

}

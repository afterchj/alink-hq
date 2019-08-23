package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.PCService;
import com.tpadsz.after.utils.CommonManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

/**
 * @author hongjian.chen
 * @date 2019/7/26 9:30
 */

@Controller
@RequestMapping("/file")
public class PCController {

    private Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    private PCService fileService;

    @RequestMapping("/PCFile")
    public String PCFile(SearchDict dict, ModelMap modelMap) {
        dict = CommonManager.parseStr(dict);
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = fileService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "fileManage/pcFile";
    }

    @RequestMapping("/fileList")
    public String PCFileInfo(SearchDict dict, ModelMap modelMap) {
        dict = CommonManager.parseStr(dict);
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = fileService.getPCFile(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "fileManage/projectFileList";
    }
}

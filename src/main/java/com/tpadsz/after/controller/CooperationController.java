package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.CooperateService;
import com.tpadsz.after.utils.PropertiesUtil;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/3.
 */
@Controller
@RequestMapping("/cooperate")
public class CooperationController {

    @Resource
    private CooperateService cooperateService;

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String cooperateList(SearchDict dict, ModelMap modelMap) {
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = cooperateService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("info", dict);
        return "cooperateManage/cooperateList";
    }

    @RequestMapping("/info")
    public String cooperationInfo(int id, ModelMap modelMap) {
        if (id != 0) {
            CooperationInfo info = cooperateService.getCooperationInfo(id);
            modelMap.put("info", info);
        }
        return "cooperateManage/cooperateInfo";
    }

    @RequestMapping("/save")
    public String save(CooperationInfo info, @RequestParam(value = "file") MultipartFile file) {
        String path = PropertiesUtil.getPath();
        String fileName = file.getOriginalFilename();
        File targetFile = new File(path, fileName);
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }
        try {
            file.transferTo(targetFile);
            info.setPhoto(fileName);
            if (info.getId() == 0) {
                cooperateService.save(info);
            } else {
                cooperateService.saveUpdate(info);
            }
        } catch (Exception e) {
            logger.error("error:" + e.getMessage());
        }
        return "redirect:/cooperate/list";
    }

    @RequestMapping("/saveUpdate")
    public String saveUpdate(CooperationInfo info) {
        cooperateService.saveUpdate(info);
        return "redirect:/cooperate/list";
//        return "ok";
    }

    @RequestMapping("/create")
    public String cooperationCreate() {
        return "cooperateManage/cooperateCreate";
    }

    @RequestMapping
    public String delete(int id) {
        cooperateService.deleteCooperationById(id);
        return "redirect:/cooperate/list";
    }

    @ResponseBody
    @RequestMapping("/getCount")
    public String confirmDelete(int id) {
        int count = cooperateService.getCount(id);
        if (count == 0) {
            return "ok";
        }
        return "fail";
    }
}

package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.CooperateService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
    public String save(HttpServletRequest request, CooperationInfo info, @RequestParam(value = "file") MultipartFile file) {
        String path = request.getServletContext().getRealPath("/static/upload");
        String fileName = file.getOriginalFilename();
        info.setPhoto(fileName);
        File targetFile = new File(path, fileName);
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }
        //保存
        try {
            file.transferTo(targetFile);
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

    @ResponseBody
    @RequestMapping("/saveUpdate")
    public String saveUpdate(CooperationInfo info) {
        cooperateService.saveUpdate(info);
//        return "redirect:/mesh/list";
        return "ok";
    }

    @RequestMapping("/create")
    public String cooperationCreate() {
        return "cooperateManage/cooperateCreate";
    }


}

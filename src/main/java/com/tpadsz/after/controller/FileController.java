package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.FileService;
import com.tpadsz.after.utils.CommonManager;
import com.tpadsz.after.utils.PropertiesUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * @author hongjian.chen
 * @date 2019/7/26 9:30
 */

@Controller
@RequestMapping("/file")
public class FileController {

    private Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    private FileService fileService;

    @RequestMapping("/OTAFile")
    public String OTAFile(SearchDict dict, ModelMap modelMap) {
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = fileService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "fileManage/otaFile";
    }

    @RequestMapping("/history")
    public String history(SearchDict dict, ModelMap modelMap) {
        FileDTO info = fileService.getFileInfo(dict.getOid());
        if (info != null) {
            BeanUtils.copyProperties(info, dict);
        }
        dict = CommonManager.parseStr(dict);
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = fileService.getFileHistory(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "fileManage/otaRevisionHistory";
    }

    @RequestMapping("/addOta")
    public String addOta() {
        return "fileManage/addOta";
    }

    @RequestMapping("/upload")
    public String upload(Integer id, ModelMap modelMap) {
        FileDTO info = fileService.getFileInfo(id);
        modelMap.put("file", info);
        return "fileManage/uploadNewVersionOTAAdd";
    }

    @RequestMapping("/save")
    public String save(FileDTO info) {
        Map map = JSON.parseObject(JSON.toJSONString(info));
        fileService.saveFile(map);
        return "redirect:/file/OTAFile";
    }

    @ResponseBody
    @RequestMapping("/add")
    public String add(FileDTO info) {
        Map map = JSON.parseObject(JSON.toJSONString(info));
        fileService.saveFile(map);
        return map.get("result").toString();
    }

    @RequestMapping("/doUpload")
    public String save(FileDTO info, String type, @RequestParam(value = "file") MultipartFile file, ModelMap modelMap) {
        int oid = info.getId();
        String path = PropertiesUtil.getPath("otaFile");
        String prefix = PropertiesUtil.getPath("otaPath");
        String suffix = info.getOtaPath();
        info.setOtaPath(prefix + suffix);
        String fileName = file.getOriginalFilename();
        File targetFile = new File(path, fileName);
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }
        try {
            if (StringUtils.isNotEmpty(fileName)) {
                file.transferTo(targetFile);
                info.setOtaPath(prefix + fileName);
            }
        } catch (Exception e) {
            logger.error("error:" + e.getMessage());
        }
        if ("add".equals(type)) {
            fileService.updateFile(info);
            FileDTO fileDTO = fileService.getFileInfo(oid);
            modelMap.put("file", fileDTO);
            return "fileManage/uploadNewVersionOTAEdit";
        } else {
            Map map = JSON.parseObject(JSON.toJSONString(info));
            fileService.saveFile(map);
            return "redirect:/file/history?oid=" + oid;
        }
    }

    @ResponseBody
    @RequestMapping("/saveUpdate")
    public String saveUpdate(int id, String otaDesc) {
        FileDTO info = fileService.getFileInfo(id);
        if (StringUtils.isNotBlank(otaDesc)) {
            info.setOtaDesc(otaDesc);
        }
        Map map = JSON.parseObject(JSON.toJSONString(info));
        fileService.saveFile(map);
        return "ok";
    }

    @ResponseBody
    @RequestMapping("/updateFile")
    public String updateFile(FileDTO info) {
        try {
            fileService.saveUpdate(info);
        } catch (RepetitionException e) {
            return "fail";
        }
        return "ok";
    }

    @ResponseBody
    @RequestMapping("/checkCount")
    public String checkCount(FileDTO info) {
        try {
            fileService.getCount(info);
        } catch (RepetitionException e) {
            return "fail";
        }
        return "ok";
    }

    @RequestMapping("/editOta")
    public String editOta(Integer id, ModelMap modelMap) {
        FileDTO info = fileService.getFileInfo(id);
        modelMap.put("file", info);
        return "fileManage/editOta";
    }

    @ResponseBody
    @RequestMapping("/deleteFileById")
    public String deleteFileById(int id) {
        fileService.deleteFileById(id);
        return "ok";
    }

    @ResponseBody
    @RequestMapping("/deleteHistoryById")
    public String deleteHistoryById(int id) {
        fileService.deleteHistoryById(id);
        return "ok";
    }

    @RequestMapping("/uploadNewVersionOTAAdd")
    public String uploadNewVersionOTAAdd(Integer id, ModelMap modelMap) {
        FileDTO info = fileService.getFileInfo(id);
        modelMap.put("file", info);
        return "fileManage/uploadNewVersionOTAAdd";
    }

    @RequestMapping("/uploadNewVersionOTAEdit")
    public String uploadNewVersionOTAEdit(Integer id, ModelMap modelMap) {
        FileDTO info = fileService.getFileInfo(id);
        modelMap.put("file", info);
        return "fileManage/uploadNewVersionOTAEdit";
    }
}

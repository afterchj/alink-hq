package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.FileService;
import com.tpadsz.after.utils.PropertiesUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
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
        String str = dict.getUpdateDate();
        if (StringUtils.isNotBlank(str)) {
            String begin = str.substring(0, 10);
            String end = str.substring(str.length() - 10);
            dict.setBeginDate(begin);
            dict.setEndDate(end);
        }
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = fileService.getFileHistory(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        modelMap.put("dict", dict);
        return "fileManage/otaRevisionHistory";
    }

    @RequestMapping("/projectFileList")
    public String projectFileList() {
        return "fileManage/projectFileList";
    }


    @RequestMapping("/PCFile")
    public String PCFile() {
        return "fileManage/pcFile";
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
        String version = info.getOtaVersion();
        String otaVer = StringUtils.isEmpty(version) ? "v1.0.0" : version;
        info.setOtaVersion(otaVer);
        Map map = JSON.parseObject(JSON.toJSONString(info));
        fileService.saveFile(map);
        return "redirect:/file/OTAFile";
    }

    @ResponseBody
    @RequestMapping("/add")
    public String add(FileDTO info) {
        String version = info.getOtaVersion();
        String otaVer = StringUtils.isEmpty(version) ? "v1.0.0" : version;
        info.setOtaVersion(otaVer);
        Map map = JSON.parseObject(JSON.toJSONString(info));
        fileService.saveFile(map);
        return map.get("result").toString();
    }

    @RequestMapping("/doUpload")
    public String save(FileDTO info, String type, @RequestParam(value = "file") MultipartFile file, ModelMap modelMap) {
        int oid = info.getId();
        String path = PropertiesUtil.getPath("otaFile");
        String prefix = PropertiesUtil.getPath("otaPath");
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
            Map map = JSON.parseObject(JSON.toJSONString(info));
            fileService.saveFile(map);
        } catch (Exception e) {
            logger.error("error:" + e.getMessage());
        }
        FileDTO fileDTO = fileService.getFileInfo(oid);
        if ("add".equals(type)) {
            modelMap.put("file", fileDTO);
            return "fileManage/uploadNewVersionOTAEdit";
        } else {
            return "redirect:/file/history";
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
        fileService.saveUpdate(info);
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

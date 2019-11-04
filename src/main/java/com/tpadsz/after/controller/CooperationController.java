package com.tpadsz.after.controller;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.write.metadata.WriteSheet;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.CooperationTemplate;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.CooperateService;
import com.tpadsz.after.utils.AppUtils;
import com.tpadsz.after.utils.Encryption;
import com.tpadsz.after.utils.GenerateUtils;
import com.tpadsz.after.utils.PropertiesUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
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

    private static String account = "";
    private static String plain = "00000000";

    private Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list")
    public String cooperateList(SearchDict dict, ModelMap modelMap) {
        int parentId = dict.getParentId();
        String uid = AppUtils.getUserID();
        Map map = new HashMap();
        if (parentId != 0) {
            map.put("parentId", parentId);
        } else {
            map.put("uid", uid);
        }
        CooperationTemplate cooperationInfo = cooperateService.getParentCompany(map);
        parentId = parentId == 0 ? cooperationInfo.getId() : parentId;
        dict.setParentId(parentId);
        PageHelper.startPage(dict.getPageNum(), dict.getPageSize());
        List<Map> cooperationList = cooperateService.getByMap(dict);
        PageInfo<Map> pageInfo = new PageInfo(cooperationList, dict.getPageSize());
        if (pageInfo.getList().size() > 0) {
            modelMap.put("pageInfo", pageInfo);
        }
        CooperationTemplate parent = cooperateService.getParent(parentId);
        String company = parent.getConame();
        modelMap.put("company", company);
        modelMap.put("info", dict);
        return "cooperateManage/cooperateList";
    }

    @RequestMapping("/info")
    public String cooperationInfo(int id, ModelMap modelMap) {
        CooperationInfo info = cooperateService.getCooperationInfo(id);
        modelMap.put("info", info);
        return "cooperateManage/cooperateInfo";
    }

    @RequestMapping("/edit")
    public String cooperationEdit(int id, ModelMap modelMap) {
        CooperationInfo info = cooperateService.getCooperationInfo(id);
        modelMap.put("info", info);
        return "cooperateManage/cooperateEdit";
    }

    @RequestMapping("/save")
    public String save(CooperationInfo info, @RequestParam(value = "file") MultipartFile file) {
        Map map = new HashMap();
        String uid = AppUtils.getUserID();
        map.put("uid", uid);
        CooperationTemplate cooperationInfo = cooperateService.getParentCompany(map);
        int fid = cooperationInfo.getId();
        info.setParent_id(fid);
        String path = PropertiesUtil.getPath("img");
        String fileName = file.getOriginalFilename();
        File targetFile = new File(path, fileName);
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }
        try {
            if (StringUtils.isNotEmpty(fileName)) {
                file.transferTo(targetFile);
                info.setPhoto(fileName);
            }
            if (info.getId() == 0) {
                Map param = JSONObject.parseObject(JSON.toJSONString(info));
                param.put("account", account);
                Encryption.HashPassword password = Encryption.encrypt(Encryption.getMD5Str(plain));
                param.put("pwd", password.getPassword());
                param.put("salt", password.getSalt());
                cooperateService.save(param);
            } else {
                cooperateService.saveUpdate(info);
            }
        } catch (Exception e) {
            logger.error("error:" + e.getMessage());
        }
        return "redirect:/cooperate/list?parentId=" + info.getParentId();
    }

    @RequestMapping("/show")
    @ResponseBody
    public Map createAccount() {
        account = GenerateUtils.generateAccount(GenerateUtils.getCharAndNumr(8));
        Map map = new HashMap();
        map.put("account", account);
        map.put("pwd", plain);
        return map;
    }

    @RequestMapping("/saveUpdate")
    public String saveUpdate(CooperationInfo info) {
        cooperateService.saveUpdate(info);
        Map map = new HashMap();
        map.put("fid", info.getId());
        map.put("status", info.getStatus());
        cooperateService.updateUser(map);
        logger.warn("result=" + map.get("result"));
        return "redirect:/cooperate/list?parentId=" + info.getParentId();
//        return "ok";
    }

    @RequestMapping("/create")
    public String cooperationCreate() {
        return "cooperateManage/cooperateCreate";
    }

    @RequestMapping("/delete")
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

    @ResponseBody
    @RequestMapping(value = "/exportExcel")
    public void getExcel(SearchDict dict, HttpServletResponse response) {
        Map map = new HashMap();
        int parentId = dict.getParentId();
        String uid = AppUtils.getUserID();
        if (parentId > 1) {
            map.put("parentId", parentId);
        } else {
            map.put("uid", uid);
        }
        CooperationTemplate parent = cooperateService.getParentCompany(map);
        CooperationTemplate template = cooperateService.getParent(parentId);
        try {
            String fileName = URLEncoder.encode(cooperateService.parseName(template), "UTF-8");
            Map<Integer, List<CooperationTemplate>> company = cooperateService.buildExcelData(parent);
            response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xls");
            ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).build();
            int i = 0;
            for (List<CooperationTemplate> companyList : company.values()) {
                i++;
                WriteSheet writeSheet = EasyExcel.writerSheet(i, "sheet" + i).head(CooperationTemplate.class).build();
                excelWriter.write(companyList, writeSheet);
            }
            excelWriter.finish();
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }
}

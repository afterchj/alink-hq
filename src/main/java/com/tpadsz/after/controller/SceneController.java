package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.SceneList;
import com.tpadsz.after.service.SceneService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/5/7.
 */

@Controller
@RequestMapping("/scene")
public class SceneController {
    @Resource
    private SceneService sceneService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String sceneName, String sceneId,
                       String meshName, String meshId, Model model) {
        if (pageNum == null) {
            pageNum = 1;   //设置默认当前页
        }
        if (pageNum <= 0) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 10;    //设置默认每页显示的数据数
        }
        try {
            List<SceneList> list = new ArrayList<>();
            PageHelper.startPage(pageNum, pageSize);
            list = sceneService.searchSceneList(sceneName, sceneId, meshName, meshId);
            PageInfo<SceneList> pageInfo = new PageInfo<>(list, pageSize);
            if (pageInfo.getList().size() > 0) {
                model.addAttribute("pageInfo", pageInfo);
            }
            model.addAttribute("sceneName", sceneName);
            model.addAttribute("sceneId", sceneId);
            model.addAttribute("meshName", meshName);
            model.addAttribute("meshId", meshId);
        } catch (Exception e) {
        }
        return "sceneManage/sceneList";
    }


}

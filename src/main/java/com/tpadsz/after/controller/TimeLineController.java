package com.tpadsz.after.controller;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.TimeLine;
import com.tpadsz.after.service.TimeLineService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @program: alink-hq
 * @description: 定时任务
 * @author: Mr.Ma
 * @create: 2019-05-28 10:14
 **/
@Controller
@RequestMapping("/timer")
public class TimeLineController {

    @Resource
    private TimeLineService timeLineService;

    /**
     * 跳转到timerList.html
     * @param model
     * @return
     */
    @RequestMapping("/list")
    public String timerList(Model model, int id,Integer pageNum,Integer pageSize,String timeFlag) {
        String projectName = timeLineService.getProjectNameByMid(id);
        PageInfo<TimeLine> pageInfo = timeLineService.getTimeLineByMid(id,pageNum,pageSize,timeFlag);
        model.addAttribute("pageInfo",pageInfo);
        model.addAttribute("projectName",projectName);
        model.addAttribute("id",id);

        return "timerManage/timerList";
    }

    @RequestMapping("/updateTname")
    @ResponseBody
    public Map<String,String> updateTname(int id,String tname,int mid){
        Map<String,String> map = new HashMap<>();
        map.put("flag","true");
        boolean flag = timeLineService.getTnameById(mid,tname);
        if (!flag){
            //名称不唯一
            map.put("flag","false");
            timeLineService.updateTnameById(id,tname);
            map.put("success","success");
        }
        return map;
    }

    /**
     * 跳转到timerDetail.html
     * @return
     */
    @RequestMapping("/detail")
    public String timerDetail() {
        return "timerManage/timerDetail";
    }
}

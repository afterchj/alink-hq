package com.tpadsz.after.controller;

import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Firm;
import com.tpadsz.after.entity.OptionList;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.service.AccountService;
import com.tpadsz.after.service.MeshService;
import com.tpadsz.after.service.ProjectService;
import com.tpadsz.after.utils.GenerateUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

/**
 * Created by chenhao.lu on 2019/4/8.
 */

@Controller
@RequestMapping("/project")
public class ProjectController {
    @Resource
    private ProjectService projectService;

    @Resource
    private AccountService accountService;

    @Resource
    private MeshService meshService;


    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Integer pageNum, Integer pageSize, String account,String uname, String projectName,String coname,
                       String startCreateDate, String endCreateDate, String startUpdateDate, String endUpdateDate,
                       String sortFlag, HttpSession session, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
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
            Integer role_id = accountService.findRoleIdByUid(uid);
            List<ProjectList> list = new ArrayList<>();
            if (startCreateDate != null && !"".equals(startCreateDate)) {
                if (startCreateDate.equals(endCreateDate)) {
                    endCreateDate = GenerateUtils.getAfterDate(startCreateDate);
                }
            }
            if (startUpdateDate != null && !"".equals(startUpdateDate)) {
                if (startUpdateDate.equals(endUpdateDate)) {
                    endUpdateDate = GenerateUtils.getAfterDate(startUpdateDate);
                }
            }

            if (role_id == 1 || role_id == 2) {
                PageHelper.startPage(pageNum, pageSize);
                list = projectService.searchBySuper(account, uname, projectName, coname, startCreateDate, endCreateDate,
                        startUpdateDate, endUpdateDate, sortFlag);
            } else if (role_id == 3 || role_id == 14) {
                List<Integer> ids = projectService.findProjectList(uid);
                if (ids.size() != 0) {
                    PageHelper.startPage(pageNum, pageSize);
                    list = projectService.searchByManager(account, uname, projectName,coname, startCreateDate, endCreateDate,
                            startUpdateDate, endUpdateDate, ids, sortFlag);
                }
            } else if (role_id == 4) {
                PageHelper.startPage(pageNum, pageSize);
                list = projectService.searchByUser(account, uname, projectName,coname, startCreateDate, endCreateDate,
                        startUpdateDate, endUpdateDate, uid, sortFlag);
            }
            PageInfo<ProjectList> pageInfo = new PageInfo<>(list, pageSize);
            if (pageInfo.getList().size() > 0) {
                model.addAttribute("pageInfo", pageInfo);
            }
            model.addAttribute("account", account);
            model.addAttribute("uname",uname);
            model.addAttribute("projectName", projectName);
            model.addAttribute("coname", coname);
            model.addAttribute("role_id", role_id);
            model.addAttribute("startCreateDate", startCreateDate);
            model.addAttribute("endCreateDate", endCreateDate);
            model.addAttribute("startUpdateDate", startUpdateDate);
            model.addAttribute("endUpdateDate", endUpdateDate);
            model.addAttribute("sortFlag", sortFlag);
        } catch (Exception e) {
        }
        return "projectManage/projectList";
    }

    @RequestMapping(value = "/createProject", method = RequestMethod.GET)
    public String createProject(HttpSession session, Model model) {
//        User loginUser = (User) session.getAttribute("user");
//        String uid = loginUser.getId();
//        Integer role_id = accountService.findRoleIdByUid(uid);
//        Integer flag;
//        if (role_id == 4) {
//            flag = 0;
//        } else {
//            flag = 1;
//        }
//        model.addAttribute("flag", flag);
        return "projectManage/createProject";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> create(HttpSession session, String projectName) {
        Map<String, String> map = new HashMap<>();
        User loginUser = (User) session.getAttribute("user");
        try {
            int flag = projectService.createProject(projectName, loginUser);
            if (flag == 0) {
                map.put("result", ResultDict.REPEAT_NAME.getCode());
            } else if (flag == 1) {
                map.put("result", ResultDict.SUCCESS.getCode());
            }
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/rename", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> rename(String account, Integer projectId, String projectName) {
        Map<String, String> map = new HashMap<>();
        try {
            int flag = projectService.renameProject(account, projectId, projectName);
            if (flag == 0) {
                map.put("result", ResultDict.REPEAT_NAME.getCode());
            } else if (flag == 1) {
                map.put("result", ResultDict.SUCCESS.getCode());
            }
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/transferPage", method = RequestMethod.GET)
    public String transferPage(HttpSession session, String ids, Model model) {
        User loginUser = (User) session.getAttribute("user");
        String uid = loginUser.getId();
        try {
            String[] ids1 = ids.split(",");
            List<String> list = new ArrayList(Arrays.asList(ids1));
            List<Map> projectMap = projectService.selectByPid(list);
            Integer role_id = accountService.findRoleIdByUid(uid);
            List<Firm> firmList = accountService.getFirmInfo(role_id, uid,1);
            model.addAttribute("ids", ids);
            model.addAttribute("projectMap", projectMap);
            model.addAttribute("firmList", firmList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "projectManage/projectTurnOver";
    }

    @RequestMapping(value = "/findAccountByFid", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, List> findAccountByFid(Integer fid, Model model) {
        Map<String, List> map = new HashMap<>();
        List<User> accounts = accountService.findAccountByFid(fid);
        map.put("accounts", accounts);
        return map;
    }

    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> transfer(HttpSession session, String idss, String uid) {
        Map<String, String> map = new HashMap<>();
        String[] ids1 = idss.split(",");
        List<String> list = new ArrayList(Arrays.asList(ids1));
        User loginUser = (User) session.getAttribute("user");
        String userId = loginUser.getId();
        int count = 0;
        try {
            Integer role_id = accountService.findRoleIdByUid(userId);
            for (String id : list) {
                if (role_id == 1 || role_id == 2) {
                    count = projectService.findProjectByProjectId(Integer.parseInt(id));
                } else if (role_id == 3) {
                    List<Integer> ids = projectService.findProjectList(userId);
                    if (ids.contains(Integer.parseInt(id))) {
                        count = 1;
                    }
                }
                if (count != 0) {
                    projectService.transferProject(Integer.parseInt(id), uid);
                }
            }
            map.put("result", ResultDict.SUCCESS.getCode());
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }


    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(String projectInfo) {
        Map<String, String> map = new HashMap<>();
        int lightFlag = 0;
        List<ProjectList> projectList = JSONArray.parseArray(projectInfo, ProjectList.class);
        try {
            for (ProjectList project : projectList) {
                User user = accountService.findByAccount(project.getAccount());
                lightFlag = projectService.findLightByPid(project.getId(), user.getId());
                if(lightFlag>0){
                    map.put("result", ResultDict.LIGHT_EXISTED.getCode());
                    break;
                }
                projectService.delete(user.getId(), project.getId());
            }
            if(lightFlag==0) {
                map.put("result", ResultDict.SUCCESS.getCode());
            }
        } catch (Exception e) {
            map.put("result", ResultDict.SYSTEM_ERROR.getCode());
        }
        return map;
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(String projectName, String account, String coname, Integer meshNum, Integer projectId, Model model) {
        Map dict = new HashMap();
        dict.put("projectId", projectId);
        OptionList project = meshService.getProject(dict);
        int placeNum = 0;
        int groupNum = 0;
        int lightNum = 0;
        User user = new User();
        if (account != null) {
            user = accountService.findByAccount(account);
            if (meshNum > 0) {
                placeNum = projectService.findPlaceNum(projectId);
                groupNum = projectService.findGroupNum(projectId);
                lightNum = projectService.findLightNum(projectId);
            }
        } else {
            List<ProjectList> list = projectService.findNumAndUid(projectId);
            meshNum = list.size();
            if (list.size() != 0) {
                ProjectList projectList = projectService.findAccountAndConame(list.get(0).getUid());
                user.setAccount(projectList.getAccount());
                user.setMobile(projectList.getMobile());
                user.setUname(projectList.getUname());
                coname = projectList.getConame();
                placeNum = projectService.findPlaceNum(projectId);
                groupNum = projectService.findGroupNum(projectId);
                lightNum = projectService.findLightNum(projectId);
            }
        }
        model.addAttribute("projectId", projectId);
        model.addAttribute("mid", project.getMid());
        model.addAttribute("projectName", projectName);
        model.addAttribute("meshNum", meshNum);
        model.addAttribute("placeNum", placeNum);
        model.addAttribute("groupNum", groupNum);
        model.addAttribute("lightNum", lightNum);
        model.addAttribute("user", user);
        model.addAttribute("coname", coname);
        return "projectManage/projectDetail";
    }

}

package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.realm.EasyTypeToken;
import com.tpadsz.after.service.UserService;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by hongjian.chen on 2019/4/3.
 */
@Controller
public class HomeController {

    private Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/toLogin")
    public String toLogin() {
        return "login";
    }

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

    @RequestMapping("/picture")
    public String picture() {
        return "picture";
    }

    @ResponseBody
    @RequestMapping("/show")
    public List<User> show() {
        List<User> list = userService.selectAll();
        return list;
    }

    @ResponseBody
    @RequestMapping("/test")
    public String test(String account) {
        List<User> list = userService.selectAll();
        return "";
    }

    @RequestMapping("/login")
    public String login(User user, HttpSession session, ModelMap map) {
        String pwd = user.getPwd();
        EasyTypeToken token = null;
        logger.info("username=" + user.getUname() + ",pwd=" + pwd);
        if (StringUtils.isEmpty(pwd)) {
            token = new EasyTypeToken(user.getUname());
        } else token = new EasyTypeToken(user.getUname(), user.getPwd());
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
        } catch (Exception e) {
            if (e instanceof UnknownAccountException) {
                map.put("errMsg",  e.getMessage());
                return "/login";
            } else if (e instanceof LockedAccountException) {
                map.put("errMsg", e.getMessage());
                return "/login";
            } else if (e instanceof DisabledAccountException) {
                map.put("errMsg",  e.getMessage());
                return "/login";
            } else if (e instanceof IncorrectCredentialsException) {
                map.put("errMsg",  e.getMessage());
                return "/login";
            }
        }
        User loginUser = userService.selectByUsername(user.getUname());
        session.setAttribute("logingUser", loginUser);
        return "/loginSuccess";
    }

    @RequestMapping("/userList")
    public String userList(User user, ModelMap map, @RequestParam(required = false, defaultValue = "1") Integer page, @RequestParam(required = false, defaultValue = "5") Integer rows) {
        logger.info("username=" + user.getUname() + ",pwd=" + user.getPwd());
        List<User> list = userService.selectAll();
        PageHelper.startPage(page, 8);
        map.put("users", list);
        return "/loginSuccess";
    }

    /**
     * 登出，清除session
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/user/logOut")
    public String logOut(HttpSession session) {
        session.removeAttribute("loginUser");
        return "redirect:/index";
    }
}

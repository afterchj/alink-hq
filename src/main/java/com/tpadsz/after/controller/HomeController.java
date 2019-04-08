package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.service.UserService;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping("/login")
    public String login(User user, HttpSession session) {
        logger.info("username=" + user.getUname() + ",pwd=" + user.getPwd());
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUname(), user.getPwd());
        Subject subject = SecurityUtils.getSubject();
        subject.login(token);
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

package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.exception.InvalidCodeException;
import com.tpadsz.after.realm.EasyTypeToken;
import com.tpadsz.after.realm.ShiroDbRealm;
import com.tpadsz.after.service.UserService;
import com.tpadsz.after.service.ValidationService;
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
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/3.
 */
@Controller
public class HomeController {

    private Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    private UserService userService;

    @Autowired
    private ValidationService validationService;

    @RequestMapping("/")
    public String index() {
        return "login";
    }

    @RequestMapping("/toLogin")
    public String toLogin() {
        return "login";
    }

    @RequestMapping("/toRest")
    public String toRest() {
        return "forgetPwd";
    }

    @RequestMapping("/home")
    public String home() {
        return "index";
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

    @ResponseBody
    @RequestMapping("/checkUser")
    public String checkUser(User user) {
        String str;
        Map map = new HashMap();
        String uname = user.getUname();
        String mobile = user.getMobile();
        if (StringUtils.isNotEmpty(uname)) {
            map.put("uname", uname);
        }
        if (StringUtils.isNotEmpty(mobile)) {
            map.put("mobile", mobile);
        }
        int count = userService.getCount(map);
        if (count > 0) {
            str = "success";
        } else {
            str = "failure";
        }
        return str;
    }

    @ResponseBody
    @RequestMapping("/checkCode")
    public String checkCode(String mobile, String code) {
        String str = "";
        try {
            validationService.checkCode(code, mobile);
            str = "success";
        } catch (InvalidCodeException e) {
            logger.error("errMsg" + e.getMessage());
            str = "failure";
        } finally {
            logger.info("str=" + str + ",mobile=" + mobile + ",code=" + code);
            return str;
        }
    }

    @ResponseBody
    @RequestMapping("/verify")
    public String sendCode(String mobile, String email) {
        logger.info("mobile=" + mobile + ",email=" + email);
        String str = "";
        Map map = new HashMap();
        if (StringUtils.isNotEmpty(mobile)) {
            map.put("mobile", mobile);
            str = "mobile";
        }
        if (StringUtils.isNotEmpty(email)) {
            map.put("email", email);
            str = "email";
        }
        int count = userService.getCount(map);
        if (count == 0) {
            str = str + "false";
        } else {
            try {
                if (StringUtils.isNotEmpty(mobile)) {
                    validationService.sendCode("13", mobile);
                    str = "success";
                }
                if (StringUtils.isNotEmpty(email)) {
                    validationService.sendEmailCode(email);
                    str = "success";
                }
            } catch (Exception e) {
                str = "failure";
            }
        }
        return str;
    }

    @ResponseBody
    @RequestMapping("/restPwd")
    public String restPwd(String mobile, String email, String pwd) {
        String str;
        Map map = new HashMap();
        if (StringUtils.isNotEmpty(mobile)) {
            map.put("mobile", mobile);
        }
        if (StringUtils.isNotEmpty(email)) {
            map.put("email", email);
        }
        logger.info("mobile=" + mobile + ",email=" + email + "pwd=" + pwd);
        ShiroDbRealm.HashPassword hashPassword = new ShiroDbRealm().encrypt(pwd);
        System.out.println(hashPassword.password + "\t" + hashPassword.salt);
        map.put("pwd", hashPassword.password);
        map.put("salt", hashPassword.salt);
        try {
            userService.updatePwd(map);
            str = "success";
        } catch (Exception e) {
            logger.error(e.getMessage());
            str = "failure";
        }
        return str;
    }

    @RequestMapping("/login")
    public String login(User user, HttpSession session, ModelMap map) {
        String userName = "";
        String pwd = user.getPwd();
        EasyTypeToken token;
        logger.info("username=" + user.getUname() + ",pwd=" + pwd);
        if (StringUtils.isEmpty(pwd)) {
            userName = user.getMobile();
            token = new EasyTypeToken(userName);
        } else {
            token = new EasyTypeToken(user.getUname(), user.getPwd());
        }
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
        } catch (Exception e) {
            logger.info("errMsg=" + e);
            if (e instanceof UnknownAccountException) {
                map.put("errMsg", e.getMessage());
                return "/index";
            } else if (e instanceof LockedAccountException) {
                map.put("errMsg", e.getMessage());
                return "/index";
            } else if (e instanceof DisabledAccountException) {
                map.put("errMsg", e.getMessage());
                return "/index";
            } else if (e instanceof IncorrectCredentialsException) {
                map.put("errMsg", ResultDict.PASSWORD_NOT_CORRECT.getValue());
                return "/index";
            }
        }
        User loginUser = userService.selectByUsername(userName);
        session.setAttribute("logingUser", loginUser);
        return "/loginSuccess";
    }

    @RequestMapping("/userList")
    public String userList(ModelMap map, Integer page, Integer rows) {
        logger.info("userList..." + page);
//        System.out.println("userList..." + page);
        if (null == page || page < 1) {
            page = 1;
        }
        PageHelper.startPage(page, 8);
        List<User> list = userService.selectAll();
        logger.info("page=" + page + ",size=" + rows);
        map.put("page", page);
        map.put("users", list);
        return "/userList";
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

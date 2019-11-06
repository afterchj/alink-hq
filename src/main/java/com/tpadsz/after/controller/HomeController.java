package com.tpadsz.after.controller;

import com.tpadsz.after.entity.User;
import com.tpadsz.after.entity.dd.ResultDict;
import com.tpadsz.after.exception.InvalidCodeException;
import com.tpadsz.after.realm.EasyTypeToken;
import com.tpadsz.after.realm.ShiroDbRealm;
import com.tpadsz.after.service.UserService;
import com.tpadsz.after.service.ValidationService;
import com.tpadsz.after.utils.Encryption;
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
    public String login() {
        return "login";
    }

    @RequestMapping("/index")
    public String index() {
        return "welcome";
    }

    @RequestMapping("/authError")
    public String authError() {
        return "authError";
    }

//    @RequestMapping("/productList")
//    public String productList() {
//        return "productManage/productList";
//    }



    @ResponseBody
    @RequestMapping("/checkUser")
    public String checkUser(String uname) {
        String str;
        Map map = new HashMap();
        if (StringUtils.isNotEmpty(uname)) {
            map.put("uname", uname);
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
        } catch (Exception e) {
            logger.error("errMsg:" + e);
            if (e instanceof InvalidCodeException) {
                if ("300".equals(((InvalidCodeException) e).getCode())) {
                    str = "failure";
                } else {
                    str = "expire";
                }
            }
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
        try {
            if (StringUtils.isNotEmpty(mobile)) {
                validationService.sendCode("13", mobile);
                str = "success";
            }
            if (StringUtils.isNotEmpty(email)) {
                validationService.sendEmailCode(email, "reset");
                str = "success";
            }
        } catch (Exception e) {
            str = "failure";
        } finally {
            return str;
        }
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
        logger.info("mobile=" + mobile + ",email=" + email + ",pwd=" + pwd);
        ShiroDbRealm.HashPassword hashPassword = new ShiroDbRealm().encrypt(Encryption.getMD5Str(pwd));
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
        String userName = user.getUname();
        String pwd = user.getPwd();
        String mobile = user.getMobile();
        String email = user.getEmail();
        EasyTypeToken token;
        if (StringUtils.isNotEmpty(mobile)) {
            userName = mobile;
            token = new EasyTypeToken(userName);
        } else if (StringUtils.isNotEmpty(email)) {
            userName = email;
            token = new EasyTypeToken(userName);
        } else {
            token = new EasyTypeToken(userName, Encryption.getMD5Str(pwd));
        }
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
        } catch (Exception e) {
            logger.info("errMsg=" + e);
            if (e instanceof UnknownAccountException) {
                map.put("errMsg", e.getMessage());
                return "login";
            } else if (e instanceof LockedAccountException) {
                map.put("errMsg", e.getMessage());
                return "login";
            } else if (e instanceof DisabledAccountException) {
                map.put("errMsg", e.getMessage());
                return "login";
            } else if (e instanceof IncorrectCredentialsException) {
                map.put("errMsg", ResultDict.PASSWORD_NOT_CORRECT.getValue());
                return "login";
            }
        }
        User loginUser = userService.selectByUsername(userName);
        session.setAttribute("user", loginUser);
        return "welcome";
    }

    /**
     * 登出，清除session
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "logOut")
    public String logOut(HttpSession session) {
        logger.info("logOut...");
        session.removeAttribute("user");
        return "redirect:/";
    }
}

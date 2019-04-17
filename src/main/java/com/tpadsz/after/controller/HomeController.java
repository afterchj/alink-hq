package com.tpadsz.after.controller;

import com.github.pagehelper.PageHelper;
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
    public String login() {
        return "login";
    }

    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/welcome")
    public String welcome() {
        return "welcome";
    }

    @RequestMapping("/useList")
    public String useList() {
        return "userManage/useList";
    }

    @RequestMapping("/projectList")
    public String projectList() {
        return "projectManage/projectList";
    }

    @RequestMapping("/createAccount")
    public String createAccount() {
        return "userManage/createAccount";
    }

    @RequestMapping("/useTurnOver")
    public String useTurnOver() {
        return "userManage/useTurnOver";
    }

    @RequestMapping("/changeEmail")
    public String changeEmail() {
        return "account/changeEmail";
    }

    @RequestMapping("/bindEmail")
    public String bindEmail() {
        return "account/bindEmail";
    }

    @RequestMapping("/bindPhone")
    public String bindPhone() {
        return "account/bindPhone";
    }

    @RequestMapping("/changePhone")
    public String changePhone() {
        return "account/changePhone";
    }

    @RequestMapping("/fillUsername")
    public String fillUsername() {
        return "account/fillUsername";
    }

    @RequestMapping("/changeUsername")
    public String changeUsername() {
        return "account/changeUsername";
    }

    @RequestMapping("/account")
    public String account() {
        return "account/account";
    }

    @RequestMapping("/changePassword")
    public String changePassword() {
        return "account/changePassword";
    }

    @RequestMapping("/toLogin")
    public String toLogin() {
        return "index";
    }

    @RequestMapping("/toRest")
    public String toRest() {
        return "forgetPwd";
    }

    @RequestMapping("/home")
    public String home() {
        return "projectManage/projectManage";
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
    public String checkUser(String uname) {
        logger.info("user:" + uname);
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
        String str = "";
        Map map = new HashMap();
        if (StringUtils.isNotEmpty(mobile)) {
            map.put("uname", mobile);
            str = "mobile_";
        }
        if (StringUtils.isNotEmpty(email)) {
            map.put("uname", email);
            str = "email_";
        }
        int count = userService.getCount(map);
        logger.info("mobile=" + mobile + ",email=" + email + ",count=" + count);
        if (count == 0) {
            str = str + "failure";
        } else {
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
        EasyTypeToken token;
        if (StringUtils.isEmpty(pwd)) {
            userName = user.getMobile();
            token = new EasyTypeToken(userName);
        } else {
            token = new EasyTypeToken(userName, Encryption.getMD5Str(pwd));
        }
        logger.info("userName=" + userName + ",pwd=" + pwd);
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
        return "userList";
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
        return "redirect:/index";
    }
}

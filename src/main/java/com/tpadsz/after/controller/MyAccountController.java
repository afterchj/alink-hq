package com.tpadsz.after.controller;

import com.tpadsz.after.entity.MyAccount;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.exception.InvalidCodeException;
import com.tpadsz.after.service.MyAccountService;
import com.tpadsz.after.service.UserService;
import com.tpadsz.after.service.ValidationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @program: blt-hq
 * @description: 我的账号
 * @author: Mr.Ma
 * @create: 2019-04-02 10:21
 **/
@Controller
@RequestMapping("/myAccount")
public class MyAccountController {

    @Resource
    private MyAccountService myAccountService;

    @Resource
    private ValidationService validationService;

    @Resource
    private UserService userService;

    /**
     * 修改密码
     *
//     * @param account 账号
     * @param newPwd  新密码
     * @return
     */
    @RequestMapping(value = "/changePwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String>confirmChange( String newPwd, HttpSession session) {
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        boolean success = myAccountService.updatePwd(account, newPwd);
        Map<String, String> map = new HashMap<>();
        String info = "密码修改成功";
        if (!success) {
            info = "加载失败，请重新尝试";
        }
        map.put("success", info);
        return map;
    }

    @RequestMapping(value = "/changeUserName", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> changeUserName( String uname,String flag, HttpSession session) {
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
//        String uname = loginUser.getUname();
        Map<String, String> map = new HashMap<>();
        boolean success = myAccountService.updateUserName(account, uname);
        String info = new String();
        if (success) {
            if ("0".equals(flag)) {
                //填写用户名
                info = "用户名填写成功";
            }
            if ("1".equals(flag)) {
                //修改用户名
                info = "修改用户名成功";
            }
            User loginUser2 = userService.selectByUsername(uname);
            session.setAttribute("user", loginUser2);
        } else {
            info = "加载失败，请重新尝试";
        }
        map.put("success", info);

        return map;
    }

    /**
     * 查询用户名是否存在
     *
     * @param uname
     * @return
     */
    @RequestMapping(value = "/getUserName", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> getUserName(String uname) {
        Map<String, String> map = new HashMap<>();
        boolean success = myAccountService.getUserName(uname);
        String info;
        if (success) {
            //存在账号
            info = "true";
        } else {
            info = "false";
        }
        map.put("info", info);
        return map;
    }


    /**
     * 发送手机验证码
     *
     * @param mobile 手机
     * @return
     */
    @RequestMapping(value = "/sendCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> sendCode(String mobile) {
        int count = myAccountService.getMobile(mobile);
        Map<String, String> map = new HashMap<>();
//        String sysCode;
        if (count > 0) {
            map.put("info", "isBinding");
            return map;
        }
        try {
            validationService.sendCode("13", mobile);
            map.put("info", "success");
//            map.put("sysCode",sysCode);
            return map;
        } catch (Exception e) {
            map.put("info", "error");
            return map;
        }
    }

    /**
     * 发送email激活码
     *
     * @param email 邮箱
     * @return
     */
    @RequestMapping(value = "/sendEmailCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> sendEmailCode(String email) {
        int count = myAccountService.getEamil(email);
        Map<String, String> map = new HashMap<>();
        if (count > 0) {
            map.put("info", "isBinding");
            return map;
        }
        try {
            validationService.sendEmailCode(email, "bind");
            map.put("info", "success");
            return map;
        } catch (Exception e) {
            map.put("info", "error");
            return map;
        }
    }

    @RequestMapping(value = "/changeMobile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> changeMobile(String mobile, String code, HttpSession session) {
        Map<String, String> map = new HashMap<>();
        boolean success;
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        try {
            validationService.checkCode(code, mobile);
            success = myAccountService.updateMobile(account, mobile);
            String info = "success";
            if (!success) {
                info = "dbError";
            }
            map.put("info", info);
            return map;
        } catch (InvalidCodeException e) {
//            if ("300".equals(e.getCode())) {
            //验证码不正确
            map.put("info", "codeError");
//            }
            return map;
        }
    }

    @RequestMapping(value = "/changeEmail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> changeEmail(String email, String code, HttpSession session) {
        Map<String, String> map = new HashMap<>();
        boolean success;
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        try {
            validationService.checkCode(code, email);
            success = myAccountService.updateEmail(account, email);
            String info = "success";
            if (!success) {
                info = "dbError";
            }
            map.put("info", info);
            return map;
        } catch (InvalidCodeException e) {
            //激活码不正确
            map.put("info", "codeError");
            return map;
        }
    }

    /**
     * 展示我的账号信息
     * 跳转到account.html
     * @param model
     * @return
     */
    @RequestMapping(value = "/myAccount",method = RequestMethod.GET)
    public String myAccount(Model model,HttpSession session) {
        User loginUser = (User) session.getAttribute("user");
        String account = loginUser.getAccount();
        String id = loginUser.getId();
        MyAccount myAccount = myAccountService.getAllByAccount(account);
        Map<String,Object> map = myAccountService.getComputeInfoByUid(id);
        model.addAttribute("myAccount", myAccount);
        model.addAttribute("computeInfo",map);
        return "myAccount/account";
    }

    /**
     * 跳转changePassword.html
     *
//     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/pwd", method = RequestMethod.GET)
//    public String pwd(String account, Model model) {
    public String pwd( Model model) {
//        model.addAttribute("account", account);
        return "myAccount/changePassword";
    }

    /**
     * 跳转fillUsername.html
     *
//     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/fillUname", method = RequestMethod.GET)
    public String fillUname( String flag, Model model) {
//        model.addAttribute("account", account);

        model.addAttribute("flag", flag);
        return "myAccount/fillUsername";
    }

    /**
     * 跳转changeUsername.html
     *
//     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifiUname", method = RequestMethod.GET)
    public String modifiUname( String flag, Model model, HttpSession session) {
//        model.addAttribute("account", account);
//        model.addAttribute("uname", uname);
        User loginUser = (User) session.getAttribute("user");
        String uname = loginUser.getUname();
        model.addAttribute("uname", uname);
        model.addAttribute("flag", flag);
        return "myAccount/changeUsername";
    }

    /**
     * 跳转bindPhone.html
     *
//     * @param account
     * @param flag
     * @param model
     * @return
     */
    @RequestMapping(value = "/fillMobile", method = RequestMethod.GET)
    public String fillMobile(String flag, Model model) {
//        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "myAccount/bindPhone";
    }

    /**
     * 跳转changePhone.html
     *
//     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifiMobile", method = RequestMethod.GET)
    public String modifiMobile( String flag, Model model) {
//        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "myAccount/changePhone";
    }

    /**
     * 跳转bindEmail.html
     *
//     * @param account
     * @param flag
     * @param model
     * @return
     */
    @RequestMapping(value = "/fillEmail", method = RequestMethod.GET)
    public String fillEmail( String flag, Model model) {
//        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "myAccount/bindEmail";
    }

    /**
     * 跳转changeEmail.html
     *
//     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifiEmail", method = RequestMethod.GET)
    public String modifiEmail( String flag, Model model) {
//        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "myAccount/changeEmail";
    }
}

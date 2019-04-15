package com.tpadsz.after.controller;

import com.tpadsz.after.entity.MyAccount;
import com.tpadsz.after.exception.InvalidCodeException;
import com.tpadsz.after.service.MyAccountService;
import com.tpadsz.after.service.ValidationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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

    /**
     * 修改密码
     * @param account 账号
     * @param newPwd  新密码
     * @return
     */
    @RequestMapping(value = "/changePwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> confirmChange(String account, String newPwd) {
        boolean success = myAccountService.updatePwd(account, newPwd);
        Map<String,String> map = new HashMap<>();
        String info="密码修改成功";
        if (!success) {
            info="密码修改失败";
        }
        map.put("success",info);
        return map;
    }

    @RequestMapping(value = "/changeUserName", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> changeUserName(String account, String uname,String flag){
        Map<String, String> map = new HashMap<>();
        boolean success = myAccountService.updateUserName(account,uname);
        String info = new String();
        if ("0".equals(flag)){
            //填写用户名
            info="用户名填写成功";
        }
        if ("1".equals(flag)){
            //修改用户名
            info="修改用户名成功";
        }
        if (!success){
            info="加载失败请重试";
        }
        map.put("success", info);
        return map;
    }

    /**
     * 发送手机验证码
     * @param mobile 手机
     * @return
     */
    @RequestMapping(value = "/sendCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> sendCode(String mobile){
        int count = myAccountService.getMobile(mobile);
        Map<String, String> map = new HashMap<>();
//        String sysCode;
        if (count>0){
            map.put("info","isBinding");
            return map;
        }
        try {
            validationService.sendCode("13",mobile);
            map.put("info","success");
//            map.put("sysCode",sysCode);
            return map;
        } catch (Exception e) {
            map.put("info","error");
            return map;
        }
    }

    /**
     * 发送email激活码
     * @param email 邮箱
     * @return
     */
    @RequestMapping(value = "/sendEmailCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> sendEmailCode(String email){
       int count = myAccountService.getEamil(email);
        Map<String, String> map = new HashMap<>();
        if (count>0){
            map.put("info","isBinding");
            return map;
        }
        try {
            validationService.sendEmailCode(email,"bind");
            map.put("info","success");
            return map;
        } catch (Exception e) {
            map.put("info","error");
            return map;
        }
    }
    @RequestMapping(value = "/changeMobile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> changeMobile(String mobile,String code, String account){
        Map<String, String> map = new HashMap<>();
        boolean success;
        try {
            validationService.checkCode(code,mobile);
            success = myAccountService.updateMobile(account,mobile);
            String info = "success";
            if (!success){
                info = "dbError";
            }
            map.put("info",info);
            return map;
        } catch (InvalidCodeException e) {
            //验证码不正确
            map.put("info","codeError");
            return map;
        }
    }

    @RequestMapping(value = "/changeEmail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> changeEmail(String email,String code, String account){
        Map<String, String> map = new HashMap<>();
        boolean success;
        try {
            validationService.checkCode(code,email);
            success = myAccountService.updateEmail(account,email);
            String info = "success";
            if (!success){
                info = "dbError";
            }
            map.put("info",info);
            return map;
        } catch (InvalidCodeException e) {
            //激活码不正确
            map.put("info","codeError");
            return map;
        }
    }

    /**
     * 展示我的账号信息
     * 跳转到account.html
     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/myAccount", method = RequestMethod.GET)
//    @ResponseBody
    public String myAccount(String account, Model model) {
        MyAccount myAccount = myAccountService.getAllByAccount(account);
        model.addAttribute("myAccount", myAccount);
        return "account/account";
    }

    /**
     * 跳转changePassword.html
     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/pwd", method = RequestMethod.GET)
    public String pwd(String account, Model model) {
        model.addAttribute("account", account);
        return "account/changePassword";
    }

    /**
     * 跳转fillUsername.html
     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/fillUname", method = RequestMethod.GET)
    public String fillUname(String account,String flag,Model model){
        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "account/fillUsername";
    }

    /**
     * 跳转modifiUname.html
     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifiUname", method = RequestMethod.GET)
    public String modifiUname(String account,String uname, String flag,Model model){
        model.addAttribute("account", account);
        model.addAttribute("uname", uname);
        model.addAttribute("flag", flag);
        return "account/modifiUname";
    }

    /**
     * 跳转bindPhone.html
     * @param account
     * @param flag
     * @param model
     * @return
     */
    @RequestMapping(value = "/fillMobile", method = RequestMethod.GET)
    public String fillMobile(String account,String flag,Model model){
        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "account/bindPhone";
    }

    /**
     * 跳转modifiMobile.html
     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifiMobile", method = RequestMethod.GET)
    public String modifiMobile(String account, String flag,Model model){
        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "account/modifiMobile";
    }
    /**
     * 跳转bindEmail.html
     * @param account
     * @param flag
     * @param model
     * @return
     */
    @RequestMapping(value = "/fillEmail", method = RequestMethod.GET)
    public String fillEmail(String account,String flag,Model model){
        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "account/bindEmail";
    }

    /**
     * 跳转modifiEmail.html
     * @param account
     * @param model
     * @return
     */
    @RequestMapping(value = "/modifiEmail", method = RequestMethod.GET)
    public String modifiEmail(String account, String flag,Model model){
        model.addAttribute("account", account);
        model.addAttribute("flag", flag);
        return "account/modifiEmail";
    }
}

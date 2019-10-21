package com.tpadsz.after.entity;

import com.alibaba.excel.annotation.ExcelProperty;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-10-21 10:33
 **/
public class DownloadExcelData {

    @ExcelProperty("账号")
    private String account;
    @ExcelProperty("用户名")
    private String uname;
    @ExcelProperty("绑定手机号")
    private String mobile;
    @ExcelProperty("绑定邮箱")
    private String email;
    @ExcelProperty("隶属公司")
    private String coname;
    @ExcelProperty("角色")
    private String role;
    @ExcelProperty("添加时间")
    private String create_date;
    @ExcelProperty("状态")
    private String status;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getConame() {
        return coname;
    }

    public void setConame(String coname) {
        this.coname = coname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCreate_date() {
        return create_date;
    }

    public void setCreate_date(String create_date) {
        this.create_date = create_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

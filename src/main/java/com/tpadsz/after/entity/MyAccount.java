package com.tpadsz.after.entity;

/**
 * @program: blt-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-04-02 10:29
 **/
public class MyAccount {

    private String id;
    private String uname;//用户名
    private String mobile;//手机号
    private String account;//账号
    private String email;//邮箱
    private String password;//密码
    private String salt;///盐值

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Override
    public String toString() {
        return "MyAccount{" +
                "id='" + id + '\'' +
                ", uname='" + uname + '\'' +
                ", mobile='" + mobile + '\'' +
                ", account='" + account + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                '}';
    }
}

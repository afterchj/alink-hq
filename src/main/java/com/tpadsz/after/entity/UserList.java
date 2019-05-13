package com.tpadsz.after.entity;

/**
 * Created by chenhao.lu on 2019/4/10.
 */
public class UserList {
    private Integer id;
    private String account;
    private String uname;
    private String mobile;
    private String email;
    private Integer fid;
    private String coname;
    private String role_id;
    private String create_date;
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getConame() {
        return coname;
    }

    public void setConame(String coname) {
        this.coname = coname;
    }

    public String getRole_id() {
        return role_id;
    }

    public void setRole_id(String role_id) {
        this.role_id = role_id;
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

    @Override
    public String toString() {
        return "UserList{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", uname='" + uname + '\'' +
                ", mobile='" + mobile + '\'' +
                ", email='" + email + '\'' +
                ", fid=" + fid +
                ", coname='" + coname + '\'' +
                ", role_id='" + role_id + '\'' +
                ", create_date='" + create_date + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

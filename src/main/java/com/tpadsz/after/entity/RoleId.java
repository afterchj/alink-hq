package com.tpadsz.after.entity;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-20 16:01
 **/
public class RoleId {

    private Integer id;
    private String role_name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    @Override
    public String toString() {
        return "RoleId{" +
                "id=" + id +
                ", role_name='" + role_name + '\'' +
                '}';
    }
}

package com.tpadsz.after.entity;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;

/**
 * @author hongjian.chen
 * @date 2019/10/24 17:57
 */
public class CooperationTemplate {

    @ExcelIgnore
    private int id;
    @ExcelIgnore
    private int parent_id;
    @ExcelProperty("合作公司名称")
    private String coname;
    @ExcelProperty("联系方式")
    private String mobile;
    @ExcelProperty("公司地址")
    private String address;
    @ExcelProperty("营业执照编号")
    private String code;
    @ExcelIgnore
    private int status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getParent_id() {
        return parent_id;
    }

    public void setParent_id(int parent_id) {
        this.parent_id = parent_id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getConame() {
        return coname;
    }

    public void setConame(String coname) {
        this.coname = coname;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}

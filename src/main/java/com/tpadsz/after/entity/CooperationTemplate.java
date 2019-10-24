package com.tpadsz.after.entity;

import com.alibaba.excel.annotation.ExcelProperty;

/**
 * @author hongjian.chen
 * @date 2019/10/24 17:57
 */
public class CooperationTemplate {

    @ExcelProperty("合作公司名称")
    private String coname;
    @ExcelProperty("联系方式")
    private String mobile;
    @ExcelProperty("公司地址")
    private String adress;
    @ExcelProperty("营业执照编号")
    private String code;

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

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}

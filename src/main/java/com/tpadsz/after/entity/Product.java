package com.tpadsz.after.entity;

/**
 * @program: alink-hq
 * @description: 产品
 * @author: Mr.Ma
 * @create: 2019-08-16 17:50
 **/
public class Product {

    private String product_category;
    private String type;
    private String product_id;
    private String coname;
    private String create_date;

    public String getProduct_category() {
        return product_category;
    }

    public void setProduct_category(String product_category) {
        this.product_category = product_category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public String getConame() {
        return coname;
    }

    public void setConame(String coname) {
        this.coname = coname;
    }

    public String getCreate_date() {
        return create_date;
    }

    public void setCreate_date(String create_date) {
        this.create_date = create_date;
    }
}

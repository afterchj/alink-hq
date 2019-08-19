package com.tpadsz.after.service;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Product;

import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-08-16 17:52
 **/
public interface ProductService {
    PageInfo<Product> getProductList(Integer pageNum, Integer pageSize, String type, String coname);

    List<Map<String, Object>> getConame();
}

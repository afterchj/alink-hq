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

    void delete(String[] ids);

    void updateDesc(int id, String description);

    List<Map<String, Object>> getOTAFile();

    Integer getOTACount();

    void bindOTA(int oId, int id);

    Product getProductById(int id);

    List<Map<String,Object>> getFirm();

    void updateEdit(String productName, String type, String id, String coname, Integer otaId, String description,
                    Integer i);

    Map<String,Integer> getRepeatNameByConame(String productName, String productId, String coname,Integer id);
}

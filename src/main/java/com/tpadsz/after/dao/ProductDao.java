package com.tpadsz.after.dao;

import com.tpadsz.after.entity.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-08-16 17:55
 **/
public interface ProductDao {

    List<Product> getProductList(@Param("type") String type, @Param("coname") String coname);
}

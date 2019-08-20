package com.tpadsz.after.dao;

import com.tpadsz.after.entity.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-08-16 17:55
 **/
public interface ProductDao {

    List<Product> getProductList(@Param("type") String type, @Param("coname") String coname);

    List<Map<String, Object>> getConame();

    void delete(@Param("id") String id);

    void updateDesc(@Param("id") int id, @Param("description") String description);

    List<Map<String, Object>> getOTAFile();

    Integer getOTACount();

    void bindOTA(@Param("o_id") int oId, @Param("id") int id);
}

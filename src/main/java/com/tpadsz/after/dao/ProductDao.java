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

    Product getProductById(@Param("id") int id);

    List<Map<String,Object>> getFirm();

    void updateEdit(@Param("productName") String productName, @Param("type") String type, @Param("productId") String productId, @Param("coname") String
            coname, @Param("otaId") Integer otaId, @Param("description") String description,@Param("id") Integer id);

    Integer getRepeatProductName(@Param("productName") String productName, @Param("coname") String coname, @Param("id") Integer id);

    Integer getRepeatProductId(@Param("productId") String productId, @Param("coname") String coname, @Param("id") Integer id);

    void saveProduct(@Param("productName") String productName, @Param("type") String type, @Param("productId") String productId, @Param("coname") String
            coname, @Param("otaId") Integer otaId, @Param("description") String description);
}

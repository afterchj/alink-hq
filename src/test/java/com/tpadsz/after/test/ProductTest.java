package com.tpadsz.after.test;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Product;
import com.tpadsz.after.service.ProductService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-08-19 10:57
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class ProductTest {

    @Resource
    private ProductService productService;

    @Test
    public void test(){
        PageInfo<Product> productList = productService.getProductList(null, null, null, null);
    }
}

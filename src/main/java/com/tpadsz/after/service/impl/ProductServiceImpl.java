package com.tpadsz.after.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tpadsz.after.dao.ProductDao;
import com.tpadsz.after.entity.Product;
import com.tpadsz.after.service.ProductService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-08-16 17:52
 **/
@Service
public class ProductServiceImpl implements ProductService {

    @Resource
    private ProductDao productDao;

    @Override
    public PageInfo<Product> getProductList(Integer pageNum, Integer pageSize, String type, String coname) {
        if (pageNum==null){
            pageNum = 1;//默认第一页
        }
        if (pageNum<=0){
            pageNum = 1;
        }
        if (pageSize == null){
            pageSize= 10;//默认显示10页
        }
        PageHelper.startPage(pageNum,pageSize);
        List<Product> products = productDao.getProductList(type,coname);
        PageInfo<Product> pageInfo = new PageInfo<>(products);
        return pageInfo;
    }

    @Override
    public List<Map<String, Object>> getConame() {
        return productDao.getConame();
    }
}

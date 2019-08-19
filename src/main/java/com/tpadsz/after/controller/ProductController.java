package com.tpadsz.after.controller;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Product;
import com.tpadsz.after.service.ProductService;
import com.tpadsz.after.service.RolePermissionInfoService;
import com.tpadsz.after.service.TimeLineService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description: 产品管理
 * @author: Mr.Ma
 * @create:
 **/
@Controller
@RequestMapping("/product")
public class ProductController {

    @Resource
    private TimeLineService timeLineService;

    @Resource
    private RolePermissionInfoService rolePermissionInfoService;

    @Resource
    private ProductService productService;

    /**
     * 跳转到productList.html
     * @param type 产品品类/代码号(产品ID)
     * @param coname 隶属公司
     * @return
     */
    @RequestMapping("/list")
    public String productList(Model model, Integer pageNum, Integer pageSize, String type,String coname){
        PageInfo<Product> pageInfo = productService.getProductList(pageNum,pageSize,type,coname);
        List<Map<String,Object>> conames = productService.getConame();
        model.addAttribute("pageInfo",pageInfo);
        model.addAttribute("type",type);
        model.addAttribute("coname",coname);
        model.addAttribute("conames",conames);
        return "productManage/productList";
    }
}

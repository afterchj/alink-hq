package com.tpadsz.after.controller;

import com.github.pagehelper.PageInfo;
import com.tpadsz.after.entity.Product;
import com.tpadsz.after.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
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
    private ProductService productService;

    /**
     * 跳转到productList.html
     *
     * @param type   产品品类/代码号(产品ID)
     * @param coname 隶属公司
     * @return
     */
    @RequestMapping(value = "/list")
    public String productList(Model model, Integer pageNum, Integer pageSize, String type, String coname) {
        PageInfo<Product> pageInfo = productService.getProductList(pageNum, pageSize, type, coname);
        List<Map<String, Object>> conames = productService.getConame();
        List<Map<String, Object>> otas = productService.getOTAFile();
        Integer OTACount = productService.getOTACount();
        model.addAttribute("pageInfo", pageInfo);
        model.addAttribute("type", type);
        model.addAttribute("coname", coname);
        model.addAttribute("conames", conames);
        model.addAttribute("otas", otas);
        model.addAttribute("OTACount", OTACount);
        return "productManage/productList";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(String[] ids) {
        Map<String, String> map = new HashMap<>();
        productService.delete(ids);
        map.put("success", "success");
        return map;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> update(int id, String description) {
//        System.out.println(id);
        Map<String, String> map = new HashMap<>();
        productService.updateDesc(id, description);
        map.put("success", "success");
        return map;
    }

    @RequestMapping(value = "/binding", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> biding(int oId, int id) {
        Map<String, String> map = new HashMap<>();
        productService.bindOTA(oId, id);
        map.put("success", "success");
        return map;
    }

    @RequestMapping("/editProduct")
    public String editProduct(int id, Model model) {
        Product product = productService.getProductById(id);
        List<Map<String, Object>> otas = productService.getOTAFile();
        List<Map<String, Object>> firms = productService.getFirm();
        model.addAttribute("product", product);
        model.addAttribute("otas", otas);
        model.addAttribute("firms", firms);
        return "productManage/editProduct";
    }

    @RequestMapping(value = "/updateEdit", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateEdit(String productName, String type, String productId, String coname, Integer
            otaId, String
            description, Integer id) {
        Map<String, Object> map = new HashMap<>();
        Map<String, Integer> repeatName = productService.getRepeatNameByConame(productName, productId, coname, id);
        if (repeatName.get("productNameNum").equals(1) || repeatName.get("productIdNum").equals(1)) {//有名称重复
            map.put("repeatName", repeatName);
        } else {
            productService.updateEdit(productName, type, productId, coname, otaId, description, id);
            map.put("success", "success");
        }
        return map;
    }


    @RequestMapping("/createProduct")
    public String createProduct(Model model) {
        List<Map<String, Object>> otas = productService.getOTAFile();
        List<Map<String, Object>> firms = productService.getFirm();
        model.addAttribute("otas", otas);
        model.addAttribute("firms", firms);
        return "productManage/createProduct";
    }

}

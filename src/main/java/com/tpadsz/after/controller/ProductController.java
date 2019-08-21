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
     * @param type   产品品类/代码号(产品ID)
     * @param coname:隶属公司 pageNum:目标页 pageSize:每页显示行数 type:型号
     * @return 跳转到productList.html
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

    /**
     * 删除产品
     * @param ids 产品id数组
     * @return success:成功
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> delete(String[] ids) {
        Map<String, String> map = new HashMap<>();
        productService.delete(ids);
        map.put("success", "success");
        return map;
    }

    /**
     * 产品说明更新
     * @param id 产品id
     * @param description  产品说明
     * @return success:成功
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> update(int id, String description) {
        Map<String, String> map = new HashMap<>();
        productService.updateDesc(id, description);
        map.put("success", "success");
        return map;
    }

    /**
     * 关联固件
     * @param oId 固件id
     * @param id 产品id
     * @return success:成功
     */
    @RequestMapping(value = "/binding", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> biding(int oId, int id) {
        Map<String, String> map = new HashMap<>();
        productService.bindOTA(oId, id);
        map.put("success", "success");
        return map;
    }

    /**
     * @param id 产品id
     * @param model product:产品信息 otas:固件集合 firms:公司集合
     * @return 跳转到editProduct.html
     */
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

    /**
     * 编辑/新增产品
     * @param productName 产品类型
     * @param type 型号
     * @param productId 代码号
     * @param coname 隶属公司
     * @param otaId 固件id
     * @param description 产品说明
     * @param id 产品id 新增产品id为null
     * @return repeatName:重复名信息 success:成功
     */
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

    /**
     * @param model otas:固件集合 firms:公司集合
     * @return 跳转到createProduct.html
     */
    @RequestMapping("/createProduct")
    public String createProduct(Model model) {
        List<Map<String, Object>> otas = productService.getOTAFile();
        List<Map<String, Object>> firms = productService.getFirm();
        model.addAttribute("otas", otas);
        model.addAttribute("firms", firms);
        return "productManage/createProduct";
    }
}

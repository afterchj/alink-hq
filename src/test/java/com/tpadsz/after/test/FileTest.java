package com.tpadsz.after.test;

import com.tpadsz.after.utils.PropertiesUtil;
import org.junit.Test;

import java.io.*;
import java.net.URL;
import java.util.Properties;

/**
 * Created by hongjian.chen on 2019/5/29.
 */
public class FileTest {

    public static void main(String[] args) {
        File file = new File("/mydata/alink/imgs", "test.txt");
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        System.out.println(file.getAbsolutePath());
    }

    @Test
    public void showURL() throws IOException {

        // 第一种：获取类加载的根路径
        File f = new File(this.getClass().getResource("/").getPath());
        System.out.println(f);
        // 获取当前类的所在工程路径; 如果不加“/”  获取当前类的加载目录
//        File f2 = new File(this.getClass().getResource("").getPath());
//        System.out.println(f2);
        // 第二种：获取项目路径
        File directory = new File("");// 参数为空
        String courseFile = directory.getCanonicalPath();
        System.out.println(courseFile);
        // 第三种
        URL xmlPath = this.getClass().getClassLoader().getResource("");
        System.out.println(xmlPath.getPath());
        // 第四种
        System.out.println(System.getProperty("user.dir"));
         /*
          * 获取当前工程路径
          */
        // 第五种：  获取所有的类路径 包括jar包的路径
//        System.out.println(System.getProperty("java.class.path"));
    }

    @Test
    public void testProperty()throws Exception{
        Properties pro = new Properties();
        try {
            InputStream in = this.getClass().getResourceAsStream("/common.properties");
            BufferedReader bf = new BufferedReader(new InputStreamReader(in,"gbk"));
            pro.load(bf);
        }catch (IOException e){
            e.printStackTrace();
        }
        String name = pro.getProperty("info");
        System.out.println("info:" + name);
        System.out.println("getPath:" + PropertiesUtil.getPath());
    }
}

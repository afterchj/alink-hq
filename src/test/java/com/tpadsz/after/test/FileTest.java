package com.tpadsz.after.test;

import java.io.File;
import java.io.IOException;

/**
 * Created by hongjian.chen on 2019/5/29.
 */
public class FileTest {

    public static void main(String[] args) {
        File file = new File("/mydata/alink/imgs","test.txt");
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
}

package com.tpadsz.after.utils;

import com.tpadsz.after.entity.SearchDict;
import org.apache.commons.lang.StringUtils;

/**
 * @author hongjian.chen
 * @date 2019/8/22 19:45
 */
public class CommonManager {

    public static SearchDict parseStr(SearchDict dict) {
        String str = dict.getCreateDate();
        String str1 = dict.getUpdateDate();
        if (StringUtils.isNotBlank(str)) {
            String begin = str.substring(0, 10);
            String end = str.substring(str.length() - 10);
            dict.setBeginDate(begin);
            dict.setEndDate(end);
        }
        if (StringUtils.isNotBlank(str1)) {
            String begin = str1.substring(0, 10);
            String end = str1.substring(str1.length() - 10);
            dict.setBeginDate(begin);
            dict.setEndDate(end);
        }
        return dict;
    }
}

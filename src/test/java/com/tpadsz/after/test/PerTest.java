package com.tpadsz.after.test;

import org.junit.Test;

import java.util.Arrays;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-26 16:34
 **/
public class PerTest {

    public static String replaceSpace(String[] strs) {

        // 如果检查值不合法及就返回空串
        if (!checkStrs(strs)) {
            return "";
        }
        // 数组长度
        int len = strs.length;
        // 用于保存结果
        StringBuilder res = new StringBuilder();
        // 给字符串数组的元素按照升序排序(包含数字的话，数字会排在前面)
        Arrays.sort(strs);
        int m = strs[0].length();
        int n = strs[len - 1].length();
        int num = Math.min(m, n);
        for (int i = 0; i < num; i++) {
            if (strs[0].charAt(i) == strs[len - 1].charAt(i)) {
                res.append(strs[0].charAt(i));
            } else
                break;

        }
        return res.toString();

    }

    private static boolean checkStrs(String[] strs) {
        if (strs != null) {
            // 遍历strs检查元素值
            for (int i = 0; i < strs.length; i++) {
                if (strs[i] == null || strs[i].length() == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    // 测试
    public static void main(String[] args) {
        String[] strs = { "customer", "car", "cat" };
        // String[] strs = { "customer", "car", null };//空串
        // String[] strs = {};//空串
        // String[] strs = null;//空串
        System.out.println(replaceSpace(strs));// c
    }

    @Test
    public void test(){
        String str = "()(()))";
        char[] charArr = str.toCharArray();
        int count=0;
        int j=charArr.length-1;
        for (int i=0;i<charArr.length;i++){
            if (charArr[i] == '('){
                for (;j>i;j--){
                    if (charArr[j]==')'){
                        count++;
                    }
                    j=j-1;
                    break;
                }
            }
            if (i>=j){
                break;
            }
            continue;

        }
        System.out.println(count);
//        int count=0,max=0,i;
//        for (i=0;i<str.length();i++){
//            if (str.charAt(i) =='('){
//                count++;
//            }else {
//                count--;
//            }
//            max = Math.max(max,count);
//        }
//        System.out.println(max);
    }

    @Test
    public void test2(){
        String str = "1234";
        int returnInt=0;
//        int[] intArr = {1,2,3,4,5,6,7,8,9};
        char[] charArr = str.toCharArray();
        for (int i=0;i<charArr.length;i++){
            if (Character.isDigit(charArr[i])){
                int temp = charArr[i] -'0';
                returnInt = returnInt*10 +temp;
                continue;
            }else {
                System.out.println("0");
                return;
            }
        }
        System.out.println(returnInt);
    }

}

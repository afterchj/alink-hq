package com.tpadsz.after.entity.dd;

public enum ResultDict {

    SUCCESS("000", "成功"), SYSTEM_ERROR("200", "系统错误"),
    ACCOUNT_NOT_CORRECT("101", "登录名错误"), PASSWORD_NOT_CORRECT("102", "登录名密码不正确"), MOBILE_NOT_EXISTED("103", "该手机号未绑定！"), ACCOUNT_DISABLED("104", "该账号已禁用！"),ACCOUNT_LOCKEED("105", "该账号在别处登入！"),
    LIGHT_EXISTED("120", "有灯存在，冻结"), ID_REPEATED("121", "该账户下的meshId重复"), TOKEN_NOT_SUBMIT("107", "token没有提交"), TOKEN_NOT_CORRECT("108", "token失效"), TOKEN_REPLACED("109", "账号在其他设备登陆。"),
    UNAME_REPET("201", "该用户名已存在！"), VERIFY_ERROR("202", "验证码不正确！"), MOBILE_REPET("203", "该手机号已绑定！"), PARAMS_BLANK("301", "参数不能够为空"), PARAMS_NOT_PARSED("302", "参数解析错误"), MESHID_NOT_NULL("115", "未发现该网络"),
    NO_SCENE("301", "该用户或网络下没有创建场景"), NO_GROUP("302", "该用户或网络下没有创建组");

    ResultDict(String code, String value) {
        this.value = value;
        this.code = code;
    }

    private String value;
    private String code;

    public String getValue() {
        return value;
    }

    public String getCode() {
        return code;
    }

}

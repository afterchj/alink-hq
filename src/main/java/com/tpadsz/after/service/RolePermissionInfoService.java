package com.tpadsz.after.service;

import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-20 15:07
 **/
public interface RolePermissionInfoService {

    List<String> getPermissions(String account);

    void authorization(List<String> permissions);

    String getRoleName(String rid);

    List<Map<String,String>> getUsers(String account);

    List<Map<String,String>> getRolePermissions(String account);

    List<String> getPermissionsByRid(String rid);
}

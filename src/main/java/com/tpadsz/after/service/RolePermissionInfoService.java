package com.tpadsz.after.service;

import java.util.List;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-20 15:07
 **/
public interface RolePermissionInfoService {

    List<String> getPermissions(String account);

    void authorization(List<String> permissions);
}

package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.RolePermissionInfoDao;
import com.tpadsz.after.dao.UserExtendDao;
import com.tpadsz.after.service.RolePermissionInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-06-20 15:08
 **/
@Service("roleManageService")
public class RolePermissionInfoServiceImpl implements RolePermissionInfoService {

    @Resource
    private RolePermissionInfoDao roleManageDao;

    @Resource
    private UserExtendDao userExtendDao;

    @Override
    public List<String> getPermissions(String account){
        return userExtendDao.getPermissions(account);
    }

    @Override
    public void authorization(List<String> permissions) {
        String roleId = permissions.get(permissions.size()-1);
        roleManageDao.deleteRolePermission(roleId);
        permissions.remove(permissions.size()-1);
        for (int i=0;i<permissions.size();i++){
            roleManageDao.authorization(permissions.get(i),roleId);
        }

    }

    @Override
    public String getRoleName(String rid) {
        return roleManageDao.getRoleName(rid);
    }

    @Override
    public List<Map<String,String>> getUsers(String account) {
        return roleManageDao.getUsers(account);
    }

    @Override
    public List<Map<String,String>> getRolePermissions(String account) {
        return roleManageDao.getRolePermissions(account);
    }

    @Override
    public List<Map<String, String>> getPermissionsByRid(String rid) {
        return roleManageDao.getPermissionsByRid(rid);
    }
}

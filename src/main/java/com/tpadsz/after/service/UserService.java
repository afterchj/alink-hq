package com.tpadsz.after.service;


import com.tpadsz.after.entity.User;

import java.util.List;
import java.util.Map;

/**
 * @author after
 * @date 2017年1月16日
 */
public interface UserService {
    List<User> selectAll();

    User selectById(String id);

    User selectByUsername(String uname);

    int getCount(Map map);

    void save(User user);

    void updatePwd(Map map);

//    boolean userIsExist(String username);

    void deleteById(Integer id);

    void blockUserById(Integer id);

    void unblockUserById(Integer id);
}

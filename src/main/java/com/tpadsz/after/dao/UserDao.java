package com.tpadsz.after.dao;


import com.tpadsz.after.entity.User;

import java.util.List;
import java.util.Map;

public interface UserDao {

    void deleteById(Integer id);

    int insert(User record);

    int insertSelective(User record);

    List<User> selectAll();

    User selectById(String id);

    User selectByUsername(String username);

    void updatePwd(Map map);

    int updateById(User record);

    void blockUserById(Integer id);

    void unblockUserById(Integer id);

    int getCount(Map map);

}

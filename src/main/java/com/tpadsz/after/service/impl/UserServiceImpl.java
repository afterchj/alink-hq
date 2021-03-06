package com.tpadsz.after.service.impl;


import com.tpadsz.after.dao.UserDao;
import com.tpadsz.after.entity.User;
import com.tpadsz.after.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User selectById(String id) {
        User user = userDao.selectById(id);
        return user;
    }

    @Override
    public void save(User user) {
        userDao.insert(user);

    }

    @Override
    public void updatePwd(Map map) {
       userDao.updatePwd(map);
    }

    @Override
    public User selectByUsername(String uname) {
        return userDao.selectByUsername(uname);
    }

    @Override
    public int getCount(Map map) {
        return userDao.getCount(map);
    }

//    @Override
//    public boolean userIsExist(User user) {
//        User user = userDao.selectByUsername(user);
//        if (user == null) {
//            return false;
//        } else {
//            return true;
//        }
//    }

    @Override
    public List<User> selectAll() {
        return userDao.selectAll();
    }

    @Override
    public void deleteById(Integer id) {
        userDao.deleteById(id);
    }

    @Override
    public void blockUserById(Integer id) {
        userDao.blockUserById(id);
    }

    @Override
    public void unblockUserById(Integer id) {
        userDao.unblockUserById(id);
    }

}

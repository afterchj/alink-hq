package com.tpadsz.after.realm;

import com.tpadsz.after.constants.MemcachedObjectType;
import com.tpadsz.after.entity.User;
import net.rubyeye.xmemcached.MemcachedClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class UserTokenValidationInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private MemcachedClient client;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            HttpSession session = request.getSession();
            User loginUser = (User) session.getAttribute("user");
            String uid = loginUser.getId();
            String key = MemcachedObjectType.CACHE_TOKEN.getPrefix() + uid;
            String expected = client.get(key);
            if ("disabled".equals(expected)) {
                String url = "/alink-hq/logOut";
                response.sendRedirect(url);
                return false;
            }
        } catch (Exception e) {

        }
        return true;
    }

}

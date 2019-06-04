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
            String key = MemcachedObjectType.CACHE_TOKEN.getPrefix() + loginUser.getId();
            String key2 = MemcachedObjectType.CACHE_HQ_TOKEN.getPrefix() + loginUser.getId();
            String expected = client.get(key);
            String expected2 = client.get(key2);
            if (expected2==null || "disabled".equals(expected)) {
                String url = "/alink-hq/";
                session.removeAttribute("user");
                response.sendRedirect(url);
                return false;
            }
        } catch (Exception e) {

        }
        return true;
    }

}

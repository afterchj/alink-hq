package com.tpadsz.after;

import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;

/**
 * Created by hongjian.chen on 2019/4/4.
 */

@Component
public class MyApplicationContext implements ServletContextAware {

    @Override
    public void setServletContext(ServletContext context) {
        String ctx = context.getContextPath();
        System.out.println("ctx=" + ctx);
        context.setAttribute("ctx", ctx);
    }
}

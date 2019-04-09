//package com.tpadsz.after.utils;
//
//import com.sun.mail.util.MailSSLSocketFactory;
//import com.tpadsz.after.service.ValidationService;
//import org.apache.log4j.Logger;
//
//import javax.annotation.Resource;
//import javax.mail.*;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//import java.security.GeneralSecurityException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.Properties;
//
//public class SendEmailUtils {
//    private static Logger logger = Logger.getLogger("SendEmailUtils.class");
//
//    @Resource
//    private ValidationService validationService;
//
//    //用户名密码验证，需要实现抽象类Authenticator的抽象方法PasswordAuthentication
//    static class MyAuthenricator extends Authenticator {
//        String u = null;
//        String p = null;
//
//        public MyAuthenricator(String u, String p) {
//            this.u = u;
//            this.p = p;
//        }
//
//        @Override
//        protected PasswordAuthentication getPasswordAuthentication() {
//            return new PasswordAuthentication(u, p);
//        }
//    }
//
//    public static void send(String to,String title, String context)  {
//        Properties prop = new Properties();
//        //协议
//        prop.setProperty("mail.transport.protocol", "smtps");
//        //服务器
//        prop.setProperty("mail.smtp.host", "smtp.exmail.qq.com");
//        //端口
//        prop.setProperty("mail.smtp.port", "587");
//        //使用smtp身份验证
//        prop.setProperty("mail.smtp.auth", "true");
//        //使用SSL，企业邮箱必需！
//        //开启安全协议
//        MailSSLSocketFactory sf = null;
//        try {
//            sf = new MailSSLSocketFactory();
//            sf.setTrustAllHosts(true);
//        } catch (GeneralSecurityException e1) {
//            e1.printStackTrace();
//        }
////        prop.put("mail.smtp.ssl.enable", "true");
//        prop.put("mail.smtp.starttls.enable", "true");
//        prop.put("mail.smtp.ssl.socketFactory", sf);
//        //发件人，进行权限认证
//        Session session = Session.getDefaultInstance(prop, new MyAuthenricator("ji.ma@tpadsz.com", "Tp123456"));
////        session.setDebug(true);
//        MimeMessage mimeMessage = new MimeMessage(session);
//        try {
//            //发件人地址
//            mimeMessage.setFrom(new InternetAddress("ji.ma@tpadsz.com", ""));
//            //收件人的地址
//            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
//            mimeMessage.setSubject(title);
//            mimeMessage.setSentDate(new Date());
////            mimeMessage.setText(context);
//            mimeMessage.setContent(context,"text/html; charset=utf-8");
//            mimeMessage.saveChanges();
//            Transport.send(mimeMessage);
//        } catch (Exception e) {
//            logger.error("scan 邮件异常 " + e);
//
//        }
//    }
//
//    public static void main(String[] args) {
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
//        Date date = new Date();
//        Date afterDate = new Date(date.getTime()+300000);
//        String dateStr = sdf.format(afterDate);
//        StringBuffer theMessage = new StringBuffer();
//        theMessage.append("<span>亲爱的用户：您好！<span/><br/>");
//        theMessage.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>您收到这封这封电子邮件是因为您 (也可能是某人冒充您的名义) 正在进行邮箱绑定验证。假如这不是您本人所申请，请不用理会这封电子邮件，但是如果您持续收到这类的信件骚扰，请您尽快联络管理员。本次请求的激活码为：<span/><br/>");
//        theMessage.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-weight: bold\">19647<span/><br/>");
//        theMessage.append("<span>注意：请您在收到邮件5分钟内("+dateStr+" 前)使用，否则该激活码将会失效。<span/><br/><br/>");
//
//        SendEmailUtils.send("1340684676@qq.com","【灯联网】邮箱绑定验证", theMessage.toString());
//    }
//}
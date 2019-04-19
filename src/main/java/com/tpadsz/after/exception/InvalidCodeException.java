package com.tpadsz.after.exception;

/**
 * Created by hongjian.chen on 2018/12/13.
 */
public class InvalidCodeException extends Exception {

    private String code;
    private String message;

    public InvalidCodeException() {

    }

    public InvalidCodeException(String code,String message) {
        super(message);
        this.code=code;
    }

    public String getCode() {
        return code;
    }
}

package com.tpadsz.after.entity;

/**
 * @program: alink-hq
 * @description: 定时线
 * @author: Mr.Ma
 * @create: 2019-05-28 11:40
 **/
public class TimeLine {

    private int id;
    private String tname;
    private String mname;
    private Integer mid;
    private String state;
    private String repetition;
    private String week;
    private String createDate;
    private String updateDate;
    private Integer tid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getTid() {
        return tid;
    }

    public void setTid(Integer tid) {
        this.tid = tid;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdateDate() {

        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public Integer getMid() {
        return mid;
    }

    public void setMid(Integer mid) {
        this.mid = mid;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRepetition() {
        return repetition;
    }

    public void setRepetition(String repetition) {
        this.repetition = repetition;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

}

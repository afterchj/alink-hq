package com.tpadsz.after.entity;

/**
 * @program: alink-hq
 * @description:
 * @author: Mr.Ma
 * @create: 2019-08-28 13:43
 **/
public class TimeListPage {
    private int id;
    private Integer pageNum;
    private Integer pageSize;
    private String timeFlag;
    private String tname;
    private String createDate;
    private String updateDate;
    private String state;

    public int getId() {
        return id;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public String getTimeFlag() {
        return timeFlag;
    }

    public String getTname() {
        return tname;
    }

    public String getCreateDate() {
        return createDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public String getState() {
        return state;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public void setTimeFlag(String timeFlag) {
        this.timeFlag = timeFlag;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "TimeListPage{" +
                "id=" + id +
                ", pageNum=" + pageNum +
                ", pageSize=" + pageSize +
                ", timeFlag='" + timeFlag + '\'' +
                ", tname='" + tname + '\'' +
                ", createDate='" + createDate + '\'' +
                ", updateDate='" + updateDate + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}

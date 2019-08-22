package com.tpadsz.after.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @author hongjian.chen
 * @date 2019/8/1 10:28
 */
public class FileDTO implements Serializable {

    private int id;
    private Integer oid;
    private String otaId;
    private String otaName;
    private String otaVersion;
    private String otaDesc;
    private String otaPath;
    private Date createDate;
    private Date updateDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOtaId() {
        return otaId;
    }

    public void setOtaId(String otaId) {
        this.otaId = otaId;
    }

    public String getOtaName() {
        return otaName;
    }

    public void setOtaName(String otaName) {
        this.otaName = otaName;
    }

    public String getOtaVersion() {
        return otaVersion;
    }

    public void setOtaVersion(String otaVersion) {
        this.otaVersion = otaVersion;
    }

    public String getOtaDesc() {
        return otaDesc;
    }

    public void setOtaDesc(String otaDesc) {
        this.otaDesc = otaDesc;
    }

    public String getOtaPath() {
        return otaPath;
    }

    public void setOtaPath(String otaPath) {
        this.otaPath = otaPath;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }
}

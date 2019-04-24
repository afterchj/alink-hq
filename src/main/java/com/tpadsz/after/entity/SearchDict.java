package com.tpadsz.after.entity;

/**
 * Created by hongjian.chen on 2019/4/24.
 */
public class SearchDict {

    private Integer uid;
    private String role;
    private String mname;
    private String pname;
    private Integer status;
    private Integer meshId;
    private Integer projectId;
    private Integer placeId;

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getMeshId() {
        return meshId;
    }

    public void setMeshId(Integer meshId) {
        this.meshId = meshId;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public Integer getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Integer placeId) {
        this.placeId = placeId;
    }
}

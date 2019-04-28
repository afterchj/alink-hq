package com.tpadsz.after.entity;

/**
 * Created by hongjian.chen on 2019/4/28.
 */
public class MeshInfo {

    private int id;
    private String name;
    private String mname;
    private int mesh_id;
    private int project_id;
    private int scount;
    private int pcount;
    private int gcount;
    private int lcount;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public int getMesh_id() {
        return mesh_id;
    }

    public void setMesh_id(int mesh_id) {
        this.mesh_id = mesh_id;
    }

    public int getProject_id() {
        return project_id;
    }

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }

    public int getScount() {
        return scount;
    }

    public void setScount(int scount) {
        this.scount = scount;
    }

    public int getPcount() {
        return pcount;
    }

    public void setPcount(int pcount) {
        this.pcount = pcount;
    }

    public int getGcount() {
        return gcount;
    }

    public void setGcount(int gcount) {
        this.gcount = gcount;
    }

    public int getLcount() {
        return lcount;
    }

    public void setLcount(int lcount) {
        this.lcount = lcount;
    }
}

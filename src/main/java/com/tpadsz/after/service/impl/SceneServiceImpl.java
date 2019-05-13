package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.SceneDao;
import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.SceneList;
import com.tpadsz.after.service.SceneService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by chenhao.lu on 2019/5/7.
 */

@Service("sceneService")
public class SceneServiceImpl implements SceneService {
    @Resource
    private SceneDao sceneDao;


    @Override
    public List<SceneList> searchSceneList(String sceneName, Integer sceneId,Integer lid,String meshName,String meshId,Integer mid) {
        return sceneDao.searchSceneList(sceneName,sceneId,lid,meshName,meshId,mid);
    }

    @Override
    public int renameScene(String sceneName, Integer sid) {
        int flag;
        int count = sceneDao.findRepeatNameBySid(sceneName, sid);
        if(count>0){
            flag =0;
        }else {
            sceneDao.renameScene(sceneName,sid);
            flag =1;
        }
        return flag;
    }

    @Override
    public void delete(Integer sid) {
        sceneDao.delete(sid);
    }

    @Override
    public void saveSceneName(String sceneName, Integer sid) {
        sceneDao.saveSceneName(sceneName,sid);
    }

    @Override
    public MeshInfo findProjectByMeshId(String meshId) {
        return sceneDao.findProjectByMeshId(meshId);
    }

    @Override
    public List<MeshInfo> findPlaceBySid(Integer sid) {
        return sceneDao.findPlaceBySid(sid);
    }

    @Override
    public List<MeshInfo> findGroupByPid(Integer pid) {
        return sceneDao.findGroupByPid(pid);
    }

    @Override
    public List<MeshInfo> findLightByGid(Integer gid,Integer sid) {
        return sceneDao.findLightByGid(gid,sid);
    }

    @Override
    public MeshInfo findLightInfoByLid(Integer lid) {
        return sceneDao.findLightInfoByLid(lid);
    }

    @Override
    public List<MeshInfo> findXYBySid(Integer sid) {
        return sceneDao.findXYBySid(sid);
    }

    @Override
    public List<MeshInfo> findXYByGid(Integer gid) {
        return sceneDao.findXYByGid(gid);
    }


}

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
    public void deleteSid(Integer sid) {
        sceneDao.deleteSid(sid);
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
    public List<MeshInfo> findXYByGid(Integer gid,Integer sid) {
        return sceneDao.findXYByGid(gid,sid);
    }

    @Override
    public int findRoleIdByMid(Integer mid) {
        return sceneDao.findRoleIdByMid(mid);
    }

    @Override
    public void deleteXY(Integer id, Integer sceneId,Integer mid,Integer flag) {
        if(flag==0) {
            MeshInfo meshInfo = sceneDao.findDefaultXY(sceneId+1);
            sceneDao.resetXY(id, mid, meshInfo.getX(), meshInfo.getY());
        }else if(flag==1){
            sceneDao.deleteXY(id,mid);
        }
    }

    @Override
    public void saveDeleteLog(String uid, Integer sceneId, Integer mid) {
        sceneDao.saveDeleteLog(uid,sceneId,mid);
    }


}

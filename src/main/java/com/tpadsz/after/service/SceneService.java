package com.tpadsz.after.service;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.SceneList;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/5/7.
 */
public interface SceneService {


    List<SceneList> searchSceneList(String sceneName, Integer sceneId,Integer lid,String meshName,String meshId,Integer mid);

    int renameScene(String sceneName, Integer sid);

    void deleteSid(Integer sid);

    void saveSceneName(String sceneName, Integer sid);

    MeshInfo findProjectByMeshId(String meshId);

    List<MeshInfo> findPlaceBySid(Integer sid);

    List<MeshInfo> findGroupByPid(Integer pid);

    List<MeshInfo> findLightByGid(Integer gid,Integer sid);

    MeshInfo findLightInfoByLid(Integer lid);

    List<MeshInfo> findXYByGid(Integer gid,Integer sid);

    int findRoleIdByMid(Integer mid);

    void deleteXY(Integer id, Integer sceneId,Integer mid,Integer flag);

    void saveDeleteLog(String uid, Integer sceneId, Integer mid);

    List<Integer> findMeshList(String uid);
}

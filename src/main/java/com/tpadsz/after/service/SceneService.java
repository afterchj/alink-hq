package com.tpadsz.after.service;

import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.SceneList;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/5/7.
 */
public interface SceneService {


    List<SceneList> searchSceneList(String sceneName, String sceneId,String meshName,String meshId,Integer mid);

    int renameScene(String sceneName, Integer sid);

    void delete(Integer sid);

    void saveSceneName(String sceneName, Integer sid);

    ProjectList findProjectByMeshId(String meshId);
}

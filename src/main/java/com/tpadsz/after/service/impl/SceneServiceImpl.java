package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.SceneDao;
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
    public List<SceneList> searchSceneList(String sceneName, String sceneId, String meshName, String meshId) {
        return sceneDao.searchSceneList(sceneName,sceneId,meshName,meshId);
    }
}

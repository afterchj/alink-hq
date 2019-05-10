package com.tpadsz.after.dao;

import com.tpadsz.after.entity.MeshInfo;
import com.tpadsz.after.entity.ProjectList;
import com.tpadsz.after.entity.SceneList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by chenhao.lu on 2019/5/8.
 */
public interface SceneDao {


    List<SceneList> searchSceneList(@Param("sceneName") String sceneName, @Param("sceneId") Integer sceneId,@Param("lid")Integer lid,@Param("meshName") String meshName,@Param("meshId") String meshId,@Param("mid") Integer mid);


    int findRepeatNameBySid(@Param("sceneName")String sceneName, @Param("sid")Integer sid);

    void renameScene(@Param("sceneName")String sceneName, @Param("sid")Integer sid);

    void delete(@Param("sid")Integer sid);

    void saveSceneName(@Param("sceneName")String sceneName, @Param("sid")Integer sid);

    ProjectList findProjectByMeshId(@Param("meshId")String meshId);

    List<MeshInfo> findPlaceBySid(@Param("sid") Integer sid);

    List<MeshInfo> findGroupByPid(@Param("pid") Integer pid);

    List<MeshInfo> findLightByGid(@Param("gid") Integer gid);
}

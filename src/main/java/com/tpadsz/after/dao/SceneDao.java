package com.tpadsz.after.dao;

import com.tpadsz.after.entity.MeshInfo;
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

    void deleteSid(@Param("sid")Integer sid);

    void saveSceneName(@Param("sceneName")String sceneName, @Param("sid")Integer sid);

    MeshInfo findProjectByMeshId(@Param("meshId")String meshId);

    List<MeshInfo> findPlaceBySid(@Param("sid") Integer sid);

    List<MeshInfo> findGroupByPid(@Param("pid") Integer pid);

    List<MeshInfo> findLightByGid(@Param("gid") Integer gid,@Param("sid") Integer sid);

    MeshInfo findLightInfoByLid(@Param("lid")Integer lid);

    List<MeshInfo> findXYByGid(@Param("gid")Integer gid,@Param("sid")Integer sid);

    int findRoleIdByMid(@Param("mid")Integer mid);

    void resetXY(@Param("sid")Integer id, @Param("mid")Integer mid,@Param("x") String x,@Param("y") String y);

    void deleteXY(@Param("sid")Integer id, @Param("mid")Integer mid);

    MeshInfo findDefaultXY(@Param("id")Integer id);

    void saveDeleteLog(@Param("uid") String uid, @Param("sceneId") Integer sceneId, @Param("mid") Integer mid);

    List<Integer> findMeshList(@Param("uid") String uid);
}

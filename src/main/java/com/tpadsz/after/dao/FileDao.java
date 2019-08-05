package com.tpadsz.after.dao;

import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.SearchDict;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface FileDao {

    List<Map> getByMap(SearchDict dict);

    List<Map> getFileHistory(SearchDict dict);

    FileDTO getFileInfo(int id);

    int getCount(FileDTO info);

    void save(FileDTO info);

    void saveUpdate(FileDTO info);

    void saveFile(Map info);

    void deleteFileById(int id);
    void deleteHistoryById(int id);
}

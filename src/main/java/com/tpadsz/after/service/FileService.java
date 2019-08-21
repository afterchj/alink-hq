package com.tpadsz.after.service;

import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;

import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/4/15.
 */
public interface FileService {

    List<Map> getByMap(SearchDict dict);

    List<Map> getFileHistory(SearchDict dict);

    FileDTO getFileInfo(int id);

    int getCount(FileDTO info) throws RepetitionException;

    void save(FileDTO info);

    void saveFile(Map info);

    void saveUpdate(FileDTO info);
    void deleteFileById(int id);
    void deleteHistoryById(int id);
}

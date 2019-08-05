package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.FileDao;
import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.exception.RepetitionException;
import com.tpadsz.after.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author hongjian.chen
 * @date 2019/8/1 9:56
 */

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileDao fileDao;

    @Override
    public List<Map> getByMap(SearchDict dict) {
        return fileDao.getByMap(dict);
    }

    @Override
    public List<Map> getFileHistory(SearchDict dict) {
        return fileDao.getFileHistory(dict);
    }

    @Override
    public FileDTO getFileInfo(int id) {
        return fileDao.getFileInfo(id);
    }

    @Override
    public int getCount(FileDTO info) {
        return 0;
    }

    @Override
    public void save(FileDTO info) {
        fileDao.save(info);
    }

    @Override
    public void saveFile(Map info) {
        fileDao.saveFile(info);
    }

    @Override
    public void saveUpdate(FileDTO info) throws RepetitionException {
        int count=getCount(info);
        if (count>0){
            throw new RepetitionException(100,"版本重复");
        }
        fileDao.saveUpdate(info);
    }

    @Override
    public void deleteFileById(int id) {
        fileDao.deleteFileById(id);
    }

    @Override
    public void deleteHistoryById(int id) {
        fileDao.deleteHistoryById(id);
    }
}

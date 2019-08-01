package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.FileDao;
import com.tpadsz.after.entity.FileDTO;
import com.tpadsz.after.entity.SearchDict;
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
    public FileDTO getFileInfo(int id) {
        return fileDao.getFileInfo(id);
    }

    @Override
    public int getCount(int id) {
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
    public void saveUpdate(FileDTO info) {
        fileDao.saveUpdate(info);
    }

    @Override
    public void deleteCooperationById(int id) {

    }
}

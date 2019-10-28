package com.tpadsz.after.service.impl;

import com.tpadsz.after.dao.CooperateDao;
import com.tpadsz.after.entity.CooperationInfo;
import com.tpadsz.after.entity.CooperationTemplate;
import com.tpadsz.after.entity.SearchDict;
import com.tpadsz.after.service.CooperateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by hongjian.chen on 2019/5/29.
 */

@Service
public class CooperateServiceImpl implements CooperateService {

    @Resource
    private CooperateDao cooperateDao;

    @Override
    public List<Map> getByMap(SearchDict dict) {
        return cooperateDao.getByMap(dict);
    }

    @Override
    public CooperationInfo getCooperationInfo(int id) {
        return cooperateDao.getCooperationInfo(id);
    }

    @Override
    public List<CooperationTemplate> getChildCompanyByFid(int fid) {
        return cooperateDao.getCompanyByFid(fid);
    }

    @Override
    public List<CooperationTemplate> getChildCompanyByUid(String uid) {
        return cooperateDao.getCompanyByUid(uid);
    }

    @Override
    public int getCount(int id) {
        return cooperateDao.getCount(id);
    }

    @Override
    public CooperationTemplate getParentCompany(String uid) {
        return cooperateDao.getParentCompany(uid);
    }

    @Override
    public void save(Map info) {
        cooperateDao.saveCooperation(info);
    }

    @Override
    public void saveUpdate(CooperationInfo info) {
        cooperateDao.saveUpdate(info);
    }

    @Override
    public void updateUser(Map map) {
        cooperateDao.updateUser(map);
    }

    @Override
    public void deleteCooperationById(int id) {
        cooperateDao.deleteCooperationById(id);
    }

    @Override
    public Map buildExcelData(CooperationTemplate cooperationInfo) {
        Map map = new HashMap();
        int fid = cooperationInfo.getId();
        List<CooperationTemplate> list = getChildCompanyByFid(fid);
        if (list.size() > 0) {
            map.put(fid, list);
            for (CooperationTemplate info : list) {
                fid = info.getId();
                List<CooperationTemplate> company = getChildCompanyByFid(fid);
                if (company.size() > 0) {
                    map.put(fid, company);
                    for (CooperationTemplate template : company) {
                        fid = template.getId();
                        List<CooperationTemplate> childCompany = getChildCompanyByFid(fid);
                        if (childCompany.size() > 0) {
                            map.put(fid, childCompany);
                        }
                    }
                }
            }
        }
        return map;
    }

    @Override
    public String parseName(CooperationTemplate parent) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        StringBuilder stringBuilder = new StringBuilder();
        if (parent.getStatus() == 0) {
            stringBuilder.append(String.format("%s_%s_%s", parent.getConame(), "终止", dateFormat.format(new Date())));
        } else {
            stringBuilder.append(String.format("%s_%s_%s", parent.getConame(), "合作", dateFormat.format(new Date())));
        }
        return stringBuilder.toString();
    }
}

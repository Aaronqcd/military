package com.jeecg.military.service.impl;

import com.jeecg.military.entity.DataManagementEntity;
import com.jeecg.military.service.DataManagementDao;
import com.jeecg.military.service.DataManagementServiceI;
import org.jeecgframework.core.util.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class DataManagementServiceImpl implements DataManagementServiceI {
	@Autowired
	DataManagementDao dataManagementDao;

	@Override
	public List<DataManagementEntity> getByPid(Integer p_id) {
		return dataManagementDao.getByPid(p_id);
	}

	@Override
	public void delete(Integer id) {
		
		dataManagementDao.delete(id);
	}

	@Override
	public void save(DataManagementEntity entity) {
		
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
			try {
				entity.setCreat_time(df.parse(df.format(new Date())));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
			//设置文件的dir路径
			if(entity.getId() == null || "".equals(entity.getId())){
				if(entity.getFile_type() == null || "".equals(entity.getFile_type())){
					entity.setFile_dir_name(UUIDGenerator.generate().substring(24,32));
				}
			}else {
				entity.setFile_type(dataManagementDao.get(entity.getId()).getFile_type());
				entity.setFile_dir_name(dataManagementDao.get(entity.getId()).getFile_dir_name());
			}
			//得到父的路劲
			if(entity.getP_id() == null || entity.getFile_type()!=null ){
				entity.setFile_path("upload/data/"+entity.getFile_name());
			}else{
				entity.setFile_path(dataManagementDao.get(entity.getP_id()).getFile_path()+"/"+entity.getFile_name());
			}
		dataManagementDao.save(entity);
	}
	@Override
	public void update(DataManagementEntity entity) {	
		dataManagementDao.update(entity);
	}

	@Override
	public DataManagementEntity get(Integer id) {
		return dataManagementDao.get(id);
	}

}

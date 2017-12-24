package com.jeecg.military.service;

import com.jeecg.military.entity.DataManagementEntity;

import java.util.List;

public interface DataManagementDao {
	
	 void  delete(Integer id);
	
	 void save(DataManagementEntity entity);
	
	 void update(DataManagementEntity entity);
	 
	public List<DataManagementEntity> getByPid(Integer p_id);
	
	DataManagementEntity get(Integer id);
	
}

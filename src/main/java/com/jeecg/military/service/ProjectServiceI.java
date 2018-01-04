package com.jeecg.military.service;

import com.jeecg.military.entity.ProjectEntity;
import org.jeecgframework.core.common.service.CommonService;

import java.io.Serializable;

public interface ProjectServiceI extends CommonService{
	
 	public void delete(ProjectEntity entity) throws Exception;
 	
 	public Serializable save(ProjectEntity entity) throws Exception;
 	
 	public void saveOrUpdate(ProjectEntity entity) throws Exception;
 	
}

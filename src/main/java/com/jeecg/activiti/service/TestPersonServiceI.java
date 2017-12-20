package com.jeecg.activiti.service;
import com.jeecg.activiti.entity.TestPersonEntity;
import org.jeecgframework.core.common.service.CommonService;

import java.io.Serializable;

public interface TestPersonServiceI extends CommonService {
	
 	public void delete(TestPersonEntity entity) throws Exception;
 	
 	public Serializable save(TestPersonEntity entity) throws Exception;
 	
 	public void saveOrUpdate(TestPersonEntity entity) throws Exception;
 	
}

package com.jeecg.activiti.service;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.runtime.ProcessInstanceQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 流程定义相关Controller
 * @author numberone
 * @version 2013-11-03
 */
@Service
@Transactional
public class ActProcessService {

	@Autowired
	private RepositoryService repositoryService;
	@Autowired
	private RuntimeService runtimeService;


	/**
	 * 流程定义列表
	 * @param page 
	 */
	public List<Object[]> processList() {
		ProcessDefinitionQuery processDefinitionQuery = repositoryService.createProcessDefinitionQuery()
		.latestVersion().orderByProcessDefinitionKey().asc();
		
		List<ProcessDefinition> processDefinitionList = processDefinitionQuery.list();
		List<Object[]> list = null;
	    if(processDefinitionList!=null&&processDefinitionList.size()>0){
	    	list = new ArrayList<Object[]>();
	    }
	    for (ProcessDefinition processDefinition : processDefinitionList) {
	      String deploymentId = processDefinition.getDeploymentId();
	      Deployment deployment = repositoryService.createDeploymentQuery().deploymentId(deploymentId).singleResult();
	      list.add(new Object[]{processDefinition, deployment});
	      
	    }
		return list;
	}
	/**
	 * 挂起、激活流程实例
	 */
	public String updateState(String state, String procDefId) {
		if (state.equals("active")) {
			repositoryService.activateProcessDefinitionById(procDefId, true, null);
			return "已激活ID为[" + procDefId + "]的流程定义。";
		} else if (state.equals("suspend")) {
			repositoryService.suspendProcessDefinitionById(procDefId, true, null);
			return "已挂起ID为[" + procDefId + "]的流程定义。";
		}
		return "无操作";
	}
	/**
	 * 运行中流程实例列表
	 */
	public List<ProcessInstance> runningList() {

	    ProcessInstanceQuery processInstanceQuery = runtimeService.createProcessInstanceQuery();
	   
	   /* if (procInsId.equals("")||procInsId==null){
		    processInstanceQuery.processInstanceId(procInsId);
	    }
	    
	    if (procDefKey.equals("")||procDefKey==null){
		    processInstanceQuery.processDefinitionKey(procDefKey);
	    }*/
		List<ProcessInstance> processInstance = processInstanceQuery.list();
		return processInstance;
	}
	/**
	 * 读取资源，通过部署ID
	 * @param processDefinitionId  流程定义ID
	 * @param processInstanceId 流程实例ID
	 * @param resourceType 资源类型(xml|image)
	 */
	public InputStream resourceRead(String procDefId, String proInsId, String resType) throws Exception {
		if (procDefId.equals("")||procDefId==null){
			ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(proInsId).singleResult();
			procDefId = processInstance.getProcessDefinitionId();
		}
		ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(procDefId).singleResult();
		
		String resourceName = "";
		if (resType.equals("image")) {
			resourceName = processDefinition.getDiagramResourceName();
		} else if (resType.equals("xml")) {
			resourceName = processDefinition.getResourceName();
		}
		InputStream resourceAsStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(), resourceName);
		return resourceAsStream;
	}
	/**
	 * 删除部署的流程，级联删除流程实例
	 * @param deploymentId 流程部署ID
	 */
	public void deleteDeployment(String deploymentId) {
		repositoryService.deleteDeployment(deploymentId,true);
	}
	/**
	 * 删除部署的流程实例
	 * @param procInsId 流程实例ID
	 * @param deleteReason 删除原因，可为空
	 */
	public void deleteProcIns(String procInsId, String deleteReason) {
		runtimeService.deleteProcessInstance(procInsId, deleteReason);
	}
}

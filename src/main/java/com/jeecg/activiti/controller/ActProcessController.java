package com.jeecg.activiti.controller;

import com.jeecg.activiti.service.ActProcessService;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.List;


/**
 * 流程定义相关Controller
 * @author numberone
 */
@Controller
@RequestMapping("act/procinstance")
public class ActProcessController {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private ActProcessService actProcessService;
	
	
	/**
	 * 流程定义列表
	 */
	@RequestMapping("list")
	public ModelAndView processList() {
		
	     List<Object[]> processList = actProcessService.processList();
		 if(processList!=null) {
			 for (Object[] objects : processList) {
				 System.out.println(objects[0]);
				 System.out.println(objects[1]);
			 }
		 }
	     ModelAndView m = new ModelAndView();
	     m.addObject("processList", processList);
	     m.setViewName("act/actProcessList");
		return m;
	}
	/**
	 * 运行中的实例列表
	 */
	public String runningList() {
		
	    List<ProcessInstance> runningList = actProcessService.runningList();
	       ModelAndView m = new ModelAndView();
	    m.addObject("page",runningList);
		return "modules/act/actProcessRunningList";
	}
	
	/**
	 * 删除部署的流程，级联删除流程实例
	 * @param deploymentId 流程部署ID
	 */
	@RequestMapping("delete")
	@ResponseBody
	public int delete(String deploymentId) {
		actProcessService.deleteDeployment(deploymentId);
		return 1;
	}
	
	/**
	 * 删除运行中流程实例
	 * @param procInsId 流程实例ID
	 * @param reason 删除原因
	 */
	public void deleteProcIns(String procInsId) {
		String reason="未开放填写删除原因功能!";
		actProcessService.deleteProcIns(procInsId, reason);
	}
	/**
	 * 挂起、激活流程实例
	 */
	@RequestMapping(value="updateState",produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public String updateState(String state,String procDefId) {
		String message = actProcessService.updateState(state, procDefId);
		return message;
	}

	/**
	 * 读取资源，通过部署ID
	 * @param processDefinitionId  流程定义ID
	 * @param processInstanceId 流程实例ID
	 * @param resourceType 资源类型(xml|image)
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("resourceRead")
	public void resourceRead(String procDefId,String resType,String proInsId,HttpServletResponse response) throws Exception {
		InputStream resourceAsStream = actProcessService.resourceRead(procDefId, proInsId, resType);
		byte[] b = new byte[1024];
		int len = -1;
		while ((len = resourceAsStream.read(b, 0, 1024)) != -1) {
			response.getOutputStream().write(b, 0, len);
		}
	}
}

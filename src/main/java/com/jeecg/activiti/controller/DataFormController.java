package com.jeecg.activiti.controller;

import com.jeecg.activiti.service.ActProcessService;
import com.jeecg.activiti.service.ActivitiService;
import jodd.servlet.URLDecoder;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.*;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.activiti.image.ProcessDiagramGenerator;
import org.jeecgframework.core.common.model.json.DataGrid;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.tag.core.easyui.TagUtil;
import org.jeecgframework.web.system.pojo.base.TSUser;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dataFormController")
public class DataFormController {
	/*
	 * @Autowired private TaskInstanceService taskInstanceService;
	 */
	@Autowired
	private RuntimeService runtimeService;
	@Autowired
	private RepositoryService repositoryService;
	@Autowired
	private TaskService taskService;
	@Autowired
	private HistoryService historyService;
	@Autowired
	private ActivitiService activitiService;
	@Autowired
	private ActProcessService actProcessService;
	@Autowired
	private SystemService systemService;
	@Autowired
	private ProcessEngine processEngine;
	public static String headQuery = "select content from cgform_head where table_name = ?";

	/**
	 * 跳转到代办审批页面
	 * 
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping(params = "examineIndex")
	public ModelAndView examineIndex(HttpServletRequest req, HttpServletResponse res, ModelAndView m) {
		m.setViewName("/examinIndex/examinList");
		m.addObject("q", "1");
		return m;
	}

	/**
	 * 跳转到代办审批历史页面
	 * 
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping(params = "examineHistory")
	public ModelAndView examineHistory(HttpServletRequest req, HttpServletResponse res, ModelAndView m) {
		m.setViewName("/examinIndex/examineHistory");
		return m;
	}

	/**
	 * 判断字符串非空
	 * */
	public boolean isNotNone(String str) {
		boolean flag = false;
		if (str != null && !str.isEmpty()) {
			flag = true;
		} else {
			flag = false;
		}
		return flag;
	}

	/**
	 * 获取代办页面数据
	 * 
	 * @throws ParseException
	 * */
	@RequestMapping(params = "examineData")
	public void examineData(HttpServletRequest req, HttpServletResponse res, DataGrid dataGrid) throws ParseException {
		TSUser user = (TSUser) req.getSession().getAttribute(ResourceUtil.LOCAL_CLINET_USER);
		// Page<DataStoreQuery> page=new Page<DataStoreQuery>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String startTime = req.getParameter("startTime");
		String endTime = req.getParameter("endTime");
		if ("1".equals(req.getParameter("q"))) {
			// int
			// total=taskService.createTaskQuery().taskAssignee(user.getUserName()).list().size();//候選人有A0001的任務
			int total = 0;
			int pageSize = dataGrid.getRows();
			int pageNo = dataGrid.getPage();
			int pageTotal = total / pageSize + 1;
			// List<Task> list = null;
//			List<Map<String, Object>> list = null;
			List<Map<String, Object>> toList = null;
//			String act_ru_task = "act_ru_task";
//			String act_hi_taskinst = "act_hi_taskinst";
			StringBuffer taskQuery = new StringBuffer("select * from act_ru_task where ASSIGNEE_ = ?");
			if (isNotNone(startTime) && isNotNone(endTime)) {
				taskQuery.append(" and CREATE_TIME_  BETWEEN ? and ? order by CREATE_TIME_ desc ");
				toList = systemService.findForJdbc(taskQuery.toString(),new Object[] { user.getUserName(), startTime,endTime });
//				list = systemService.findForJdbc(taskQuery.append(" LIMIT ?,?").toString(), new Object[] { user.getUserName(),startTime, endTime, pageSize * (pageNo - 1),pageSize});
				// list =
				// taskService.createTaskQuery().taskAssignee(user.getUserName()).taskCreatedAfter(sdf.parse(startTime)).taskCreatedBefore(sdf.parse(endTime)).listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);
			} else if (isNotNone(startTime)) {
				taskQuery.append(" and CREATE_TIME_  >= ?  order by CREATE_TIME_ desc ");
				toList = systemService.findForJdbc(taskQuery.toString(),new Object[] { user.getUserName(), startTime });
//				list = systemService.findForJdbc(taskQuery.append(" LIMIT ?,?").toString(),new Object[] { user.getUserName(), startTime,pageSize * (pageNo - 1), pageSize});
				// list =
				// taskService.createTaskQuery().taskAssignee(user.getUserName()).taskCreatedAfter(sdf.parse(startTime)).listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);
			} else if (isNotNone(endTime)) {
				taskQuery.append(" and CREATE_TIME_  <= ?  order by CREATE_TIME_ desc ");
				toList = systemService.findForJdbc(taskQuery.toString(),new Object[] { user.getUserName(), endTime });
//				list = systemService.findForJdbc(taskQuery.append(" LIMIT ?,?").toString(),new Object[] { user.getUserName(), endTime,pageSize * (pageNo - 1),pageSize});
				// list =
				// taskService.createTaskQuery().taskAssignee(user.getUserName()).taskCreatedBefore(sdf.parse(endTime)).listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);
			} else {
				taskQuery.append("  order by CREATE_TIME_ desc ");
				toList = systemService.findForJdbc(taskQuery.toString(),new Object[] { user.getUserName() });
//				list = systemService.findForJdbc(taskQuery.append(" LIMIT ?,?").toString(), new Object[] { user.getUserName(),pageSize * (pageNo - 1), pageSize});
				// list=taskService.createTaskQuery().taskAssignee(user.getUserName()).listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);//候選人有A0001的任務
			}
			for (int i=0;i<toList.size();i++) {
				Map<String, Object> task = toList.get(i);
				Map<String, Object> variablesLocal = runtimeService.getVariablesLocal((String) task.get("PROC_INST_ID_"));
				String tableId = variablesLocal.get("workNoID") + "";
				String tableName = variablesLocal.get("tableName") + "";
				Boolean isExistData=systemService.checkTableData(tableName, tableId);
				if(!isExistData){
					taskService.deleteTask((String) task.get("ID_"));
					ProcessDefinitionQuery processDefinitionKey = repositoryService.createProcessDefinitionQuery().processDefinitionKey(tableName);
			        if(processDefinitionKey!=null){
			        	ProcessInstance item=runtimeService.createProcessInstanceQuery().processInstanceBusinessKey(tableId).singleResult();
						if(item!=null){
							String procInsId="";
							procInsId=item.getId();
							if(!procInsId.isEmpty()){
								actProcessService.deleteProcIns(procInsId, "系统管理员删除表单数据");
								historyService.deleteHistoricProcessInstance(procInsId);
							}
						}
			        }
					toList.remove(i);
					continue;
				}
			}
			total = toList.size();
			for (int i=pageSize*(pageNo-1);(i<pageSize*pageNo&&i<toList.size()); i++) {
				Map<String, Object> task = toList.get(i);
				Map<String, Object> variablesLocal = runtimeService.getVariablesLocal((String) task.get("PROC_INST_ID_"));
				String tableId = variablesLocal.get("workNoID") + "";
				String tableName = variablesLocal.get("tableName") + "";
				String hiddenIds = (String) task.get("DESCRIPTION_");
				// String dataSql="select * from ? where id=?";
				// List<Map<String,Object>>
				// recordList=systemService.findForJdbc(dataSql,new
				// Object[]{tableName,tableId});
				List<Map<String, Object>> tableInfo = systemService.findForJdbc(headQuery, new Object[] { tableName });
				String typeName = "";
				if (tableInfo.size() > 0) {
					typeName = (String) tableInfo.get(0).get("content");
				}
				Map<String, Object> record = new HashMap<String, Object>();
				record.put("tableName", tableName);
				record.put("typeName", typeName);
				record.put("taskId", (String) task.get("ID_"));
				record.put("time", sdf.format(task.get("CREATE_TIME_")));
				record.put("tableId", tableId);
				record.put("taskName", (String) task.get("NAME_"));
				record.put("user", (String) task.get("ASSIGNEE_"));
				record.put("hiddenIds", hiddenIds);
				// record.put("data", recordList);
				datas.add(record);
			}
			dataGrid.setTotal(total);
		} else {
			// int
			// total=historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).finished().list().size();//候選人有A0001的任務
			int total = 0;
			int pageSize = dataGrid.getRows();
			int pageNo = dataGrid.getPage();
			int pageTotal = total / pageSize + 1;
			// List<HistoricTaskInstance> list = null;//候選人有A0001的任務
//			List<Map<String, Object>> list = null;// 候選人有A0001的任務
			List<Map<String, Object>> toList = null;
			StringBuffer hiQuery = new StringBuffer("select * from act_hi_taskinst where ASSIGNEE_=?  and DELETE_REASON_='completed' ");
			if (isNotNone(startTime) && isNotNone(endTime)) {
				hiQuery.append(" and END_TIME_ BETWEEN ? and ? order by END_TIME_ desc ");
				toList = systemService.findForJdbc(hiQuery.toString(),new Object[] { user.getUserName(), startTime,endTime });
//				list = systemService.findForJdbc(hiQuery.append(" LIMIT ?,?").toString(), new Object[] { user.getUserName(),startTime, endTime, pageSize * (pageNo - 1),pageSize});
				// list =
				// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).taskCompletedAfter(sdf.parse(startTime)).taskCompletedBefore(sdf.parse(endTime)).finished().listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);//候選人有A0001的任務
			} else if (isNotNone(startTime)) {
				hiQuery.append(" and END_TIME_ >= ?  order by END_TIME_ desc ");
				toList = systemService.findForJdbc(hiQuery.toString(),new Object[] { user.getUserName(), startTime });
//				list = systemService.findForJdbc(hiQuery.append(" LIMIT ?,?").toString(),new Object[] { user.getUserName(), startTime,pageSize * (pageNo - 1), pageSize});
				// list =
				// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).taskCompletedAfter(sdf.parse(startTime)).finished().listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);//候選人有A0001的任務
			} else if (isNotNone(endTime)) {
				hiQuery.append(" and END_TIME_ <= ?  order by END_TIME_ desc ");
				toList = systemService.findForJdbc(hiQuery.toString(),new Object[] { user.getUserName(), endTime });
//				list = systemService.findForJdbc(hiQuery.append(" LIMIT ?,?").toString(),new Object[] { user.getUserName(), endTime,pageSize * (pageNo - 1),pageSize});
				// list =
				// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).taskCompletedBefore(sdf.parse(endTime)).finished().listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);//候選人有A0001的任務
			} else {
				hiQuery.append(" order by END_TIME_ desc ");
				toList = systemService.findForJdbc(hiQuery.toString(),new Object[] { user.getUserName() });
//				list = systemService.findForJdbc(hiQuery.append(" LIMIT ?,?").toString(), new Object[] { user.getUserName(),pageSize * (pageNo - 1), pageSize});
				// list =
				// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).finished().listPage(pageSize*(pageNo-1),
				// pageSize*(pageNo)-1);//候選人有A0001的任務
			}
			for(int i=0;i<toList.size();i++){
				Map<String, Object> historicTaskInstance=toList.get(i);
				List<HistoricProcessInstance> historicProcessInstances = historyService.createHistoricProcessInstanceQuery()
						.processInstanceId((String) historicTaskInstance.get("PROC_INST_ID_")).list();
				String workorderNo = historicProcessInstances.get(0).getBusinessKey();
				String tableName = (String) historicTaskInstance.get("FORM_KEY_");
				Boolean isExistData=systemService.checkTableData(tableName, workorderNo);
				if(!isExistData){
							String procInsId="";
							procInsId=(String) historicTaskInstance.get("PROC_INST_ID_");
							if(!procInsId.isEmpty()){
								historyService.deleteHistoricProcessInstance(procInsId);
							}
					toList.remove(i);
					continue;
				}
			}
			total = toList.size();
			for (int i=pageSize*(pageNo-1);(i<pageSize*pageNo&&i<toList.size()); i++) {
				Map<String, Object> historicTaskInstance= toList.get(i);
				List<HistoricProcessInstance> historicProcessInstances = historyService.createHistoricProcessInstanceQuery()
						.processInstanceId((String) historicTaskInstance.get("PROC_INST_ID_")).list();
				String workorderNo = historicProcessInstances.get(0).getBusinessKey();
				String tableName = (String) historicTaskInstance.get("FORM_KEY_");
				List<Map<String, Object>> tableInfo = systemService.findForJdbc(headQuery, new Object[] { tableName });
				String typeName = "";
				if (tableInfo.size() > 0) {
					typeName = (String) tableInfo.get(0).get("content");
				}
				Map<String, Object> record = new HashMap<String, Object>();
				record.put("typeName", typeName);
				record.put("tableName", tableName);
				record.put("taskId",(String) historicTaskInstance.get("PROC_INST_ID_"));
				if (historicTaskInstance.get("END_TIME_") == null) {
					record.put("time", "");
				} else {
					record.put("time", historicTaskInstance.get("END_TIME_"));
				}
				record.put("tableId", workorderNo);
				record.put("taskName",(String) historicTaskInstance.get("NAME_") + "完成");
				record.put("user",(String) historicTaskInstance.get("ASSIGNEE_"));
				datas.add(record);
			}
			dataGrid.setTotal(total);
		}
		dataGrid.setResults(datas);
		TagUtil.datagrid(res, dataGrid);
	}

	/**
	 * app获取代办页面数据
	 * */
	@RequestMapping(params = "appexamineData")
	@ResponseBody
	public List<Map<String, Object>> appexamineData(HttpServletRequest req, HttpServletResponse res) {
		TSUser user = (TSUser) req.getSession().getAttribute(ResourceUtil.LOCAL_CLINET_USER);
		// Page<DataStoreQuery> page=new Page<DataStoreQuery>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if ("1".equals(req.getParameter("q"))) {
			int total = taskService.createTaskQuery().taskAssignee(user.getUserName()).list().size();// 候選人有A0001的任務
			List<Task> list = null;
			// if(dataStoreQuery.getStartDate()!=null &&
			// dataStoreQuery.getEndDate()!=null){
			// list =
			// taskService.createTaskQuery().taskAssignee(user.getUserName()).taskCreatedAfter(dataStoreQuery.getStartDate()).asc().orderByDueDate().taskCreatedBefore(dataStoreQuery.getEndDate()).listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);
			// }else if(dataStoreQuery.getStartDate()!=null){
			// list =
			// taskService.createTaskQuery().taskAssignee(user.getUserNo()).taskCreatedAfter(dataStoreQuery.getStartDate()).asc().orderByDueDate().listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);
			// }else if(dataStoreQuery.getEndDate()!=null){
			// list =
			// taskService.createTaskQuery().taskAssignee(user.getUserNo()).taskCreatedBefore(dataStoreQuery.getEndDate()).asc().orderByDueDate().listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);
			// }else{
			list = taskService.createTaskQuery().taskAssignee(user.getUserName()).orderByDueDate().asc().listPage(0, total - 1);// 候選人有A0001的任務
			// }
			for (Task task : list) {
				Map<String, Object> variablesLocal = runtimeService.getVariablesLocal(task.getProcessInstanceId());
				String tableId = variablesLocal.get("workNoID") + "";
				String tableName = variablesLocal.get("tableName") + "";
				String hiddenIds = (String) task.getDescription();
				// String dataSql="select * from ? where id=?";
				// List<Map<String,Object>>
				// recordList=systemService.findForJdbc(dataSql,new
				// Object[]{tableName,tableId});
				List<Map<String, Object>> tableInfo = systemService.findForJdbc(headQuery, new Object[] { tableName });
				String typeName = "";
				if (tableInfo.size() > 0) {
					typeName = (String) tableInfo.get(0).get("content");
				}
				Map<String, Object> record = new HashMap<String, Object>();
				record.put("tableName", tableName);
				record.put("typeName", typeName);
				record.put("taskId", task.getId());
				record.put("time", sdf.format(task.getCreateTime()));
				record.put("tableId", tableId);
				record.put("taskName", task.getName());
				record.put("user", task.getAssignee());
				record.put("hiddenIds", hiddenIds);
				// record.put("data", recordList);
				datas.add(record);
			}
		} else {
			int total = historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).finished().list().size();// 候選人有A0001的任務
			List<HistoricTaskInstance> list = historyService.createHistoricTaskInstanceQuery()
					.taskAssignee(user.getUserName()).finished().listPage(0, total - 1);// 候選人有A0001的任務
			// if(dataStoreQuery.getStartDate()!=null &&
			// dataStoreQuery.getEndDate()!=null){
			// list =
			// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserNo()).taskCompletedAfter(dataStoreQuery.getStartDate()).taskCompletedBefore(dataStoreQuery.getEndDate()).finished().listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);//候選人有A0001的任務
			// }else if(dataStoreQuery.getStartDate()!=null){
			// list =
			// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserNo()).taskCompletedAfter(dataStoreQuery.getStartDate()).finished().listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);//候選人有A0001的任務
			// }else if(dataStoreQuery.getEndDate()!=null){
			// list =
			// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserNo()).taskCompletedBefore(dataStoreQuery.getEndDate()).finished().listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);//候選人有A0001的任務
			// }else{
			// list =
			// historyService.createHistoricTaskInstanceQuery().taskAssignee(user.getUserName()).finished().listPage(pageSize*(pageNo-1),
			// pageSize*(pageNo)-1);//候選人有A0001的任務
			// }
			for (HistoricTaskInstance historicTaskInstance : list) {
				List<HistoricProcessInstance> historicProcessInstances = historyService.createHistoricProcessInstanceQuery()
						.processInstanceId(historicTaskInstance.getProcessInstanceId()).list();
				String workorderNo = historicProcessInstances.get(0).getBusinessKey();
				// Map<String, Object> processVariables =
				// historicProcessInstances.get(0).getProcessVariables();
				// String workorderNo=(String)processVariables.get("workNoID");
				String tableName = historicTaskInstance.getFormKey();
				List<Map<String, Object>> tableInfo = systemService.findForJdbc(headQuery, new Object[] { tableName });
				String typeName = "";
				if (tableInfo.size() > 0) {
					typeName = (String) tableInfo.get(0).get("content");
				}
				Map<String, Object> record = new HashMap<String, Object>();
				record.put("typeName", typeName);
				record.put("tableName", tableName);
				record.put("taskId", historicTaskInstance.getId());
				if (historicTaskInstance.getEndTime() == null) {
					record.put("time", "");
				} else {
					record.put("time",
							sdf.format(historicTaskInstance.getEndTime()));
				}
				record.put("tableId", workorderNo);
				record.put("taskName", historicTaskInstance.getName() + "完成");
				record.put("user", historicTaskInstance.getAssignee());
				datas.add(record);
			}
		}
		return datas;
	}

	@RequestMapping(params = "activPng")
	@ResponseBody
	public void activPng(HttpServletRequest req, HttpServletResponse res) {
		// 1.创建核心引擎流程对象processEngine
		ProcessInstance pi = runtimeService.createProcessInstanceQuery().processInstanceBusinessKey(req.getParameter("id"),req.getParameter("tableName")).singleResult();
		// 流程定义
		if (pi != null) {
			// 获取流程图
			BpmnModel bpmnModel = repositoryService.getBpmnModel(pi.getProcessDefinitionId());
			// 正在活动节点
			List<String> activeActivityIds = runtimeService.getActiveActivityIds(pi.getId());
			// 流程图生成器
			ProcessDiagramGenerator pdg = processEngine.getProcessEngineConfiguration().getProcessDiagramGenerator();
			// 生成流图片
			InputStream in = pdg.generateDiagram(bpmnModel, "PNG",activeActivityIds, activeActivityIds, 
					URLDecoder.decode(processEngine.getProcessEngineConfiguration().getActivityFontName(), "UTF-8"),
					URLDecoder.decode(processEngine.getProcessEngineConfiguration().getLabelFontName(), "UTF-8"), 
					URLDecoder.decode(processEngine.getProcessEngineConfiguration().getActivityFontName(), "UTF-8"),
					processEngine.getProcessEngineConfiguration().getProcessEngineConfiguration().getClassLoader(),
					1.0);
			try {
				// 生成本地图片 ,如果web展示直接输出流返回到response
				res.setContentType("text/html; charset=UTF-8");
				res.setContentType("image/jpeg");
				OutputStream out = res.getOutputStream();
				byte[] b = new byte[1024];
				int len = -1;
				while ((len = in.read(b, 0, 1024)) != -1) {
					res.getOutputStream().write(b, 0, len);
				}
				in.close();
				out.flush();
				out.close();
			} catch (Exception e) {
				throw new RuntimeException("生成流程图异常！", e);
			}
		} else {
			// 历史流程
			HistoricProcessInstance hpi = historyService.createHistoricProcessInstanceQuery().processInstanceBusinessKey(req.getParameter("id")).singleResult();
			// 流程图
			BpmnModel bpmnModel = repositoryService.getBpmnModel(hpi.getProcessDefinitionId());
			// 流程图生成器
			ProcessDiagramGenerator pdg = processEngine.getProcessEngineConfiguration().getProcessDiagramGenerator();
			// 历史高亮环节
			// List<HistoricActivityInstance> highLightedActivitList =
			// historyService.createHistoricActivityInstanceQuery().processInstanceId(hpi.getId()).list();

			// 结束类型的高亮点
			List<HistoricActivityInstance> engList = historyService.createHistoricActivityInstanceQuery()
					.processInstanceId(hpi.getId()).activityType("endEvent").list();
			// 高亮环节id集合
			List<String> highLightedActivitis = new ArrayList<String>();
			for (HistoricActivityInstance tempActivity : engList) {
				String activityId = tempActivity.getActivityId();
				highLightedActivitis.add(activityId);
			}
			// 所有定义的节点
			// ProcessDefinitionEntity definitionEntity =
			// (ProcessDefinitionEntity)repositoryService.getProcessDefinition(hpi.getProcessDefinitionId());
			// 高亮线路id集合
			// List<String> highLightedFlows =
			// getHighLightedFlows(definitionEntity,engList);
			// 中文显示的是口口口，设置字体就好了
			InputStream in = pdg.generateDiagram(bpmnModel, "png",highLightedActivitis, highLightedActivitis, 
					URLDecoder.decode(processEngine.getProcessEngineConfiguration().getActivityFontName(), "UTF-8"),
					URLDecoder.decode(processEngine.getProcessEngineConfiguration().getLabelFontName(), "UTF-8"), 
					URLDecoder.decode(processEngine.getProcessEngineConfiguration().getActivityFontName(), "UTF-8"),
					processEngine.getProcessEngineConfiguration().getProcessEngineConfiguration().getClassLoader(),
					1.0);

			try {
				// 生成本地图片 ,如果web展示直接输出流返回到response
				res.setContentType("text/html; charset=UTF-8");
				res.setContentType("image/jpeg");
				OutputStream out = res.getOutputStream();
				byte[] b = new byte[1024];
				int len = -1;
				while ((len = in.read(b, 0, 1024)) != -1) {
					res.getOutputStream().write(b, 0, len);
				}
				in.close();
				out.flush();
				out.close();
				/*
				 * String msg = "<center>当前工单流程已经结束！</center>";
				 * res.setHeader("Content-type", "text/html;charset=UTF-8");
				 * OutputStream ps = res.getOutputStream();
				 * ps.write(msg.getBytes("UTF-8"));
				 */
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private List<String> getHighLightedFlows(ProcessDefinitionEntity processDefinitionEntity, List<HistoricActivityInstance> historicActivityInstances) {
		List<String> highFlows = new ArrayList<String>();// 用以保存高亮的线flowId
		for (int i = 0; i < historicActivityInstances.size() - 1; i++) {// 对历史流程节点进行遍历
			ActivityImpl activityImpl = processDefinitionEntity.findActivity(historicActivityInstances.get(i).getActivityId());// 得到节点定义的详细信息
			List<ActivityImpl> sameStartTimeNodes = new ArrayList<ActivityImpl>();// 用以保存后需开始时间相同的节点
			ActivityImpl sameActivityImpl1 = processDefinitionEntity.findActivity(historicActivityInstances.get(i + 1).getActivityId());
			// 将后面第一个节点放在时间相同节点的集合里
			sameStartTimeNodes.add(sameActivityImpl1);
			for (int j = i + 1; j < historicActivityInstances.size() - 1; j++) {
				HistoricActivityInstance activityImpl1 = historicActivityInstances.get(j);// 后续第一个节点
				HistoricActivityInstance activityImpl2 = historicActivityInstances.get(j + 1);// 后续第二个节点
				if (activityImpl1.getStartTime().equals(activityImpl2.getStartTime())) {
					// 如果第一个节点和第二个节点开始时间相同保存
					ActivityImpl sameActivityImpl2 = processDefinitionEntity.findActivity(activityImpl2.getActivityId());
					sameStartTimeNodes.add(sameActivityImpl2);
				} else {
					// 有不相同跳出循环
					break;
				}
			}
			List<PvmTransition> pvmTransitions = activityImpl.getOutgoingTransitions();// 取出节点的所有出去的线
			for (PvmTransition pvmTransition : pvmTransitions) {
				// 对所有的线进行遍历
				ActivityImpl pvmActivityImpl = (ActivityImpl) pvmTransition.getDestination();
				// 如果取出的线的目标节点存在时间相同的节点里，保存该线的id，进行高亮显示
				if (sameStartTimeNodes.contains(pvmActivityImpl)) {
					highFlows.add(pvmTransition.getId());
				}
			}
		}
		return highFlows;
	}

	/**
	 * 根据表名和id获取数据
	 * */
	@RequestMapping(params = "getTableData")
	@ResponseBody
	public List<Map<String, Object>> getTableData(HttpServletRequest req) {
		String tableName = req.getParameter("tableName");
		String id = req.getParameter("id");
		String sql = "select * from " + tableName + " where id= ?";
		List<Map<String, Object>> list = systemService.findForJdbc(sql,new Object[] { id });
		// 删除流程数据
		ProcessDefinitionQuery processDefinitionKey = repositoryService.createProcessDefinitionQuery().processDefinitionKey(tableName);
		if (processDefinitionKey != null) {
			ProcessInstance item = runtimeService.createProcessInstanceQuery().processInstanceBusinessKey(id).singleResult();
			if (item != null) {
				list.get(0).put("isEnd", "N");
			} else {
				list.get(0).put("isEnd", "Y");
			}
		}
		return list;
	}

	/**
	 * 根据表名获取流程节点信息数据
	 * */
	@RequestMapping(params = "getLcByTable")
	@ResponseBody
	public List<Map<String, Object>> getLcByTable(HttpServletRequest req) {
		String tableName = req.getParameter("tableName");
		String id = req.getParameter("id");
		String sql = "select typecode,typename from t_s_type where typegroupid " +
				"=(select id from t_s_typegroup where typegroupcode='"+tableName+"')";
		List<Map<String, Object>> list = systemService.findForJdbc(sql);
		return list;
	}
	@RequestMapping(params="getSession")
	@ResponseBody
	public String getSession(HttpServletRequest req){
		String name=req.getParameter("name");
		String result=String.valueOf(req.getSession().getAttribute(name));
		return result;
	} 
	@RequestMapping(params="setSession")
	@ResponseBody
	public String setSession(HttpServletRequest req){
		String name=req.getParameter("name");
		String value=req.getParameter("value");
		 req.getSession().setAttribute(name, value);
		 return "1";
	} 
}

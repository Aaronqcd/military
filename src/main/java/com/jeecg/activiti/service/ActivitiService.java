package com.jeecg.activiti.service;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.bpmn.behavior.UserTaskActivityBehavior;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmActivity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.IdentityLink;
import org.activiti.engine.task.IdentityLinkType;
import org.activiti.engine.task.Task;
import org.apache.commons.collections.map.HashedMap;
import org.h2.util.StringUtils;
import org.jeecgframework.core.common.dao.ICommonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;


@Service
@Transactional
public class ActivitiService {
	@Autowired
	private RepositoryService repositoryService;
	@Autowired
	private RuntimeService runtimeService;
	@Autowired
	private TaskService taskService;
	public static ICommonDao commonDao = null;

	@Resource
	public void setCommonDao(ICommonDao commonDao) {
		this.commonDao = commonDao;
	}

	/*
	 * @Autowired private DepartmentService departmentService;
	 */

	/**
	 * 发起流程节点操作
	 * */
	public Map<String, Object> startProcessInstance(String classifyNo,
			String workorderNo, Map<String, Object> variables) {
		// 获取最新版流程id
		String pid = repositoryService.createProcessDefinitionQuery()
				.processDefinitionKey(classifyNo)
				.orderByProcessDefinitionVersion().desc().list().get(0).getId();
		// 发起流程
		ProcessInstance pi = runtimeService.startProcessInstanceById(pid,
				workorderNo, variables);
		// 获取发起节点
		List<Task> tasklist = taskService.createTaskQuery()
				.processInstanceId(pi.getId()).list();
		for (Task task : tasklist) {
			taskService.complete(task.getId());// 完成发起节点任务
		}
		// 获取下一节点任务
		List<Task> tasklist2 = taskService.createTaskQuery()
				.processInstanceId(pi.getId()).list();
		Map<String, Object> taskResult = new HashMap<String, Object>();// 设定候选人任务集合
		// 遍历任务节点
		for (Task task : tasklist2) {
			Map<String, Object> taskUserList = new HashMap<String, Object>();
			List<IdentityLink> identityLinksForTask = taskService
					.getIdentityLinksForTask(task.getId());// 获取任务的候选人
			String userSql = "select DISTINCT d.org_code,t.user_own_company AS departid,d.departname from t_s_base_user t  LEFT JOIN t_s_depart d on  "
					+ "t.user_own_company=d.ID where  FIND_IN_SET(t.username,?)>0 ORDER BY d.org_code asc";
			StringBuffer userStr = new StringBuffer();
			for (IdentityLink identityLink : identityLinksForTask) {
				if (identityLink.getType().equals(IdentityLinkType.CANDIDATE)) {
					userStr.append(identityLink.getUserId()).append(",");
					// List<Map<String,Object>>
					// userList1=commonDao.findForJdbc(userSql,new
					// Object[]{identityLink.getUserId()});
					// if(userList1.size()>0){
					// userList.addAll(userList1);
					// }
				}
			}
			List<Map<String, Object>> userList1 = commonDao.findForJdbc(
					userSql, new Object[] { userStr.toString() });
			/*
			 * Map<String,Object> userMap = new HashedMap(); List list = new
			 * ArrayList(); for(Map<String,Object> map:userList){
			 * if(userMap.containsKey(map.get("departname"))){
			 * //if(list.size()<0){ list =
			 * (List)userMap.get(map.get("departname")); //}else{ list.add(map);
			 * //} userMap.put((String)map.get("departname"),list); }else{
			 * if(list.size()>0){ list = new ArrayList(); } list.add(map);
			 * userMap.put((String)map.get("departname"),list); } }
			 */
			taskUserList.put(task.getName(), userList1);
			taskResult.put(task.getId(), taskUserList);
		}
		return taskResult;
	}

	/**
	 * 整改，审核流程节点操作
	 * */
	public Map<String, Object> approved(String taskId,
			Map<String, Object> variables) {
		// 获取该任务的流程实例ID
		Task singleResult = taskService.createTaskQuery().taskId(taskId)
				.singleResult();
		String pId = "";
		if (singleResult != null) {
			pId = singleResult.getProcessInstanceId();
			// 完成任务
			taskService.complete(taskId, variables);
			// 获取下一节点任务
			List<Task> tasklist2 = taskService.createTaskQuery()
					.processInstanceId(pId).list();
			Map<String, Object> taskResult = new HashMap<String, Object>();// 设定候选人任务集合
			for (Task task : tasklist2) {
				Map<String, Object> taskUserList = new HashMap<String, Object>();
				List<Map<String, Object>> userList = new ArrayList<Map<String, Object>>();
				List<IdentityLink> identityLinksForTask = taskService
						.getIdentityLinksForTask(task.getId());// 获取任务的候选人
				// String
				// deptSql="SELECT ID AS id, ( CASE WHEN departname = '机组' THEN '局安全环保部' ELSE departname END ) AS name"
				// +
				// " FROM t_s_depart a WHERE org_type = 1 OR org_type = 7 OR org_type = 8";
				// List<Map<String,Object>>
				// departList=commonDao.findForJdbc(deptSql.toString(),new
				// Object[]{});
				String userSql = "select DISTINCT d.org_code,t.user_own_company AS departid,d.departname from t_s_base_user t  LEFT JOIN t_s_depart d on  "
						+ "t.user_own_company=d.ID where  FIND_IN_SET(t.username,?)>0 ORDER BY d.org_code asc";
				StringBuffer userStr = new StringBuffer();
				for (IdentityLink identityLink : identityLinksForTask) {
					if (identityLink.getType().equals(
							IdentityLinkType.CANDIDATE)) {
						userStr.append(identityLink.getUserId()).append(",");
						;
					}
				}
				List<Map<String, Object>> userList1 = commonDao.findForJdbc(
						userSql, new Object[] { userStr });
				if (userList1.size() > 0) {
					userList.addAll(userList1);
					// userMap.put((String)userList1.get(0).get("user_own_company"),
					// userList1.get(0));
				}
				Map<String, Object> userMap = new HashedMap();
				List list = new ArrayList();
				for (Map<String, Object> map : userList) {
					if (userMap.containsKey(map.get("departname"))) {
						list = (List) userMap.get(map.get("departname"));
						list.add(map);
						userMap.put((String) map.get("departname"), list);
					} else {
						if (list.size() > 0) {
							list = new ArrayList();
						}
						list.add(map);
						userMap.put((String) map.get("departname"), list);
					}
				}
				// userList.put("department", departList);
				// userList.put("user", userMap);
				taskUserList.put(task.getName(), userList1);
				taskResult.put(task.getId(), taskUserList);
			}
			return taskResult;
		} else {
			return null;
		}

	}

	public String getCondition(String taskId) {
		// taskService
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		if (task != null) {
			String processDefinitionId = task.getProcessDefinitionId();
			// 根据流程定义ID查出流程定义，转型至扩展类ProcessDefinitionEntity以便拥有获取定义节点的方法
			ProcessDefinitionEntity definitionEntity = (ProcessDefinitionEntity) repositoryService
					.getProcessDefinition(processDefinitionId);
			ExecutionEntity execution = (ExecutionEntity) runtimeService
					.createProcessInstanceQuery()
					.processInstanceId(task.getProcessInstanceId())
					.singleResult();
			// 获取定义的节点集合
			List<ActivityImpl> activities = definitionEntity.getActivities();
			String activitiId = execution.getActivityId();
			String conditionText = "";
			for (ActivityImpl activityImpl : activities) {
				String id = activityImpl.getId();
				if (activitiId.equals(id)) {
					// 输出某个节点的某种属性
					List<PvmTransition> outTransitions = activityImpl
							.getOutgoingTransitions();// 获取从某个节点出来的所有线路
					for (PvmTransition tr : outTransitions) {
						List<PvmTransition> outTransitionsTemp = tr
								.getDestination().getOutgoingTransitions();
						if ("exclusiveGateway".equals(tr.getDestination()
								.getProperty("type"))) {
							conditionText = (String) outTransitionsTemp.get(0)
									.getProperty("conditionText");
						}
					}
					break;
				}
			}
			return conditionText;
		}
		return "";
	}

	/**
	 * 获取下一个用户任务用户组信息
	 * 
	 * @param String
	 *            taskId 任务Id信息
	 * @return 下一个用户任务用户组信息
	 * @throws Exception
	 */
	public Set<Expression> getNextTaskGroup(String taskId) throws Exception {
		ProcessDefinitionEntity processDefinitionEntity = null;
		String id = null;
		TaskDefinition task = null;
		// 获取流程实例Id信息
		String processInstanceId = taskService.createTaskQuery().taskId(taskId)
				.singleResult().getProcessInstanceId();
		// 获取流程发布Id信息
		String definitionId = runtimeService.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).singleResult()
				.getProcessDefinitionId();
		processDefinitionEntity = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
				.getDeployedProcessDefinition(definitionId);
		ExecutionEntity execution = (ExecutionEntity) runtimeService
				.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).singleResult();
		// 当前流程节点Id信息
		String activitiId = execution.getActivityId();
		// 获取流程所有节点信息
		List<ActivityImpl> activitiList = processDefinitionEntity
				.getActivities();
		// 遍历所有节点信息
		for (ActivityImpl activityImpl : activitiList) {
			id = activityImpl.getId();
			// 找到当前节点信息
			if (activitiId.equals(id)) {
				// 获取下一个节点信息
				task = nextTaskDefinition(activityImpl, activityImpl.getId(),
						null, processInstanceId);
				break;
			}
		}
		return task.getCandidateGroupIdExpressions();
	}

	/**
	 * 下一个任务节点信息,
	 * 
	 * 如果下一个节点为用户任务则直接返回,
	 * 
	 * 如果下一个节点为排他网关, 获取排他网关Id信息, 根据排他网关Id信息和execution获取流程实例排他网关Id为key的变量值,
	 * 根据变量值分别执行排他网关后线路中的el表达式, 并找到el表达式通过的线路后的用户任务信息
	 * 
	 * @param ActivityImpl
	 *            activityImpl 流程节点信息
	 * @param String
	 *            activityId 当前流程节点Id信息
	 * @param String
	 *            elString 排他网关顺序流线段判断条件, 例如排他网关顺序留线段判断条件为${money>1000},
	 *            若满足流程启动时设置variables中的money>1000, 则流程流向该顺序流信息
	 * @param String
	 *            processInstanceId 流程实例Id信息
	 * @return
	 */
	private TaskDefinition nextTaskDefinition(ActivityImpl activityImpl,
											  String activityId, String elString, String processInstanceId) {
		PvmActivity ac = null;
		Object s = null;
		// 如果遍历节点为用户任务并且节点不是当前节点信息
		if ("userTask".equals(activityImpl.getProperty("type"))
				&& !activityId.equals(activityImpl.getId())) {
			// 获取该节点下一个节点信息
			TaskDefinition taskDefinition = ((UserTaskActivityBehavior) activityImpl
					.getActivityBehavior()).getTaskDefinition();
			return taskDefinition;
		} else {
			// 获取节点所有流向线路信息
			List<PvmTransition> outTransitions = activityImpl
					.getOutgoingTransitions();
			List<PvmTransition> outTransitionsTemp = null;
			for (PvmTransition tr : outTransitions) {
				ac = tr.getDestination(); // 获取线路的终点节点
				// 如果流向线路为排他网关
				if ("exclusiveGateway".equals(ac.getProperty("type"))) {
					outTransitionsTemp = ac.getOutgoingTransitions();
					// 如果网关路线判断条件为空信息
					if (StringUtils.isNullOrEmpty(elString)) {
						// 获取流程启动时设置的网关判断条件信息
						elString = getGatewayCondition(ac.getId(),
								processInstanceId);
					}
					// 如果排他网关只有一条线路信息
					if (outTransitionsTemp.size() == 1) {
						return nextTaskDefinition(
								(ActivityImpl) outTransitionsTemp.get(0)
										.getDestination(), activityId,
								elString, processInstanceId);
					} else if (outTransitionsTemp.size() > 1) { // 如果排他网关有多条线路信息
						for (PvmTransition tr1 : outTransitionsTemp) {
							s = tr1.getProperty("conditionText"); // 获取排他网关线路判断条件信息
							// 判断el表达式是否成立
							/*
							 * if(isCondition(ac.getId(), s.toString().trim(),
							 * elString)){ return
							 * nextTaskDefinition((ActivityImpl
							 * )tr1.getDestination(), activityId, elString,
							 * processInstanceId); }
							 */
						}
					}
				} else if ("userTask".equals(ac.getProperty("type"))) {
					return ((UserTaskActivityBehavior) ((ActivityImpl) ac)
							.getActivityBehavior()).getTaskDefinition();
				}
			}
			return null;
		}
	}

	/**
	 * 查询流程启动时设置排他网关判断条件信息
	 * 
	 * @param String
	 *            gatewayId 排他网关Id信息, 流程启动时设置网关路线判断条件key为网关Id信息
	 * @param String
	 *            processInstanceId 流程实例Id信息
	 * @return
	 */
	public String getGatewayCondition(String gatewayId, String processInstanceId) {
		Execution execution = runtimeService.createExecutionQuery()
				.processInstanceId(processInstanceId).singleResult();
		return runtimeService.getVariable(execution.getId(), gatewayId)
				.toString();
	}

	/*
	 * public Map<String, Object> startProcessInstance1(String classifyNo,String
	 * workorderNo, Map<String,Object> variables){ //获取最新版流程id String pid =
	 * repositoryService
	 * .createProcessDefinitionQuery().processDefinitionKey(classifyNo)
	 * .orderByProcessDefinitionVersion() .desc().list().get(0).getId(); //发起流程
	 * ProcessInstance pi =
	 * runtimeService.startProcessInstanceById(pid,workorderNo,variables);
	 * //获取发起节点 List<Task> tasklist =
	 * taskService.createTaskQuery().processInstanceId(pi.getId()).list(); for
	 * (Task task : tasklist) { taskService.complete(task.getId());//完成发起节点任务 }
	 * //获取下一节点任务 List<Task> tasklist2 =
	 * taskService.createTaskQuery().processInstanceId(pi.getId()).list();
	 * Map<String,Object> taskResult = new HashMap<String,Object>();//设定候选人任务集合
	 * //遍历任务节点 for (Task task : tasklist2) { Map<String,Object> taskUserList =
	 * new HashMap<String,Object>(); List<String> userList = new
	 * ArrayList<String>(); List<IdentityLink> identityLinksForTask =
	 * taskService.getIdentityLinksForTask(task.getId());//获取任务的候选人 for
	 * (IdentityLink identityLink : identityLinksForTask) {
	 * userList.add(identityLink.getUserId()); }
	 * taskUserList.put(task.getName(), userList);
	 * taskUserList.put(task.getName(), userList);
	 * 
	 * taskResult.put(task.getId(),taskUserList); } return taskResult; } public
	 * Map<String, Object> approved1(String taskId,Map<String,Object>
	 * variables){ //获取该任务的流程实例ID String pId =
	 * taskService.createTaskQuery().taskId
	 * (taskId).singleResult().getProcessInstanceId(); //完成任务
	 * taskService.complete(taskId,variables); //获取下一节点任务 List<Task> tasklist2 =
	 * taskService.createTaskQuery().processInstanceId(pId).list();
	 * Map<String,Object> taskResult = new HashMap<String,Object>();//设定候选人任务集合
	 * for (Task task : tasklist2) { Map<String,Object> taskUserList = new
	 * HashMap<String,Object>(); List<Map<String,Object>> userList = new
	 * ArrayList<Map<String,Object>>(); List<IdentityLink> identityLinksForTask
	 * = taskService.getIdentityLinksForTask(task.getId());//获取任务的候选人
	 * 
	 * for (IdentityLink identityLink : identityLinksForTask) {
	 * if(identityLink.getType().equals(IdentityLinkType.CANDIDATE)){ UserQuery
	 * userQuery2 = new UserQuery();
	 * userQuery2.setUserNo(identityLink.getUserId());
	 * //userList.add(userService.selectUserMap(userQuery2)); Map<String,
	 * Object> selectUserMap = userService.selectUserMap(userQuery2);
	 * if(null!=selectUserMap){ userList.add(selectUserMap); } } }
	 * List<Map<String,Object>>
	 * deptList=departmentService.selectAllCompanyList();
	 * userList.addAll(deptList); taskUserList.put(task.getName(), userList);
	 * taskResult.put(task.getId(),taskUserList); } return taskResult; return
	 * null; }
	 */
}

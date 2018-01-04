<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
 <head>
  <title>项目表</title>
  <t:base type="jquery,easyui,tools,DatePicker"></t:base>
  <script type="text/javascript">
  //编写自定义JS代码
  </script>
 </head>
 <body>
		<t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="projectController.do?doUpdate" >
					<input id="id" name="id" type="hidden" value="${projectPage.id }">
					<input id="createName" name="createName" type="hidden" value="${projectPage.createName }">
					<input id="createBy" name="createBy" type="hidden" value="${projectPage.createBy }">
					<input id="createDate" name="createDate" type="hidden" value="${projectPage.createDate }">
					<input id="updateName" name="updateName" type="hidden" value="${projectPage.updateName }">
					<input id="updateBy" name="updateBy" type="hidden" value="${projectPage.updateBy }">
					<input id="updateDate" name="updateDate" type="hidden" value="${projectPage.updateDate }">
					<input id="sysOrgCode" name="sysOrgCode" type="hidden" value="${projectPage.sysOrgCode }">
					<input id="sysCompanyCode" name="sysCompanyCode" type="hidden" value="${projectPage.sysCompanyCode }">
					<input id="bpmStatus" name="bpmStatus" type="hidden" value="${projectPage.bpmStatus }">
					<input id="showPic" name="showPic" type="hidden" value="${projectPage.showPic }">
		<table style="width: 600px;" cellpadding="0" cellspacing="1" class="formtable">
					<tr>
						<td align="right">
							<label class="Validform_label">
								项目名称:
							</label>
						</td>
						<td class="value">
						     	 <input id="projectName" name="projectName" type="text" style="width: 150px" class="inputxt"  
						     	 ignore="ignore" 
						     	 value='${projectPage.projectName}'>
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">项目名称</label>
						</td>
					</tr>
					<tr>
						<td align="right">
							<label class="Validform_label">
								项目简介:
							</label>
						</td>
						<td class="value">
						  	 	<textarea id="projectIntro" style="width:400px;height:50px;" class="inputxt" rows="6" name="projectIntro"
						  	 	ignore="ignore"
						  	 	>${projectPage.projectIntro}</textarea>
							<span class="Validform_checktip"></span>
							<label class="Validform_label" style="display: none;">项目简介</label>
						</td>
					</tr>
			</table>
		</t:formvalid>
 </body>
  <script src = "webpage/com/jeecg/project/project.js"></script>		

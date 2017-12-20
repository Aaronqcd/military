<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<title>待办工单</title>
<div class="easyui-layout" fit="true">
	<div region="center" style="padding:1px;">
		<t:datagrid name="examinList" title="待办工单"
			actionUrl="dataFormController.do?examineData&q=1" pageSize="10"
			idField="id" fit="true" sortName="time" sortOrder="asc">
			<t:dgCol title="流程号" field="taskId"></t:dgCol>
			<t:dgCol title="工单类型" field="typeName"></t:dgCol>
			<t:dgCol title="表名" field="tableName"></t:dgCol>
			<t:dgCol title="待办人" field="user" hidden="true"></t:dgCol>
			<t:dgCol title="hiddenIds" field="hiddenIds" hidden="true"></t:dgCol>
			<t:dgCol title="提交时间" field="time" formatter="yyyy-MM-dd hh:mm:ss"></t:dgCol>
			<t:dgCol title="处理类型" field="taskName"></t:dgCol>
			<t:dgCol title="流水号" field="tableId"></t:dgCol>
			<%--    <t:dgToolBar title="处理表单" funname="doExamin"></t:dgToolBar>
   <t:dgToolBar title="查看表单" funname="showExamin"></t:dgToolBar>
   <t:dgToolBar title="已办历史页面" funname="showHistory"></t:dgToolBar> --%>
		</t:datagrid>
		<div id="departListtb" style="padding: 3px; height: 25px">
			<div style="float: left;">
				<span> <span
					style="vertical-align:middle;display:-moz-inline-box;display:inline-block;width: 80px;text-align:right;"
					title="提交时间 "> <t:mutiLang langKey="提交时间" />: </span> <input
					type="text" name="startTime" id="startTime"
					style="width: 160px; height: 24px;" class="Wdate"
					onFocus="WdatePicker({maxDate:'#F{$dp.$D(\'endTime\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})">~
					<input type="text" name="endTime" id="endTime"
					style="width: 160px; height: 24px; margin-right: 20px;"
					class="Wdate"
					onFocus="WdatePicker({minDate:'#F{$dp.$D(\'startTime\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
				</span> <a href="#" class="easyui-linkbutton" plain="true"
					icon="icon-search" onclick="doSearch()">查询</a> <a href="#"
					class="easyui-linkbutton" plain="true" icon="icon-search"
					onclick="doClear()">清除</a> <a href="#" class="easyui-linkbutton"
					plain="true" icon="icon-edit" onclick="doExamin()">处理工单</a> <a
					href="#" class="easyui-linkbutton" plain="true" icon="icon-search"
					onclick="showExamin()">查看工单</a> <a href="#"
					class="easyui-linkbutton" plain="true" icon=""
					onclick="showHistory()">待办历史页面</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" charset="utf-8">
	function doExamin() {
		var rowsData = $('#examinList').datagrid('getSelections');
		if (!rowsData.length > 0) {
			layer.alert("请先选择记录!");
			return;
		}
		var tableId = rowsData[0].tableId;
		var tableName = rowsData[0].tableName;
		var taskId = rowsData[0].taskId;
		var hiddenIds = rowsData[0].hiddenIds;
		var process_condition = getLc(tableName, rowsData[0].taskName);
		/* "3";//表示审核和局审批
		if ("整改" == rowsData[0].taskName || "单位审批" == rowsData[0].taskName) {
			process_condition = "2";//表示整改
		}
		if ("通信公司备案" == rowsData[0].taskName
				&& tableName == 'safe_gps_installation') {
			process_condition = "8";//表示在GPS通信公司备案
		} */
		var url = "cgFormBuildController/ftlForm/" + tableName
				+ "/goUpdate.do?id=" + tableId + "&taskName="
				+ rowsData[0].taskName + "&taskId=" + taskId + "&hiddenIds="
				+ hiddenIds;
		//update('<t:mutiLang langKey="处理" langArg="处理"/>', url, "examinList","880","650");
		createwindow('处理', url, "810", "540");
		// location.href=url;
	}
	function getLc(tableName, taskName) {//获取流程节点数据，并能获取节点数
		var process_condition="";
		$.ajax({
			url:'dataFormController.do?getLcByTable',
			type:'post',
			async : false, //同步执
			dataType:'json',
			data:{'tableName':tableName},
			success:function(data){
				for(var i=0;i<data.length;i++){
					if(taskName==data[i].typename){
						process_condition = data[i].typecode;
					}
				}
			}
		});
		return process_condition;
	}
	function doSearch() {
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		if (jQuery.trim(startTime) != '' || jQuery.trim(endTime) != '') {
			$("#examinList").datagrid('load', {
				startTime : startTime,
				endTime : endTime
			});
		} else {
			$("#examinList").datagrid('load', {});
		}
	}
	function doClear() {
		$("#startTime").val("");
		$("#endTime").val("");
		$("#examinList").datagrid('load', {});
	}
	function showExamin() {
		var rowsData = $('#examinList').datagrid('getSelections');
		if (!rowsData.length > 0) {
			layer.alert("请先选择记录!");
			return;
		}
		var tableId = rowsData[0].tableId;
		var tableName = rowsData[0].tableName;
		var process_condition = getLc(tableName, rowsData[0].taskName);
		var url = "cgFormBuildController/ftlForm/" + tableName
				+ "/goDetail.do?id=" + tableId + "&taskName="
				+ rowsData[0].taskName;
		//update('<t:mutiLang langKey="查看" langArg="查看"/>', url, "examinList","880","650");
		createwindow('查看', url, "810", "540");
		//location.href=url;
	}
	function showHistory() {
		location.href = "dataFormController.do?examineHistory";
	}
</script>
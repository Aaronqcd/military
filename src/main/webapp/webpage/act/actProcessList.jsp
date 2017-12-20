<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<title>流程管理</title>
	<meta name="decorator" content="default"/>
	<link rel="shortcut icon" href="favicon.ico"> 
    <link href="${pageContext.request.contextPath}/front/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resource/js/layer/skin/default/layer.css"  rel="stylesheet" type="text/css"/>
    <link href="${pageContext.request.contextPath}/front/css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/custom/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/custom/secure.css">
    <script src="${pageContext.request.contextPath}/front/js/jquery.min.js?v=2.1.4"></script>
    <script src="${pageContext.request.contextPath}/resource/js/custom/common.js"></script>
    <script src="${pageContext.request.contextPath}/front/js/bootstrap.min.js?v=3.3.6"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/layer/layer.js"></script>
</head>
<body>
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- <div class="panel panel-default title-panel">
			<div class="col-md-3">
				<span class="title-span">流程管理</span>
			</div>
		</div> -->
		<div class="panel panel-default apply-search">
			<div class="panel-body">
				<form class="form-inline" method="post"
					action="">
					<div class="form-group">
						<div class="form-group">
							<label for="userName_search">流程名称</label>
							<div class="input-group">
								<input type="text" name="definitionName"
									value="" placeholder="名称"
									class=" form-control"> <span class="input-group-btn"
									style="padding-left: 20px;">
									<button type="submit" class="btn  btn-sm btn-custom"
										style="background-color: #4ea8f9;">搜索</button> </span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="panel panel-default apply-main">
			<div class="panel panel-default apply-main">
				<div style="padding: 10px 10px">
					<table class="table table-bordered table-hover definewidth m10"
						style="font-size: 12px;text-align: center;">
						<thead>
			<tr>
				<th style="text-align: center;">流程ID</th>
				<th style="text-align: center;">流程标识</th>
				<!-- <th>流程名称</th> -->
				<th style="text-align: center;">流程版本</th>
				<th style="text-align: center;">部署时间</th>
				<th style="text-align: center;">流程XML</th>
				<th style="text-align: center;">流程图片</th>
				<th width="7%;" style="text-align: center;">操作</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${processList}" var="object">

				<c:set var="process" value="${object[0]}" />
				<c:set var="deployment" value="${object[1]}" />
				<tr>
					<td>${process.id}</td>
					<td>${process.key}</td>
					<%-- <td>${process.name}</td> --%>
					<td><b title='流程版本号'>V: ${process.version}</b></td>
					<td><fmt:formatDate value="${deployment.deploymentTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
					<td><a target="_blank" href="${pageContext.request.contextPath}/act/procinstance/resourceRead.do?procDefId=${process.id}&resType=xml">${process.resourceName}</a></td>
					<td><a target="_blank" href="${pageContext.request.contextPath}/act/procinstance/resourceRead.do?procDefId=${process.id}&resType=image">${process.diagramResourceName}</a></td>
					<td>
						<c:if test="${process.suspended}">
							<a href="javascript:;" onclick='updateState("active","${process.id}")'>激活</a>
						</c:if>
						<c:if test="${!process.suspended}">
							<a href="javascript:;" onclick='updateState("suspend","${process.id}")'>挂起</a>
						</c:if>
						<a href='javascript:;' onclick="deleteProc(${process.deploymentId})">删除</a>
                       <%--  <a href='${pageContext.request.contextPath}/act/process/convert/toModel?procDefId=${process.id}' onclick="return confirmx('确认要转换为模型吗？', this.href)">转换为模型</a> --%>
					</td>
				</tr>
			</c:forEach>
		</tbody>
					</table>
					<div class="col-md-12">
						<it:page
							url="${pageContext.request.contextPath}/activiti/process_processList.action"></it:page>
					</div>
				</div>
			</div>
		</div>
	</div>
	<input id="pageno" type="hidden" value="${page.pageNo}" />
	<input id="pagesize" type="hidden" value="${page.pageSize}" />
	<script type="text/javascript">
		var path = $("#contextPath").val();
		var pageno = $("#pageno").val();
		var pagesize = $("#pagesize").val();
		$(function() {
				$(function() {
					$(".jumppage").blur(function() {
						location.href=path+"/activiti/process_processList.action?pageNo="+$(this).val()+
							"&pageSize="+pagesize;
					})
					$(".pagesize").blur(function() {
						location.href=path+"/activiti/process_processList.action?pageNo="+pageno+"&pageSize="+
							$(this).val();
					})
					$(".jumppage").keydown(function(e){
						if(e.keyCode==13){
							location.href=path+"/activiti/process_processList.action?pageNo="+$(this).val()+
								"&pageSize="+pagesize;
						}
					});
					$(".pagesize").keydown(function(e){
						if(e.keyCode==13){
							location.href=path+"/activiti/process_processList.action?pageNo="+pageno+"&pageSize="+
								$(this).val();
						}
					});
				});
			});		
	</script>
	<script type="text/javascript">
		function deleteProc(deploymentId){
		 	$.ajax({  	
	   				 url : '${pageContext.request.contextPath}/act/procinstance/delete.do?deploymentId='+deploymentId,
	    			 type : 'post',  
	    			 dataType : 'json',  
				     error : function(){  
				        layer.alert("网络延时，请重试.");  
				     },  
					 success : function(res){
					 	document.location.reload();
					  }  
	    	});
		}
		function updateState(state,procDefId){
			$.ajax({  	
	   				 url : '${pageContext.request.contextPath}/act/procinstance/updateState.do?state='+state+'&procDefId='+procDefId,
	    			 type : 'post',  
	    			 dataType : 'json',  
				     error : function(){  
				        layer.alert("网络延时，请重试.");  
				     },  
					 success : function(res){
					 	alert(res);
					 	document.location.reload();
					  }  
	    	});
		}
	</script>
</body>
</html>

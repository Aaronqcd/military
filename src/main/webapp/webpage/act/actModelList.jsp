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
	<title>模型管理</title>
	<meta name="decorator" content="default"/>
	<link rel="shortcut icon" href="favicon.ico"> 
    <link href="${pageContext.request.contextPath}/front/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/animate.min.css" rel="stylesheet">
    <%--<link href="${pageContext.request.contextPath}/resource/js/layer/skin/default/layer.css"  rel="stylesheet" type="text/css"/>--%>
    <link href="${pageContext.request.contextPath}/front/css/style.min862f.css?v=4.1.0" rel="stylesheet">
	<%--<link href="${pageContext.request.contextPath}/video/layer/skin/default/layer.css"  rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/custom/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/custom/secure.css">--%>
    <script src="${pageContext.request.contextPath}/front/js/jquery.min.js?v=2.1.4"></script>
    <%--<script src="${pageContext.request.contextPath}/resource/js/custom/common.js"></script>--%>
    <script src="${pageContext.request.contextPath}/front/js/bootstrap.min.js?v=3.3.6"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/layer/layer.js"></script>
	<script src="${pageContext.request.contextPath}/plug-in/jquery/jquery-1.8.3.js"></script>
</head>
<body>
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- <div class="panel panel-default title-panel" style="border: 1px solid blue;">
			<div class="col-md-3" >
				<span class="title-span">模型管理</span>
			</div>
		</div> -->
		<div class="panel panel-default apply-search">
			<div class="panel-body">
				<form class="form-inline" method="post"
					action="#">
					<div class="form-group">
<!-- 						<div class="form-group">
							<label for="userName_search">类别 </label> <select
								name="definitionType"
								class="input-sm form-control input-s-sm inline">
								<option value="">-- 请选择 --</option>
								<option value="日常类型" ${ definitionType=='日常类型'?'selected':''}>日常类型</option>
								<option value="工程类型" ${ definitionType=='工程类型'?'selected':''} >工程类型</option>
							</select>
						</div> -->
						<div class="form-group">
							<label>模型名称</label>
							<div class="input-group">
								<input type="text" name="definitionName"
									value="" placeholder="名称"
									class=" form-control"> <span class="input-group-btn"
									style="padding-left: 20px;">
									<button type="submit" class="btn  btn-sm btn-custom"
										style="background-color: #4ea8f9;">搜索</button> </span>
							</div>
						</div>
						<div class="form-group">
							<a class="btn  btn-sm btn-custom"
								style="background-color:#4ea8f9;color:#676a6c"
								href="${pageContext.request.contextPath}/activitiController/create.do">新增模型</a>
							&nbsp;&nbsp;
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
								<th style="text-align: center;">模型ID</th>
								<th style="text-align: center;">模型标识</th>
								<th style="text-align: center;">模型名称</th>
								<th style="text-align: center;">版本号</th>
								<th style="text-align: center;">创建时间</th>
								<th style="text-align: center;">最后更新时间</th>
								<th style="text-align: center;">操作</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${modelList}" var="model">
								<tr>
									<td>${model.id}</td>
									<td>${model.key}</td>
									<td>${model.name}</td>
									<td><b title='流程版本号'>V: ${model.version}</b>
									</td>
									<td><fmt:formatDate value="${model.createTime}"
											pattern="yyyy-MM-dd HH:mm:ss" />
									</td>
									<td><fmt:formatDate value="${model.lastUpdateTime}"
											pattern="yyyy-MM-dd HH:mm:ss" />
									</td>
									<td><a
										href="${pageContext.request.contextPath}/modeler.html?modelId=${model.id}">编辑</a>
										<a href="javascript:;" onclick="deploy(${model.id})">部署</a>
										<a
										href="javascript:;"
										onclick="delDeploy(${model.id})">删除</a></td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
					<div class="col-md-12">
						<it:page
							url="${pageContext.request.contextPath}/activiti/model_modelList.action"></it:page>
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
					location.href=path+"/activiti/model_modelList.action?pageNo="+$(this).val()+
						"&pageSize="+pagesize;
				})
				$(".pagesize").blur(function() {
					location.href=path+"/activiti/model_modelList.action?pageNo="+pageno+"&pageSize="+
						$(this).val();
				})
				$(".jumppage").keydown(function(e){
					if(e.keyCode==13){
						location.href=path+"/activiti/model_modelList.action?pageNo="+$(this).val()+
							"&pageSize="+pagesize;
					}
				});
				$(".pagesize").keydown(function(e){
					if(e.keyCode==13){
						location.href=path+"/activiti/model_modelList.action?pageNo="+pageno+"&pageSize="+
							$(this).val();
					}
				});
			});
		});
	</script>
	<script type="text/javascript">
	function deploy(modelId){
		layer.confirm("确定要部署么？",{
		btn:['确定','取消']},function(){
		$.ajax({
			 url : '${pageContext.request.contextPath}/activitiController/deploy.do?modelId='+modelId,
			 type : 'post',
			 dataType : 'text',
			// timeout : 3000,
			 error : function(){
				layer.alert("网络延时，请重试.");
			 },
			 success : function(res){
				layer.alert(res);
				//document.location.reload();
			  }
		});
	},function (){
		layer.close();
	}
	
	);
	}
	function delDeploy(modelId){
	
	layer.confirm("确定要删除么？",{btn:['确定','取消']},
		function (){
		
			$.ajax({
				 url : '${pageContext.request.contextPath}/activitiController/delDeploy.do?modelId='+modelId,
				 type : 'post',
				 dataType : 'text',
				// timeout : 3000,
				 error : function(result){
					 console.log(result);
				 },
				 success : function(res){
				 //layer.alert("删除成功！")
						layer.confirm("删除成功！",{btn:['确定']},
						function (){layer.close();
						document.location.reload();});



				}
			});
		},function (){
			layer.close();
		}
	
		);
								 	 
	}
	</script>
</body>
</html>

<%@ page contentType="text/html;charset=UTF-8" %>
<%-- <%@ include file="/WEB-INF/views/include/taglib.jsp"%> --%>
<html>
<head>
	<title>新建模型 - 模型管理</title>
	<meta name="decorator" content="default"/>
	<link rel="shortcut icon" href="favicon.ico"> 
    <link href="${pageContext.request.contextPath}/front/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/front/js/jquery.min.js?v=2.1.4"></script>
    <script src="${pageContext.request.contextPath}/front/js/bootstrap.min.js?v=3.3.6"></script>
	<script src="${pageContext.request.contextPath}/plug-in/jquery/jquery-1.8.3.js"></script>
</head>
<body>
 <style>
#modeladd{width:500px;height:500px;background:#fff;position:fixed;z-index:65906590650;top:50%;left:50%;margin-left:-250px;margin-top:-250px;"}
</style>
<div id='modeladd'  >
	 <form id="inputForm"  target="_blank" class="form-horizontal">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">新建模型 - 模型管理</h4>
      </div>
      <div class="modal-body" style='background:#fff;'>
		<div class="control-group">
			<label class="control-label">模块名称：</label>
			<div class="controls">
				<input id="name"  name="name" type="text" class="required form-control " />
				<span class="help-inline"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">模块标识：</label>
			<div class="controls">
				<input id="key" name="key" type="text" class="required form-control " />
				<span class="help-inline"></span>
			</div>
		</div>
			 <div class="control-group">
			<label class="control-label">模块描述：</label>
			<div class="controls">
				<textarea id="description" name="description" class="required form-control "></textarea>
			</div>
		</div> 
      </div>
      <div class="modal-footer">
      <input id="btnSubmit" class="btn btn-primary" onclick="addmodel()" type="button" value="提 交"/>
			<input id="btnCancel" class="btn" type="button" value="返 回" onclick="history.go(-1)"/>
         </div>
    </div>
	</form>
</div> 
</body>
</html>
<script>
function addmodel(){
var name=$("#name").val();
var key=$("#key").val();
	if(name==null || name=="" ){
		alert("流程名称不能为空！");
		return false;
	}
	if(key==null || key ==""){
		alert("流程标识不能为空！");
		return false;
	}else
	{
	
		$.ajax({
			cache: true,
			type: "POST",
			url:"${pageContext.request.contextPath}/activitiController/create.do",
			data:$('#inputForm').serialize(),// 你的formid
			async: false,
			error: function(request) {
				console.log(request);
				//alert("Connection error");
			},
			success: function(data) {
			  window.location.href='${pageContext.request.contextPath}/activitiController/processDefinition/list.do';
			  alert("提交成功！");
			}
		});
	}
}
</script>

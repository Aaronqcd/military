<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="s" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>培训课件</title>
	<style type="text/css">
	.xx{
		height: 90px;
		width: 110px;
		border-radius:8px;
	}
	.xx:hover{
    	box-shadow: 2px 4px 6px #D9D9D9;
	}
	.div_b{
		box-shadow: 2px 4px 6px #D9D9D9;
		border: 1px solid black;	
	}
	.fr{float:right;margin-right:5px;}
	</style>
  <script type="text/javascript" src="plug-in/jquery/jquery-1.8.3.js"></script>
  <script type="text/javascript" src="plug-in/tools/dataformat.js"></script>
  <script type="text/javascript" src="plug-in/easyui/jquery.easyui.min.1.3.2.js"></script>
  <script type="text/javascript" src="plug-in/easyui/locale/zh-cn.js"></script>
  <script type="text/javascript" src="plug-in/tools/syUtil.js"></script>
  <script type="text/javascript" src="plug-in/My97DatePicker/WdatePicker.js"></script>
  <script type="text/javascript" src="plug-in/lhgDialog/lhgdialog.min.js"></script>
  <script type="text/javascript" src="plug-in/tools/curdtools_zh-cn.js"></script>
  <script type="text/javascript" src="plug-in/tools/easyuiextend.js"></script>
  <script type="text/javascript" src="plug-in/Validform/js/Validform_v5.3.1_min_zh-cn.js"></script>
  <script type="text/javascript" src="plug-in/Validform/js/Validform_Datatype_zh-cn.js"></script>
  <script type="text/javascript" src="plug-in/Validform/js/datatype_zh-cn.js"></script>
  <script type="text/javascript" src="plug-in/Validform/plugin/passwordStrength/passwordStrength-min.js"></script>
  <script type="text/javascript"  charset="utf-8" src="plug-in/ueditor/ueditor.config.js"></script>
  <script type="text/javascript"  charset="utf-8" src="plug-in/ueditor/ueditor.all.min.js"></script>
  <script type="text/javascript" src="plug-in/bootstrap/js/bootstrap-modal.js"></script>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/video/viewer-master/assets/css/bootstrap.min.css" type="text/css"></link>
<link rel="stylesheet" href="${pageContext.request.contextPath}/video/viewer-master/dist/viewer.css" type="text/css"></link>
<link rel="stylesheet" href="${pageContext.request.contextPath}/video/viewer-master/demo/css/main.css" type="text/css"></link>
<script type="text/javascript" src="${pageContext.request.contextPath}/video/viewer-master/assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/video/viewer-master/dist/viewer.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/video/viewer-master/demo/js/main.js"></script>

<script type="text/javascript">

	//储存选中的div的id
	var selectedDivId = "";
	
	//请求获取数据
	$.ajax({ 	
		 type : "get",	
		 url : '${pageContext.request.contextPath}/dataManagementController.do?filelist',
		 dataType : "json",
		 success : function(data){
	 		Imgurl = "background: url('images/wenjianjia.png')center top;";
	 		$('#div').empty();
		 	for(var i = 0;i < data.length;i++){
		 		//文件名过长处理
				var fileName = data[i].file_name.length >= 7?data[i].file_name.substring(0,6)+"...":data[i].file_name;
		 		$('#div').append('<div class="xx" onclick="selectedDiv('+data[i].id+');"  ondblclick="onclickfile('+data[i].id+');" id='+data[i].id+' style="float:left;margin:20px 20px;'+ Imgurl +'"><span title="'+data[i].file_name+'" style="text-align:center;display: block;margin-top:70px;font-size:13px;">'+fileName+'</span></div>');
		 	}
		 }  
   	});
   	
   	var pid, parentID = [];
   	//根据父id获取数据
	function onclickfile(p_id, type){
		if(p_id == null){
			parentID = [];
		}else{
			if(type !== 'back'){
				parentID.push($('#page_pid').val());
			}
		}
		//给刷新按钮赋值
		$('#closeAndRefresh').val(p_id);
		$('#page_pid').val(p_id);
		pid=p_id;
		//alert(p_id);
		selectedDivId = "";
		//$('#div').empty();
		var url = '${pageContext.request.contextPath}/dataManagementController.do?filelist';
		if(p_id != null){
			url = url + '&p_id='+p_id;
		}
		 $.ajax({ 
			 type : "get",	
			 url :url,
			 dataType : "json",
			 success : function(data){
			 	$('#div').empty();
			 	for(var i = 0;i < data.length;i++){
			 		//文件的样式
			 		var Imgurl = "";
			 		//打开文件的事件
			 		var onclick = ""; 
			 		//下载在线观看按钮
			 		var butt1 = "";
			 		//文件名
			 		var fileName = "";
			 		//图片预览
			 		var img = "";
			 		
			 		//文件名过长处理
					fileName = data[i].file_name.length >= 7?data[i].file_name.substring(0,6)+"...":data[i].file_name;
						
			 		//判断是否是文件还是文件夹
				 	if(data[i].file_type == null || data[i].file_type == ""){
				 		Imgurl = "background: url('images/wenjianjia.png')center top;";
				 		onclick = "onclickfile('"+data[i].id+"');";
				 	}else{
				 		//设置在线观看和下载按钮
				 		var utl="images/wenjianjia.png";
				 		/* if (suffix!=null) {
							<a href="${pageContext.request.contextPath}/dataManagementController.do?dimg'+data[i].file_path+'">下载</a>
						} */
						//butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="${pageContext.request.contextPath}/dataManagementController.do?view&filename='+data[i].file_name+'"id="btn"style="width: 200px;font-size:5px;">在线观看
						//</a>&nbsp;&nbsp;&nbsp;<span style="width: 200px;font-size:5px;"><a href="${pageContext.request.contextPath}/dataManagementController.do?download&filename='+data[i].file_name+'&filepath='+data[i].file_path+'">下载</a></span>';			 		
				 		//获取文件的后缀
						var suffix = data[i].file_type;//后缀名
						
						if(suffix == ".png" || suffix == ".jpg" || suffix == ".bmp" || suffix == ".jpeg" || suffix == ".tiff" || suffix == ".gif"){
						/* img = '<ul class="docs-pictures clearfix"><li><img data-original="'+ data[i].file_path +'" src="'+ data[i].file_path +'" height="90px" width="110px"; ></li></ul></div>'; */
							/* $('img').attr('src',data[i].file_path); */
							Imgurl = "background: url('"+ data[i].file_path +"')center ;   background-size: cover;";
							butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="javascript:;"id="btn"style="width: 200px;font-size:13px;">在线观看</a>&nbsp;&nbsp;&nbsp;'+
								'<a href="javascript:void(0)" style="font-size:13px;" onclick="down(\''+data[i].file_name+'\', \''+data[i].file_path+'\', 1)">下载</a>';
		
						}else if(suffix == ".doc" || suffix == ".docx"){
							/* butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="${pageContext.request.contextPath}/dataManagementController.do?viewPDF&filename='+data[i].file_dir_name+'"style="width: 200px;font-size:5px;"' + 
								'target="_blank">在线观看</a>&nbsp;&nbsp;&nbsp;<a href="${pageContext.request.contextPath}/dataManagementController.do?download&filename='+data[i].file_dir_name+'&filepath='+data[i].file_path+'">下载</a>'; */
							butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="preview(\''+data[i].file_name+'\', 2)" style="width: 200px;font-size:13px;"' + 
								'>在线观看</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" style="font-size:13px;" onclick="down(\''+data[i].file_name+'\', \''+data[i].file_path+'\', 2)">下载</a>';	
						
						
							Imgurl = "background: url('images/word.png')center top;";
						}else if(suffix == ".txt"){
						butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="preview(\''+data[i].file_name+'\', 3)" style="width: 200px;font-size:13px;" target="_blank">在线观看</a>'+
							'&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" style="font-size:13px;" onclick="down(\''+data[i].file_name+'\', \''+data[i].file_path+'\', 3)">下载</a>';
						
							Imgurl = "background: url('images/txt.png')center top;";
						}else if(suffix == ".xls" || suffix == ".xlsx"){
							Imgurl = "background: url('images/exl.png')center top;";
							butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="preview(\''+data[i].file_name+'\', 4)" style="width: 200px;font-size:13px;" target="_blank" >在线观看</a>'+
								'&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" style="font-size:13px;" onclick="down(\''+data[i].file_name+'\', \''+data[i].file_path+'\', 4)">下载</a>';
						
						}
						else if(suffix == ".mp4" || suffix == ".avi"){
							Imgurl = "background: url('images/default.png')center top;";
							butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="${pageContext.request.contextPath}/dataManagementController.do?video&filename='+data[i].file_name+'"style="width: 200px;font-size:13px;"'+ 
								'target="_blank" >在线观看</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" style="font-size:13px;" onclick="down(\''+data[i].file_name+'\', \''+data[i].file_path+'\', 5)">下载</a>';
						
						}
						else{
							Imgurl = "background: url('images/default.png')center top;";
							butt1 = '</br>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="preview(\''+data[i].file_name+'\', 6)" id="btn" style="width: 200px;font-size:13px;" target="_blank" >在线观看</a>'+
								'&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" style="font-size:13px;" onclick="down(\''+data[i].file_name+'\', \''+data[i].file_path+'\', 6)">下载</a>';
						}
				 	}
				 	$('#div').append('<div class="xx"data-dd="'+data[i].file_path+'" onclick="selectedDiv('+data[i].id+');" id='+data[i].id+' ondblclick="'+onclick+'" style=" float:left;margin:20px 20px;'+ Imgurl +'">'+img+'<span title='+data[i].file_name+' style="text-align:center;display: block;margin-top:70px;font-size:13px;">'+fileName+'</span>'+butt1+'</div>');
				 //	$('#div').append(img);
			 	}
			 	
			 }
	   	}); 
	} 
	
	//选中div操作
	function selectedDiv(id){
		//移除选中的状态
		if(selectedDivId != ""){
			$("#"+selectedDivId).removeClass("div_b");
		}
		//存储选中的id
		selectedDivId = id;
		
		//设置选中状态
		$("#"+selectedDivId).addClass("div_b");
	}
	
</script>
</head> 
<body>
<div style='height:30px;padding-right:15px;margin-top:20px;'>

<button class="btn btn-default btn-sm fr"  onclick="back();"style="color:#8f0911;">返回</button>
<button class="btn btn-default btn-sm fr"  onclick="removeWidth();" data-toggle="modal" data-target="#myModalOne" style="color:#8f0911;">上传文件</button>
<button class="btn btn-default btn-sm fr"  onclick="addclickmodal();"style="color:#8f0911;">添加文件夹</button>
<button class="btn btn-default btn-sm fr"  onclick="dlefile();"style="color:#8f0911;">删除</button>
<button class="btn btn-default btn-sm fr"  onclick="updclickmodal();" style="color:#8f0911;">修改</button>
<button id="closeAndRefresh" value="" class="btn btn-default btn-sm fr"  onclick="closeAndRefresh()"   style="color:#8f0911;">刷新</button>
</div> 

<div id="div" class="div_content"></div>
    

<!-- Modal -->
<div class="modal fade" id="myModalOne" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
       <%--  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> --%>
        <h4 class="modal-title" id="myModalLabel" >文件上传</h4>
      </div>
      <div class="modal-body" style="height: 60px;">
         	<form name="serForm" id='submit' method="post"  enctype="multipart/form-data" style='position:relative;'>
		<input type="file" name="file" id="file" style="position: absolute;top: 0;left: 0;width: 90px;height: 40px;opacity: 0;">
		<lable style='float: left;width:90px;height: 30px;line-height: 30px;border-radius: 3px;background: #00b7ee;text-align: center;color: #fff;display: inline-block;'>上传文件</lable>
		<!-- <input type="submit" class='btn' value="上传67" /> -->
		<div id="wai" class="wai" style="float: left;width:60px;height:30px;border:1px solid green;display:none;">
			<div id="nei" class="nei" style="width:0px;height:30px;background:green;text-align:center;line-height:30px;color:#fff;"></div>
		</div>
		</form>
      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="closeAndRefresh()">关闭</button>
        
      </div>
    </div>
  </div>
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel"></h4>
            </div>
            <div class="modal-body" id="text_content">
            	<form class="form-horizontal" role="form" id="mamger_from" >
					<div class="form-group">
						<label class="col-sm-2 control-label" id="lab"></label>
						<input type="hidden" id="page_pid" name="p_id">
						<input type="hidden" id="page_id" name="id">
						<div class="col-sm-10" id="inpt">
							
						</div>
					</div>
				</form>
            </div>
            <div class="modal-footer">
            	<button type="button" id="f_but" class="btn btn-primary" data-dismiss="modal" onclick="submit_from();">确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel1"></h4>
            </div>
            <div class="modal-body" id="text_content1">
            	
            </div>
            <div class="modal-footer" id="buttons">
            	<!-- <button type="button" class="btn btn-primary">确定</button> -->
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> -->
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>


<%-- 	<style>
#wai{
width:90px;
height:40px;
border:1px solid green;
}
#nei{
width:0;
height:40px;
background:green;
}
</style> --%>
<script>
$("#file").live('change',function(){
//$("#submit").submit()
 var oData = new FormData(form);
  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
     oReq.onreadystatechange = function() {//服务器返回值的处理函数，此处使用匿名函数进行实现  
         if (oReq.readyState == 4 && oReq.status == 200) {//  
             var responseText = oReq.responseText;
             d = responseText.replace("\"","").replace("\"","");
             if("1" == d){
             	alert("文件名重复,请修改后重新上传！！");
             	$('#myModalOne').modal('hide');
             	$("#file").replaceWith('<input type="file" name="file" id="file"style="position: absolute;top: 0;left: 0;width: 90px;height: 40px;opacity: 0;">');
             	return;
             }else{
             }
          }
     };
     oReq.upload.onprogress = function(evt){  
        //侦查附件上传情况  
        //通过事件对象侦查  
        //该匿名函数表达式大概0.05-0.1秒执行一次  
        //console.log(evt);  
        //console.log(evt.loaded);  //已经上传大小情况  
        //evt.total; 附件总大小  
        var loaded = evt.loaded;  
        var tot = evt.total;  
        per = Math.floor(100*loaded/tot);  //已经上传的百分比  
        var num = per + "%";
        $('.wai').css('display','block');
        $('.nei').css('width',num);
        $('.nei').text(num);
	} 
   
  oReq.open("POST","${pageContext.request.contextPath}/dataManagementController.do?upload&p_id="+pid, true);
	    
  oReq.onload = function(oEvent) {
   
    if (oReq.status == 200) {
     
    } else {
      
    }
  };
	//$("#myModalOne").modal('hide')
  oReq.send(oData);
  
})
var form = document.forms.namedItem("serForm");
form.addEventListener('submit', function(ev) {

  var oData = new FormData(form);

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST","${pageContext.request.contextPath}/dataManagementController.do?upload&p_id="+pid, true);
  	         //侦查当前附件上传情况  
    /* oReq.upload.onprogress = function(evt){  
        //侦查附件上传情况  
        //通过事件对象侦查  
        //该匿名函数表达式大概0.05-0.1秒执行一次  
    
        //console.log(evt);  
        //console.log(evt.loaded);  //已经上传大小情况  
        //evt.total; 附件总大小  
        var loaded = evt.loaded;  
        var tot = evt.total;  
        var per = Math.floor(100*loaded/tot);  //已经上传的百分比  
        var son =  document.getElementById('nei');  
        son.innerHTML = per+"%";  
        son.style.width=per+"%";  
        //num=per
          
    }   */
  
    oReq.upload.onprogress = function(evt){  
        //侦查附件上传情况  
        //通过事件对象侦查  
        //该匿名函数表达式大概0.05-0.1秒执行一次  
        //console.log(evt);  
        //console.log(evt.loaded);  //已经上传大小情况  
        //evt.total; 附件总大小  
        var loaded = evt.loaded;  
        var tot = evt.total;  
        per = Math.floor(100*loaded/tot);  //已经上传的百分比  
        var num = per + "%";
        $('.wai').css('display','block');
        $('.nei').css('width',num);
        $('.nei').text(num);
	}
	    
  oReq.onload = function(oEvent) {
   
    if (oReq.status == 200) {
     
    } else {
      
    }
  };
	//$("#myModalOne").modal('hide')
  oReq.send(oData);
  ev.preventDefault();
}, false);


$("body").on("click","#btn",function(){
	
$('#myModal1').modal({keyboard: false})
	$("#text_content1").empty();
	$("#text_content1").append("<center><img style='width:100%;' src="+$(this).parent().attr('data-dd')+"></center>")
});

//清楚进度条
function removeWidth(){
	$('.nei').css('width','0px'); 
	$('.wai').css('display','none');
}

//遍历数组去除重复的元素
function unique(arr){
	// 遍历arr，把元素分别放入tmp数组(不存在才放)
	var tmp = new Array();
	for(var i in arr){
	//该元素在tmp内部不存在才允许追加
	if(tmp.indexOf(arr[i])==-1){
	tmp.push(arr[i]);
	}
	}
	return tmp;
}


//回退
function back(){
	//清楚多余操作造成的重复id
	parentID = unique(parentID);
	//删除和当前目录中文件夹对应的父级目录相同id的p_id
	for(var i=0;i<parentID.length;i++){
	   var pageId = $('input[name="p_id"]').val();
	   if(pageId == parentID[i]){
	   		parentID.splice(i,1);
	   }
	}
	var paId = parentID.pop();
	if(!paId){
	 onclickfile(null);
	}else{
	 onclickfile(paId, 'back');
	}
	//onclickfile(null);
	
}
//图片预览
function File1(ult){
	$('#myModal1').modal({keyboard: false})
}

//添加
function addclickmodal() {
	 $('#mamger_from').attr("method","post");
	 $('#page_id').val(null);
	 $('#mamger_from').removeAttr("enctype");
	 $('#inpt').empty();
	 $('#myModalLabel').text("添加文件夹");
	 $('#lab').text("文件夹名");
	 $('#inpt').append('<input id="file_name" name="file_name" type="text" class="form-control" style="width:200px;">');
	 $('#f_but').attr("onclick","submit_from()");
	 $('#myModal').modal({keyboard: false})
}

//删除
function dlefile() {
	if(selectedDivId == ""){
	 	$('#myModalLabel1').text("提示");
		$('#text_content1').text("请先选中需要修改的文件或文件夹！");
		$('#myModal1').modal({keyboard: false})
	}else{
		 $('#myModalLabel1').text("删除提示！");
		 $('#text_content1').text("是否删除选中的文件或文件夹！");
		 $('#buttons').empty();
		 $('#buttons').append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary"  data-dismiss="modal" id="queding" >确定</button>');
		// alert(selectedDivId);
		/*  $('#queding').bind("click",function(){
		  alert(1);
		}); */
		 $('#queding').bind("click",function(){
		 	$.ajax({ 
			 type : "get",	
			 url : '${pageContext.request.contextPath}/dataManagementController.do?delete&id='+selectedDivId,
			 dataType : "json",
			 success : function(data){
			 	//if($('#page_pid').val() == null || $('#page_pid').val() = ""){
			 		//document.location.reload();
			 	//}else{
				 	onclickfile($('#page_pid').val());
			 	//}
			 	//alert(); 
			 	
			 }  
		 	});
		 });
		 $('#myModal1').modal({keyboard: false})
	}
}

//上传文件
function addfilemodal(){
	/* $('#mamger_from').attr("method","post");
	$('#mamger_from').attr("enctype","multipart/form-data");
	$('#lab').text("");
	$('#inpt').empty();
	$('#inpt').append('<input type="file" id="file_f" name="file"/>'); 
	//$('#file_name').attr("type","file"); */
	$('#myModal2').modal({keyboard: false})
	/* $('#f_but').attr("onclick","submit_file_from()"); */
}
//修改
function updclickmodal() {
	if(selectedDivId == ""){
	 	$('#myModalLabel1').text("提示");
		$('#text_content1').text("请先选中需要修改的文件或文件夹！");
		$('#myModal1').modal({keyboard: false})
	}else{
		$.ajax({ 
		 type : "get",	
		 url : '${pageContext.request.contextPath}/dataManagementController.do?getbyId&id='+selectedDivId,
		 dataType : "json",
		 success : function(data){
		 	console.log(data);
		 	$('#page_id').val(selectedDivId);
		 	$('#mamger_from').attr("method","post");
		 	$('#mamger_from').removeAttr("enctype");
		 	$('#lab').text("文件夹名");
		 	$('#inpt').empty();
		 	$('#inpt').append('<input id="file_name" name="file_name" type="text" >');
			$('#myModalLabel').text("修改文件夹名称");
			$('#file_name').val(data.file_name);
			$('#f_but').attr("onclick","submit_from()");
			$('#myModal').modal({keyboard: false})
		 }  
   	});
	}
   
}

//上传文件
function submit_file_from(){
	$.ajax({
         type: "post",
         url:'${pageContext.request.contextPath}/dataManagementController.do?upload',
         data:$('#mamger_from').serialize(),
         processData : false, 
         contentType : false,
         async: false,
         success: function(data) {
         	selectedDivId == "";
            onclickfile($('#page_pid').val());
         },
         error : function(){  
			        alert("网络延时，请重试.");  
			     }
     });
}

//提交from
function submit_from(){
	var file_name = $("#file_name").val();
	if($.trim(file_name)=='') {
		alert("文件夹名不能为空");
		return false;
	}
	$.ajax({
         cache: true,
         type: "get",
         url:'${pageContext.request.contextPath}/dataManagementController.do?save',
         data:$('#mamger_from').serialize(),
         async: false,
         success: function(data) {
         	selectedDivId == "";
            onclickfile($('#page_pid').val());
         },
         error: function(){  
	        alert("网络延时，请重试.");  
	     }
     });
}
//上传文件后刷新
function closeAndRefresh(){
	var pid = $('#closeAndRefresh').val();
	onclickfile(pid);
}

//在线观看
function preview(filename, type) {
	if(type==2||type==3||type==4||type==6) {
		$.ajax({
			type: "get",
			url: "${pageContext.request.contextPath}/dataManagementController.do?isExist&filename="+filename,
			dataType: "json",
			async: false,
			success: function(data){
				if(data==-1) {
					alert("文件不存在，不能在线观看");
					return false;
				}
				else {
					window.open("${pageContext.request.contextPath}/dataManagementController.do?viewPDF&filename="+filename);
				}
			}
		});
	}
}

//下载
function down(filename, filepath, type) {
	$.ajax({
		type: "get",
		url: "${pageContext.request.contextPath}/dataManagementController.do?isExist&filename="+filename,
		dataType: "json",
		async: false,
		success: function(data){
			if(data==-1) {
				alert("文件不存在，不能下载");
				return false;
			}
			else {
				location.href="${pageContext.request.contextPath}/dataManagementController.do?download&filename="+filename+"&filepath="+filepath;
			}
		}
	});
}

function closeModal() {
	$('#myModalOne').modal('hide');
	closeAndRefresh();
}
</script>

</body>
</html>
















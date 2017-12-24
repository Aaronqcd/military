var contextPath = $("#contextPath").val();

function add() {
	location.href = contextPath+"/secure/forminfo_add.action";
}

function goList() {
	location.href = contextPath+"/secure/forminfo_list.action";
}

//保存或修改操作
function save() {
	var url = "";
	var data = "";
	var judgeHandle = $("#judgeHandle").val();
	data = $("#forminfoForm").serialize();
	//当judgeHandle=1时，为保存操作
	if(judgeHandle == 1) {
		url = contextPath+"/secure/forminfo_addFormInfo.action";
		$.ajax({
		    type: "POST",
		    url: url,
		    data: data,
		    success: function(msg){
		    	alert("成功添加表单基本信息");
		    	location.reload();
		    }
		});
	}
	//当judgeHandle=2时，为修改操作
	else if(judgeHandle == 2) {
		url = contextPath+"/secure/forminfo_editFormInfo.action";
		$.ajax({
		    type: "POST",
		    url: url,
		    data: data,
		    success: function(msg){
		    	alert("成功修改表单基本信息");
		    	location.reload();
		    }
		});
	}
	
}

function edit(id) {
	location.href = contextPath+"/secure/forminfo_edit.action?id="+id;
}

//修改操作
/*function edit(id) {
	var url = contextPath+"/secure/forminfo_getFormInfoById.action";
	$.ajax({
	    type: "POST",
	    url: url,
	    data: {
	    	id: id
	    },
	    dataType: "json",
	    success: function(data){
	    	console.log(data);
	    	//当judgeHandle=2时，为修改操作
	    	$("#judgeHandle").val("2");
	    	$("#forminfoId").val(data.id);
	    	$("#formName").val(data.formName);
	    	$("#sort").val(data.sort);
	    	$("input[name='status'][value="+data.status+"]").attr("checked",true);
	    	$("#forminfoModal").modal("show");
	    }
	});
}*/

//删除操作
function del(id) {
	var url = contextPath+"/secure/forminfo_deleteFormInfo.action";
	var result = confirm("确认删除该记录");
  	if (result==true){
  		$.ajax({
  		    type: "POST",
  		    url: url,
  		    data: {
  		    	id: id
  		    },
  		    success: function(msg){
  		    	alert("表单基本信息成功删除");
  		    	location.reload();
  		    }
  		});
    }
}
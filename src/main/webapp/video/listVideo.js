/*var data1 = JSON.parse(data);
var audio = data1['audio'];
var video = data1['video'];
var msg = data1['msg'];*/
$(function(){
	listVideo(video);
});
String.prototype.startWith=function(s){
	  if(s==null||s==""||this.length==0||s.length>this.length)
	   return false;
	  if(this.substr(0,s.length)==s)
	     return true;
	  else
	     return false;
	  return true;
};
function query(){
	var type = $("#type").val();
	if(type=="视频"){
		location.href="/securitySupervision/video/listVideo_list.action?sip="+$("#sip").val();
		listVideo(video);
	}
	if(type=="音频"){
		listAudio(audio);
	}
	if(type=="短信"){
		listMsg(msg);
	}
}
function listAudio(data){
    $('#reportTable').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
//	showExport:true,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
	pageSize: 10,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [10, 20, 50, 100, 200, 500], //每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
              {field: '',title: '序号',align:'center',formatter:function(value,row,index){
            	  return index+1+"";
              }}, 
	          {field: 'caller',title: '呼叫人',align:'center'}, 
	          {field: 'filesize',title: '文件大小',align:'center'},
	          {field: 'filePath',title: '文件路径',align:'center'},
	          {field: 'videoPath',title: '音频地址',align:'center'},
	          {field: 'fileName',title: '文件名',align:'center'},
	          {field: 'callerName',title: '呼叫人姓名',align:'center'},
	          {field: 'calleeName',title: '接听人姓名',align:'center'},
	          {field: 'callee',title: '接听人',align:'center'},
	          {field: 'timeName',title: '时间',align:'center'}], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
	}
});
}
function listVideo(data){
    $('#reportTable').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
//	showExport:true,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
	pageSize: 10,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [10, 20, 50, 100, 200, 500], //每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
	queryParams: queryParams1, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
              {field: '',title: '序号',align:'center',formatter:function(value,row,index){
            	  return index+1+"";
              }}, 
	          {field: 'caller',title: '呼叫人',align:'center'}, 
	          {field: 'filesize',title: '文件大小',align:'center'},
	          {field: 'videoPath',title: '视频地址',align:'center'},
	          {field: 'fileName',title: '文件名',align:'center'},
	          {field: 'callerName',title: '呼叫人姓名',align:'center'},
	          {field: 'calleeName',title: '接听人姓名',align:'center'},
	          {field: 'callee',title: '接听人',align:'center'},
	          {field: 'timeName',title: '时间',align:'center'},
	          {field: 'filePath',title: '文件地址',align:'center'}], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
	}
});
}


function queryParams1(params) {  //配置参数
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		pageNumber: params.pageNumber,  //页码
		sip:$("#sip").val(),
//		Cut: Cut,
//		Color: Color,
//		Clarity: Clarity,
		sort: params.sort,  //排序列名
		sortOrder: params.order//排位命令（desc，asc）
	};
	return temp;
}

function listMsg(data){
    $('#reportTable').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
//	showExport:true,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
	pageSize: 10,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [10, 20, 50, 100, 200, 500], //每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
              {field: '',title: '序号',align:'center',formatter:function(value,row,index){
            	  return index+1+"";
              }}, 
	          {field: 'id',title: 'id',align:'center'}, 
	          {field: 'caller',title: '呼叫人',align:'center'},
	          {field: 'content',title: '内容',align:'center'},
	          {field: 'sendTime',title: '发送时间',align:'center',formatter:function(value,row,index){
	        	  return new Date(value).format("yyyy-MM-dd");
	          }},
	          {field: 'callee',title: '接听人',align:'center'},
	          {field: 'sendStatus',title: '发送状态',align:'center'}], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
	}
});
}
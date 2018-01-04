var IDMark_Switch = "_switch",
		IDMark_Icon = "_ico",
		IDMark_Span = "_span",
		IDMark_Input = "_input",
		IDMark_Check = "_check",
		IDMark_Edit = "_edit",
		IDMark_Remove = "_remove",
		IDMark_Ul = "_ul",
		IDMark_A = "_a";     

var setting = {
		data : {
			simpleData : {
				enable : true,//启用简单数据模式
				idKey: "id",
				pIdKey: "parentid",
				rootPId: "0"
			},
			key:{
				name : "name",
				title: "name"
			}
		},
		check : {
			enable : false//请用勾选效果
		},
		callback: {
			onClick: zTreeOnClick
		},
		view: {
		//	addDiyDom: addDiyDom
		}
	};
     
     var setting2 = {
    			data : {
    				simpleData : {
    					enable : true,//启用简单数据模式
    					idKey: "id",
    					pIdKey: "part_id",
    					rootPId: "0"
    				},
    				key:{
    					name : "name"
    				}
    			},
    			check : {
    				enable : false//请用勾选效果
    			},
    			callback: {
    				//onClick: zTreeOnClick2
    			}
    		};
     
     var setting1 = {
    			data : {
    				simpleData : {
    					enable : true,//启用简单数据模式
    					idKey: "id",
    					pIdKey: "part_id",
    					rootPId: "0"
    				},
    				key:{
    					name : "name"
    				}
    			},
    			check : {
    				enable : false//请用勾选效果
    			},
    			callback: {
    			onClick: zTreeOnClick1
    			}
    		};
     
 function sendMess(){
	 $("#sipMess").val($("#sipCount").text());
	 $("#content").val(null);
	 $("#messModal").modal();
 }    
 
 function message(sio){
	 $("#sipMess1").val(sio);
	 $("#content1").val(null);
	 $("#messModal1").modal();
 }
 
 
 function otherCall(num){
	 var sipnum=$("#sipnum").val();
	 if(num=='1'){
		 audioCall(sipnum);
	 }else if(num=='2'){
		 videoCall(sipnum);
	 }else if(num=='3'){
		 message(sipnum);
	 }
 }
 
 
 function initRecord(){
	 var callSip=$("#callSip").val();
	 $.ajax({
		 url:urlPath+'/video/record_getRecord.action?callSip='+callSip,
		 type:'get',
		 dataType:'json',
		 success:function(data){
			 recordTable(data);
		 },
		 error:function(message){
			 alert("通讯记录出查询失败，请检查网络连接");
		 }
	 });
 }
function recordTable(data){
	$('#recordTable').bootstrapTable('destroy').bootstrapTable({
		method: 'get',
		data:data,
		dataType: "json",
		striped: true,	 // 使表格带有条纹
		pagination: true,	// 在表格底部显示分页工具栏
//		showExport:true,    //显示导出
	//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
	// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
		pageSize: 10,	// 每页显示条数
		pageNumber: 1,  // 当前页码
		pageList: [10, 20, 50, 100, 200, 500], //每页显示条数
		idField: "id",  // 标识哪个字段为id主键
	//  showToggle: true, //名片格式
		cardView: false,// 设置为True时显示名片（card）布局
		showColumns: false, // 显示隐藏列
	//  showRefresh: true, //显示刷新按钮
//		singleSelect: false,// 复选框只能选择一条记录
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
		          {field: 'sendSip',title: '我的号码',align:'center'}, 
		          {field: 'receiveSip',title: '被联系人',align:'center'},
		          {field: 'time',title: '通讯时间',align:'center',formatter:function(value,row,index){
		        	  if(value==""||value==null){
		        		  return "";
		        	  }else{
		        		  return new Date(value).format("yyyy-MM-dd");
		        	  }
		          }},
		          {field: 'type',title: '通讯方式',align:'center'},
		          {field: 'status',title: '状态',align:'center'},
		          {field: 'content',title: '内容',align:'center'},
		          {title: '操作',field: 'id',align: 'center',formatter:function(value,row,index){
		        	  var type1="'"+"audio"+"'";
		        	  var type2="'"+"video"+"'";
		        	  var sio="'"+row.receiveSip+"'";
		        	  var a ="<a  onclick=callIndex("+type1+","+sio+")>发起语音</a> ";  
		        	  var e = "<a  onclick=callIndex("+type2+","+sio+")>发起视频</a> ";    
	                   var d = "<a onclick=message("+ sio +")>发送短信</a> ";  
	                        return a+e+d;  
	                    } 
	                  }], // 列
		silent: true,  // 刷新事件必须设置
		formatLoadingMessage: function () {
			return "请稍等，正在加载中...";
		},
		formatNoMatches: function () {  // 没有匹配的结果
			return '无符合条件的记录';
		},
		onLoadSuccess:function(data){
	// alert(data);
		}
	});
}
 function callIndex(type,sio){
	 if("audio"==type){
		 audioCall(sio);
	 }else if("video"==type){
		 videoCall(sio);
	 }
 }
 
 //<a href="${pageContext.request.contextPath}/kbm/kbmAction_downloadOcx.action"><button type="button" class="btn btn-primary" type="button">取消</button></a> 
 function send(){
	 if($("#sipMess").val()==""||$("#sipMess").val()==null){
		 alert("sip号码不能为空");
		 return ;
	 }
	 if($("#content").val()==""||$("#content").val()==null){ 
		 alert("短信内容不能为空");
		 return ;
	 }
	 $.ajax({ 
			url : urlPath+'/video/send_send.action?sipAccount='+$("#sipMess").val()+'&message='+encodeURI($("#content").val()),
			type : 'POST',
			dataType : 'json',
			success : function(data) { 
				var record={};
				record.sendSip=sipNum;
				record.receiveSip=$("#sipMess").val();
				record.type="短信";
				record.time=new Date();
//				record.callId=callId;
				record.content=$("#content").val();
				if(data.success||data.success=="true"){
					$("#messModal").modal("hide");
					record.status="发送成功";
					save11(record);
					alert("发送成功");
				}else if(!data.success||data.success=="false"){
					
					record.status="发送失败";
					save11(record);
					alert(data.failureMessage);
				}else{
					record.status="发送失败";
					save11(record);
					alert("发送失败");
				}
				
			},
			error : function(msg){
				record.status="发送失败";
				save11(record);
				alert('树加载异常!');
			}
		});
 }
 
 function send11(){

	 if($("#sipMess1").val()==""||$("#sipMess1").val()==null){
		 alert("sip号码不能为空");
		 return ;
	 }
	 if($("#content1").val()==""||$("#content1").val()==null){ 
		 alert("短信内容不能为空");
		 return ;
	 }
	 $.ajax({ 
			url : urlPath+'/video/send_send.action?sipAccount='+$("#sipMess1").val()+'&message='+encodeURI($("#content1").val()),
			type : 'POST',
			dataType : 'json',
			success : function(data) { 
				var record={};
				record.sendSip=sipNum;
				record.receiveSip=$("#sipMess1").val();
				record.type="短信";
				record.time=new Date();
//				record.callId=callId;
				record.content=$("#content1").val();
				if(data.success||data.success=="true"){
					$("#messModal1").modal("hide");
					record.status="发送成功";
					save11(record);
					alert("发送成功");
				}else if(!data.success||data.success=="false"){
					
					record.status="发送失败";
					save11(record);
					alert(data.failureMessage);
				}else{
					record.status="发送失败";
					save11(record);
					alert("发送失败");
				}
				
			},
			error : function(msg){
				record.status="发送失败";
				save11(record);
				alert('树加载异常!');
			}
		});
 }
 /*查询管道局总人数*/
//	$.ajax({ 
//		url : urlPath+'/authority/department_allUser.action',
//		type : 'POST',
//		dataType : 'json',
//		success : function(data) {
//			//console.log(data)
//		},
//		error : function(msg){
//			alert('树加载异常!');
//		}
//	});
//$(document).ready({
//
//	
//	
//}) 
 /*展示人数*/
	function addDiyDom(treeId, treeNode) {
		if (treeNode.parentNode && treeNode.parentNode.id!=2) return;
		var aObj = $("#" + treeNode.tId + IDMark_A);
	
		if(treeNode.isParent==true){
			var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'>" +
					"<span style='color:red;margin-left:10px;'>("+treeNode.onlinePeople+")</span></span>";
			aObj.append(editStr);		
			
		}
		/*if(treeNode.isParent==true&&treeNode.part_id=="0" ){
			var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span style='color:red;margin-left:10px;'>(在线23人,总共296人)</span></span>";
			aObj.append(editStr);
			var btn = $("#diyBtn_"+treeNode.id);
			if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
			
		}else if(treeNode.isParent==true&&treeNode.part_id=="D044"){
			var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span style='color:red;margin-left:10px;'>(在线23人,总共296人)</span></span>";
			aObj.append(editStr);
			var btn = $("#diyBtn_"+treeNode.id);
			if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
		}*/
		/*if (treeNode.id == "D848") {
			var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span style='color:red;margin-left:10px;'>(在线23人,总共296人)</span></span>";
			aObj.append(editStr);
			var btn = $("#diyBtn_"+treeNode.id);
			if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
		} else if (treeNode.id == 22) {
			var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span class='button icon02'></span></span>";
			aObj.after(editStr);
			var btn = $("#diyBtn_"+treeNode.id);
			if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
		} else if (treeNode.id == 23) {
			var editStr = "<select class='selDemo' id='diyBtn_" +treeNode.id+ "'><option value=1>1</option><option value=2>2</option><option value=3>3</option></select>";
			aObj.after(editStr);
			var btn = $("#diyBtn_"+treeNode.id);
			if (btn) btn.bind("change", function(){alert("diy Select value="+btn.attr("value")+" for " + treeNode.name);});
		} else if (treeNode.id == 24) {
			var editStr = "<span id='diyBtn_" +treeNode.id+ "'>Text Demo...</span>";
			aObj.after(editStr);
		} else if (treeNode.id == 25) {
			var editStr = "<a id='diyBtn1_" +treeNode.id+ "' onclick='alert(1);return false;'>链接1</a>" +
				"<a id='diyBtn2_" +treeNode.id+ "' onclick='alert(2);return false;'>链接2</a>";
			aObj.after(editStr);
		}*/
	}
 
 
 
 
 function zTreeOnClick1(event, treeId, treeNode) {
	 $("#flagUser").val(treeNode.id);
	 $("#keyUser").val(treeNode.name);
	 $.fn.zTree.getZTreeObj("locationUserTree").expandAll(false);
	};
function sureUser(){
	$("#userId").val($("#flagUser").val());
	 $("#userName").val($("#keyUser").val());
	 $("#changeLocationUser").modal("hide");
}
function zTreeOnClick(event, treeId, treeNode) {
	if(typeof(treeNode.sip)!="undefined"){
		$("#name").text(treeNode.name||"");
		$("#sipCount").text(treeNode.sip||"");
		$("#sips").val(treeNode.sip||"");
		$("#userInfo").show();
		$("#tel").text(treeNode.telephone||"");
		$("#danwei").text(treeNode.getParentNode().name||"");
		/*if(treeNode.type=='机组'){
			$("#jz").text(treeNode.mc);

		}else if(treeNode.type=='项目'){
			
			$("#xiangmu").text(treeNode.mc)
		}
		if(treeNode.onlineStatus=="Y"){
			$("#stuta").text("在线")
			
		}else{
			$("#stuta").text("离线")
		}*/
//		if(treeNode.user_phone){
//			
//			$("#tel").text(treeNode.user_phone)
//		}else{
//			$("#tel").text(treeNode.user_mobile)
//		}
	}else{
		$("#userInfo").hide();
	}
};
var mynodes=[];	//用于存储被隐藏的结点
var userTree;
//var userTreeTwo;
var userInfo="";
var deptDtreeData;
//群组
var settingTwo = {
		data : {
			simpleData : {
				enable : true,//启用简单数据模式
				idKey: "id",
				pIdKey: "part_id",
				rootPId: "0"
			},
			key:{
				name : "name"
			}
		},
		check: {
			enable: true,
		},
		callback: {
			onCheck: zTreeOnCheck
		}
	};
	var zNodes;
	var checkednodesArray;
	function zTreeOnCheck(event, treeId, treeNode) {
		var treeObj = $.fn.zTree.getZTreeObj("userTreeTwo");
		var checkednodes = treeObj.getCheckedNodes(true);
		 checkednodesArray = new Array();
		checkednodesArray.push(checkednodes);
	
	};

function initUser(){
	$.ajax({ 
		url :urlPath+'/departController.do?selectAllUser',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
		var dataOne=data;
//			for(var i in dataOne){
//				
//				if(data[i].isParent=="false")
//					if(dataOne[i].onlineStatus=="Y"){
//						dataOne[i]['icon']=urlPath+"/video/image/lan.png"
//
//					}else if(dataOne[i].onlineStatus=="N"){
//						dataOne[i]['icon']=urlPath+"/video/image/hui.png"
//					}
//			}
			userTree = $.fn.zTree.init($("#userTree"),setting,dataOne);
            locationUserTree = $.fn.zTree.init($("#locationUserTree"),setting1,deptDtreeData);
			$.fn.zTree.init($("#userTreeTwo"), settingTwo, deptDtreeData);
		},
		error : function(msg){
			alert('树加载异常!');
		}
	});
	
//	$.ajax({ 
//		url : urlPath+'/authority/department_selectAllUser.action',
//		type : 'POST',
//		dataType : 'json',
//		success : function(data) {
		/*var dataOne=data
			for(var i in dataOne){
				if(data[i].isParent=="false")
					if(dataOne[i].onlineStatus=="Y"){
						dataOne[i]['icon']=urlPath+"/page/video/image/lan.png"
						console.log(dataOne[i]);
						
					}else if(dataOne[i].onlineStatus=="N"){
						dataOne[i]['icon']=urlPath+"/page/video/image/hui.png"
					}
				
				
			}*/
//			deptDtreeData=data;
			//userTree = $.fn.zTree.init($("#userTree"),setting,dataOne);
//			locationUserTree = $.fn.zTree.init($("#locationUserTree"),setting1,deptDtreeData);
//			
//			$.fn.zTree.init($("#userTreeTwo"), settingTwo, deptDtreeData);
			//console.log(userTreeTwo)
			//userTree.expandAll(true);
			/*var nodes=userTree.getCheckedNodes(false);
			for(var i=0;i<nodes.length;i++){
				if(!nodes[i].isParent&&typeof(nodes[i].sipAccount)!="undefined"){
					userInfo+=nodes[i].sipAccount+",";
				}
			}
			userInfo=userInfo.replace("null","");
			userInfo=userInfo.substring(0,userInfo.length-1);*/
			//$("#mapIframe").attr("src",urlPath+"/video/map.action?sips="+userInfo);
//			$("#mapIframe").attr("src",urlPath+"/video/map.action");
//		},
//		error : function(msg){
//			alert('树加载异常!');
//		}
//	});
}
//将所有隐藏的节点显示出来。
function refreashNodes(treeDemo) {
    var zTree = $.fn.zTree.getZTreeObj(treeDemo),
    nodes = zTree.getNodesByParam("isHidden", true);
    zTree.showNodes(nodes);
}

function showSelected(searchId,treeDemo){
    var searchStr = $('#'+searchId).val();//通过id获取页面输入的值
    var zTree = $.fn.zTree.getZTreeObj(treeDemo);
    if (searchStr=='') {
        refreashNodes(treeDemo);
        var test=zTree.getNodeByParam("level", "0", null);
        zTree.expandNode(test, true);
        return
    }
    var allNodes = zTree.transformToArray(zTree.getNodes());
    var nodes = new Array();
    $.each( allNodes, function(i, n){ //each用于数组遍历
        if (n.name.indexOf(searchStr) >= 0) {     //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置（若出现至少是0或者大于0，若不出现，就不执行push方法了）。
            nodes.push(n);   //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
        }
    });

    zTree.hideNodes(allNodes); //隐藏所有节点
    if(nodes.length == 0){
        return
    }
  //ids是一个数组 返回结果数组     treeNode是选中的节点
    function getChildren(ids,treeNode){
        ids.push(treeNode.id);
         if (treeNode.isParent){
                for(var obj in treeNode.children){
                    getChildren(ids,treeNode.children[obj]);
                }
            }
         return ids;
    }
    var resultNodes  = new Array();
    $.each( nodes, function(i, n){
        var tempNode = n;
        for(var i=0;i< n.level;i++){
            tempNode = tempNode.getParentNode();//获取当前被选中的节点的父节点
            resultNodes.push(tempNode);
        }
    });
    resultNodes = resultNodes.concat(nodes);           //concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

    zTree.showNodes(resultNodes);
    zTree.expandAll(true);
}
function selectLocation(){
	var userId=$("#userId").val();
	var startime=$("#startime").val();
	var endtime=$("#endtime").val();
	map.clearOverlays();
	if(userId==null||userId==""||startime==null||startime==""||endtime==null||endtime==""){
		alert("请填写必填项!!");
		return ;
	}
	var list=new Array();
	$("#gpsModal").modal('hide');
	 $.ajax({ 
		url : urlPath+'/video/getGps.action?userId='+userId+'&startime='+startime+'&endtime='+endtime,
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(data) {
		for(var i=0;i<data.length;i++){
		var point=new BMap.Point(data[i].lon,data[i].lat);
		list.push(point);
	    addMarker(point, "姓名 :"+data[i].name, "经度:"+data[i].lon+"<br/>纬度:"+data[i].lat+"<br/>时间:"+formatDate(new Date(parseInt(data[i].uploadTime))));        // 创建标注1    
		map.centerAndZoom(point, 15); 
	    map.panTo(point); 
		}
		var polyline = new BMap.Polyline(list,{strokeColor:"blue", strokeWeight:4, strokeOpacity:0.5});
		 map.addOverlay(polyline);
		 addArrow(polyline,22, Math.PI / 5);
		},
		error : function(msg){
		//	alert('树加载异常!');
		}
	});
}

function addArrow(polyline, length, angleValue) { 
    //绘制箭头的函数  
    var linePoint = polyline.getPath(); //线的坐标串  
    var arrowCount = linePoint.length;
    for (var i = 1; i < arrowCount; i++) { //在拐点处绘制箭头  
        var pixelStart = map.pointToPixel(linePoint[i - 1]);
        var pixelEnd = map.pointToPixel(linePoint[i]);
        var angle = angleValue; //箭头和主线的夹角  
        var r = length; // r/Math.sin(angle)代表箭头长度  
        var delta = 0; //主线斜率，垂直时无斜率  
        var param = 0; //代码简洁考虑  
        var pixelTemX, pixelTemY; //临时点坐标  
        var pixelX, pixelY, pixelX1, pixelY1; //箭头两个点  
        if (pixelEnd.x - pixelStart.x == 0) { //斜率不存在是时  
            pixelTemX = pixelEnd.x;
            if (pixelEnd.y > pixelStart.y) {
                pixelTemY = pixelEnd.y - r;
            } else {
                pixelTemY = pixelEnd.y + r;
            }
            //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
            pixelX = pixelTemX - r * Math.tan(angle);
            pixelX1 = pixelTemX + r * Math.tan(angle);
            pixelY = pixelY1 = pixelTemY;
        } else //斜率存在时  
        {
            delta = (pixelEnd.y - pixelStart.y) / (pixelEnd.x - pixelStart.x);
            param = Math.sqrt(delta * delta + 1);

            if ((pixelEnd.x - pixelStart.x) < 0) //第二、三象限  
            {
                pixelTemX = pixelEnd.x + r / param;
                pixelTemY = pixelEnd.y + delta * r / param;
            } else //第一、四象限  
            {
                pixelTemX = pixelEnd.x - r / param;
                pixelTemY = pixelEnd.y - delta * r / param;
            }
            //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
            pixelX = pixelTemX + Math.tan(angle) * r * delta / param;
            pixelY = pixelTemY - Math.tan(angle) * r / param;

            pixelX1 = pixelTemX - Math.tan(angle) * r * delta / param;
            pixelY1 = pixelTemY + Math.tan(angle) * r / param;
        }

        var pointArrow = map.pixelToPoint(new BMap.Pixel(pixelX, pixelY));
        var pointArrow1 = map.pixelToPoint(new BMap.Pixel(pixelX1, pixelY1));
        var Arrow = new BMap.Polyline([
            pointArrow,
            linePoint[i],
            pointArrow1
        ], {
            strokeColor: "red",
            strokeWeight: 3,
            strokeOpacity: 0.5
        });

        map.addOverlay(Arrow);

        //return Arrow;
    }
}

var timer;
var flag=0;
var map=null;
function formatDate(now) { 
	var year=now.getFullYear(); 
	var month=now.getMonth()+1; 
	var date=now.getDate(); 
	var hour=now.getHours(); 
	var minute=now.getMinutes(); 
	var second=now.getSeconds(); 
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
	}
function ontimeLocation(){
	if(flag==0){
		timer=window.setInterval(getOntimeInfo, 30000); 
		flag=1;
	}
}
function getOntimeInfo(){
	map.clearOverlays();
	$.ajax({ 
		url : urlPath+'/video/ontimeGps.action',
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(data) {
			for(var i=0;i<data.length;i++){
				var point=new BMap.Point(data[i].lon,data[i].lat);
				addMarker(point, "姓名 :"+data[i].name, "经度："+data[i].lon+"<br/>纬度:"+data[i].lat+"<br/>时间:"+formatDate(new Date(parseInt(data[i].uploadTime))));        // 创建标注1 
			}
		},
		error : function(msg){
		//	alert('树加载异常!');
		}
	});
}
function addMarker(point, a, b) {  
    var marker = new BMap.Marker(point);  
    map.addOverlay(marker);  
    //map.removeOverlay(marker);                  // 将标注从地图中移除  
    //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画  
    marker.addEventListener("click", function () {    //监听标注事件    
        var opts = {    //创建信息窗口  
            width: 250,     // 信息窗口宽度      
            height: 100,     // 信息窗口高度      
            title: a  // 信息窗口标题     
        }  
        var infoWindow = new BMap.InfoWindow(b, opts);  // 创建信息窗口对象      
        map.openInfoWindow(infoWindow, point);      //打开信息窗口              
    });  
}
var locationUserTree;
function loadMap(){
	if(map==null){
		$("#allmap").show();
	    map = new BMap.Map("allmap");
	    map.enableScrollWheelZoom();                 //启用滚轮放大缩小  
	    map.addControl(new BMap.NavigationControl());  
	    map.addControl(new BMap.ScaleControl());  
	    map.addControl(new BMap.OverviewMapControl()); 
	    var pointA = new BMap.Point(116.23983, 39.542797);
	    map.centerAndZoom(pointA,15); 
	}
	ontimeLocation();
	$("#userName").focus(function(){
		$("#keyUser").val();
		$("#flagUser").val();
		$("#changeLocationUser").modal("show");
	});
   /* $("#userId").dkSelectTree({
		url:urlPath+"/authority/department_selectAllUser.action",
		Async:true,
		idField:"id",
		pidField:"part_id",
		nameField:"name",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width : 200
	});*/
	$("#selectLocation").click(function(){
		if(flag==1){
			clearInterval(timer);
		flag=0;
			}
		$("#userName").val(null);
		$("#userId").val(null);
		$("#startime").val(null);
		$("#endtime").val(null);
		$("#gpsModal").modal('show');
	})	; 
	$("#ontimeLocation").click(function(){
		if(flag==1){
			clearInterval(timer);
		flag=0;
			}
		ontimeLocation();
	});
}

function onCall(type){
	if(type==0){
		location.href=urlPath+"/videoController.do?audio&type=1&called="+$("#sipCount").text();
	}else if(type==1){
		location.href=urlPath+"/videoController.do?video&type=0&called="+$("#sipCount").text();
	}
}
var nIDGroup;
var sipNum;
var groupTreeData ;// 记录组织架构的数据
var isCreate=0;//标识位用于建组对讲 功能判断是登录回调还是建立临时组后的回调 0 登录回调 1 建立后的回调
var mapGroups = new HashMap();//记录对讲组的map
//var mapTempGroups = new HashMap();//记录临时对讲组的map
//记录对讲组信息  包括所有的固定对讲组和临时对讲组  key 组名     value  object{}
//包括 groupName 组名; localGroupId  本地对讲组号码  ;serverGroupId 服务器对讲组号码  ;   flag  建立对讲组状态是否成功 0 不成功 1 成功  ;对讲组类型 0 固定组 1 临时组
var mapGroupsInfo = new HashMap();

var OldCurrentGroupId;//老的当前组
var holdDownStatus=0;
var groupIndex = 1;//对讲组快捷键序号
var pttApplyStatus =0;//话权状态
function groupData(currentGroupId,object) {//转换对讲组数据
	init1(currentGroupId,object);
}
function init1(currentGroupId,object){
	var ulNode = $( "#group-tree > ul");//得到对讲组的根的ul
	if(ulNode.length>0){
		var liNode = $( "#group-tree ul li[id='"+object.nIDGroup +"']");//得到对讲组的点

		if(liNode.length != 0){
			liNode.remove();
		}

		var node=bufferNode(currentGroupId,object);
		ulNode.append(node);
		groupIndex++;

		var defaultGroupId = defaultGroup();//获得默认组
		if(defaultGroupId=="undefined" || defaultGroupId==""){
			$( "#group-tree>ul>li>a")[0].click();
		}else{
			var obj = $( "#group-tree ul li[id='"+defaultGroupId +"'] a");
			if(obj.length >0){
				$( "#group-tree ul li[id='"+defaultGroupId +"'] a")[0].click();
			}
		}
	}
}

function bufferNode(currentGroupId,obj) {//拼接临时对讲组的节点
	var nIDGroup = obj.nIDGroup;
	var name;
	var tmpIsNo=obj.name.substring(0,4);
	if(tmpIsNo=="tmp_"){
	   name=obj.name.substring(4);
	}else{
	   name=obj.name;
	}
	var members=obj.members;
	if(typeof(name)== "undefined" || typeof(members)== "undefined"){
		return;
	}
	var size=members.Size();//得到有几个组员
	var number=1;//计数器

	var current= (currentGroupId == nIDGroup) ? urlPath+'/page/video/image/group.gif' : urlPath+'/page/video/image/dept.gif';//判断是否是当前组

	var strNode="<li title=\""+ name +"\" class=\"jstree-closed\" id=\""+ nIDGroup +"\" groupId=\""+ nIDGroup + "\">" +
	"<ins class=\"jstree-icon\">&nbsp;</ins>" +
	"<a href=\"#\"><ins class=\"jstree-icon\" style='background: url(\""+ current +"\") no-repeat center;'>&nbsp;</ins><span id = \"orderNumber_" +nIDGroup+"\">"+groupIndex+"_"+name+"</span></a>" +
	"<ul>";

	members.each(function(key, obj) {
		var last= (size == number) ? 'jstree-last ' : '';//判断是否是最后一个组员
		strNode=strNode+"<li title=\""+ obj +"\" class=\""+ last +"jstree-leaf\" id=\""+ key +"\" sipnum=\""+ key +"\">" +
		"<ins class=\"jstree-icon\">&nbsp;</ins>" +
		"<a href=\"#\"><ins class=\"jstree-icon\" style='background: url(\""+urlPath+"/page/video/image/user.gif\") no-repeat center;'>&nbsp;</ins>"+obj+"("+key+")</a>" +
		"</li>";
		number=number+1;
	});
	strNode=strNode+"</ul></li>";
	return strNode;
}

function showtree(data) {//显示对讲组树
	$("#group-tree").jstree({
		plugins : [ "themes","state", "json_data","ui"],
		themes : {
			theme : "classic",
			dots : true,
			icons : true
		},
		state:{
			opened:false
		},
		json_data : {
			data : []
		},
		ui : {
			select_limit :1
		}
	}).bind("select_node.jstree", function(event, data) {//在对讲组上点击某个节点的事件
		$("#dept-tree").data("selected", data.rslt.obj.data());//获得点击节点的数据
		var node = data.rslt.obj;
		if(!$("#group-tree").jstree("is_leaf",node)){
			nIDGroup=data.rslt.obj.attr("groupId");//获得节点的组id数据
			switchGroup();
		}
	});
}
function parseMembers(nIDGroup,str) {//组装ocx发过来的对讲组和对讲组人员的数据
	var isRefresh=0;//标示位是否需要刷新
	var members;
	var groupm=mapGroups.Get(nIDGroup);
	if(typeof(groupm)!= "undefined"){
		members =groupm.members;//根据nIDGroup 组的号码得到组的人员
	}
	if(typeof(members)== "undefined"){//如果这个组里面已经有人员
		members = new HashMap();
	}
	var ss=str.split("_");//将得到的人员数据重新进行分割 得到人员和组的数据
	for(var i=0;i<ss.length;i+=2){
		if(!members.Contains(ss[i])){
		members.Set(ss[i],ss[i+1]);
		isRefresh=1;
	}
}
	groupm.members=members;//将更新后的人员装入map
	mapGroups.Set(nIDGroup, groupm);
	return isRefresh;//返回是否需要刷新的数据
}

function defaultGroup() {//获得默认组
	var defaultGroup = mso.getDefaultGroup();
	return defaultGroup ;
}
function currentGroup() {//获得当前组
	var currentGroup = mso.getCurrentGroup();
	return currentGroup ;
}
function switchGroup() {//设为当前组
	if(typeof(nIDGroup)!= "undefined"){
		mso.switchGroup(nIDGroup);
	}else{
		alert("请先选择对讲组后再操作");
	}
}

function updateDeptImage(currentGroupId) {//设为当前组后更换当前组的图标
	var oldNode_ins = $("#group-tree ul li[id='" + OldCurrentGroupId + "'] a ins");//得到对讲组图标节点
	var oldNode_content = $( "#group-tree ul li[id='"+OldCurrentGroupId +"'] a");//得到对讲组内容及图标节点
	if(oldNode_ins.length>0){
		oldNode_ins[0].style.backgroundImage = "url("+urlPath+"/page/video/image/dept.gif)";
		oldNode_content[0].style.background = "";
	}
	var currentNode_ins = $("#group-tree ul li[id='" + currentGroupId + "'] a ins");//得到对讲组图标节点
	var currentNode_content = $( "#group-tree ul li[id='"+currentGroupId +"'] a");//得到对讲组内容及图标节点
	if(currentNode_ins.length>0){
		currentNode_ins[0].style.backgroundImage = "url("+urlPath+"/page/video/image/group.gif)";
		currentNode_content[0].style.background = "green";
	}
	OldCurrentGroupId = currentGroupId;
}

function stopAudios(){
	var flag=mso.hangUpCall(callIds);
//	var flag=0;
	if(flag==0){
		$("#audioGroup1").show();
		$("#audioGroup2").hide();
		$("#showPhone").hide();
	}else{
		alert("语音会议结束失败！");
	}
}
var callIds;
function makeAudios(){
	if(typeof(nIDGroup)!= "undefined"){
		var currentGroupId = currentGroup();//获得当前组
		if(nIDGroup != currentGroupId){//如果发起对讲的组不是当前组
			alert("请先设为当前组然后申请话权！");
		}else{
			var groupState=mso.getGroupState(nIDGroup);//获得对讲组的状态
			//组状态类型有以下几种：
			//PTT_GROUP_STATE_NULL = 1 << 5,/* 对讲组无状态*/
			//PTT_GROUP_STATE_IDLE = 1 << 6,/* 对讲组空闲 */
			//PTT_GROUP_STATE_BUSY = 1 << 7 /* 对讲组忙 */
			var memberState=mso.getPttGroupMemberState(nIDGroup,loginID);//获得自己在组中的状态
			//对讲组成员状态 256 成员不在线 512 成员不可呼 1024 成员空闲中2048 成员听讲中 4096 成员话权中 32768 删除呼入的外线号码
			var userStr="";
			var objs=mapGroups.Get(currentGroupId);
			if(typeof(objs.members)!="undefined"){
				var users=objs.members;
				var userArr=users.KeySet();
				for(var i=0;i<userArr.length;i++){
					userStr=userStr+userArr[i]+"_";
				}
				userStr=userStr.substring(0, userStr.length-1);
			}
			if(groupState==64){//如果组状态为空闲
				alert("mso.createAudioMeet="+typeof(mso.createAudioMeet));
				alert("requestPtt="+typeof(mso.requestPtt));
//				callIds=mso.createAudioMeet(userStr,0);
				$("#audioGroup1").hide();
				$("#audioGroup2").show();
				$("#showPhone").show();
				//var calId=mso.makePttCall(nIDGroup,0,0);//发起对讲
			}else if(groupState==128){//如果组状态为忙碌
				alert("对讲组忙碌，请稍后呼叫");
//				if(memberState==4096){//人员状态在话权中
//					mso.requestPtt(0);//释放话权
//				}else if(memberState==2048){//人员在听讲中
//					mso.requestPtt(1);//申请话权
//				}
				
			}else{
				alert("对讲组忙碌，请稍后呼叫");
			}
		}
	}else{
		alert("请先选择对讲组后再操作");
	}
}
function makePttCall() {//发起对讲
	if(typeof(nIDGroup)!= "undefined"){
		var currentGroupId = currentGroup();//获得当前组
		if(nIDGroup != currentGroupId){//如果发起对讲的组不是当前组
			alert("请先设为当前组然后申请话权！");
		}else{
			var groupState=mso.getGroupState(nIDGroup);//获得对讲组的状态
			//组状态类型有以下几种：
			//PTT_GROUP_STATE_NULL = 1 << 5,/* 对讲组无状态*/
			//PTT_GROUP_STATE_IDLE = 1 << 6,/* 对讲组空闲 */
			//PTT_GROUP_STATE_BUSY = 1 << 7 /* 对讲组忙 */
			var memberState=mso.getPttGroupMemberState(nIDGroup,loginID);//获得自己在组中的状态
			//对讲组成员状态 256 成员不在线 512 成员不可呼 1024 成员空闲中2048 成员听讲中 4096 成员话权中 32768 删除呼入的外线号码
			if(groupState==64){//如果组状态为空闲
				var calId=mso.makePttCall(nIDGroup,0,0);//发起对讲
				alert("mso.createAudioMeet="+typeof(mso.createAudioMeet));
				alert("requestPtt="+typeof(mso.requestPtt));
			}else if(groupState==128){//如果组状态为忙碌
				if(memberState==4096){//人员状态在话权中
					mso.requestPtt(0);//释放话权
				}else if(memberState==2048){//人员在听讲中
					mso.requestPtt(1);//申请话权
				}
			}else{
				alert("对讲组忙碌，请稍后呼叫");
			}
		}
	}else{
		alert("请先选择对讲组后再操作");
	}
}

function release() {//释放话权
	mso.requestPtt(0);
}
//申请、释放话权成功后，ocx回调该方法改变对讲组颜色及申请与释放话权按纽状态
function updatePttApplyButton(nidgroup){
	//对讲组成员状态 256 成员不在线 512 成员不可呼 1024 成员空闲中2048 成员听讲中 4096 成员话权中 32768 删除呼入的外线号码
	var mystate = mso.getPttGroupMemberState(nidgroup,loginID);
	var liNode = $( "#group-tree ul li[id='"+nidgroup +"'] a");//得到对讲组内容及图标节点
	if(mystate==4096 && pttApplyStatus==0){
		pttApplyStatus =mystate;
		document.getElementById("pttMakeCall-btn").style.display="none";
		document.getElementById("release-btn").style.display="block";
		liNode[0].style.background="#FF83FA";
	//释放话权完成功后，成员空闲中，或成员听讲中
	}else{
		pttApplyStatus=0;
		document.getElementById("pttMakeCall-btn").style.display="block";
		document.getElementById("release-btn").style.display="none";
		if(liNode.length>0){
			liNode[0].style.background="green";
		}
	}
}
function createGroup() {//建立对讲组,组装sip 号码数据
	isCreate=1;//将标识位改为建组对讲
	var sips;//sip号码的字符串
	var hasLoginId;
	var maxNumber;
	var isNO=false;//所填用户是否包含登陆者
	var sipnum = document.getElementById("sips").value;
	var sipArry = sipnum.split(",");//将得到的人员数据重新进行分割 得到人员和组的数据
	for ( var i = 0; i < sipArry.length; i++) {
		if(sipArry[i]==loginID){
			isNO=true;
		}else if(typeof(sips) != "undefined"){
			sips=sips+','+sipArry[i];
		}else{
			sips=sipArry[i];
		}
	}
	if(typeof(sips)!='undefined'){
		sips=sips+','+loginID;
		var groupName=$("#groupName").val();
		if((isNO && sipArry.length > 59)||(!isNO && sipArry.length > 60)){
			alert("最多有60个组成员");
		    return;
		}
		var groupID=$("#groupID").val();//对讲组组号
		if(groupID==""){
		    groupID=0;
		}else if(groupID>99999){
			alert("组号不得大于99999");
			return;
		}
		if(groupName.length>25){
		    alert("组名称不得大于25个字");
			return;
		}
		if(!regContent(groupName)){
		    alert("组名不能含包除\"_\"以外的特殊字符");
			return;
		}
		if(typeof(groupName) != "undefined"&&groupName!=""){
			createGroupPtt(groupID,"tmp_"+groupName,sips);//建立临时对讲
		}else{
		   alert("请填写组名");
		}
	}else{
		alert("请先选定号码，再建立对讲组！");
	}
	//return false;
}

function createGroupPtt(localGroupId,groupName,sips) {//建立临时对讲组
     var ipPortObj=getIpPort();
     mso.createPttGroupURL(ipPortObj.strServer,ipPortObj.nPort,localGroupId,groupName,loginID,sips);
}

function addMapGroupsInfo(localGroupId,groupName) {//建立临时对讲组后将建立的组的信息放入mapGroupsInfo
	var object = {};
	object.groupName=groupName;
	object.localGroupId=localGroupId;
	object.flag=0;
	object.groupType=1;
	mapGroupsInfo.Set(localGroupId,object);
}

function delTempGroup() {//删除组
	if(typeof(nIDGroup)!= "undefined"){
		var groupInfo=getGroupInfo(nIDGroup);
		var ipPortObj=getIpPort();
		if(typeof(groupInfo)!= "undefined"){//如果 信息存在
			if(groupInfo.groupType==1){//如果该对讲组是临时组
				var groupName = $( "#group-tree ul > li[id='"+OldCurrentGroupId +"'] >a >span").text();
				if(confirm("确认删除\""+groupName+"\"?")){
                   mso.deletePttGroupURL(ipPortObj.strServer,ipPortObj.nPort,nIDGroup);
                }
			}else if(groupInfo.groupType==0){//如果该对讲组是固定组
				mso.deletePttGroupURL(ipPortObj.strServer,ipPortObj.nPort,nIDGroup);
			}else{
				alert("当前组为固定组或临时组，不可删除！");
			}
		}
	}else{
		alert("请先选择对讲组后再操作");
	}
}

function deleteGroupPageResult(result,refData,response){// 删除固定组结果组织架构抓取
    if(result == 1){
	    var resultList=response.split(";");
		var resultStr=resultList[3];
		if(resultStr == "success"){
		    var liNode = $('#group-tree>ul>li>a>span');
		    var count = liNode.length;
			alert("删除成功!");
			var j=1;
			for(var i=0;i<count;i++){
				var content = $("#"+liNode[i].id).text();
				if(content != ""){
					$("#"+liNode[i].id).text(j+content.substring(content.indexOf("_")));
					j++;
				}
			}
			groupIndex=j;
			j=1;
		}else{
		   alert("删除失败");
		}
	}
}

function delMapGroup(nIDGroup) {//清除map中的对讲组数据
	if(typeof(nIDGroup)!= "undefined"){
		var groupInfo=getGroupInfo(nIDGroup);//从对讲组信息map中 将对讲组对象信息取出
		if(typeof(groupInfo)!= "undefined"){//如果 信息存在
			mapGroups.Remove(nIDGroup);//在对讲组中删除
			mapGroupsInfo.Remove(nIDGroup);//在对讲组map中清除
			delGroupNode(nIDGroup);//删除节点
		}
	}else{
		alert("请先选择对讲组后再操作");
	}
}

function delGroupNode(nIDGroup) {//删除临时组的节点
	var node = $( "#group-tree ul li[id='" + nIDGroup + "']");//得到对讲组的点
	node.remove();
	var nodes = $( "#group-tree");
}

function getGroupInfo(nIDGroup) {//得到对讲组信息map中的对讲组对讲
	var group=mapGroups.Get(nIDGroup);
	if(typeof(group)!= "undefined"){//如果该对讲组存在 防止页面刷新不及时删除报错
		var groupInfo=mapGroupsInfo.Get(nIDGroup);//从对讲组信息map中 将对讲组对象信息取出
		return groupInfo;
	}
}

function creatGroupNameLocalGroupID(){//生成唯一的对讲组名称
	var groupNumber=0;
	var groupName;
	var localGroupId;
	mapGroupsInfo.each(function(key, data){
		if(key.substring(0, 5)=='临时对讲组'){
			groupNumber=groupNumber+1;
		}
	});
	if(groupNumber>=10){
		alert("只能建立10个临时对讲组，请删掉无用的临时对讲组后再建立！");
		return;
	}else{
		for(var i=1; i<=10; i++){
			groupName='临时对讲组'+i;
			if(!mapGroupsInfo.Contains(groupName)){
				localGroupId=loginID+i;
				break;
			}
		}
	}
	return localGroupId+';'+groupName;
}
function hotkeysdown(e){
	var realkey = String.fromCharCode(e.keyCode);
	for(var i=1;i<=9;i++){
		if(e.altKey && realkey ==i){
			hotKeySwitchGroup(i-1);
			break;
		}
	}
	//F2申请、释放话权
	if(realkey == 'q' && holdDownStatus == 0){
		holdDownStatus=1;
		makePttCall();
	}
}
function hotkeyup(e){
	var realkey = String.fromCharCode(e.keyCode);
	if(realkey == 'q'){
		release();
		holdDownStatus=0;
	}
}
function hotKeySwitchGroup(value){
	var liNode = $('#group-tree>ul').children('li').get(value);
	if(nIDGroup != liNode.id){
		nIDGroup = liNode.id;
		$( "#group-tree ul li[id='"+nIDGroup +"'] a")[0].click();
	}
}
//组操作结果
function groupNotify(strNotify){
   var isOrNo=strNotify.indexOf(";");
   var errorStatus=strNotify.indexOf("<");
	if(isOrNo>-1&&errorStatus<=-1){
	    var Notify=strNotify.split(";");
		if(Notify[1]=="create"){
		   if(Notify[3]=="success"){
		       alert("创建组成功");
			   var groupName=$("li[id='" + Notify[2] + "']").attr("title");
			   addMapGroupsInfo(Notify[2],groupName);//建立临时对讲组后将建立的组的信息放入mapGroupsInfo
			   $("#sips").val("");
			   $("#groupName").val("");
		   }else{
		       alert("创建组失败");
		   }
		}else if(Notify[1]=="update"){
		   if(Notify[3]=="success"){
		       alert("修改组成功");
		   }else{
		       alert("修改组失败");
		   }
		}else if(Notify[1]=="drop"){
		   if(Notify[3]=="success"){
		       alert("删除组成功");
		   }else{
		       alert("删除组失败");
		   }
		}else if(Notify[0]=="no permission"){
	       alert("没有操作组权限");
	    }else if(Notify[0]=="parameter error"){
	       alert("参数错误");
	    }else{
		   alert("网络出现错误，请检查网络连接");
		}
	}
}
//若组名有< >特殊字符
function regContent(content){
   var reg = /^[\u4e00-\u9fa5a-z_0-9]+$/gi;
   if(reg.test(content)){
       return true;
   }
   return false;
}
//获取ip地址和端口号
function getIpPort(){
	var ipPort = document.getElementById("serverIp").value;
	var isOrNo=ipPort.indexOf(":");
	var obj=new Object();
	if(isOrNo>-1){
	    var ipPortList=ipPort.split(":");
		obj.strServer=ipPortList[0];
		obj.nPort=parseInt(ipPortList[1]);
	}else{
	    obj.strServer=ipPort;
		obj.nPort=80;
	}
	return obj;
}
function endPtt() {//结束对讲
	if(typeof(nIDGroup)!= "undefined"){
		mso.endPtt(nIDGroup);//结束当前的对讲callId 为当前对讲的id
		document.getElementById("pttMakeCall-btn").style.display="block";
		document.getElementById("release-btn").style.display="none";
	}else{
		alert("请先选择对讲组后再操作");
	}
}
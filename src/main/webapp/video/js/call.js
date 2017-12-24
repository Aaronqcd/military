var callIdHwnd = new HashMap();//记录通话的callId sip号码等的map
var videoHeight=310;
var videoWidth=420;
var audioHeight=150;
var audioWidth=260;

function call(audioOrVideo) {//拨打电话
//	var sips = document.getElementById("sipCount").value;
	var sips=$("#sipCount").text();
	var sipArry = sips.split(",");//将得到的人员数据重新进行分割 得到人员和组的数据

	if(audioOrVideo=='audio'){//拨打语音电话
		for ( var i = 0; i < sipArry.length; i++) {
			if(sipArry[i]!='' && !isNaN(sipArry[i])){
				audioCall(sipArry[i]);
			}
		}
	}else if(audioOrVideo=='video'){//拨打视频电话
		for ( var j = 0; j < sipArry.length; j++) {	
			if(sipArry[j]!='' && !isNaN(sipArry[j])){
				videoCall(sipArry[j]);
			}
		}
	}
}
function calls(audioOrVideo){
//	var sips=$("#sipCount").text();
	var userStr="";
	var objs=mapGroups.Get(nIDGroup);
	if(typeof(objs.members)!="undefined"){
		var users=objs.members;
		var userArr=users.KeySet();
		for(var i=0;i<userArr.length;i++){
			if(sipNum!=userArr[i]){
				userStr=userStr+userArr[i]+",";
			}
		}
		userStr=userStr.substring(0, userStr.length-1);
	}
	var sips=userStr;
	var sipArry = sips.split(",");//将得到的人员数据重新进行分割 得到人员和组的数据

	if(audioOrVideo=='audio'){//拨打语音电话
		for ( var i = 0; i < sipArry.length; i++) {
			if(sipArry[i]!='' && !isNaN(sipArry[i])){
				audioCall(sipArry[i]);
			}
		}
	}else if(audioOrVideo=='video'){//拨打视频电话
		for ( var j = 0; j < sipArry.length; j++) {	
			if(sipArry[j]!='' && !isNaN(sipArry[j])){
				videoCall(sipArry[j]);
			}
		}
	}
}
function audioCall(sipAccount) {//拨打语音电话
	var object={};//用于存放sip号码callId 和makeOrAnswer 的对象。在其他页面或者js 中用到
	object.makeOrAnswer=1; //拨打电话
	object.sipNum=sipAccount;
	object.callType='audio';
	var topLeft=calculate_TopLeft('audio');
	var callId =mso.makeAudioCall(sipAccount.toString(),0);//拨打语音电话，开始拨号
	var winId=window.open(urlPath+'/video/onAudio_index.action?makeOrAnswer=1&callID='+ callId +'&sipAccount='+ sipAccount ,'audiowindow'+sipAccount+callId,'height='+audioHeight+',width='+audioWidth+','+ topLeft +',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no,directories=no,depended=yes,titlebar=no,alwaysRaised=yes') ;
//	var winId=window.open('/audio.html?makeOrAnswer=1&callID='+ callId +'&sipAccount='+ sipAccount ,'audiowindow'+sipAccount+callId,'height='+audioHeight+',width='+audioWidth+','+ topLeft +',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no,directories=no,depended=yes,titlebar=no,alwaysRaised=yes') ;
	var record={};
	record.sendSip=sipNum;
	record.receiveSip=sipAccount;
	record.type="语音";
	record.status="未应答";
	record.time=new Date();
	record.callId=callId;
	record.content="";
	save11(record);
	object.callId=callId;
	object.winId=winId;
	callIdHwnd.Set(callId,object);
}

function videoCall(sipAccount) {//拨打视频电话
	var object={};
	object.makeOrAnswer=1; //拨打电话
	object.sipNum=sipAccount;
	object.callType='video';
	
	var topLeft=calculate_TopLeft('video');
	var callId = mso.makeVideoCall(sipAccount.toString(),0, 0);//拨打视频电话开始拨号
	var winId=window.open(urlPath+'/video/onVideo_index.action?makeOrAnswer=1&callID='+callId +'&sipAccount='+ sipAccount ,'videowindow'+sipAccount+callId,'height='+videoHeight+',width='+videoWidth+','+ topLeft +',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no,directories=no,depended=yes,titlebar=no,alwaysRaised=yes') ;
//	var winId=window.open('/video.html?makeOrAnswer=1&callID='+callId +'&sipAccount='+ sipAccount ,'videowindow'+sipAccount+callId,'height='+videoHeight+',width='+videoWidth+','+ topLeft +',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no,directories=no,depended=yes,titlebar=no,alwaysRaised=yes') ;
	var record={};
	record.sendSip=sipNum;
	record.receiveSip=sipAccount;
	record.type="视频";
	record.status="未应答";
	record.time=new Date();
	record.callId=callId;
	record.content="";
	save11(record);
	object.callId=callId;
	object.winId=winId;
	callIdHwnd.Set(callId,object);
}

function calculate_TopLeft(callType) {//设定通话的弹出框的位置
	var clientHeight = window.screen.availHeight;//得到屏幕的高度和宽度
	var clientWidth = window.screen.availWidth;

	var cNamber=column_number(clientHeight,clientWidth,callType);//得带一行可以放几列数据

	var callNamber=callIdHwnd_number(callType);//得到目前有多少个通话

	var number = callNamber%cNamber;//得到
	if(callType == 'audio'){
		var left=number*audioWidth;
		var str='top=0,left='+left;
		return str;
	}else if(callType == 'video'){
		var top=clientHeight-videoHeight;
		var left=number*videoWidth;
		var str='top='+top+',left='+left;
		return str;
	}
}

function callIdHwnd_number(callType) {//查看目前有几路视频电话和语音电话
	var number=0;
	callIdHwnd.each(function(key, obj){
		if (typeof (obj.callType) != "undefined"&&typeof(obj.callType)!="unknown") {
			if(callType==obj.callType) {
				number=number+1;
			}
		}
	});
	return number;
//	return 1;
}

function column_number(clientHeight,clientWidth,callType) {//查看屏幕一行可以放几列视频通话和语音通话
	var number;
	if(callType == 'audio'){
		number = clientWidth /audioWidth; //除
	}else if(callType == 'video'){
		number = clientWidth /videoWidth; //除
	}
	if (number >= 0)
	{
		number = Math.floor(number); //返回小于等于原rslt的最大整数。
	}

	return number;
}

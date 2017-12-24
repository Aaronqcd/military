var loginID ;
var password;
var serverIp ;
var serverPort;
var mso ;

function setCookie() {
	var cookieLoginId = $.cookie("loginID");
	var cookieServer = $.cookie("serverIp");
	var cookiePort = $.cookie("serverPort");

	if (cookieLoginId) {
		$("#loginID").val(cookieLoginId);
	}
	if (cookieServer) {
		$("#serverIp").val(cookieServer);
	}
	if (cookiePort) {
		$("#serverPort").val(cookiePort);
	}
}
//获得窗口的垂直位置 
var iTop = (window.screen.availHeight - 30) / 2; 
//获得窗口的水平位置 
var iLeft = (window.screen.availWidth - 10) / 2; 
function login() {
	loginID = $.trim($("#loginID").val());
	password =$.trim($("#password").val());
	serverIp = $.trim($("#serverIp").val());
	serverPort = $.trim($("#serverPort").val());
	var rememberMe = $("#remember_me").get(0).checked;

	if (loginID == "") {
		alert("请填写用户名");
		return;
	}
	if (loginID!="") {
		var val =/[\d]{3,11}/;
		var vald = val.exec(loginID);
		if (vald == null) {
			alert("用户名格式不正确：应该由3到11为数字组成。请检查！");
			return;
		}
		if (vald != '') {
			if (vald[0] != loginID) {
				alert("用户名格式不正确：应该由3到11为数字组成。请检查！");
				return;
			}
		}
	}

	if (password == "") {
		alert("请填写密码");
		return;
	}
	if (password !="") {
		var val =/^[A-Za-z0-9]{0,16}$/;
		var vald = val.exec(password);
		if (vald == null) {
			alert("密码格式不正确:应该由字母或数字组成,且密码长度小于16。请检查！");
			return;
		}
		if (vald != '') {
			if (vald[0] != password) {
				alert("密码格式不正确:应该由字母或数字组成,且密码长度小于16。请检查！");
				return;
			}
		}
	}

	if (serverIp == "") {
		alert("请填写服务器地址");
		return;
	}

	if (serverIp != "") {
		var val = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		var vald = val.exec(serverIp);
		if (vald == null) {
			alert("服务器地址格式不正确，应该是正确的ip地址，请检查！");
			return;
		}
		if (vald != '') {
			if (vald[0] != serverIp) {
				alert("服务器地址格式不正确，应该是正确的ip地址，请检查！");
				return;
			}
		}
	}
	if (serverPort == "") {
		alert("请填写端口号");
		return;
	}
	if (serverPort != "") {
		if (isNaN(serverPort) || serverPort < 1 || serverPort > 9999) {
			alert("端口号输入格式不正确,请检查！");
			return ;
		}
	}

//	if (rememberMe) {
//		var option = {};
//		option.expires = 1;
//		option.path = "/";
//		$.cookie("loginID", loginID, option);
//		$.cookie("serverIp", serverIp, option);
//		$.cookie("serverPort", serverPort, option);
//	} else {
//		$.cookie("loginID", null,{path:"/"});
//		$.cookie("serverIp", null,{path:"/"});
//		$.cookie("serverPort",null,{path:"/"});
//	}
	mso = document.getElementById("MultimediaScheduleOcx"); //获取“videoclientocx”实现方法
	//登录到服务器
	if(typeof(mso.registerSip)=="undefined"){
		
		var con=confirm("没有安装ocx控件，是否下载"); //在页面上弹出对话框
		if(con==true){
			window.location.href=urlPath+"/page/video/file/OCX.exe";
		}
	}
	var logonresult = mso.registerSip(loginID, password, serverIp, serverPort);
}
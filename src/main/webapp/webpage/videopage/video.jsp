<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Video.js 5.18.4</title>
	<link href="${pageContext.request.contextPath}/plug-in/video/css/video-js.css" rel="stylesheet">
	<!-- If you'd like to support IE8 -->
	<script src="${pageContext.request.contextPath}/plug-in/video/js/videojs-ie8.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/jquery/jquery-1.8.3.js"></script>
	<style>
		body{background-color: #191919}
		.m{ width: 640px; height: 264; margin-left: auto; margin-right: auto; margin-top: 100px; }
	</style>
</head>
<body>
<div class="m">
		 <video id="my-video" class="video-js" controls preload="auto" width="640" height="264"
		  data-setup="{}" >
			 <source   id='mp4'  type="video/mp4"></source>
			<source id="webm" type="video/webm"></source>
			<source  id="ogv" type="video/ogg"></source> 
			<p class="vjs-no-js">
			  To view this video please enable JavaScript, and consider upgrading to a web browser that
			  <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
			</p>
		  </video> 
		  
		<!-- <video width="500" height="500" controls="controls" id="my-video" class="video-js" preload="auto" data-setup="{}">
		 <source src="123.ogg" type="video/ogg">
		  <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> 
		  <source src="123.mp4" type="video/mp4"> 
			您的浏览器不支持此种视频格式。
			 </video> -->
		<script src="${pageContext.request.contextPath}/plug-in/video/js/video.min.js"></script>	
		  <script type="text/javascript">
			/*  var myPlayer = videojs('my-video');
			videojs("my-video").ready(function(){
				var myPlayer = this;
				myPlayer.play();
			});  */
			
			
		function getParams(key){
    var url = location.search.replace(/^\?/,'').split('&');
    var paramsObj = {};
    for(var i = 0, iLen = url.length; i < iLen; i++){
        var param = url[i].split('=');
        paramsObj[param[0]] = param[1];
    }
    if(key){
        return paramsObj[key] || '';
    }
    return paramsObj;
}
			 var src=getParams('name')
			$("#mp4").attr('src',src) 
			$("#webm").attr('src',src) 
			$("#ogv").attr('src',src) 
			
		</script>
	</div>
</body>
</html>
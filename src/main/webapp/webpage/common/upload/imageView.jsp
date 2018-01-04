<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html >
<html>
<head>
<title>附件查看</title>
<link rel="stylesheet" href="${webRoot}/plug-in/viewer/css/viewer.min.css">
<script type="text/javascript" src="${webRoot}/plug-in/jquery/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${webRoot}/plug-in/viewer/js/viewer.min.js"></script>
<script type="text/javascript" src="plug-in/Flexpaper/flexpaper_flash.js"></script>
</head>
<body>
<%--<div style="position: absolute; left: 5px; top: 5px;"><img src="${realpath }" /></div>--%>
<div id="dowebok" style="position: absolute; width:100%; top: 5px;">
    <div style="text-align: center;">
        <img src="${realpath }" id="pic" alt="附件" style="cursor:pointer"/>
    </div>
</div>
<script type="text/javascript">
    $(function() {
        $("#pic").on("load",function(){
            var width = $(this).width();
            var height = $(this).height();
            //如果图片宽度超过680px或者高度超过480px，则将图片按比例缩放
            if(width>=680 && height<=480) {
                $(this).width(680);
                $(this).height(680*height/width);
            }
            else if(width>=680 && height>480) {
                if(width/height>17/12) {
                    $(this).width(680);
                    $(this).height(680*height/width);
                }
                else {
                    $(this).width(480*width/height);
                    $(this).height(480);
                }
            }
            else if(width<680 && height>480) {
                $(this).width(480*width/height);
                $(this).height(480);
            }
        });
        $("#dowebok").viewer();
    });
</script>
</body>
</html>




















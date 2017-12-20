<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
  
    <title>安全监督管理系统</title>

    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->

    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath}/front/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resource/js/layer/skin/default/layer.css"  rel="stylesheet" type="text/css"/>
    <link href="${pageContext.request.contextPath}/front/css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/front/css/custom.css" rel="stylesheet">
 <style>
 	#model{
 		width:300px;
 		height:300px;
 		position: fixed;
   		bottom: -337px;
   		right: 10px;
    	background: #fff;
    	border: 1px solid #ccc;
   		 
 	}
 	.times{
 		float: right;
	    font-size: 21px;
	    margin-right:5px;
	    font-weight: 700;
	    line-height: 1;
	    color: #000;
	    text-shadow: 0 1px 0 #fff;
	    filter: alpha(opacity=20);
	    opacity: .2;
	    cursor: context-menu;
 	}
 	.times:hover{
 	filter: alpha(opacity=60);
	    opacity: .6;
 	}
 </style>
</head>

<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden;position:relative;">
    <div id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                       		<div>
                       			<img alt="image" src="${pageContext.request.contextPath}/resource/images/login/logoI.png" />
                       		</div>
                        </div>
                        <div class="logo-element">
                        	<img alt="image" src="${pageContext.request.contextPath}/resource/images/login/6666.png" />
                        </div>
                    </li>

                    <c:forEach items="${sessionScope.menuList}" var="menu" varStatus="status">
					<c:if test="${menu.privLevel==1 }">
                    <li>
                    	<c:if test="${menu.privUrl=='' }">
							<a href="javascript:void(0)"><i class="${menu.privDesc }"></i> <span class="nav-label">${menu.privName }</span><span class="fa arrow"></span></a>
							<ul class="nav nav-second-level">
							<c:forEach items="${sessionScope.menuList}" var="menu1">
							<c:if test="${menu1.privLevel==2&&menu1.privParentNo==menu.privNo }">
							<li>
	                        	<c:if test="${menu1.privUrl=='' }">
									<a href="javascript:void(0)">${menu1.privName }<span class="fa arrow"></span></a>
									<ul class="nav nav-third-level">
									<c:forEach items="${sessionScope.menuList}" var="menu2">
									<c:if test="${menu2.privLevel==3&&menu2.privParentNo==menu1.privNo }">
	                                    <li>
	                                    	<c:if test="${menu2.privUrl=='' }">
	                                    		<a href="javascript:void(0)">${menu2.privName }<span class="fa arrow"></span></a>
	                                    		<ul class="nav nav-third-level" style="padding-left:10px">
	                                    			<c:forEach items="${sessionScope.menuList}" var="menu3">
	                                    				<c:if test="${menu3.privLevel==4&&menu3.privParentNo==menu2.privNo }">
	                                    					<li><a class="J_menuItem" href="${pageContext.request.contextPath}${menu3.privUrl }">${menu3.privName }</a></li>
	                                    				</c:if>
	                                    			</c:forEach>
	                                    		</ul>
	                                    	</c:if>
	                                    	<c:if test="${menu2.privUrl!='' }">
												<a class="J_menuItem" href="${pageContext.request.contextPath}${menu2.privUrl }">${menu2.privName }</a>
											</c:if>
                                    	</li>
									</c:if>
									</c:forEach>
									</ul>
								</c:if>
								<c:if test="${menu1.privUrl!='' }">
									<a class="J_menuItem" href="${pageContext.request.contextPath}${menu1.privUrl }">${menu1.privName }</a>
								</c:if>
							</li>
	                        </c:if>
							</c:forEach>
							</ul>
						</c:if>
						<c:if test="${menu.privUrl!='' }">
							 <a class="J_menuItem" href="${pageContext.request.contextPath}${menu.privUrl }"><i class="${menu.privDesc }"></i> <span class="nav-label">${menu.privName }</span><span class="fa arrow"></span></a> 
						</c:if>
                    </li>
                    </c:if>
					</c:forEach>
                    
                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#"><i class="fa fa-bars"></i> </a>
                    	<div class="website-title">
                    		<span>安全监督管理系统</span>
                    	</div>
                    </div>
                    <ul class="nav navbar-top-links navbar-right" style="margin-right: 15px;">
                       <li class="dropdown hidden-xs">
                            <%-- <a class="right-sidebar-toggle" aria-expanded="false">
                                <i class="fa fa-tasks"></i> 欢迎您:${sessionScope.user.userNo }
                            </a> --%>
                            
                            
                           <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#" style='display:inline-block;'>
                                <span class="text-muted text-xs block">欢迎您:${sessionScope.user.userNo }<b class="caret"></b></span>
                                </span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="javascript:void()" data-toggle="modal" data-target="#privModal" data-whatever="@mdo">修改密码</a>
                                </li>
                                <li><a class="javascript:void()" data-toggle="modal" data-target="#detailModal" data-whatever="@mdo">个人资料</a>
                                </li>
                            </ul>
                        </div>
                            
                        </li>
                        
                        <%-- <div style="float:left;margin-height:10px;padding-height:10px;">
							<div
								style="background-image:url(${pageContext.request.contextPath}/page/zhuyemian/images/suo.png);background-repeat:no-repeat;width:60px;height:30px;margin-left:18px;"></div>
							<div style="padding-right:20px;padding-top: 20px;">
								<button data-toggle="modal" data-target="#travelModal" data-whatever="@mdo" style="color: green;">修改密码</button>
							</div>
	            			<!-- 模态窗口 -->
							<div class="modal fade" id="travelModal" tabindex="-1" role="dialog"
								aria-labelledby="forminfoModalLabel">
								<div class="modal-dialog " style="width:500px;padding-top:100px" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<ul id="departTree" class="ztree" ></ul> 
										<div class="modal-footer" style="height: 120px;padding-top: 40px;">
											<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
											<button type="button" class="btn btn-primary" onclick="savePriv()">保存密码</button>
										</div>
									</div>
								</div>
							</div>
						</div> --%>
                     </ul>
                </nav>
            </div>
            <div class="row content-tabs">
                <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
                </button>
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <a href="javascript:;" class="active J_menuTab" data-id="index_v1.html">首页</a>
                    </div>
                </nav>
                <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
                </button>
                <div class="btn-group roll-nav roll-right">
                    <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>

                    </button>
                    <ul role="menu" class="dropdown-menu dropdown-menu-right">
                        <li class="J_tabShowActive"><a>定位当前选项卡</a>
                        </li>
                        <li class="divider"></li>
                        <li class="J_tabCloseAll"><a>关闭全部选项卡</a>
                        </li>
                        <li class="J_tabCloseOther"><a>关闭其他选项卡</a>
                        </li>
                    </ul>
                </div>
                <a id="logout" href="${pageContext.request.contextPath}/user/logout.action" class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出</a>
                
            </div>
            <div class="row J_mainContent" id="content-main">
                <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="${pageContext.request.contextPath}/secure/datastore_examineIndex.action?q=1" frameborder="0" data-id="index_v1.html" seamless></iframe>
            </div>
            <div class="footer">
                <div style="text-align:center">@2017-2019安全监督管理系统All Rights Reserved京ICP</a>
                </div>
            </div>
            <div id="model" >
            	<div style="background:#eee"><span class="times">&times;</span>
            	<div style="clear: both;"></div>
            	<h5 style="text-align:center;position: relative;top: -15px;">巡视督查整改提醒</h5>
            	</div>
            	<p id="tex" style="line-height: 25px;padding:0 5px;"></p>
            </div>
      <script>
      
      </script>
        </div>
        
        <!-- 模态窗口 -->
		<div class="modal fade" id="privModal" tabindex="-1" role="dialog"
			aria-labelledby="forminfoModalLabel">
			<div class="modal-dialog " style="width:500px;padding-top:100px" role="document">
				<div class="modal-content">
					<div class="modal-header">
						修改当前登录用户${sessionScope.user.userNo }密码
						<p id='isp' style='color:red;display:none;'>两次密码输入不正确，请检查后重新输入<p>
					</div>
					<div class='modal-body'>
					
						<form class='class="form-inline"' action="" id="changePwdForm">
						<div class="form-group">
						   <label for="" >新密码</label>
						  <input type="hidden"  name="userId" value="${sessionScope.user.userId }">
						    <input type="text"id='text'  class="form-control" value="" placeholder="请输入密码"><br/>
					  </div>
						<div class="form-group">
						    
						     <label for="" >确认密码</label>
						    <input type="password" class="form-control" id="newPwd" name="userPwd" value="" placeholder="确认密码">
					  </div>
							
							
							
						</form>
					</div>
					<div class="modal-footer" style="height: 120px;padding-top: 40px;">
						<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
						<button type="button"id='btn' class="btn btn-primary" >保存密码</button>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 模态窗口个人资料 -->
		<div class="modal fade" id="detailModal" tabindex="-1" role="dialog"
			aria-labelledby="forminfoModalLabel">
			<div class="modal-dialog " style="width:600px;padding-top:100px" role="document">
				<div class="modal-content">
					<div class="modal-header">
						登录用户${sessionScope.user.userNo }信息
					</div>
					<div class='modal-body'>
						<form action="" >
							<table class="table table-bordered table-hover definewidth m10"
								style="margin-bottom: 0;">
								<tbody>
									<tr>
										<th><img alt="image" src="${user.headPhoto}" /></th>
									</tr>
									<tr >
										<th>用户编号：</th>
										<th>${user.userNo}</th>
										<th>用户名称：</th>
										<th>${user.userName}</th>
									</tr>
									<tr >
										<th>用户担任职务：</th>
										<th>${user.userPosition}</th>
										<th>用户描述：</th>
										<th>${user.userDesc}</th>
									</tr>
									<tr >
										<th>用户状态：</th>
											<c:if test="${user.userStatus=='Y'}">
												<th style="color: green;">启用</th>
											</c:if>
											<c:if test="${user.userStatus=='N'}">
												<th style="color: red;">未启用</th>
											</c:if>
										<th>用户担任角色：</th>
										<th>
											<c:forEach items="${sessionScope.roleList }" var="role" varStatus="status">
											<c:if test="${user.userOwnRole==role.roleNo}">
												${role.roleName }
											</c:if>
											</c:forEach>
										</th>			
									</tr>
									<tr >
										<th>用户所属公司：</th>
										<th>
											<c:forEach items="${sessionScope.companyList }" var="depart" varStatus="status">
											<c:if test="${user.userOwnCompany==depart.departNo}">
												${depart.departName}
											</c:if>
											</c:forEach>
		            					</th>	
										<th>用户所属部门：</th>
										<th>
										<c:forEach items="${sessionScope.departmentList }" var="depart" varStatus="status">
											<c:if test="${user.userDepartNo==depart.departNo}">
												${depart.departName}
											</c:if>
											</c:forEach>
										</th>							
									</tr>
									<tr >
										<th>用户联系电话：</th>
										<th>${user.userMobile}</th>
										<th>用户移动电话：</th>
										<th>${user.userPhone}</th>
									</tr>
									<tr >
										<th>用户sip号码：</th>
										<th>${user.userSip}</th>
										<th>用户邮箱地址：</th>
										<th>${user.userEmail}</th>
									</tr>
									
								</tbody>
							</table>
						</form>
					</div>
					<div class="modal-footer" style="height: 120px;padding-top: 40px;">
						<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 模态框结束 -->
    </div>
    <script src="${pageContext.request.contextPath}/front/js/jquery.min.js?v=2.1.4"></script>
    <script src="${pageContext.request.contextPath}/front/js/bootstrap.min.js?v=3.3.6"></script>
    <script src="${pageContext.request.contextPath}/front/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="${pageContext.request.contextPath}/front/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="${pageContext.request.contextPath}/front/js/plugins/layer/layer.min.js"></script>
    <script src="${pageContext.request.contextPath}/front/js/hplus.min.js?v=4.1.0"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/front/js/contabs.min.js"></script>
    <script src="${pageContext.request.contextPath}/front/js/plugins/pace/pace.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/layer/layer.js"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	  <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
	  <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
    <script type="text/javascript">
    var btn=document.querySelector("#btn");
    var isp=document.querySelector("#isp");
     var text=document.querySelector("#text");
    var newPwd=document.querySelector("#newPwd");
  	  newPwd.onfocus=text.onfocus=function(){
    	isp.style.display='none';
    }
    btn.onclick=function(){
		var val=text.value;
		var pas=newPwd.value;
		var res=new RegExp(val);
		if(res.test(pas)){
			changePwd();
		}else{
			isp.style.display='block';
			return false;
		}
    }
	function changePwd(){
		$.ajax({
				 url :'${pageContext.request.contextPath}/authority/user_changePwd.action',
				 type : 'post',  
				 dataType : 'json',  
				 timeout : 3000, 
				 async: false,
				 data : $('#changePwdForm').serialize(),
				 error : function(){  
					layer.alert("网络延时，请重试.");  
				 }, 
				 success : function(res){  
					layer.alert("修改成功"); 
				  text.value="";
					newPwd.value="";
					$('#privModal').modal('hide');
				 } 
			}); 
		
	}
    /*window.onbeforeunload = function(event) {
        console.log(window);
        var n = window.screenX - window.screenLeft;
        var b = n > document.documentElement.scrollWidth-20;

        if(b && window.clientY < 0 || window.altKey)
        {
            alert("是关闭而非刷新");
            //window.event.returnValue = ""; //这里可以放置你想做的操作代码
        }else{
            alert("21321321");
		}

        /!*$.ajax({
            url :"${pageContext.request.contextPath}/user/logout.action",
            type : 'post',
            dataType : 'json',
            async: false,
            error : function(){
            },
            success : function(res){
            }
        });*!/
    }*/
    $(document).ready(function(){
    	  $(".times").on('click',function(){
    	$("#model").hide();
    })
     $.ajax({
            url :"${pageContext.request.contextPath}/secure/datastore_getAQJCByDate.action",
            type : 'post',
            dataType : 'json',
            error : function(){
            },
            success : function(res){
            	$("#tex").html(res.sl);
            	$("#model").animate({
			    bottom:'37px',
			  },"slow");
				setTimeout(function(){
					$("#model").hide();
				},15000);
            }
        });
    })
  
	</script>
</body>


<!-- Mirrored from www.zi-han.net/theme/hplus/ by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 20 Jan 2016 14:17:11 GMT -->
</html>

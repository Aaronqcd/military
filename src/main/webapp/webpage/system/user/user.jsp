<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>用户信息</title>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
	<link rel="stylesheet" href="plug-in/uploadify/css/uploadify.css" type="text/css" />
	<link rel="stylesheet" href="${webRoot}/online/template/ledefault/css/bootstrap.css">
	<link rel="stylesheet" href="${webRoot}/online/template/ledefault/css/app.css">
	<script type="text/javascript" src="plug-in/uploadify/jquery.uploadify-3.1.js"></script>
    <script>
<%-- //        update-start--Author:zhangguoming  Date:20140826 for：将combobox修改为combotree
        function setOrgIds() {
//            var orgIds = $("#orgSelect").combobox("getValues");
            var orgIds = $("#orgSelect").combotree("getValues");
            $("#orgIds").val(orgIds);
        }
        $(function() {
            $("#orgSelect").combotree({
                onChange: function(n, o) {
                    if($("#orgSelect").combotree("getValues") != "") {
                        $("#orgSelect option").eq(1).attr("selected", true);
                    } else {
                        $("#orgSelect option").eq(1).attr("selected", false);
                    }
                }
            });
            $("#orgSelect").combobox("setValues", ${orgIdList});
            $("#orgSelect").combotree("setValues", ${orgIdList});
        }); --%>


		function openDepartmentSelect() {
			$.dialog.setting.zIndex = getzIndex(); 
			var orgIds = $("#orgIds").val();
			$.dialog({content: 'url:departController.do?departSelect&orgIds='+orgIds, zIndex: 2100, title: '组织机构列表', lock: true, width: '400px', height: '350px', opacity: 0.4, button: [
			   {name: '<t:mutiLang langKey="common.confirm"/>', callback: callbackDepartmentSelect, focus: true},
			   {name: '<t:mutiLang langKey="common.cancel"/>', callback: function (){}}
		   ]}).zindex();
		}
			
		function callbackDepartmentSelect() {
			  var iframe = this.iframe.contentWindow;
			  var treeObj = iframe.$.fn.zTree.getZTreeObj("departSelect");
			  var nodes = treeObj.getCheckedNodes(true);
			  if(nodes.length>0){
			  var ids='',names='';
			  for(i=0;i<nodes.length;i++){
			     var node = nodes[i];
			     ids += node.id+',';
			    names += node.name+',';
			 }
			 $('#departname').val(names);
			 $('#departname').blur();		
			 $('#orgIds').val(ids);		
			}
		}
		
		function callbackClean(){
			$('#departname').val('');
			 $('#orgIds').val('');	
		}
		
		function setOrgIds() {}
		$(function(){
			$("#departname").prev().hide();
		});
    </script>
</head>
<body style="overflow-y: hidden" scroll="no">
<t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="userController.do?saveUser" beforeSubmit="setOrgIds"
			 callback="jeecgFormFileCallBack@Override">
	<input id="id" name="id" type="hidden" value="${user.id }">
	<%--<table style="width: 600px;" cellpadding="0" cellspacing="1" class="formtable">
		<tr>
			<td align="right" width="10%" nowrap><label class="Validform_label"> <t:mutiLang langKey="common.real.name"/>: </label></td>
			<td class="value" width="10%">
				<input id="realName" class="inputxt" name="realName" value="${user.realName }" datatype="s2-10">
				<span class="Validform_checktip"><t:mutiLang langKey="fill.realname"/></span>
			</td>
		</tr>
		<tr>
			<td align="right" width="25%" nowrap>
                <label class="Validform_label">  <t:mutiLang langKey="common.username"/>:  </label>
            </td>
			<td class="value" width="85%">
                <c:if test="${user.id!=null }"> ${user.userName } </c:if>
                <c:if test="${user.id==null }">
                    <input id="userName" class="inputxt" name="userName" validType="t_s_base_user,userName,id" value="${user.userName }" datatype="s2-10" />
                    <span class="Validform_checktip"> <t:mutiLang langKey="username.rang2to10"/></span>
                </c:if>
            </td>
		</tr>
		<tr>
			<td align="right">
				<label class="Validform_label">
					性别:
				</label>
			</td>
			<td class="value">
				<t:dictSelect field="gender" type="list"
							  typeGroupCode="sex" defaultVal="${user.gender}" hasLabel="false"  title="性别"
				></t:dictSelect>
				<span class="Validform_checktip"></span>
				<label class="Validform_label" style="display: none;">性别</label>
			</td>
		</tr>
		<tr>
			<td align="right"><label class="Validform_label"> 部门: </label></td>
			<td class="value">
                <input id="departname" name="departname" type="text" readonly="readonly" class="inputxt" datatype="*" value="${departname}">
                <input id="orgIds" name="orgIds" type="hidden" value="${orgIds}">
                <a href="#" class="easyui-linkbutton" plain="true" icon="icon-search" id="departSearch" onclick="openDepartmentSelect()">选择</a>
                <a href="#" class="easyui-linkbutton" plain="true" icon="icon-redo" id="departRedo" onclick="callbackClean()">清空</a>
                <span class="Validform_checktip"><t:mutiLang langKey="please.muti.department"/></span>
            </td>
		</tr>
		<tr>
			<td align="right">
				<label class="Validform_label">
					职位:
				</label>
			</td>
			<td class="value">
				<input id="position" name="position" type="text" style="width: 150px" class="inputxt"

					   ignore="ignore" value="${user.position}"
				/>
				<span class="Validform_checktip"></span>
				<label class="Validform_label" style="display: none;">职位</label>
			</td>
		</tr>
		<tr>
			<td align="right">
				<label class="Validform_label">
					学历:
				</label>
			</td>
			<td class="value">
				<input id="education" name="education" type="text" style="width: 150px" class="inputxt"

					   ignore="ignore" value="${user.education}"
				/>
				<span class="Validform_checktip"></span>
				<label class="Validform_label" style="display: none;">学历</label>
			</td>
		</tr>
		<tr>
			<td align="right">
				<label class="Validform_label">
					入职时间:
				</label>
			</td>
			<td class="value">
				<input id="hiredate" name="hiredate" type="text" style="width: 150px" class="Wdate" onClick="WdatePicker()"

					   ignore="ignore" value='<fmt:formatDate value='${user.hiredate}' type="date" pattern="yyyy-MM-dd"/>'
				/>
				<span class="Validform_checktip"></span>
				<label class="Validform_label" style="display: none;">入职时间</label>
			</td>
		</tr>
		<tr>
			<td align="right">
				<label class="Validform_label">
					状态:
				</label>
			</td>
			<td class="value">
				<t:dictSelect field="userState" type="list"
							  typeGroupCode="userstate" defaultVal="${user.userState}" hasLabel="false"  title="状态"
				></t:dictSelect>
				<span class="Validform_checktip"></span>
				<label class="Validform_label" style="display: none;">状态</label>
			</td>
		</tr>
		<tr>
			<td align="right" nowrap><label class="Validform_label">  联系方式: </label></td>
			<td class="value">
                <input class="inputxt" name="mobilePhone" value="${user.mobilePhone}" datatype="m" errormsg="联系方式不正确" ignore="ignore">
                <span class="Validform_checktip"></span>
            </td>
		</tr>
		<tr>
			<td align="right">
				<label class="Validform_label">
					头像:
				</label>
			</td>
			<td class="value">
				<c:if test="${user.id!=null }">
				<table>
					<c:forEach items="${files}" var="file">
						<c:if test="${file['field'] == 'AVATAR' }">
							<tr style="height:34px;">
								<td>
								<c:choose>
									<c:when test="${fn:length(file['title']) > 10}">
										${fn:substring(file['title'], 0, 10)}...
									</c:when>
									<c:otherwise>
										${file['title']}
									</c:otherwise>
								</c:choose>
								</td>
								<td><a href="${webRoot}/commonController.do?viewFile&fileid=${file['fileKey']}&subclassname=org.jeecgframework.web.cgform.entity.upload.CgUploadEntity" title="下载">下载</a></td>
								<td><a href="javascript:void(0);" onclick="openwindow('预览','${webRoot}/commonController.do?openViewFile&fileid=${file['fileKey']}&subclassname=org.jeecgframework.web.cgform.entity.upload.CgUploadEntity','fList',700,500)">预览</a></td>
								<td><a href="javascript:void(0)" class="jeecgDetail" onclick="del('${webRoot}/cgUploadController.do?delFile&id=${file['fileKey']}',this)">删除</a></td>
							</tr>
						</c:if>
					</c:forEach>
				</table>
				</c:if>
				<div class="form jeecgDetail">
					<script type="text/javascript">
						var serverMsg="";
						$(function(){
							$('#avatar').uploadify({
								buttonText:'添加文件',
								auto:false,
								progressData:'speed',
								multi:true,
								height:25,
								overrideEvents:['onDialogClose'],
								fileTypeDesc:'文件格式:',
								queueID:'filediv_file',
								fileSizeLimit:'15MB',
								swf:'plug-in/uploadify/uploadify.swf',
								uploader:'cgUploadController.do?saveFiles&jsessionid='+$("#sessionUID").val()+'',
								onUploadStart : function(file) {
									var cgFormId=$("input[name='id']").val();
									$('#avatar').uploadify("settings", "formData", {
										'cgFormId':cgFormId,
										'cgFormName':'t_s_user',
										'cgFormField':'AVATAR'
									});
								} ,
								onQueueComplete : function(queueData) {
									var win = frameElement.api.opener;
									win.reloadTable();
									win.tip(serverMsg);
									frameElement.api.close();
								},
								onUploadSuccess : function(file, data, response) {
									var d=$.parseJSON(data);
									if(d.success){
										var win = frameElement.api.opener;
										serverMsg = d.msg;
									}
								},
								onFallback: function() {
									tip("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试")
								},
								onSelectError: function(file, errorCode, errorMsg) {
									switch (errorCode) {
										case - 100 : tip("上传的文件数量已经超出系统限制的" + $('#file').uploadify('settings', 'queueSizeLimit') + "个文件！");
											break;
										case - 110 : tip("文件 [" + file.name + "] 大小超出系统限制的" + $('#file').uploadify('settings', 'fileSizeLimit') + "大小！");
											break;
										case - 120 : tip("文件 [" + file.name + "] 大小异常！");
											break;
										case - 130 : tip("文件 [" + file.name + "] 类型不正确！");
											break;
									}
								},
								onUploadProgress: function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {}
							});
						});
					</script>
					<span id="file_uploadspan"><input type="file" name="avatar" id="avatar" /></span>
				</div>
				<div class="form" id="filediv_file"></div>
				<span class="Validform_checktip"></span>
				<label class="Validform_label" style="display: none;">头像</label>
			</td>
		</tr>
	</table>--%>
	<div class="tab-wrapper">
		<div class="con-wrapper" id="con-wrapper1" style="display: block;">
			<div class="row form-wrapper">
				<div class="row show-grid">
					<div class="col-xs-2 text-center">
						<b><t:mutiLang langKey="common.real.name"/>: </b>
					</div>
					<div class="col-xs-4">
						<input id="realName" class="form-control" name="realName" value="${user.realName }" datatype="s2-10" placeholder="姓名范围在2~10位字符,必填">
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
					<div class="col-xs-2 text-center">
						<b><t:mutiLang langKey="common.username"/>: </b>
					</div>
					<div class="col-xs-4">
						<c:if test="${user.id!=null }"> ${user.userName } </c:if>
						<c:if test="${user.id==null }">
							<input id="userName" class="form-control" name="userName" validType="t_s_base_user,userName,id" value="${user.userName }" datatype="s2-10" placeholder="工号范围在2~10位字符,必填"/>
							<span class="Validform_checktip" style="float:left;height:0px;"></span>
						</c:if>
					</div>
				</div>
				<div class="row show-grid">
					<div class="col-xs-2 text-center">
						<b>职位: </b>
					</div>
					<div class="col-xs-4">
						<input id="position" name="position" type="text" class="form-control"
							   ignore="ignore" value="${user.position}" placeholder="请输入职位"/>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
					<div class="col-xs-2 text-center">
						<b>学历: </b>
					</div>
					<div class="col-xs-4">
						<input id="education" name="education" type="text" class="form-control"
							   ignore="ignore" value="${user.education}" placeholder="请输入学历"/>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
				</div>
				<div class="row show-grid">
					<div class="col-xs-2 text-center">
						<b>入职时间: </b>
					</div>
					<div class="col-xs-4">
						<input id="hiredate" name="hiredate" type="text" class="form-control Wdate" onClick="WdatePicker()" placeholder="请选择入职时间"
							   ignore="ignore" value='<fmt:formatDate value='${user.hiredate}' type="date" pattern="yyyy-MM-dd"/>'
							   style="background: url('${webRoot}/plug-in/ace/images/datetime.png') no-repeat scroll right center transparent;"/>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
					<div class="col-xs-2 text-center">
						<b>状态: </b>
					</div>
					<div class="col-xs-4">
						<t:dictSelect field="userState" type="list"
									  typeGroupCode="userstate" defaultVal="${user.userState}" hasLabel="false"  title="状态"></t:dictSelect>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
				</div>
				<div class="row show-grid">
					<div class="col-xs-2 text-center">
						<b>手机号码: </b>
					</div>
					<div class="col-xs-4">
						<input class="form-control" name="mobilePhone" value="${user.mobilePhone}" datatype="m" errormsg="手机号码不正确" ignore="ignore"
							placeholder="请输入手机号码">
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
					<div class="col-xs-2 text-center">
						<b>头像: </b>
					</div>
					<div class="col-xs-4">
						<c:if test="${user.id!=null }">
							<table>
								<c:forEach items="${files}" var="file">
									<c:if test="${file['field'] == 'AVATAR' }">
										<tr style="height:34px;">
											<td>
												<c:choose>
													<c:when test="${fn:length(file['title']) > 10}">
														${fn:substring(file['title'], 0, 10)}...
													</c:when>
													<c:otherwise>
														${file['title']}
													</c:otherwise>
												</c:choose>
											</td>
											<td><a href="${webRoot}/commonController.do?viewFile&fileid=${file['fileKey']}&subclassname=org.jeecgframework.web.cgform.entity.upload.CgUploadEntity" title="下载">下载</a></td>
											<td><a href="javascript:void(0);" onclick="openwindow('预览','${webRoot}/commonController.do?openViewFile&fileid=${file['fileKey']}&subclassname=org.jeecgframework.web.cgform.entity.upload.CgUploadEntity','fList',700,500)">预览</a></td>
											<td><a href="javascript:void(0)" class="jeecgDetail" onclick="del('${webRoot}/cgUploadController.do?delFile&id=${file['fileKey']}',this)">删除</a></td>
										</tr>
									</c:if>
								</c:forEach>
							</table>
						</c:if>
						<div class="form jeecgDetail">
							<script type="text/javascript">
								var serverMsg="";
								$(function(){
									$('#avatar').uploadify({
										buttonText:'添加文件',
										auto:false,
										progressData:'speed',
										multi:true,
										height:25,
										overrideEvents:['onDialogClose'],
										fileTypeDesc:'文件格式:',
										queueID:'filediv_file',
										fileSizeLimit:'15MB',
										swf:'plug-in/uploadify/uploadify.swf',
										uploader:'cgUploadController.do?saveFiles&jsessionid='+$("#sessionUID").val()+'',
										onUploadStart : function(file) {
											var cgFormId=$("input[name='id']").val();
											$('#avatar').uploadify("settings", "formData", {
												'cgFormId':cgFormId,
												'cgFormName':'t_s_user',
												'cgFormField':'AVATAR'
											});
										} ,
										onQueueComplete : function(queueData) {
											var win = frameElement.api.opener;
											win.reloadTable();
											win.tip(serverMsg);
											frameElement.api.close();
										},
										onUploadSuccess : function(file, data, response) {
											var d=$.parseJSON(data);
											if(d.success){
												var win = frameElement.api.opener;
												serverMsg = d.msg;
											}
										},
										onFallback: function() {
											tip("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试")
										},
										onSelectError: function(file, errorCode, errorMsg) {
											switch (errorCode) {
												case - 100 : tip("上传的文件数量已经超出系统限制的" + $('#file').uploadify('settings', 'queueSizeLimit') + "个文件！");
													break;
												case - 110 : tip("文件 [" + file.name + "] 大小超出系统限制的" + $('#file').uploadify('settings', 'fileSizeLimit') + "大小！");
													break;
												case - 120 : tip("文件 [" + file.name + "] 大小异常！");
													break;
												case - 130 : tip("文件 [" + file.name + "] 类型不正确！");
													break;
											}
										},
										onUploadProgress: function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {}
									});
								});
							</script>
							<span id="file_uploadspan"><input type="file" name="avatar" id="avatar" /></span>
						</div>
						<div class="form" id="filediv_file"></div>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
				</div>
				<div class="row show-grid">
					<div class="col-xs-2 text-center">
						<b>性别: </b>
					</div>
					<div class="col-xs-3">
						<t:dictSelect field="gender" type="list"
									  typeGroupCode="sex" defaultVal="${user.gender}" hasLabel="false"  title="性别"
						></t:dictSelect>
					</div>
					<div class="col-xs-2 text-center">
						<b>部门: </b>
					</div>
					<div class="col-xs-5">
						<input id="departname" name="departname" type="text" readonly="readonly" class="form-control" datatype="*" value="${departname}" placeholder="部门可多选" style="width:50%">
						<input id="orgIds" name="orgIds" type="hidden" value="${orgIds}">
						<a href="#" class="easyui-linkbutton" plain="true" icon="icon-search" id="departSearch" onclick="openDepartmentSelect()">选择</a>
						<a href="#" class="easyui-linkbutton" plain="true" icon="icon-redo" id="departRedo" onclick="callbackClean()">清空</a>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
				</div>
				<div class="row show-grid">
					<div class="col-xs-2 text-center">
						<b>邮箱: </b>
					</div>
					<div class="col-xs-3">
						<input id="email" name="email" type="text" class="form-control"
							   ignore="ignore" value="${user.email}" placeholder="请输入邮箱"/>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
					<div class="col-xs-2 text-center">
						<b>角色: </b>
					</div>
					<div class="col-xs-5">
						<input id="roleid" name="roleid" type="hidden" value="${id}"/>
						<input name="roleName" id="roleName" type="text" class="form-control" value="${roleName }" readonly="readonly" datatype="*" style="width: 50%"/>
						<t:choose hiddenName="roleid" hiddenid="id" textname="roleName" url="userController.do?roles" name="roleList" icon="icon-search" title="common.role.list" isclear="true" isInit="true"></t:choose>
						<span class="Validform_checktip" style="float:left;height:0px;"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</t:formvalid>
</body>
<script src = "js/tSUser.js"></script>
<script type="text/javascript">
	function jeecgFormFileCallBack(data){
		if (data.success == true) {
			uploadFile(data);
		} else {
			if (data.responseText == '' || data.responseText == undefined) {
				$.messager.alert('错误', data.msg);
				$.Hidemsg();
			} else {
				try {
					var emsg = data.responseText.substring(data.responseText.indexOf('错误描述'), data.responseText.indexOf('错误信息'));
					$.messager.alert('错误', emsg);
					$.Hidemsg();
				} catch(ex) {
					$.messager.alert('错误', data.responseText + '');
				}
			}
			return false;
		}
		if (!neibuClickFlag) {
			var win = frameElement.api.opener;
			win.reloadTable();
		}
	}
	function upload() {
		$('#avatar').uploadify('upload', '*');
	}

	var neibuClickFlag = false;
	function neibuClick() {
		neibuClickFlag = true;
		$('#btn_sub').trigger('click');
	}
	function cancel() {
		$('#avatar').uploadify('cancel', '*');
	}
	function uploadFile(data){
		if(!$("input[name='id']").val()){
			if(data.obj!=null && data.obj!='undefined'){
				$("input[name='id']").val(data.obj.id);
			}
		}
		if($(".uploadify-queue-item").length>0){
			upload();
		}else{
			if (neibuClickFlag){
				alert(data.msg);
				neibuClickFlag = false;
			}else {
				var win = frameElement.api.opener;
				win.reloadTable();
				win.tip(data.msg);
				frameElement.api.close();
			}
		}
	}
	function del(url,obj) {
		$.dialog.confirm("确认删除该条记录?", function () {
			$.ajax({
				async: false,
				cache: false,
				type: 'POST',
				url: url,// 请求的action路径
				error: function () {// 请求失败处理函数
				},
				success: function (data) {
					var d = $.parseJSON(data);
					if (d.success) {
						var msg = d.msg;
						tip(msg);
						$(obj).closest("tr").hide("slow");
					}
				}
			});
		}, function () {
		});
	}
</script>
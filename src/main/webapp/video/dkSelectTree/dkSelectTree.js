/*setting = { 
	idField,
	pidField,
	nameField,
	url,
	type,'post' or 'get' 默认post
	readOnly:true,//设置为false时可查询，默认为true
	ignoreCase:true,//搜索时忽略大小写，默认为true
	multiSelect,
	selectInData,强制选择下拉框中的数据,默认true
	idInput,//用来记录选中item的id的input(一般设置为hidden)的id
	listType:'tree'|'list',
	defaultText:"请选择",//默认显示的文字
	Async:true
	onSelect,
前提：（在不显示树形结构时，隐藏前面的空白区域）
	修改ztree 在init函数中增加
	if(setting.view.showLine == false){
				consts.className.SWITCH = "switch_z";
	}
	在zTreeStyle.css 文件中增加 .ztree li span.button.switch_z {width:1px; height:18px}
 }
 */
(function($) {
	var dktreeNum=1;
	$.fn.dkSelectTree=function(setting){
		var self = this,setting=setting||{};
		if(typeof setting=="string"){
			var manager=self.data("dkSelectTreeManager");
			var args=[];
			for(var i=1;i<arguments.length;i++){
				args.push(arguments[i]);
			}
			return manager[setting].apply(manager,args);
		}
		self.splitChar = ';';
		self.setting = setting;
		if(setting&&setting.readOnly===undefined){
			self.setting.readOnly=true;
		}
		if(setting&&setting.selectInData===undefined){
			self.setting.selectInData=true;
		}
		self.setting.chkboxType=setting.chkboxType
		if(setting&&setting.ignoreCase===undefined){
			self.setting.ignoreCase=true;
		}
		if(setting&&setting.beforeClick===undefined){
			//禁止选择treeNode.clickEnable==false或"false"的节点
			self.setting.beforeClick=function(treeId, treeNode, clickFlag){
				return treeNode.clickEnable!=false&&treeNode.clickEnable!="false";
			}
		}
		if(setting.splitChar){
			self.splitChar = setting.splitChar;
		}
		self.inputElement = $(this); //需要生成下拉列表的input的id
		if(self.setting.idInput){
			self.idInput = $("#"+self.setting.idInput);
		}else{
			var eleAttrId=$(this).attr("id");
			self.idInput = $("<input type='text' style='display:none' id='"+eleAttrId+"' name='"+($(this).attr("name")||"")+"' value='"+$(this).val()+"'/>");
			self.idInput.attr("pluginId",dktreeNum);
			$(this).attr("ignorePost",true);
			$(this).attr("id",eleAttrId+"_of_replace_id"+dktreeNum);
			$("label[for='"+eleAttrId+"']").attr("for",eleAttrId+"_of_replace_id"+dktreeNum);
			$(this).removeAttr("name").attr("placeholder",setting.defaultText===undefined?"请选择":setting.defaultText);
			$(this).after(self.idInput);
			dktreeNum++;
		}
		self.elementId = null;
		self.treeId = null;
		self.ztree = null;
		self.treeContId = null;
		if(self.setting.listType != 'list'){
			self.setting.listType = 'tree';
		}
		/**
		 * 创建div，并绑定事件
		 */
		var _createTree = function(element, treeContId, treeId, width, height){			
			var pElement = element;//弹出下拉列表的input
			var elementId = pElement.attr("id");//input.id
			 
			var pElementWidth = pElement.outerWidth();
			
			var treeWidth = pElementWidth;
			var treeHeight = 200;
			 
			if(width && width>pElementWidth){
				treeWidth = width;
			}
			if(height && height>1){
				treeHeight = height;
			}
			
			var position = pElement.css("position");
		    var loadingDivId = treeContId+"_loading";
			var treeDivHtml = "<div id='{treeContId}' style='overflow:auto;position:absolute;display:none;z-index:100;width: {width}px; height: {height}px;' >";
			treeDivHtml = treeDivHtml + "<ul id='"+loadingDivId+"' class='l-loading'></ul><ul id='{id}' style='height:"+(treeHeight-2)+"px;padding:1px;margin:0px;' class='ztree'></ul>";
			//alert(treeDivHtml);
			treeDivHtml = treeDivHtml.replace("{treeContId}",treeContId);
			treeDivHtml = treeDivHtml.replace("{id}",treeId);
			treeDivHtml = treeDivHtml.replace("{width}",treeWidth);
			treeDivHtml = treeDivHtml.replace("{height}",treeHeight); 
			treeDivHtml = treeDivHtml+"</div>";
			var treeDiv = $(treeDivHtml).addClass("dkSelectTreeCont onclick-hide-display").appendTo(pElement.parent()); 
			_resize();
			
			var tree_ul = $('#'+treeId);
			treeDiv.bind("mouseover",treeContentMouseOver);
			treeDiv.bind("mouseenter",treeContentMouseEnter);
			treeDiv.bind("mouseleave",treeContentMouseOut);
			//treeDiv.bind("blur",treeContentBlur);//IE下的列表出现滚动时异常，去掉该监听事件
		};
		
		var _resize = function(){
			treeDiv = $("#"+self.treeContId);
			pElement = self.inputElement;
			var outerWidth = pElement.outerWidth(); //input的内宽
			var innerWidth = pElement.innerWidth(); //input的外宽
//			var leftMargin =(outerWidth - innerWidth) / 2; //input的左边距
			
			var outerHeight = pElement.outerHeight(); //input的内宽
			var innerHeight = pElement.innerHeight(); //input的外宽
			var topMargin = (outerHeight - innerHeight) / 2; //input的左边距
			
			var elementTop = pElement.position().top;
			var elementLeft = pElement.position().left;
			elementTop += pElement.outerHeight()+topMargin;
			
			var topDiff=setting.topDiff||0;
			var leftDiff=setting.leftDiff||pElement.data("leftdiff")||0;
			leftDiff=leftDiff.toString().replace("px","").replace("PX","");
			treeDiv.css("top" , elementTop+topDiff);
			treeDiv.css("left", elementLeft +Number(leftDiff));
		};
		/**
		 * 创建tree
		 */
		var _initList = function(){			
			if(self.ztree != null)return;
			 
			self.elementId = self.inputElement.attr("id");
			self.treeContId = self.elementId+"_ztree_cont_wh";
			self.treeId = self.elementId+"_ztree_wh";
			
			var jqtreeId = "#"+self.treeId;
			self.idField = self.setting.idField || 'id';
			self.pidField = self.setting.pidField || 'pId';
			self.nameField =  self.setting.nameField || 'name';
			self.url = self.setting.url;
			var multiSelect = self.setting.multiSelect || false;
			
			_createTree(self.inputElement, self.treeContId, self.treeId, self.setting.width, self.setting.height);
			
			
			var tree_setting = {
				async: {
					enable: true,
					url:self.url,type:self.setting.type||"post",
					autoParam: self.setting.asyncAutoParam
				},
				data:{
					key:{
						name:self.nameField
					},
					simpleData:{
						enable:true,
						idKey:self.idField,
						pIdKey:self.pidField
					}
				},
				view:{
					showIcon:false,
					showLine:false
				},
				check:{
					enable:true,
					chkboxType: self.setting.chkboxType||{ "Y": "ps", "N": "ps" }
				},
				callback:{ 
					onAsyncSuccess: onTreeAsyncSuccess,
					beforeAsync: beforeTreeNodeAsync,
					beforeClick: self.setting.beforeClick
				}
			};
			if(self.setting.type=="get"&&self.setting.cache!==false){
				tree_setting.async.cache=true;
			}
			if(self.setting.listType == 'tree'){
				tree_setting.view.showIcon = true;
				tree_setting.view.showLine = true;
			}
			if(self.setting.multiSelect){
				tree_setting.check.enable = true;
				tree_setting.callback.onCheck = treeNodeOnCheck;
			}else{
				tree_setting.check.enable = false;
				tree_setting.callback.onClick = treeNodeOnClick;
			}

			self.setTreeData=function(treeNodes){
				self.ztree=$.fn.zTree.init($(jqtreeId), $.extend({},tree_setting,{async:{}}),treeNodes);
				var nodes=self.ztree.getNodes()||[];
				if (nodes.length == 1) {  
					self.ztree.expandNode(nodes[0], true,null,false);  
			    }
			}
			if(typeof self.url==="string"){
				self.cacheData=null;
				self.ztree = $.fn.zTree.init($(jqtreeId), tree_setting); 
			}else{
				self.cacheData=self.url;
				self.setTreeData(self.url);
				setDefaultText();
				self.inputElement.attr("disabled",false);
			}
		};
		
		self.setting.AsyncCount=0;
		var beforeTreeNodeAsync = function(treeId, treeNode) {
			self.setting.AsyncCount = self.setting.AsyncCount + 1;
			if(self.setting.Async == false && self.setting.AsyncCount>1)
			{
				return false;
			}
			self.inputElement.attr("disabled",true);
			self.cacheData=null;
		};
		 
		var onTreeAsyncSuccess = function(event, treeId, treeNode, msg) {
			if(!self.cacheData)self.cacheData=[];
			var loadingDivId = self.treeContId+"_loading";
			$("#"+loadingDivId).css("display","none");
			
			if(self.setting.listType != 'tree'){ 
				$('.span.button.switch',$("#"+self.treeContId)).css('width', '1');
			}else if(self.cacheData.length==0){
				var nodes=self.ztree.getNodes()||[];
				if (nodes.length == 1) {  
					self.ztree.expandNode(nodes[0], true,null,false);  
			    }
			}
			self.cacheData=self.cacheData.concat(eval(msg));
			setDefaultText();
			self.inputElement.attr("disabled",false);
		};
		/**选中节点*/
		var treeNodeOnCheck = function(event, treeId, treeNode){
			 var ids = "";
			 var names = "";			 
			 var nodes = self.ztree.getCheckedNodes(true);			 
			 for(var i=0;i<nodes.length;++i){
				 var node = nodes[i];
				 var id = node[self.idField];
				 var name = node[self.nameField];
				 ids += id+self.splitChar;
				 names += name+self.splitChar;
			 }
			 if(names.length>0) names = names.substring(0, names.length-1);
			 if(ids.length>0) ids = ids.substring(0, ids.length-1);
			 setShowView(ids,names,nodes);
		};
		
		/**根据隐藏域的值设置显示域的值*/
		var setDefaultText = function(){
			var nodes =[];
			if(self.ztree){
				nodes=self.ztree.transformToArray(self.ztree.getNodes());
			}
			if(!nodes||nodes.length==0){
				//self.idInput.val(idValue);
				return ;
			}
			var names = "";	
			var ids = self.splitChar+self.idInput.val()+self.splitChar;
			var newIds="";
			for(var i=0;i<nodes.length;++i){
				 var node = nodes[i];
				 var id = node[self.idField];
				 var name = node[self.nameField];
				 var idtag = self.splitChar+id+self.splitChar;
				 if(ids.indexOf(idtag)>=0){//隐藏域中的id包含node中的id
					 names += name+self.splitChar;
					 newIds += self.splitChar+id;
					 if(self.ztree.setting.check.enable){
						 self.ztree.checkNode(node,true,false);
						 self.ztree.selectNode(node,false);
						 if(node.getParentNode()){
							 self.ztree.expandNode(node.getParentNode(),true,false,true);
						 }						 
					 }else{
						 self.ztree.selectNode(node,false);
						 if(node.getParentNode()){
							 self.ztree.expandNode(node.getParentNode(),true,false,true);
						 }
					 }
				 }				
			}
			if(names.length>0) names = names.substring(0, names.length-1);
			//经过前面的步骤后，下拉框的值域可能被清空，重新设置值  add byt lidong
			if(self.setting.selectInData||newIds){
				setShowView(newIds,names,nodes);
			}
			setListVisible(false);
		};
		/**给控件设置新的值（id）*/
		var setValue = function(idValue){
			var flag=0;
			var nodes = null;
			if(self.cacheData&&self.cacheData.length>0){
				nodes=self.cacheData;
			}else{
				nodes=self.ztree.transformToArray(self.ztree.getNodes());
			}
			if(!nodes||nodes.length==0){
				self.idInput.val(idValue);
				return;
			}else if(!idValue&&idValue!==0){
				setShowView("","");
				return; 
			}
			
			var names = "";
			var ids = self.splitChar+idValue+self.splitChar;
			var newIds="";
			for(var i=0;i<nodes.length;++i){
				 var node = nodes[i];
				 var id = node[self.idField];
				 var name = node[self.nameField];
				 var idtag = self.splitChar+id+self.splitChar;
				 if(ids.indexOf(idtag)>=0){
					 names += name+self.splitChar;
					 newIds += self.splitChar+id;
					 flag=1;
				 }
			}
			if(names.length>0) names = names.substring(0, names.length-1);
			if(flag==1)
				setShowView(newIds,names);
				else
					setShowView(idValue,idValue);
		};
		
		var setShowView = function(ids,names,nodes){
			var oldValue=self.idInput.val();
			if(ids==names){
				self.inputElement.val(names);
				self.idInput.val(names);
			}else{
				self.inputElement.val(names); //设置显示的名称
				self["__searchKeyWords"]=names;
				ids=(ids||ids===0)?(ids=ids+""):"";
				if(ids.indexOf(self.splitChar)===0){
					ids=ids.substring(1);
				}
				self.idInput.val(ids);//给隐藏域设置值
			}
			if(oldValue!=ids){
				apply(self.setting.onSelect,[ids,names,nodes]);
			}
		}
		/**选择节点*/
		//var treeNodeClickEvent = false;
		var treeNodeOnClick = function(event, treeId, treeNode, clickFlag){
			var id = treeNode[self.idField];
			var name = treeNode[self.nameField];
			setShowView(id,name);
			setListVisible(false);
			
		};
		
		var apply = function(fun, param){			
			if ((typeof fun) == "function") {
				return fun.apply(this,param?param:[]);
			}
		};
		
		var setListVisible = function(visible){
			//console.log('list visible:'+visible);
			if(visible){
				$(".onclick-hide-open.open").removeClass("open");
            	$(".onclick-hide-display:visible").hide();
				self.treeIsVisible=true;
				//显示并滚动到当前选择元素位置
				$("#"+self.treeContId).css("display","block")
				$(document.body).bind("click",documentOnClick);
				if($(".curSelectedNode").offset()){
					var $ztree=$("#"+self.treeContId+">.ztree");
					$ztree.scrollTop($ztree.scrollTop()+$(".curSelectedNode").offset().top-$ztree.height());
				}
				_search(true);
				//启动自动搜索
				if(self.setting.readOnly===false&&self.autoSearchThread==null){
					var searchKey=$.trim(self.inputElement.val())||"";
					self.autoSearchThread=setInterval(function(){
						apply(_search);
					},200);
				}
			}else{
				if(self.autoSearchThread){
					clearInterval(self.autoSearchThread);
					self.autoSearchThread=null;
				}
				//强制选择下了框中的数据
				var name=$.trim(self.inputElement.val());
				if(self.setting.selectInData&&name==""){
					setShowView("","");
				}else if(self.setting.selectInData&&self.setting.readOnly===false){
					var ids=self.idInput.val();
					apply(self.setValue,[ids]);
				}
				$("#"+self.treeContId).css("display","none");
				self.treeIsVisible=false;
				self.inputElement.change();//选择下拉框的值后无法马上验证，触发change事件进行验证@lidong
				$(document.body).unbind("click",documentOnClick);
			}
		};
				
		var _init = function(){
			if(self.inputElement.attr("dkSelectTree") == "true"){
				return;
			}			
			self.inputElement.attr("dkSelectTree","true");
			if(self.setting.readOnly){
				self.inputElement.bind("keydown",inputSetReadonly);
			}
			self.inputElement.bind("paste",function(){return false;});
			self.inputElement.bind("cut",function(){return false;});
			self.inputElement.bind("focus",{},inputOnFocus);
			self.inputElement.bind("click",{},inputClick);
			self.inputElement.bind("blur",{},inputOnBlur);
			if(!self.setting.lazyLoad){
				_initList();
			}
		};
		
		var inputSetReadonly = function(e){			
			if(event.keyCode >20)return false;
		};
		
		var inputOnFocus = function(){
			if(self.ztree == null){			 
				_initList();
			}
			_resize();
			setListVisible(true);
		};
		
		self.mouseIntreeContent = false;
		var treeContentMouseOver = function (){
			self.mouseIntreeContent = true;
		};
		
		var treeContentMouseEnter = function (){
			self.mouseIntreeContent = true;
			//console.log('treeContentMouseEnter');
		};
		
		var treeContentMouseOut = function (){
			self.mouseIntreeContent = false;
			//console.log('treeContentMouseOut');
		};
		
		/**
		 * 页面任意位置的点击事件
		 */
		var documentOnClick = function(e){
			if(document.activeElement){
			//console.log('documentOnClick....');
			var activeId = document.activeElement.id;
			if(!self.mouseIntreeContent && activeId != self.elementId){
				setListVisible(false);
			}}
		};
		
		/** 列表div失去焦点时触发，隐藏列表 */
		var treeContentBlur = function(event) {
			//console.log('treeContentBlur');
			setListVisible(false);
		};
		
		/** input失去焦点时触发 */
		var inputOnBlur = function(event){				
			//取消自动搜索的计时器
			if(self.autoSearchThread){
				clearInterval(self.autoSearchThread);
				self.autoSearchThread=null;
			}
			if(self.mouseIntreeContent){ //input失去焦点时，如果鼠标还在列表div内，则仍然显示列表
				return;
			}
			//input失去焦点时，如果鼠标已经不在列表div内了，则隐藏列表
			setListVisible(false);
		};
		
		//下拉框列表内容搜索,flag=true
		var _search=function(flag){
			var searchKey=$.trim(self.inputElement.val())||"";
			var oldKey=self["__searchKeyWords"]||"";
			if(flag&&searchKey===""){
				oldKey=undefined;
			}
			if(searchKey!=oldKey&&self.cacheData){
				self["__searchKeyWords"]=searchKey;
				var data=_filterNodes(searchKey); // 查找节点集合
				if(data&&data.length>0){
					apply(self.setTreeData,[data]);
				}
			}
		}
		//从树形结构数据中查询数据
		var _filterNodes=function(searchKey){
			var data=[],row;
			var nameField=self.setting.nameField;
			if(self.setting.ignoreCase){
				searchKey=searchKey.toLowerCase();
			}
			for(var i=0,len=self.cacheData.length;i<len;i++){
				row=self.cacheData[i];
				var text=String(row[nameField]||""),find=false;
				if(self.setting.ignoreCase){
					text=text.toLowerCase();
				}
				if(searchKey==""||text.indexOf(searchKey)!=-1){
					find=true;
				}else if(window.PinYinUtils){//增加拼音搜索支持
					var pinYin=row._pinYin;
					if(pinYin===undefined){
						pinYin=PinYinUtils.getPinYin(text);
						row._pinYin=pinYin;
					}
					if(PinYinUtils.indexOf(pinYin,searchKey)!=-1){
						find=true;
					}
				}
				if(find){
					var node={};
					for(var key in row){
						node[key]=row[key];
					}
					data.push(node);
				}
			}
			return data;
		}
		
		var inputClick = function(e){
			//return false; //阻止冒泡执行document.click事件
			//不能return false，否则如果有两个dkSelectTree的时候，会出现两个下拉列表同时显示的问题（在第一个下拉列表获取焦点的情况下，在点击第二个下拉列表输入框）
			//在documentOnClick中判断是否点击的本身的input
		};
		
		self.setDefaultText = setDefaultText;
		self.setValue = setValue;
		
		var dkSelectTree ={
			self:self,
			getText : function(){
				return self.inputElement.val();
			},
			getTextElement:function(){
				return self.inputElement;
			},
			setData:function(data){
				return self.setTreeData(data);
			},
			getidInput : function(){
				return self.idInput.val();
				
			},
			setSplitChar : function(char){
				self.splitChar  = char;
			},
			setDefaultText : function(){
				self.setDefaultText();
			},
			setValue : function(value){
				self.setValue(value);
			},
			setUrl : function(url){//object数据或url
				self.setValue("");
				self.ztree.setting.async.url=url;
				if(!self.ztree.setting.async.enable){
					self.ztree.setting.async.enable=true;
					self.ztree.reAsyncChildNodes(null, "refresh");
					self.ztree.setting.async.enable=false;
				}else{
					self.ztree.reAsyncChildNodes(null, "refresh");
				}
				
			},
			setDisabled : function(disabled){//object数据或url
				self.inputElement.attr("disabled",disabled);
			},
			getSelectNodes : function(){
				var ids = self.splitChar + self.idInput.val() + self.splitChar;
				var nodes = self.ztree.transformToArray(self.ztree.getNodes());
				var selectNodes=[];
				for(var i=0;i<nodes.length;++i){
					 var node = nodes[i];
					 var id = node[self.idField];
					 var name = node[self.nameField];
					 var idtag = self.splitChar+id+self.splitChar;
					 if(ids.indexOf(idtag)>=0){
						 selectNodes.push(node);
					 }
				}
				return selectNodes;
			},
			getSelectNode:function(){
				return this.getSelectNodes()[0];
			}
		};
		
		_init();
		
		self.idInput.data("dkSelectTreeManager",dkSelectTree);
		return dkSelectTree;
	};	
})(jQuery);
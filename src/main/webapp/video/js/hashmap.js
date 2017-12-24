/**
 * 简单HashMap
 *
 */
function HashMap(){
	this.hashMapData={};
	var size=0;
	//清除所有的属性
	this.Clear=function(){
		this.hashMapData={};
		size=0;
	}

	/**
	 * 判断key是否存在
	 * @param key
	 * @return Boolean
	 */
	this.Contains=function(){
		return Boolean(arguments[0] in this.hashMapData);
	}
	/**
	 * 判断值是否存在
	 * @param value
	 * @return Boolean
	 */
	this.ContainsValue=function(){
		var str=this.hashMapData.toSource();
		return str.indexOf(arguments[0])==-1 ? false: true;
	}
	/**
	 * 返回key对应的v
	 */
	this.Get=function(){
		return this.hashMapData[arguments[0]];
	}
	/**
	 * 判断是否为空
	 * @return Boolean
	 */
	this.IsEmpty=function(){
		return size==0? true:false;
	}
	/**
	 * 取出所有的key
	 * @return Array()
	 */
	this.KeySet=function(){
		var arr=new Array();
		for(var i in this.hashMapData){
			arr.push(i);
		}
		return arr;
	}
	/**
	 * 将key，value放入对象
	 * @param key
	 * @param value
	 */
	this.Set=function(){
		if(!this.Contains(arguments[0])){
			this.hashMapData[arguments[0]]=arguments[1];
			size++;
		}else{
			this.hashMapData[arguments[0]]=arguments[1];
		}

	}
	/**
	 * 将另外一个HashMap 复制到此Map
	 * @param map
	 */
	this.SetAll=function(){
		this.hashMapData=arguments[0].getData();
	}
	/**
	 * 删除key对应的value
	 * @param key
	 * @return value与 key 关联的旧值
	 */
	this.Remove=function(){
		var o=this.Get(arguments[0]);
		if(o){
			delete this.hashMapData[arguments[0]];
			size--;
			return o;
		}else{
			return null;
		}
	}
	/**
	 * 返回此HashMap的大小
	 * @reaturn Int
	 */
	this.Size=function(){
		return size;
	}
	/**
	 * 返回此map所有的value集合
	 * @return Connections
	 */
	this.Values=function(){
		var arr=new Array();
		for (var i in this.hashMapData) {
			arr.push(this.hashMapData[i])
		}
		return arr;
	}
	this.GetData=function(){
		return this.hashMapData;
	}

	/**
	 * 遍历Map,执行处理函数
	 *
	 * @param {Function} 回调函数 function(key,value){..}
	 */
	this.each = function(fn){
		if(typeof fn != 'function'){
			return;
		}
		for(var i in this.hashMapData){
			fn(i, this.hashMapData[i]);
		}
	};
}
//var hm = new HashMap();
//hm.Set("123", "老虎");
//var laohu = hm.Get("123");
//laohu == "老虎";
/**对IE8不支持的JS进行处理*/
//ie8/ie9不支持Array.indexOf,自己创建indexOf函数
if (!Array.prototype.indexOf)  //针对ie8及以下版本，自己创建indexOf函数。
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


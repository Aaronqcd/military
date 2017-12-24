<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<!-- saved from url=(0014)about:internet --> 
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
    <head> 
        <title></title>         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        <style type="text/css" media="screen"> 
			html, body	{ height:100%; }
			body { margin:0; padding:0; overflow:auto; }   
			#flashContent { display:none; }
        </style> 
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/js/swfobject/swfobject.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/js/flexpaper_flash.js"></script>
		
		<script type="text/javascript"> 
            /* For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. */ 
            var swfVersionStr = "10.0.0";
            /* To use express install, set to playerProductInstall.swf, otherwise the empty string. */
         /*    var xiSwfUrlStr = "playerProductInstall.swf"; */
            var xiSwfUrlStr = "";  //å¼å¯ä»¥ä»»æ
            
            var flashvars = { 
            
                  // SwfFile : escape("${fileName}"),   //swfæä»¶è·¯å¾   
               /*    SwfFile : escape("lucene4.6.swf"),   //swfæä»¶è·¯å¾  */
               SwfFile : escape(getParams('name')), 
				  Scale : 0.6, 
				  ZoomTransition : "easeOut",
				  ZoomTime : 0.5,
  				  ZoomInterval : 0.1,
  				  FitPageOnLoad : false,
  				  FitWidthOnLoad : true,
  				  PrintEnabled : true,
  				  FullScreenAsMaxWindow : false,
  				  ProgressiveLoading : true,
  				  
  				  PrintToolsVisible : true,
  				  ViewModeToolsVisible : true,
  				  ZoomToolsVisible : true,
  				  FullScreenVisible : true,
  				  NavToolsVisible : true,
  				  CursorToolsVisible : true,
  				  SearchToolsVisible : true,
  				  
  				  localeChain: "en_US"
				  };
				  
			 var params = {
				
			    }
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "FlexPaperViewer";
            attributes.name = "FlexPaperViewer";
            swfobject.embedSWF(
                "FlexPaperViewer.swf", "flashContent", 
                "800", "600",
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
			swfobject.createCSS("#flashContent", "display:block;text-align:center;");
       		
       		
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

        </script>  
        
    </head> 
    <body> 
    	<div style="position:absolute;left:200px;top:10px;">
	        <div id="flashContent"> 
	        
	         
	       </div> 
        </div>
   </body> 
</html> 
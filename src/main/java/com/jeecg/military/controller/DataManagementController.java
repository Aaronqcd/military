package com.jeecg.military.controller;

import com.jeecg.military.entity.DataManagementEntity;
import com.jeecg.military.service.DataManagementServiceI;
import com.jeecg.military.service.impl.CCRDFile;
import com.jeecg.military.service.impl.ConvertSwf;
import com.jeecg.military.util.FirstLetterUtil;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.util.PropertiesUtil;
import org.jeecgframework.core.util.UUIDGenerator;
import org.jeecgframework.web.cgform.service.config.CgFormFieldServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dataManagementController")
public class DataManagementController extends BaseController {
	@Autowired
	private CgFormFieldServiceI cgFormFieldService;
	
	
	@Autowired
	private DataManagementServiceI dataManagementServiceI;
	/*@Autowired
	private CCRDFile file;*/
	
	@RequestMapping(params = "date")
	public String date(){
		return "page/01";
	}
	
	@RequestMapping(params = "filelist")
	@ResponseBody
	public List<DataManagementEntity> fileList(Integer p_id){
		List<DataManagementEntity> list = dataManagementServiceI.getByPid(p_id);	
		return list;
	}
	
	/**
	 * 保存
	 * @param Entity
	 * @param filename
	 */
	@RequestMapping(params="save")
	@ResponseBody
	public void save(DataManagementEntity Entity,String filename){
		//CCRDFile.createDir(filename);
		dataManagementServiceI.save(Entity);
		
	}	
	/**
	 * 删除
	 * @param id
	 */
	@RequestMapping(params="delete")
	@ResponseBody
	public void delete(Integer id,HttpServletRequest req){
		//CCRDFile.DeleteFolder(deletePath);
		
		//String tomfile="E:/tools/apache-tomcat-7.0.67-windows-x64/apache-tomcat-7.0.67/attachment/qualitymonitoring/";
		
		File f = new File(req.getSession().getServletContext().getRealPath("/"));
		PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		String uploadRelatePath = util.readProperty("uploadRelatePath");
        String filepath = f.getParentFile().getParent() + uploadRelatePath;
		DataManagementEntity dataManagementEntity = dataManagementServiceI.get(id);
		String path = dataManagementEntity.getFile_path();
		String filename = null;
		if(path.lastIndexOf(".")!=-1) {
			filename = path.substring(0, path.lastIndexOf("."));
		}
		//判断文件的类型；文件需要删除磁盘文件
		if(!"".equals(dataManagementEntity.getFile_path()) || dataManagementEntity.getFile_path() != null){
			String file_path =filepath+path;
			CCRDFile.deleteFile(file_path);
			CCRDFile.deleteFile(filepath+filename+".pdf");
			CCRDFile.deleteFile(filepath+filename+".swf");
		}
		dataManagementServiceI.delete(id);	
	}
	
	
	/**
	 * 根据P_id查询
	 * @param id
	 * @return
	 */
	@RequestMapping(params="getbyId")
	@ResponseBody
	public DataManagementEntity get(Integer id){
		return dataManagementServiceI.get(id);
		
	}
	/**
	 * 上传文件并保存数据库
	 * @param file
	 * @return
	 * @throws IOException
	 */
	
	//上传文件
	  @RequestMapping(params="upload")
	  @ResponseBody
	    public String  fileUpload(@RequestParam("file") CommonsMultipartFile file,DataManagementEntity entity,HttpServletRequest req,Integer p_id) throws IOException {
	        //用来检测程序运行时间
	        long  startTime=System.currentTimeMillis();
	        //获取文件的后缀
	        String fileName=file.getOriginalFilename();
	        //判断文件名是否重复
	        String sqlString = "select file_name from t_data_management where file_type is not null";
	        List<Map<String, Object>> nameListt = cgFormFieldService.findForJdbc(sqlString);
	        for (Map<String, Object> map : nameListt) {
				if(fileName.equals(map.get("file_name"))){
					return "1";
				}
			}
	        
	        String prefix=fileName.substring(fileName.lastIndexOf(".")+1);
	        String fileDirName = UUIDGenerator.generate() +"." + prefix;
	        //String newFileName = DateUtils.getDataString(DateUtils.yyyymmddhhmmss)+StringUtil.random(8)+prefix;
	       File f = new File(req.getSession().getServletContext().getRealPath("/"));
		   PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		   String templatePath = util.readProperty("templatePath");
	       String savepath=f.getParentFile().getParent() + templatePath;
	       File folder = new File(savepath);//持久化绝对路径地址
	       if(!folder.exists()){
				folder.mkdirs();
			}
	       //String filepath = f.getParentFile().getParent() + "/attachment/qualitymonitoring//upload/data/" + fileDirName;
	       String filepath = f.getParentFile().getParent() + templatePath + fileName;
	        //封装对象
	        entity.setFile_dir_name(fileDirName);
	        entity.setFile_name(fileName);
	        entity.setFile_type("." + prefix);
	        entity.setP_id(p_id);
	        
	        try {
	            //获取输出流
					OutputStream os=new FileOutputStream(filepath);
	            //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
	            file.getFileItem();
	            InputStream is=file.getInputStream();
	            int temp;
	            //一个一个字节的读取并写入
	            while((temp=is.read())!=(-1))
	            {
	                os.write(temp);
	            }
	           os.flush();
	           os.close();
	           is.close();
	         
	        } catch (FileNotFoundException e) {
	            e.printStackTrace();
	        }
	        long  endTime=System.currentTimeMillis();
	        System.out.println(String.valueOf(endTime-startTime)+"ms");
	        //持久数据库
	        dataManagementServiceI.save(entity);
	        return ""; 
	    }
	  /**
	   * 文件下载
	   * @param response
	   * @param request
	   * @param filepath
	   * @param filename
	   * @throws IOException
	   */
	  @RequestMapping(params="download")
	  @ResponseBody
	  public void downloadMedia(HttpServletResponse response, HttpServletRequest request,String filepath,String filename) throws IOException {
		  ServletOutputStream outfile = null;
		    InputStream fin = null;
		    File file = new File(request.getSession().getServletContext().getRealPath("/"));
		    PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		    String templatePath = util.readProperty("templatePath");
		    String path = file.getParentFile().getParent() + templatePath + filename;
		    try {
				fin = new FileInputStream(path);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    response.setCharacterEncoding("utf-8");
		    response.setContentType("application/zip");
		    response.addHeader("Content-Disposition", "attachment;filename="+new String(filename.getBytes("GBK"), "ISO-8859-1"));

		    outfile = response.getOutputStream();
		    byte[] buffer = new byte[1024];//缓冲区
		    int bytesToRead = -1;
		    // 通过循环将读入的Word文件的内容输出到浏览器中  
		    while((bytesToRead = fin.read(buffer)) != -1) {  
		    	outfile.write(buffer, 0, bytesToRead);  
		    }
		    if(fin != null) {fin.close();}  
		    if(outfile != null) {outfile.close();}  
		    if(file != null) {file.delete();} // 删除临时文件
	    
}
	  /**
	   * 文件在线预览
	   * @param filename
	   * @param request
	   * @return
	   * @throws Exception
	   */
	  @RequestMapping(params="view")
	  public ModelAndView view(String filename,HttpServletRequest request) throws Exception{
		    //将前台传过来的指定文件转换为swf文件
		  	File file = new File(request.getSession().getServletContext().getRealPath("/"));
		    PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		    String templatePath = util.readProperty("templatePath");
		    String dirPath = file.getParentFile().getParent() + templatePath;
		    String outPath = new ConvertSwf().beginConvert(dirPath, filename);
		    System.out.println("生成swf文件"+outPath);
		    File file1 = new File(outPath)  ;
		    String fileName = file1.getName();
		    System.out.println("1 ---> " + fileName);
		    File f = new File(request.getSession().getServletContext().getRealPath("/"));
		    System.out.println(f);
		    ModelAndView mav=new ModelAndView(fileName);
		    //将生成的swf文件拷贝到指定的目录
		    FileInputStream fis = new FileInputStream(dirPath+fileName);
	        BufferedInputStream bufis = new BufferedInputStream(fis);
	        String swfFile=file+"/webpage/page";
	        //System.out.println(swfFile);
	        FileOutputStream fos = new FileOutputStream(swfFile+"/"+fileName);
	        BufferedOutputStream bufos = new BufferedOutputStream(fos);
	        int len = 0;
	        while ((len = bufis.read()) != -1) {
	            bufos.write(len);
	        }
	        bufis.close();
	        bufos.close();
	        //CCRDFile.deleteFile(swfFile);
		  return new ModelAndView("redirect:webpage/page/FlexPaperViewer.jsp","name",fileName);
	  }
	  
	  /**
	   * 文件在线预览
	   * @param filename
	   * @param request
	   * @return
	   */
	  @RequestMapping(params="viewPDF")
	  public ModelAndView viewPDF(String filename,HttpServletRequest request) throws Exception{
	  	  File file = new File(request.getSession().getServletContext().getRealPath("/"));
		  PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		  String templatePath = util.readProperty("templatePath");
	      String dirPath = file.getParentFile().getParent() + templatePath;
	      String fileName = new ConvertSwf().beginConvertPDF(dirPath, filename);
	      try{  
	    	  fileName = URLEncoder.encode(fileName,"UTF-8");
	    	}catch(Exception ex){  
	    	    ex.printStackTrace();  
	    	} 
		  return new ModelAndView("redirect:upload/data/"+fileName);
	  }
	  
	  /**
	   * 判读文件是否存在
	   * @param filename
	   * @param request
	   * @return
	   */
	  @RequestMapping(params="isExist")
	  @ResponseBody
	  public String isExist(String filename,HttpServletRequest request) throws Exception{
	  	  File file = new File(request.getSession().getServletContext().getRealPath("/"));
		  PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		  String templatePath = util.readProperty("templatePath");
	      String dirPath = file.getParentFile().getParent() + templatePath;
	      String inputFile = dirPath + File.separator + filename;
	      File sourceFile = new File(inputFile);  
		  if (!sourceFile.exists()) {  
			  return "-1"; // 找不到源文件   
		  }
		  return "1";
	  }
	  
	  /**
	   * 视频在线播放
	 * @throws Exception 
	   */
	  @RequestMapping(params="video")
	  public ModelAndView video(String filename,HttpServletRequest request,HttpServletResponse response) throws Exception {
			File file = new File(request.getSession().getServletContext().getRealPath("/"));
		    PropertiesUtil util = new PropertiesUtil("sysConfig.properties");
		    String templatePath = util.readProperty("templatePath");
		  String dirPath = file.getParentFile().getParent() + templatePath;
		  FileInputStream fis = new FileInputStream(dirPath+filename);
		  
	        BufferedInputStream bufis = new BufferedInputStream(fis);
	        String prefix=filename.substring(filename.lastIndexOf(".")+1);
	         String fileName= FirstLetterUtil.getFirstLetter(filename);
	         ModelAndView mav=new ModelAndView(fileName);
	        String videoPath =file+"/webpage/videopage/" +fileName;
		       System.out.println("videoPath----------"+videoPath);
	        //System.out.println(swfFile);
	        FileOutputStream fos = new FileOutputStream(videoPath);
	        BufferedOutputStream bufos = new BufferedOutputStream(fos);
	        int len = 0;
	        while ((len = bufis.read()) != -1) {
	            bufos.write(len);
	        }
	        bufis.close();
	        bufos.close();
	       /* request.setAttribute("name", fileName);
	        request.getRequestDispatcher("webpage/videopage/video.jsp").forward(request, response);*/
		  return new ModelAndView("redirect:webpage/videopage/video.jsp","name",fileName);
		  
	  }
}























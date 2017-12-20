package com.jeecg.activiti.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jeecg.activiti.service.ActModelService;
import com.jeecg.activiti.service.TestPersonServiceI;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.Model;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jeecgframework.web.cgform.service.config.CgFormFieldServiceI;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

/**
 * @Title: Controller  
 * @Description: 入职员工
 * @author onlineGenerator
 * @date 2017-12-03 19:31:26
 * @version V1.0   
 *
 */
@Controller
@RequestMapping("/activitiController")
public class ActivitiController implements ModelDataJsonConstants {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(ActivitiController.class);

	@Autowired
	private TestPersonServiceI testPersonService;
	@Autowired
	private SystemService systemService;
	@Autowired
	private Validator validator;
	@Autowired
	private CgFormFieldServiceI cgFormFieldService;
	@Autowired
	private TaskService taskService;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private RepositoryService repositoryService;
	@Autowired
	private RuntimeService runtimeService;
	@Autowired
	private ActModelService actModelService;


	/**
	 * 列表页面
	 * @return
	 */
	@RequestMapping(value = "processDefinition/list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ModelAndView m = new ModelAndView();
		//获取流程设计模型
		List<Model> modelList = actModelService.modelList();
		m.addObject("modelList", modelList);
		m.setViewName("act/actModelList");
		return m;
	}

	/**
	 * 创建模型
	 * @return
	 */
	@RequestMapping(value = "create", method = RequestMethod.GET)
	public String create() {
		return "act/actModelCreate";
	}

	/**
	 * 创建模型
	 */
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public void create(String name, String key, String description, String category,
					   HttpServletRequest request, HttpServletResponse response) {
		try {
			Model modelData = actModelService.create(name, key, description, category);
			response.sendRedirect(request.getContextPath() + "/modeler.html?modelId=" + modelData.getId());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//获取流程bpmn-json
	@RequestMapping(value="getEditorJson")
	public void getEditorJson(HttpServletResponse response,String modelId) {

		ObjectNode modelNode = null;

		ObjectMapper objectMapper = new ObjectMapper();

		Model model = repositoryService.getModel(modelId);

		if (model != null) {
			try {
				if (StringUtils.isNotEmpty(model.getMetaInfo())) {
					modelNode = (ObjectNode) objectMapper.readTree(model.getMetaInfo());
				} else {
					modelNode = objectMapper.createObjectNode();
					modelNode.put(MODEL_NAME, model.getName());
				}
				modelNode.put(MODEL_ID, model.getId());
				ObjectNode editorJsonNode = (ObjectNode) objectMapper.readTree(new String(repositoryService.getModelEditorSource(model.getId()),"utf-8"));
				modelNode.put("model", editorJsonNode);
				response.setContentType("application/json;charset=utf-8");
				response.getWriter().print(modelNode);
			} catch (Exception e) {
				//LOGGER.error("Error creating model JSON", e);
				throw new ActivitiException("Error creating model JSON", e);
			}
		}
	}

	//配置文件
	@RequestMapping("getStencilset")
	public void getStencilset(HttpServletResponse response) {
		InputStream stencilsetStream = this.getClass().getClassLoader().getResourceAsStream("stencilset.json");
		try {
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().print(IOUtils.toString(stencilsetStream, "utf-8"));
		} catch (Exception e) {
			throw new ActivitiException("Error while loading stencil set", e);
		}
	}

	@RequestMapping(value="saveModel",produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public String saveModel(HttpServletRequest request2,String modelId) {
		try {
			Model model = repositoryService.getModel(modelId);
			ObjectMapper objectMapper = new ObjectMapper();
			ObjectNode modelJson = (ObjectNode) objectMapper.readTree(model.getMetaInfo());

			modelJson.put(MODEL_NAME, request2.getParameter("name"));
			modelJson.put(MODEL_DESCRIPTION, request2.getParameter("description"));

			model.setMetaInfo(modelJson.toString());
			model.setName(request2.getParameter("name"));

			repositoryService.saveModel(model);
			String json_xml = request2.getParameter("json_xml");
			repositoryService.addModelEditorSource(model.getId(), json_xml.getBytes("utf-8"));

			InputStream svgStream = new ByteArrayInputStream(request2.getParameter("svg_xml").getBytes("utf-8"));
			TranscoderInput input = new TranscoderInput(svgStream);

			PNGTranscoder transcoder = new PNGTranscoder();
			// Setup output
			ByteArrayOutputStream outStream = new ByteArrayOutputStream();
			TranscoderOutput output = new TranscoderOutput(outStream);

			// Do the transformation
			transcoder.transcode(input, output);
			final byte[] result = outStream.toByteArray();
			repositoryService.addModelEditorSourceExtra(model.getId(), result);
			outStream.close();

		} catch (Exception e) {
			System.out.println(e);
		}
		return "sucess";
	}

	/**
	 * 删除模型
	 */
	@RequestMapping(value = "delDeploy", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public String delDeploy(String modelId){
		actModelService.delete(modelId);
		return "删除模型成功，模型ID=" + modelId;
	}

	/**
	 * 模型部署
	 */
	@RequestMapping(value = "deploy", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public String deploy(String modelId) {
		String message = actModelService.deploy(modelId);
		return "部署模型成功，模型ID=" + modelId;
	}
}

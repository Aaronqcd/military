package org.jeecgframework.web.system.service;

import org.jeecgframework.core.common.service.CommonService;

import org.jeecgframework.web.system.pojo.base.TSUser;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author  张代浩
 *
 */
public interface UserService extends CommonService{

	public TSUser checkUserExits(TSUser user);
	public String getUserRole(TSUser user);
	public void pwdInit(TSUser user, String newPwd);
	/**
	 * 判断这个角色是不是还有用户使用
	 *@Author JueYue
	 *@date   2013-11-12
	 *@param id
	 *@return
	 */
	public int getUsersOfThisRole(String id);
	
	/**
	 * 物理删除用户
	 * @param user
	 */
	public String trueDel(TSUser user);

	/**
	 * 如果表单带有附件，则查询出来传递到页面
	 * @param id 表单主键，用户查找附件数据
	 */
	public List<Map<String,Object>> pushFiles(String id);
}

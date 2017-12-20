package com.jeecg.activiti.entity;

import org.hibernate.annotations.GenericGenerator;
import org.jeecgframework.poi.excel.annotation.Excel;

import javax.persistence.*;
import java.util.Date;

/**   
 * @Title: Entity
 * @Description: 入职员工
 * @author onlineGenerator
 * @date 2017-12-03 19:31:26
 * @version V1.0   
 *
 */
@Entity
@Table(name = "test_person", schema = "")
@SuppressWarnings("serial")
public class TestPersonEntity implements java.io.Serializable {
	/**主键*/
	private String id;
	/**创建人名称*/
	private String createName;
	/**创建人登录名称*/
	private String createBy;
	/**创建日期*/
	private Date createDate;
	/**更新人名称*/
	private String updateName;
	/**更新人登录名称*/
	private String updateBy;
	/**更新日期*/
	private Date updateDate;
	/**所属部门*/
	private String sysOrgCode;
	/**所属公司*/
	private String sysCompanyCode;
	/**流程状态*/
	private String bpmStatus;
	/**名字*/
	@Excel(name="名字",width=15)
	private String name;
	/**性别*/
	@Excel(name="性别",width=15,dicCode="A01")
	private String sex;
	/**生日*/
	@Excel(name="生日",width=15,format = "yyyy-MM-dd")
	private Date birthday;
	/**个人简介*/
	@Excel(name="个人简介",width=15)
	private String conets;
	/**测性别*/
	@Excel(name="测性别",width=15,dicCode="sex")
	private String cexs;
	/**工资*/
	@Excel(name="工资",width=15)
	private Double salary;
	/**简历附件*/
	@Excel(name="简历附件",width=15)
	private String fielJls;
	/**个人头像*/
	@Excel(name="个人头像",width=15)
	private String touPic;
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  主键
	 */
	@Id
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")

	@Column(name ="ID",nullable=false,length=36)
	public String getId(){
		return this.id;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  主键
	 */
	public void setId(String id){
		this.id = id;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  创建人名称
	 */

	@Column(name ="CREATE_NAME",nullable=true,length=50)
	public String getCreateName(){
		return this.createName;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  创建人名称
	 */
	public void setCreateName(String createName){
		this.createName = createName;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  创建人登录名称
	 */

	@Column(name ="CREATE_BY",nullable=true,length=50)
	public String getCreateBy(){
		return this.createBy;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  创建人登录名称
	 */
	public void setCreateBy(String createBy){
		this.createBy = createBy;
	}
	/**
	 *方法: 取得java.util.Date
	 *@return: java.util.Date  创建日期
	 */

	@Column(name ="CREATE_DATE",nullable=true,length=20)
	public Date getCreateDate(){
		return this.createDate;
	}

	/**
	 *方法: 设置java.util.Date
	 *@param: java.util.Date  创建日期
	 */
	public void setCreateDate(Date createDate){
		this.createDate = createDate;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  更新人名称
	 */

	@Column(name ="UPDATE_NAME",nullable=true,length=50)
	public String getUpdateName(){
		return this.updateName;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  更新人名称
	 */
	public void setUpdateName(String updateName){
		this.updateName = updateName;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  更新人登录名称
	 */

	@Column(name ="UPDATE_BY",nullable=true,length=50)
	public String getUpdateBy(){
		return this.updateBy;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  更新人登录名称
	 */
	public void setUpdateBy(String updateBy){
		this.updateBy = updateBy;
	}
	/**
	 *方法: 取得java.util.Date
	 *@return: java.util.Date  更新日期
	 */

	@Column(name ="UPDATE_DATE",nullable=true,length=20)
	public Date getUpdateDate(){
		return this.updateDate;
	}

	/**
	 *方法: 设置java.util.Date
	 *@param: java.util.Date  更新日期
	 */
	public void setUpdateDate(Date updateDate){
		this.updateDate = updateDate;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  所属部门
	 */

	@Column(name ="SYS_ORG_CODE",nullable=true,length=50)
	public String getSysOrgCode(){
		return this.sysOrgCode;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  所属部门
	 */
	public void setSysOrgCode(String sysOrgCode){
		this.sysOrgCode = sysOrgCode;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  所属公司
	 */

	@Column(name ="SYS_COMPANY_CODE",nullable=true,length=50)
	public String getSysCompanyCode(){
		return this.sysCompanyCode;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  所属公司
	 */
	public void setSysCompanyCode(String sysCompanyCode){
		this.sysCompanyCode = sysCompanyCode;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  流程状态
	 */

	@Column(name ="BPM_STATUS",nullable=true,length=32)
	public String getBpmStatus(){
		return this.bpmStatus;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  流程状态
	 */
	public void setBpmStatus(String bpmStatus){
		this.bpmStatus = bpmStatus;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  名字
	 */

	@Column(name ="NAME",nullable=false,length=32)
	public String getName(){
		return this.name;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  名字
	 */
	public void setName(String name){
		this.name = name;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  性别
	 */

	@Column(name ="SEX",nullable=true,length=32)
	public String getSex(){
		return this.sex;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  性别
	 */
	public void setSex(String sex){
		this.sex = sex;
	}
	/**
	 *方法: 取得java.util.Date
	 *@return: java.util.Date  生日
	 */

	@Column(name ="BIRTHDAY",nullable=true,length=32)
	public Date getBirthday(){
		return this.birthday;
	}

	/**
	 *方法: 设置java.util.Date
	 *@param: java.util.Date  生日
	 */
	public void setBirthday(Date birthday){
		this.birthday = birthday;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  个人简介
	 */

	@Column(name ="CONETS",nullable=true,length=32)
	public String getConets(){
		return this.conets;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  个人简介
	 */
	public void setConets(String conets){
		this.conets = conets;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  测性别
	 */

	@Column(name ="CEXS",nullable=true,length=32)
	public String getCexs(){
		return this.cexs;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  测性别
	 */
	public void setCexs(String cexs){
		this.cexs = cexs;
	}
	/**
	 *方法: 取得java.lang.Double
	 *@return: java.lang.Double  工资
	 */

	@Column(name ="SALARY",nullable=true,length=32)
	public Double getSalary(){
		return this.salary;
	}

	/**
	 *方法: 设置java.lang.Double
	 *@param: java.lang.Double  工资
	 */
	public void setSalary(Double salary){
		this.salary = salary;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  简历附件
	 */

	@Column(name ="FIEL_JLS",nullable=true,length=1000)
	public String getFielJls(){
		return this.fielJls;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  简历附件
	 */
	public void setFielJls(String fielJls){
		this.fielJls = fielJls;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  个人头像
	 */

	@Column(name ="TOU_PIC",nullable=true,length=1000)
	public String getTouPic(){
		return this.touPic;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  个人头像
	 */
	public void setTouPic(String touPic){
		this.touPic = touPic;
	}
}

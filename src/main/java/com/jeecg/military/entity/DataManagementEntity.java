package com.jeecg.military.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "t_data_management")
public class DataManagementEntity implements java.io.Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Integer  id;
	private Date  creat_time;
	private String  file_name;
	private String  file_dir_name;
	private String  file_type;
	private String  file_path;
	private Integer  p_id;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getCreat_time() {
		return creat_time;
	}
	public void setCreat_time(Date creat_time) {
		this.creat_time = creat_time;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public Integer getP_id() {
		return p_id;
	}
	public void setP_id(Integer p_id) {
		this.p_id = p_id;
	}
	public String getFile_dir_name() {
		return file_dir_name;
	}
	public void setFile_dir_name(String file_dir_name) {
		this.file_dir_name = file_dir_name;
	}
	
}

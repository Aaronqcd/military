package com.jeecg.military.service.impl;

import com.jeecg.military.entity.DataManagementEntity;
import com.jeecg.military.service.DataManagementDao;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DataManagementDaoImpl extends HibernateDaoSupport  implements DataManagementDao {
	private Class DataManagementEntity;
	@Autowired  
	public void setSessionFactory0(SessionFactory sessionFactory){  
	 super.setSessionFactory(sessionFactory);  
	}  
	
	@Override
	public void delete(Integer id) {
		super.getHibernateTemplate().delete(get(id));
	}

	

	@Override
	public List<DataManagementEntity> getByPid(Integer p_id) {
		String query;
		//判断层级 为空就是最上级
		if(p_id == null){
			query = "from DataManagementEntity o where o.p_id is null";
		}else{
			query = "from DataManagementEntity o where o.p_id = " + p_id;
		}
		Query queryObject = currentSession().createQuery(query);
		List<DataManagementEntity> entity = queryObject.list();
		return entity;
	}



	@Override
	public void save(DataManagementEntity entity) {
		currentSession().clear();
		super.getHibernateTemplate().saveOrUpdate(entity);
	}



	@Override
	public void update(DataManagementEntity entity) {
		super.getHibernateTemplate().update(entity);
	}

	

	@Override
	public DataManagementEntity get(Integer id) {
		String query;
		query = "from DataManagementEntity o where o.id="+id;
		
		Query createQuery = currentSession().createQuery(query);
		List<DataManagementEntity> list = createQuery.list();
		if(list.size() < 1){
			return null;
		}
		return list.get(0);
	}
	
}

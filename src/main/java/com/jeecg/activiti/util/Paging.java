package com.jeecg.activiti.util;

import java.util.List;

/**
 * Created by aaronqin on 17/12/4.
 */
public class Paging<T> {
    private int total;          //记录总数
    private int start;          //记录开始数
    private String sort;        //排序字段
    private String order;       //排序规则
    private int size;           //每页记录数
    private List<T> data;       //数据详细

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}

package com.weiming.xiguang.hDao;

import com.weiming.xiguang.util.HbaseUtil;

public class Car_HDao {
    static final String TableName = "Car";
    /**陈开泰
     * 2019/9/4
     * 通过rowkey获得经度*/
    public String getLongitudeByRowKey(String rowKey){
        String result;
        try{
            result = HbaseUtil.getColData(TableName, rowKey, "area", "longitude");
        }catch(Exception ex){
            result = "纬度获取失败";
            System.err.println("纬度获取失败");
        }
        return result;
    }

    /**陈开泰
     * 2019/9/4
     * 通过rowkey获得纬度*/
    public String getLatitudeByRowKey(String rowKey){
        String result;
        try{
            result= HbaseUtil.getColData(TableName, rowKey, "area", "latitude");
        }catch(Exception ex){
            result = "纬度获取失败";
            System.err.println("纬度获取失败");
        }
        return result;
    }

}

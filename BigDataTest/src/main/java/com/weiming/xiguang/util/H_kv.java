package com.weiming.xiguang.util;

/**陈开泰
 * 2019/9/4
 * HBase放置表中数据的列族、列名与数值信息的类*/
public class H_kv {
    private String colFamily;//列族
    private String colName;//列名
    private String colValue;//数据值

    public H_kv(String colFamily, String colValue) throws FamilyNameNullException{
        int tempNum;

        if(colFamily == null){
            throw new FamilyNameNullException("HBase's FamilyName can't be null");
        }

        tempNum = colFamily.indexOf(':');

        if(tempNum == -1){
            this.colFamily = colFamily;
        }else{
            this.colFamily = colFamily.substring(0, tempNum);
            this.colName = colFamily.substring(tempNum+1, colFamily.length());
        }
        this.colValue = colValue;
    }

    public boolean hasColName(){//返回是否拥有colName
        return colName != null;
    }

    public String getColName() {
        return this.colName;
    }

    public void setColName(String colName){
        this.colName = colName;
    }

    public String getColFamily() {
        return this.colFamily;
    }

    public void setColFamily(String colFamily){
        this.colFamily = colFamily;
    }

    public String getColValue() {
        return this.colValue;
    }

    public void setColValue(String colValue){
        this.colValue = colValue;
    }
}

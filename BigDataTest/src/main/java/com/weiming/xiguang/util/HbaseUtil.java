package com.weiming.xiguang.util;
import java.io.IOException;
import java.util.List;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;

/**author:黄小利、陈开泰
 * */
public class HbaseUtil {
    private static Connection connection; //HBase 连接
    protected final static String HADOOP_PROP = "hadoop.home.dir";//hadoop配置名
    protected final static String HADOOP_VALUE = "F:\\项目相关\\交通大数据\\hadoop-common-2.2.0-bin-master\\hadoop-common-2.2.0-bin-master";//hadoop配置信息
    protected final static String ZK_PATH_PROP = "hbase.zookeeper.quorum";//zk的地址配置铭
    protected final static String ZK_PATH_VALUE = "10.34.51.202";//zk的地址信息
    protected final static String ZK_PORT_PROP = "hbase.zookeeper.property.clientPort";//zk的端口配置名
    protected final static String ZK_PORT_VALUE = "2181";//zk的端口信息

    //创建表
    public static void createTable2(String myTableName, String... colFamily) throws IOException {
        TableName tableName = TableName.valueOf(myTableName);
        System.out.println("createTable");
        Admin admin = connection.getAdmin();
        if(admin.tableExists(tableName)){
//            admin.disableTable(tableName);
//            admin.deleteTable(tableName);
            System.out.println("table exists!");
        }
        else {
            HTableDescriptor hTableDescriptor = new HTableDescriptor(tableName);
            for(String str:colFamily){
                HColumnDescriptor hColumnDescriptor = new HColumnDescriptor(str);
                hTableDescriptor.addFamily(hColumnDescriptor);
            }
            admin.createTable(hTableDescriptor);
            System.out.println("MYcreateTable");
        }
    }

    /**黄小利、陈开泰
     * 方法：创建HBase表
     * 参数：不定数量
     * myTableName:表名
     * 其余若干：列族名*/
    public static boolean createTable(String myTableName,String... colFamily){
        try{
            TableName tableName = TableName.valueOf(myTableName);
            Admin admin = connection.getAdmin();
            if(admin.tableExists(tableName)){
                System.out.println("table exists!");
            }else {
                HTableDescriptor hTableDescriptor = new HTableDescriptor(tableName);
                for(String str:colFamily){
                    HColumnDescriptor hColumnDescriptor = new HColumnDescriptor(str);
                    hTableDescriptor.addFamily(hColumnDescriptor);
                }
                admin.createTable(hTableDescriptor);
            }
            return true;
        }catch(IOException ex){
            System.out.println("创建HBaseTable失败,具体原因：");
            ex.printStackTrace();
            return false;
        }

    }

    public static void init () {   //建立连接
//        hadoop路径设置
        System.setProperty(HbaseUtil.HADOOP_PROP, HbaseUtil.HADOOP_VALUE);
        // HBase 配置信息
        Configuration configuration = HBaseConfiguration.create();
        configuration.set(HbaseUtil.ZK_PATH_PROP, HbaseUtil.ZK_PATH_VALUE);
        configuration.set(HbaseUtil.ZK_PORT_PROP, HbaseUtil.ZK_PORT_VALUE);
        try{
            connection = ConnectionFactory.createConnection(configuration);
//          Admin admin = connection.getAdmin();
            System.out.println("HBase连接成功!");
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public static void close () {  //关闭连接
      try{
          Admin admin = connection.getAdmin();
          if(admin != null) {
              admin.close();
          }
          if (null != connection) {
              connection.close();
          }
      }catch (IOException e) {
          e.printStackTrace();
      }
    }

    //插入一个数据
    public static boolean insertData(String tableName, String rowKey, String colFamily, String col, String val){
        try{
            Table table = connection.getTable(TableName.valueOf(tableName));
            Put put = new Put(rowKey.getBytes());
            put.addColumn(colFamily.getBytes(),col.getBytes(),val.getBytes());
            table.put(put);
            table.close();
            return true;
        }catch(IOException ex){
            System.out.println("增加数据失败");
            return false;
        }
    }

//    插入一行列族数据，hkv应用H_kv工具类，里面存储每个列族名（列名）以及对应的数据值，该参数数据不定
    public static boolean insertRow(String tableName, String rowKey, H_kv... hkv){
        try{
            Table table = connection.getTable(TableName.valueOf(tableName));
            for(int i = 0; i< hkv.length; i++){
                Put put;
                put= new Put(rowKey.getBytes());
                put.addColumn(hkv[i].getColFamily().getBytes(),hkv[i].getColName().getBytes(),hkv[i].getColValue().getBytes());
                table.put(put);
            }
            table.close();
            return true;
        }catch(IOException ex){
            System.err.println("增加一行列族数据失败");
            return false;
        }
    }

    //获取一个数据
    public static String getColData (String tableName,String rowKey,String colFamily,String col){
        String resCol = null;
        try{
            Table table = connection.getTable(TableName.valueOf(tableName));
            Get get = new Get(rowKey.getBytes());
            get.addColumn(colFamily.getBytes(), col.getBytes());
            Result result = table.get(get);
            byte value[] = result.getValue(Bytes.toBytes(colFamily), Bytes.toBytes(col));
            resCol = Bytes.toString(value);
            table.close();
        }catch(IOException ex){
            ex.printStackTrace();
        }
        return resCol;
    }

    //获取一列族数据
    public static List<String> getData (String tableName, String rowKey, String colFamily, String... col){
        List<String> resCol = null;
        try{
            for(int i = 0; i< col.length; i++){
                Table table = connection.getTable(TableName.valueOf(tableName));
                Get get = new Get(rowKey.getBytes());
//        get.addFamily(colFamily.getBytes());
                get.addColumn(colFamily.getBytes(), col[i].getBytes());
                Result result = table.get(get);
                byte value[] = result.getValue(Bytes.toBytes(colFamily), Bytes.toBytes(col[i]));
                resCol.add(Bytes.toString(value));
                table.close();
            }
        }catch(IOException ex){
            ex.printStackTrace();
        }
        return resCol;
    }

    // 表的描述
    protected static void HTableDescript(String tableName){
        try{
            Admin admin = connection.getAdmin();
            HTableDescriptor tableDescriptor = new HTableDescriptor (tableName);// 表的数据模式
            tableDescriptor.addFamily (new HColumnDescriptor("name"));// 增加列族
            tableDescriptor.addFamily(new HColumnDescriptor("age"));
            tableDescriptor.addFamily(new HColumnDescriptor("gender"));
            admin.createTable(tableDescriptor);
        }catch (IOException e) {
            e.printStackTrace();
        }
    }
//    public static void Scan() throws IOException {
//        Scan scan = new Scan();
//        scan.addFamily(Bytes.toBytes("columnFamily1"));
//        scan.setTimeRange(1,3);
//        scan.setBatch(1000);
//        Configuration configuration = HBaseConfiguration.create();
//        Connection connection = ConnectionFactory.createConnection(configuration);
//        //Table table = connection.getTable();
//        try {
//            ResultScanner resuitScanner = table.getScanner(scan);
//            Result rs = resuitScanner.next();
//            for (; rs != null;rs = resultScanner.next()){
//                for (KeyValue kv : rs.list()){
//                    System.out.println("--------------");
//                    System.out.println("rowkey:"+ new String(kv.getRow()));
//                    System.out.println("Column Family: "+ new String(kv.getFamily()));
//                    System.out.println("Column :" + new String(kv.getQualifier ()));
//                    System.out.println("value :"+ new String(kv.getValue()));
//                }
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

//        测试用
//    public static void main (String [] agrs) throws IOException {
//        // hadoop路径设置
////        System.setProperty("hadoop.home.dir","D:\\thunder_file_Download\\hadoop-common-2.2.0-bin-master");
//        init();//建立连接
//        createTable2("score", "grade", "score"); //建表
//        insertData("scores","dandan","grade","chinese","66");//添加课程成绩
//        insertData("scores","dandan","grade","math","");//添加课程成绩
//        // 浏览课程
//        getData("scores","dandan","grade","math");
//        HTableDescript("score");
//        close();//关闭连接
//    }
}




package com.weiming.xiguang;
import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;
public class HbaseDemo {
    private static Connection connection; //HBase 连接
    public static void main (String [] agrs) throws IOException {
        // hadoop路径设置
        System.setProperty("hadoop.home.dir","D:\\thunder_file_Download\\hadoop-common-2.2.0-bin-master");
        init();//建立连接
        createTable("score", new String[]{"grade", "score"}); //建表
        insertData("scores","dandan","grade","chinese","66");//添加课程成绩
        insertData("scores","dandan","grade","math","" +
                "");//添加课程成绩
        // 浏览课程
        getData("scores","dandan","grade","math");
        HTableDescript("score");
        close();//关闭连接
    }

    private static void createTable(String myTableName,String[] colFamily) throws IOException {
        TableName tableName = TableName.valueOf(myTableName);
        Admin admin = connection.getAdmin();
        if(admin.tableExists(tableName)){
            System.out.println("table exists!");
        }
        else {
            HTableDescriptor hTableDescriptor = new HTableDescriptor(tableName);
            for(String str:colFamily){
                HColumnDescriptor hColumnDescriptor = new HColumnDescriptor(str);
                hTableDescriptor.addFamily(hColumnDescriptor);
            }
            admin.createTable(hTableDescriptor);
        }
    }

    public static void init () {   //建立连接
        //HBase 配置信息
        Configuration configuration = HBaseConfiguration.create();
      configuration.set("hbase.zookeeper.quorum","10.34.51.202");
      configuration.set("hbase.zookeeper.property.clientPort","2181");
      try{
          connection = ConnectionFactory.createConnection(configuration);
//          Admin admin = connection.getAdmin();
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
    //插入数据
    public static void insertData(String tableName, String rowKey, String colFamily, String col, String val) throws IOException {
        Table table = connection.getTable(TableName.valueOf(tableName));
        Put put = new Put(rowKey.getBytes());
        put.addColumn(colFamily.getBytes(),col.getBytes(),val.getBytes());
        table.put(put);
        table.close();
    }
    //获取数据
    public static void getData (String tableName,String rowKey,String colFamily,String col)throws IOException {
        Table table = connection.getTable(TableName.valueOf(tableName));
        Get get = new Get(rowKey.getBytes());
        get.addColumn(colFamily.getBytes(), col.getBytes());
        Result result = table.get(get);
        //System.out.println(new String(result.getValue(colFamily.getBytes(), col.getBytes())));
        System.out.println(new String(result.getValue(colFamily.getBytes(), col.getBytes())));
        table.close();
    }
    // 表的描述
    public static void HTableDescript(String tableName){
        try{
            Admin admin = connection.getAdmin();
            HTableDescriptor tableDescriptor = new HTableDescriptor (tableName);// 表的数据模式
            tableDescriptor. addFamily (new HColumnDescriptor("name"));// 增加列族
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
}




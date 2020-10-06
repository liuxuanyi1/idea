package com.weiming.xiguang.Dao;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EchartsDao {
    //用户和连接变量
    private Admin admin;
    private Connection connection;

    public EchartsDao() {
        this.init();
    }

        public static void main(String[] args) throws IOException {
        //System.setProperty("hadoop.home.dir", "D:\\hadoop\\hadoop-common-2.2.0-bin-master");
        EchartsDao echartsDao = new EchartsDao();
//        echartsDao.init();
//        echartsDao.createTable("vehicleFlow", "message");
//        "轿车", "公交车", "摩托车", "罐车", "邮政车", "出租车"
//        echartsDao.pullMessage("vehicleFlow", "轿车", "message", "count", "11");
//        echartsDao.pullMessage("vehicleFlow", "公交车", "message", "count", "5");
//        echartsDao.pullMessage("vehicleFlow", "摩托车", "message", "count", "30");
//        echartsDao.pullMessage("vehicleFlow", "罐车", "message", "count", "7");
//        echartsDao.pullMessage("vehicleFlow", "邮政车", "message", "count", "2");
//        echartsDao.pullMessage("vehicleFlow", "出租车", "message", "count", "22");
//        echartsDao.getMessage("vehicleFlow", "轿车", "message", "count");
//        System.out.println(echartsDao.isTableExist("vehicleFlow"));


            List<String> rowkey = new ArrayList<>();
            rowkey.add("轿车");
            rowkey.add("公交车");
            rowkey.add("摩托车");
            rowkey.add("罐车");
            rowkey.add("邮政车");
            rowkey.add("出租车");
            echartsDao.getAllMessage(rowkey, "message", "count");

        echartsDao.close();
    }

    //初始化连接
    public void init(){
        System.setProperty("hadoop.home.dir", "I:\\hadoop\\hadoop-common-2.2.0-bin-master");
        //获得配置信息
        Configuration configuration = HBaseConfiguration.create();
        configuration.set("hbase.zookeeper.quorum","10.34.51.202");
        configuration.set("zookeeper.znode.parent", "/hbase-unsecure");

        try {
            //获得连接对象
            connection = ConnectionFactory.createConnection(configuration);
            //获得用户对象
            admin = connection.getAdmin();
        }catch (IOException e){
            System.out.println(e);
        }

    }

    //关闭连接
    public void close(){
        try{
            if (admin != null){
                admin.close();
            }
            if (connection != null){
                connection.close();
            }
        }catch (IOException e){
            System.out.println(e);
        }
    }

    //判断表是否存在
    public boolean isTableExist(String tableName) throws IOException {
        return admin.tableExists(TableName.valueOf(tableName));
    }

    //创建表
    public void createTable(String tableName, String... colFamily) throws IOException {
        if (colFamily.length <= 0){
            System.out.println("请设置列族！");
            return;
        }
        if (isTableExist(tableName)){
            System.out.println("表已存在");
            return;
        }

        HTableDescriptor hTableDescriptor = new HTableDescriptor(TableName.valueOf(tableName));

        for (String col: colFamily){
            HColumnDescriptor hColumnDescriptor = new HColumnDescriptor(col);
            hTableDescriptor.addFamily(hColumnDescriptor);
        }

        admin.createTable(hTableDescriptor);
    }

    //向表中插入数据
    public void pullMessage(String tableName, String rowKey, String colFamily, String colName, String value) throws IOException {
        if (!isTableExist(tableName)){
            System.out.println("表不存在");
            return;
        }

        Table table = connection.getTable(TableName.valueOf(tableName));

        Put put = new Put(Bytes.toBytes(rowKey));

        put.addColumn(Bytes.toBytes(colFamily), Bytes.toBytes(colName), Bytes.toBytes(value));

        table.put(put);

        table.close();
    }



    //从表中获取数据
    public String getMessage(String tableName, String rowKey, String colFamily, String colName) throws IOException {
        if (!isTableExist(tableName)){
            System.out.println("该表不存在！");
            return null;
        }

        Table table = connection.getTable(TableName.valueOf(tableName));

        Get get = new Get(Bytes.toBytes(rowKey));

        get.addColumn(Bytes.toBytes(colFamily), Bytes.toBytes(colName));

        Result result = table.get(get);

        ArrayList<String> carCount = new ArrayList<String>();

        System.out.println(Bytes.toString(CellUtil.cloneValue(result.rawCells()[0])));

        table.close();
        return Bytes.toString(CellUtil.cloneValue(result.rawCells()[0]));
    }

    //从表中获取数据
    public List<String> getAllMessage(List<String> rowKey, String colFamily, String colName) throws IOException {

        Table table = connection.getTable(TableName.valueOf("vehicleFlow"));
        List<Get> getList = new ArrayList<>();
        for(String s: rowKey){
            Get get = new Get(Bytes.toBytes(s));
            getList.add(get);
        }
        Result[] results = table.get(getList);
        List countList = new ArrayList();
        for (Result result : results){//对返回的结果集进行操作
            for (Cell kv : result.rawCells()) {
                String value = Bytes.toString(CellUtil.cloneValue(kv));
                countList.add(value);
            }
        }
        table.close();
        return countList;
    }


}

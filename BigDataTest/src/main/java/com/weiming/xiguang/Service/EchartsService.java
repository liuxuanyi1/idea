package com.weiming.xiguang.Service;

import com.weiming.xiguang.Dao.EchartsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class EchartsService {

    @Autowired
    EchartsDao echartsDao;

    public  void init(){
        echartsDao.init();
    }


//    public static void main(String[] args) throws IOException {
//        EchartsService echartsService = new EchartsService();
//        System.out.println(echartsService.getCarCount("轿车", "message", "count"));
//    }

    public String getCarCount(String carType, String colFamily, String colName) throws IOException {
        String result =  echartsDao.getMessage("vehicleFlow", carType, colFamily, colName);
        echartsDao.close();
        return result;
    }

    public List getAllCarCount(List<String> carType, String colFamily, String colName) throws IOException {
        return echartsDao.getAllMessage(carType, "message", "count");
    }


}

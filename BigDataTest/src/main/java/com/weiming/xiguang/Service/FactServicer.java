package com.weiming.xiguang.Service;
import com.weiming.xiguang.Dao.FactDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * @author 张伟琦
 */
@Service
public class FactServicer {
    @Autowired
    FactDao factDao;

    /**
     * 获取各种车流量数
     *
     * @param monitorSite
     * @param dateKey
     * @return
     */
    public List getVehicleFlowDay(String monitorSite, String dateKey) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd-HH:ss");
        Date date = null;
        String item = null;
        List list = new ArrayList();
        try {
            date = format.parse(dateKey);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHH-ss");
            item = simpleDateFormat.format(date);
            System.out.println(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("bus_number"));
            list.add(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("bus_number"));
            list.add(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("car_number"));
            list.add(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("truck_number"));
            list.add(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("van_number"));
            list.add(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("taxi_number"));
            list.add(factDao.getVehicleFlowDay(monitorSite, item).get(0).get("motorcycle_number"));
        } catch (Exception e) {
            System.err.println("获取一天的各种车流量数发生异常");
        }
        return list;
    }
}


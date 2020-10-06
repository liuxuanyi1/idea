package com.weiming.xiguang.Dao;

import com.weiming.xiguang.Model.DateTimeModel;
import com.weiming.xiguang.Model.FactModel;
import com.weiming.xiguang.Model.DateTimeModel;
import com.weiming.xiguang.Model.FactModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
/**
 * Created with IntelliJ IDEA.
 * Description:事实表查询
 * Date: Created in
 * 2020-9-12
 * @author  张伟琦
 */
@Repository
public interface FactDao extends JpaRepository<FactModel, Integer> {

    /**获取各种车流量数
     * @param monitorSite
     * @param dateKey
     * @return*/
    @Query(value =  "select SUM(bus_number)as bus_number, " +
                    "SUM(car_number)as car_number, " +
                    "SUM(truck_number)as truck_number, " +
                    "SUM(van_number) as van_number, " +
                    "SUM(taxi_number)as taxi_number, " +
                    "SUM(motorcycle_number)as motorcycle_number " +
                    "from Fact " +
                    "where camera_id in(select camera_id from MonitoringPoint where monitor_site=?1)" +
                    "and date_key=?2",nativeQuery = true )
    List<Map<String, Integer>>  getVehicleFlowDay(String monitorSite, String dateKey);

}

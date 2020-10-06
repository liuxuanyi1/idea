package com.weiming.xiguang.Dao;

import com.weiming.xiguang.Model.DateTimeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

/**
 * @author 张伟琦
 */
@Repository
public interface DateTimeDao extends JpaRepository<DateTimeModel, Integer> {

    /**获取每一小时中低速高速的时间占比
     * @param monitorSite
     * @param startTime
     * @param endTime
     * @return*/
    @Query(value = "select SUM(average_speed*vehicle_flow)/SUM(vehicle_flow)as average_speed " +
            "from Fact where camera_id in(select camera_id from MonitoringPoint where monitor_site =?1) " +
            "and date_key  in (select date_key from Datetime where date_key>=?2 and date_key <?3)GROUP BY date_key ",nativeQuery = true)
    List<Map<String,Double>> getSpeedProportion(String monitorSite, String startTime,String endTime);

}

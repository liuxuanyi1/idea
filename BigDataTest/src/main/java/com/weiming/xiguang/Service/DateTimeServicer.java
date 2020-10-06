package com.weiming.xiguang.Service;

import com.weiming.xiguang.Dao.DateTimeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 *
 * @author 张伟琦
 */
@Service
public class DateTimeServicer {
    @Autowired
    DateTimeDao dateTimeDao;
    /**获取每一小时中低速高速的时间占比
     * @param monitorSite
     * @param startTime
     * @param endTime
     * @return
     */
    public List getSpeedProportion(String monitorSite, String startTime, String endTime) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd-HH:ss");
        Date dateStartTime = null;
        Date dateEndTime = null;
        List<Map<String,Double>> listMaps = null;
        List list = new ArrayList();
        int lowSpeed = 0, midSpeed = 0, highSpeed = 0;
        try {
            dateStartTime = format.parse(startTime);
            dateEndTime = format.parse(endTime);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHH-ss");
            String itemDateStartTime = simpleDateFormat.format(dateStartTime);
            String itemDateEndTime = simpleDateFormat.format(dateEndTime);
            listMaps = dateTimeDao.getSpeedProportion(monitorSite, itemDateStartTime, itemDateEndTime);
            for (int i = 0; i < listMaps.size(); i++) {
                if ( listMaps.get(i).get("average_speed") < 30) {
                    lowSpeed++;
                } else if (listMaps.get(i).get("average_speed") >= 30 && listMaps.get(i).get("average_speed") < 40) {
                    midSpeed++;
                } else {
                    highSpeed++;
                }
            }
            list.add(lowSpeed);
            list.add(midSpeed);
            list.add(highSpeed);
        } catch (Exception e) {
            System.err.println("获取每一小时中低速高速的时间占比发生异常");
        }
        return list;
    }
}

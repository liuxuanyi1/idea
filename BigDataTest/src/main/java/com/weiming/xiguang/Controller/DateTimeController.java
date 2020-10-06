package com.weiming.xiguang.Controller;

import com.weiming.xiguang.Service.DateTimeServicer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * @author 张伟琦
 */
@RestController
public class DateTimeController {
    @Autowired
    DateTimeServicer dateTimeServicer;
/**获取低中高速度占比*/
    @RequestMapping(value = "/getSpeedProportion",method= RequestMethod.POST)
    public List getSpeed(@RequestParam(value = "monitorSite")String monitorSite,
                         @RequestParam(value = "startTime")String startTime,
                         @RequestParam(value = "endTime")String endTime){
        return dateTimeServicer.getSpeedProportion(monitorSite,startTime,endTime);
    }

}

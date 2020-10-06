package com.weiming.xiguang.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.weiming.xiguang.Service.GetNowDataServicer;
import java.util.List;
import java.util.Map;


/**获取实时数据
 * @author 张伟琦*/
@RestController
public class GetNowDataController {

    @Autowired
    GetNowDataServicer GetNowDataServicer;

    /**获得当前时间车流量*/
    @RequestMapping(value = "/getNowCarFlow")
    public List getVehicleFlowDay() {
        return GetNowDataServicer.getNowCarFlow();
    }

    /**获得不同路口拥堵情况*/
    @RequestMapping(value = "/getNowTrafficCondition",method= RequestMethod.GET)
    public List getNowTrafficCondition(){return GetNowDataServicer.getNowTrafficCondition();}

    /**对不同车型进行统计*/
    @RequestMapping(value = "/getNowCarType",method= RequestMethod.GET)
    public List getNowCarType() {
        return GetNowDataServicer.getNowCarType();
    }

    /**对车牌进行统计*/
    @RequestMapping(value = "/getNowCarId")
    public List getNowCarId() {
        return GetNowDataServicer.getNowCarId();
    }

}

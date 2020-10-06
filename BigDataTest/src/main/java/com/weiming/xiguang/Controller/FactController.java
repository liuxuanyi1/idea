package com.weiming.xiguang.Controller;


import com.weiming.xiguang.Service.FactServicer;
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
public class FactController {

    @Autowired
    FactServicer factServicer;

    @RequestMapping(value = "/getVehicleFlowDay")
    public List getVehicleFlowDay() {
        return factServicer.getVehicleFlowDay("长春理工大学","2020-01-13-16:01");

    }
}

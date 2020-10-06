package com.weiming.xiguang.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 各页面Controller
 * @author 陈开泰 贾超楠 张舒童 李洪武*/
@Controller
public class HelloController {

//    /**登入界面*/
//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public String hello(){
//        return "dashboard2";
//    }
//    /**登入界面*/
//    @RequestMapping(value = "/testbala", method = RequestMethod.GET)
//    public String fds(){
//        return "testbala";
//    }
    /**登入界面*/
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String dash(){
        return "dash";
    }

    /**视频界面*/
    @RequestMapping(value = "/video", method = RequestMethod.GET)
    public String video(){
        return "video";
    }

    /**首页*/
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(){
        return "index2.0";
    }

    /**历史数据页面*/
    @RequestMapping(value = "/historyData", method = RequestMethod.GET)
    public String historyData(){
        return "historyData";
    }

    /**车辆检索*/
    @RequestMapping(value = "/VehicleToRetrieve", method = RequestMethod.GET)
    public String VehiclToRetrieve(){
        return "VehicleToRetrieve";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test(){
        return "test";
    }


}

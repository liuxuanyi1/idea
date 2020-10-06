package com.weiming.xiguang.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.weiming.xiguang.util.GetRealTimeData;
import java.util.ArrayList;
import java.util.List;

/**获取实时数据
 * @author 张伟琦*/
@Service
public class GetNowDataServicer {

    GetRealTimeData getRealTimeData = new GetRealTimeData();

    /**获得当前时间车流量*/
    public List getNowCarFlow(){
        List list = new ArrayList();
        Integer tool = null;
        try {
            for (int i =0;i<5;i++){
                String subString = getRealTimeData.getInfo("flow000.txt")[i];
                String subLeft = subString.replace("[","");
                String subRight = subLeft.replace("]","");
                String[] split = subRight.split(",");
                list.add(Integer.valueOf(split[0]));
            }
        } catch (Exception e) {
            System.err.println("获得当前时间车流量发生异常");
        }
        return list;
    }

    /**获得不同路口拥堵情况*/
    public List getNowTrafficCondition(){
        List list = new ArrayList();
        int lowFlow=0,middleFlow=0,highFlow=0;
        Integer flow = null;
        Integer tool = null;
        try {
            String subString = getRealTimeData.getInfo("flow000.txt")[4];
            String subLeft = subString.replace("[","");
            String subRight = subLeft.replace("]","");
            String[] split = subRight.split(",");
            flow = Integer.valueOf(split[0]);
            if (flow<10){
                lowFlow++;
            }
            else if (flow>10&&flow<20){
                middleFlow++;
            }
            else{
                highFlow++;
            }
            list.add(lowFlow);
            list.add(middleFlow);
            list.add(highFlow);
        } catch (Exception e) {
            System.err.println("获得不同路口拥堵情况发生异常");
        }
        return list;
    }
    /**对不同车型进行统计*/
    public List getNowCarType(){
        List list = new ArrayList();
        Integer tool = null;
        try {
            String subString = getRealTimeData.getInfo("flow000.txt")[4];
            String subLeft = subString.replace("[","");
            String subRight = subLeft.replace("]","");
            String[] split = subRight.split(",");
            for (int i =1;i<7;i++){
                list.add(Integer.valueOf(split[i]));
            }
        } catch (Exception e) {
            System.err.println("对不同车型进行统计发生异常");
        }
        return list;
    }

    /**对车牌进行统计*/
    public List getNowCarId(){
        List list = new ArrayList();
        int vehicleIdA = 0,vehicleIdB = 0,vehicleIdC = 0,vehicleIdD = 0,vehicleIdE = 0,vehicleIdF = 0;
        int vehicleIdG = 0,vehicleIdH = 0,vehicleIdI = 0,vehicleIdJ = 0,vehicleIdK = 0,vehicleIdOthers = 0;
        try {
            String[] subString = getRealTimeData.getInfo("vehicle000.txt");
            for (int i = 0; i < subString.length; i++){
                if ("JIA".equals(subString[i].substring(0,3))){
                    vehicleIdA++;
                }
                else if ("吉B".equals(subString[i].substring(0,2))){
                    vehicleIdB++;
                }
                else if ("吉C".equals(subString[i].substring(0,2))){
                    vehicleIdC++;
                }
                else if ("吉D".equals(subString[i].substring(0,2))){
                    vehicleIdD++;
                }
                else if ("吉E".equals(subString[i].substring(0,2))){
                    vehicleIdE++;
                }
                else if ("吉F".equals(subString[i].substring(0,2))){
                    vehicleIdF++;
                }
                else if ("吉G".equals(subString[i].substring(0,2))){
                    vehicleIdG++;
                }
                else if ("吉H".equals(subString[i].substring(0,2))){
                    vehicleIdH++;
                }
                else if ("吉I".equals(subString[i].substring(0,2))){
                    vehicleIdI++;
                }
                else if ("吉J".equals(subString[i].substring(0,2))){
                    vehicleIdJ++;
                }
                else if ("吉K".equals(subString[i].substring(0,2))){
                    vehicleIdK++;
                }
                else{
                    vehicleIdOthers++;
                }
            }

            list.add(vehicleIdA);
            list.add(vehicleIdB);
            list.add(vehicleIdC);
            list.add(vehicleIdD);
            list.add(vehicleIdE);
            list.add(vehicleIdF);
            list.add(vehicleIdG);
            list.add(vehicleIdH);
            list.add(vehicleIdI);
            list.add(vehicleIdJ);
            list.add(vehicleIdK);
            list.add(vehicleIdOthers);
        } catch (Exception e) {
            System.err.println("对车牌进行统计发生异常");
        }
        return list;
    }
}

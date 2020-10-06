package com.weiming.xiguang.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FactModel {
    //ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fact_id;
    //车流量
    private long vehicle_flow;
    //公交车数量
    private long bus_number;
    //轿车数量
    private long car_number;
    //货车数量
    private long truck_number;
    //面包车数量
    private long van_number;
    //出租车数量
    private long taxi_number;
    //摩托车数量
    private long motorcycle_number;
    //平均速度
    private float average_speed;
    //日期键
    /**
     *
     */
    private String data_key;
    //摄像头ID
    private String camera_id;

    public long getFact_id() {
        return fact_id;
    }

    public void setFact_id(long fact_id) {
        this.fact_id = fact_id;
    }

    public long getVehicle_flow() {
        return vehicle_flow;
    }

    public void setVehicle_flow(long vehicle_flow) {
        this.vehicle_flow = vehicle_flow;
    }

    public long getBus_number() {
        return bus_number;
    }

    public void setBus_number(long bus_number) {
        this.bus_number = bus_number;
    }

    public long getCar_number() {
        return car_number;
    }

    public void setCar_number(long car_number) {
        this.car_number = car_number;
    }

    public long getTruck_number() {
        return truck_number;
    }

    public void setTruck_number(long truck_number) {
        this.truck_number = truck_number;
    }

    public long getVan_number() {
        return van_number;
    }

    public void setVan_number(long van_number) {
        this.van_number = van_number;
    }

    public long getTaxi_number() {
        return taxi_number;
    }

    public void setTaxi_number(long taxi_number) {
        this.taxi_number = taxi_number;
    }

    public long getMotorcycle_number() {
        return motorcycle_number;
    }

    public void setMotorcycle_number(long motorcycle_number) {
        this.motorcycle_number = motorcycle_number;
    }

    public float getAverage_speed() {
        return average_speed;
    }

    public void setAverage_speed(float average_speed) {
        this.average_speed = average_speed;
    }

    public String getData_key() {
        return data_key;
    }

    public void setData_key(String data_key) {
        this.data_key = data_key;
    }

    public String getCamera_id() {
        return camera_id;
    }

    public void setCamera_id(String camera_id) {
        this.camera_id = camera_id;
    }
}

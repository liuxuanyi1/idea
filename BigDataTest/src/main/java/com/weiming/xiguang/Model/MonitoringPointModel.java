package com.weiming.xiguang.Model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/*伍浩聪
* 监测点维度表的model*/
@Entity
public class MonitoringPointModel {

    //摄像头编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String camera_id;
    //监测点经度
    private String camera_lon;
    //监测点纬度
    private String camera_lat;
    //监测地点
    private String monitor_site;
    //摄像头方向
    private String monitor_Direction;
    //监测部门
    private String monitor_department;
    //摄像头高度
    private float monitor_height;
    //视频组
    private String monitor_group;


    public String getCamera_id() {
        return camera_id;
    }

    public void setCamera_id(String camera_id) {
        this.camera_id = camera_id;
    }

    public String getCamera_lon() {
        return camera_lon;
    }

    public void setCamera_lon(String camera_lon) {
        this.camera_lon = camera_lon;
    }

    public String getCamera_lat() {
        return camera_lat;
    }

    public void setCamera_lat(String camera_lat) {
        this.camera_lat = camera_lat;
    }

    public String getMonitor_site() {
        return monitor_site;
    }

    public void setMonitor_site(String monitor_site) {
        this.monitor_site = monitor_site;
    }

    public String getMonitor_Direction() {
        return monitor_Direction;
    }

    public void setMonitor_Direction(String monitor_Direction) {
        this.monitor_Direction = monitor_Direction;
    }

    public String getMonitor_department() {
        return monitor_department;
    }

    public void setMonitor_department(String monitor_department) {
        this.monitor_department = monitor_department;
    }

    public float getMonitor_height() {
        return monitor_height;
    }

    public void setMonitor_height(float monitor_height) {
        this.monitor_height = monitor_height;
    }

    public String getMonitor_group() {
        return monitor_group;
    }

    public void setMonitor_group(String monitor_group) {
        this.monitor_group = monitor_group;
    }
}

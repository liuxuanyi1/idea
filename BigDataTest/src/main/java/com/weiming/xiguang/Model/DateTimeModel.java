package com.weiming.xiguang.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


/*伍浩聪
* 时间维度表的model*/
@Entity
public class DateTimeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String date_key;

    private int minute_period;

    private int hour;

    private int day;

    private int week;

    private int month;

    private int quarter;

    private int year;


    public String getDate_key() {
        return date_key;
    }

    public void setDate_key(String date_key) {
        this.date_key = date_key;
    }

    public int getMinute_period() {
        return minute_period;
    }

    public void setMinute_period(int minute_period) {
        this.minute_period = minute_period;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getQuarter() {
        return quarter;
    }

    public void setQuarter(int quarter) {
        this.quarter = quarter;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

}

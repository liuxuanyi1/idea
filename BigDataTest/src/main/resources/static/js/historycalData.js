/*
功能:路网信息
开始时间：2020/1/6
作者: 陈开泰，张舒童，贾超楠，李洪武
 */
//经纬度坐标（默认长春市政府）
/** 定义地图中心点*/
var point;
var longitude = 125.330253;//默认经度
var latitude = 43.822795;//纬度、000
var map = null;
//初始化各种图表变量

var areaChart;
var areaChart2;
var speedChart;
var speedLevel;
var roadFlow;

//顶部下拉框同步方法
function showDestinations() {
    var destinations = ["长春理工大学","长春理工小学","长春理工中学"];
    var sortName = document.getElementById("selection");
    $.ajax({
        type: 'get',
        url: '/getMonitorSite',
        async: false,
        success: function (result4) {
            destinations = result4;
            console.log(destinations);
        }
    });
    for (var i = 0; i < 10; i++)
    {
        option = new Option(destinations[i]);
        sortName.options.add(option);
    }
}
$.ajax({
            type: 'get',
            url: '/getMonitorSite',
            async: false,
            success: function (result4) {
                var destinations = result4;
                console.log(destinations);
            }
        });

//陈开泰
function bdMap(style){

    var locMes = localStorage.getItem("destination")

    // 创建地图实例
    map = new BMap.Map("roadFlow");
    var point1;

    if(point == null){
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    }else{
        point1 = point;
    }

    // 初始化地图，设置中心点坐标和地图级别,设置为17——100米\
    if (locMes != null && locMes != ''){
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(locMes, function(cpoint){
            if (cpoint) {
                map.centerAndZoom(cpoint, 17);
                map.addOverlay(new BMap.Marker(cpoint));
            }else {
                alert("请输入正确的地址!");
            }
        },"长春市");
    }else {
        map.centerAndZoom(point1, 17);
        //添加目的地坐标
        map.addOverlay(new BMap.Marker(point1));
    }


    //设置地图样式
    if(style == 1){
        map.setMapStyleV2({
            styleId: 'a465d5ef9c7769db091ef2a596d8bf4b'
        });
    }
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
    map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    map.addControl(new BMap.OverviewMapControl({isOpen:true}));
    // map.addControl(new BMap.GeolocationControl());
    if(style != 1){
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    }

    return map;
}

//为地图添加查流量图层
function addLayer(map){
    //创建交通图层实例
    var traffic = new BMap.TrafficLayer();
    map.addTileLayer(traffic);
}

//左下雷达图  用于显示车籍统计  贾超楠
function  registrationStatistics(){
    if( speedLevel != null &&  speedLevel != ''){
        speedLevel.dispose();
    }
    //通过dom初始化图标变量
    speedLevel = echarts.init(document.getElementById('speedChart'), 'light');
    var option = {
        backgroundColor: '#F0F8FF',
        title: {
            text: '车籍统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['吉A', '吉B', '吉C', '吉D', '吉E', '吉F', '吉G', '吉H', '吉I', '吉J', '吉K','其他']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '吉A'},
                    {value: 310, name: '吉B'},
                    {value: 234, name: '吉C'},
                    {value: 135, name: '吉D'},
                    {value: 158, name:'吉E'},
                    {value: 335, name: '吉F'},
                    {value: 335, name: '吉G'},
                    {value: 310, name: '吉H'},
                    {value: 234, name: '吉I'},
                    {value: 135, name: '吉J'},
                    {value: 548, name:'吉K'},
                    {value: 335, name: '其他'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    speedLevel.setOption(option);
}

//地址解析
function reLocation(){
    // 创建地址解析器实例
    // 将地址解析结果显示在地图上，并调整地图视野

    var address = $('#addr').val();
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(address, function(cpoint){
        if (cpoint) {
            map.panTo(cpoint, 17);
            map.clearOverlays();
            map.addOverlay(new BMap.Marker(cpoint));
        }else {
            alert("请输入正确的地址!");
        }
    },"长春市");
}

//右上折线图 用于显示历史车流量 贾超楠
function trafficVolume() {
    //当当前图表不是一个空对象时需要销毁对象，否则会出现不能显示的情况
    if(areaChart != null && areaChart != ''){
        areaChart.dispose();
    }
    areaChart = echarts.init(document.getElementById('areaChart'), 'light');
    var option = {
        backgroundColor: '#F0F8FF',
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['出租车', '面包车', '轿车', '公交车', '货车','摩托车','总数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['7天前', '6天前', '5天前', '4天前', '3天前', '2天前', '1天前']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                symbolSize: 10,
                name: '出租车',
                type: 'line',
                stack: '总量',
                data: [12, 13, 10, 13, 9, 23, 21]
            },
            {
                symbolSize: 10,
                name: '面包车',
                type: 'line',
                stack: '总量',
                data: [22, 18, 19, 23, 29, 13, 14]
            },
            {
                symbolSize: 10,
                name:'轿车',
                type: 'line',
                stack: '总量',
                data: [15, 23, 20, 15, 19, 13, 10]
            },
            {
                symbolSize: 10,
                name: '公交车',
                type: 'line',
                stack: '总量',
                data: [20, 12, 15, 34, 20, 30, 22]
            },
            {
                symbolSize: 10,
                name: '货车',
                type: 'line',
                stack: '总量',
                data: [20, 32, 21, 34, 12, 13, 32]
            },
            {
                symbolSize: 10,
                name: '摩托车',
                type: 'line',
                stack: '总量',
                data: [20, 32, 11, 24, 29, 13, 20]
            },
            {
                symbolSize: 10,
                name: '总数',
                type: 'line',
                stack: '总量',
                data: [123, 231, 123, 122, 121, 124, 132]
            }
        ]
    };
    areaChart.setOption(option);
}

// 第四模块
function area2() {
    if(roadFlow != null && roadFlow != ''){
        roadFlow.dispose();
    }
    roadFlow = echarts.init(document.getElementById('dailySpeed'), 'light');
    // Generate data
    var category =  ['7天前', '6天前', '5天前', '4天前', '3天前', '2天前', '1天前'];
    var lineData = [123, 231, 123, 122, 121, 124, 132];
    var barData = [123, 231, 123, 122, 121, 124, 132];

    var option = {
        backgroundColor: '#F0F8FF',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['line', 'bar'],
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            data: category,
            axisLabel:{
                color:'#0afaff'
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        yAxis: {
            splitLine: {show: false},
            axisLabel:{
                color:'#0afaff'
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
        },
        series: [{
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
        }, {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#14c8d4'},
                        {offset: 1, color: '#43eec6'}
                    ]
                )
            },
            data: barData
        }, {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: 'rgba(20,200,212,0.5)'},
                        {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                        {offset: 1, color: 'rgba(20,200,212,0)'}
                    ]
                )
            },
            z: -12,
            data: lineData
        }, {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
                color: '#F5F5DC'
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
        }]
    };
    roadFlow.setOption(option);

}
$(document).ready(function(){
    //菜单
    $(".sidebar-toggle").click();
    //图表
    map = bdMap(2);
    addLayer(map);
    area2();
    trafficVolume();
    registrationStatistics();
    // dailySpeed();
    $('#areaChart').resize(function () {
        areaChart.resize();
    });
    $('#dountChart').resize(function () {
        areaChart2.resize();
    })
    $('#speedChart').resize(function () {
        speedChart.resize();
    })
    $('#dailySpeed').resize(function () {
        speedLevel.resize();
    })
    //下拉框
    $('.js-example-basic-single').select2();
});

// 车辆检索

//经纬度坐标（默认长春市政府）
var longitude = 125.330253;//默认经度
var latitude = 43.822795;//纬度
var point = null;
var map = null;
var myChart = null;
var areaChart = null;
var speedChart = null;
var speedLevel = null;
//贾超楠
//创建地图实例，增加小车路线
function bdMap2(style) {
    // 创建地图实例
    map = new BMap.Map("vehicle");
    var point1 = new BMap.Point(longitude, latitude);
    if (point == null) {
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    } else {
        point1 = point;
    }
    // 初始化地图，设置中心点坐标和地图级别,设置为17——100米
    map.centerAndZoom(point1, 17);
    //添加目的地坐标
    map.addOverlay(new BMap.Marker(point1));
    //设置地图样式
    if (style == 1) {
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
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.OverviewMapControl({isOpen: true}));
    // map.addControl(new BMap.GeolocationControl());
    if (style != 1) {
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    }

    return map;
}

//创建小车实例
function bdMap8() {
    // 百度地图动态行驶轨迹
    // var nd=[1,2,3,4];
    // console.log(nd);
    // console.log(nd[0]);
    var map = new BMap.Map("vehicle");
    var point1 = new BMap.Point(longitude, latitude);
    // 如果默认的位置为空，就使用自己的坐标
    if (point == null) {
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    } else {
        point1 = point;
    }
    //map.centerAndZoom(point1, 17);
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    // 单击事件监听,弹出经纬度
    // alertPOI(map);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
    map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.OverviewMapControl({isOpen: true}));
    map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    // $.ajax({
    //     type: 'post',
    //     url: '/x',
    //     data: {'x': x},
    //     async: false,
    //     success: function (list) {
    //         for(var i=0;i<list.length;i++) {
    //         }
    //     }
    // });

    var myPs = new Array();//所有路径点
    var myPz=new Array();

    var pathWay = [];//自定义格式途径点
    var pathWay2 = [];//point格式途径点
    // var arr = new String[myPs.size()];
    myPz.push(125.32221232157663);
    myPz.push(43.83487070023063);
    myPz.push(125.32226621990722);
    myPz.push(43.837127130207605);
    // myPz.push(125.325212);
    // myPz.push(43.835982);
    // myPz.push(125.322266);
    // myPz.push(43.837127);
    // console.log(myPz);

    for(var i=0;i < myPz.length;i++){
        myPs[i] = new BMap.Point(myPz[0], myPz[1]);
        console.log(myPs[i]);
        var x=myPz.splice(0,2);
    }

    // myPs[0] = new BMap.Point(125.32167899887084, 43.836795993705664);
    // myPs[1] = new BMap.Point(125.32221232157663, 43.83487070023063);
    // myPs[2] = new BMap.Point(125.32521266197995, 43.835982669257625);
    // myPs[3] = new BMap.Point(125.32289503376421, 43.838063490906556);
    // myPs[4] = new BMap.Point(125.32226621990722, 43.837127130207605);
    for (var j = 0; j < myPz.length; j++) {
        var temp = myPs[j];
        pathWay.push({
            lng: temp.lng,
            lat: temp.lat,
            html: '途径点' + j,
            pauseTime: 0
        });
        pathWay2.push(temp);
    }

    var width = map.getZoom() * 12;
    var height = map.getZoom() * 6;

    var myIcon = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(width, height), {
        anchor: new BMap.Size(width / 2, height / 2),
        imageSize: new BMap.Size(width, height),
    });

    //改变车的大小
    // myIcon.setSize(new BMap.Size(104,52));
    // myIcon.setImageSize(new BMap.Size(104,52));

    var marker = new BMap.Marker(new BMap.Point(125.31987661001632, 43.83861837062355), {icon: myIcon});
    map.addOverlay(marker);   // 添加标识
    var arrPois = [];
    var road = [];

    var driving2 = new BMap.DrivingRoute(map, {
        renderOptions: {map: map, autoViewport: true, enableRotation: true},
        onSearchComplete: function (res) {
            if (driving2.getStatus() == 0) {
                map.clearOverlays();
                var plan = res.getPlan(0);

                for (var j = 0; j < plan.getNumRoutes(); j++) {
                    var route = plan.getRoute(j);
                    arrPois = arrPois.concat(route.getPath());
                }

                map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#1E90FF'}));
                map.setViewport(arrPois);//定位，
                // console.log(arrPois)
                lushu = new BMapLib.LuShu(map, arrPois, {
                    icon: myIcon,
                    speed: 500,
                    enableRotation: true,
                    landmarkPois: pathWay,
                    autoView: true
                });
                road = arrPois;
            }
        },
        onPolylinesSet: function (result) {
            //map.clearOverlays();
            lushu.start();
        },
        onMarkersSet: function (pois) {
            //这里处理途径点图像问题
            // console.log(pois);
        }
    });
    //驾车实例
    if (myPs.length >= 2) {
        driving2.search(myPs[0], myPs[myPs.length - 1], {waypoints: pathWay2});
        // console.log(pathWay2);
    }

    map.addEventListener("zoomend", function () {
        // if (lushu) {
        //     lushu.stop();

        var width = map.getZoom() * 12;
        var height = map.getZoom() * 6;

        var myIcon2 = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(width, height), {
            anchor: new BMap.Size(width / 2, height / 2),
            imageSize: new BMap.Size(width, height),
        });

        var opts = {
            icon: myIcon2,
            speed: 100,
            enableRotation: true,
            landmarkPois: pathWay,
            autoView: true
        }

        // arrPois = arrPois.slice(lushu.getNowIndex() + 1, lushu.length);
        //
        // lushu._setOptions(opts);
        // lushu._path = arrPois;
        // lushu.start();
        //bdMap7();
    })
}

//贾超楠
//Plot面板建表
function area() {
    //当当前图表不是一个空对象时需要销毁对象，否则会出现不能显示的情况
    if (areaChart != null && areaChart != '') {
        areaChart.dispose();
    }
    areaChart = echarts.init(document.getElementById('areaChart'), 'light');
    var areaOption = {
        // color :['#445f72', '#8addeb', '#ff9e7f', '#ccfef3', '#8dc5a0', '#f9a42d'],
        title: {
            text: '',
            left: 'left',
        },
        //#6495ED
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '公交车', '轿车', '货车', '面包车', '出租车', '摩托车'],
                ['位置一', 45, 67, 56, 42, 38, 73],
                ['位置二', 83, 73, 55, 56, 25, 55],
                ['位置三', 86, 65, 82, 56, 22, 45],
                ['位置四', 134, 73, 55, 56, 25, 55]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},


        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
    };
    areaChart.setOption(areaOption);
}

//模拟数据
function getData() {
    var res = [];
    var len = 10;
    while (len--) {
        res.push(Math.round(Math.random() * 200) + 20);
    }
    return res;
}

//贾超楠
//平均速度建表
function speeed() {
    if (speedChart != null && speedChart != '') {
        speedChart.dispose();
    }

    //通过dom初始化图标变量
    speedChart = echarts.init(document.getElementById('speedChart'), 'light');

    //数据源
    var data = getData();

    var option = {
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['平均速度', '平均速度']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: (function () {
                    var now = new Date();
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                        now = new Date(now - 150000);
                    }
                    return res;
                })()
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '速度变化',
                max: 200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [{
            name: '平均速度',
            type: 'line',
            data: data
        }
        ]
    };

    speedChart.setOption(option);

    setInterval(function () {
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

        var data0 = option.series[0].data;
        var temp = Math.round(Math.random() * 150 + 20);
        data0.shift();
        data0.push(temp);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);

        speedChart.setOption(option);
    }, 150000);


}

//贾超楠
//速度占比饼图
function dailySpeed() {
    //当当前图表不是一个空对象时需要销毁对象，否则会出现不能显示的情况
    if (speedLevel != null && speedLevel != '') {
        speedLevel.dispose();
    }

    speedLevel = echarts.init(document.getElementById('dailySpeed'), 'light');
    speedLevel.showLoading();
    var option = {
        // color: ['#FFCCCC', '#FFCC99', '#FFCCFF'],
        title: {
            text: '不同行驶速度时间占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['低速', '中速', '高速']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '低速'},
                    {value: 310, name: '中速'},
                    {value: 234, name: '高速'},
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

    speedLevel.setOption(option)
}

//贾超楠
//左二仪表盘
function style() {
    myChart = echarts.init(document.getElementById('chart1'), 'light');

    option = {
        tooltip: {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show: true,
            feature: {
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '速度',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 220,
                splitNumber: 11,
                radius: '50%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    backgroundColor: 'auto',
                    borderRadius: 2,
                    color: '#eee',
                    padding: 3,
                    textShadowBlur: 2,
                    textShadowOffsetX: 1,
                    textShadowOffsetY: 1,
                    textShadowColor: '#222'
                },
                title: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    formatter: function (value) {
                        value = (value + '').split('.');
                        value.length < 2 && (value.push('00'));
                        return ('00' + value[0]).slice(-2)
                            + '.' + (value[1] + '00').slice(0, 2);
                    },
                    fontWeight: 'bolder',
                    borderRadius: 3,
                    backgroundColor: '#444',
                    borderColor: '#aaa',
                    shadowBlur: 5,
                    shadowColor: '#333',
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                    borderWidth: 2,
                    textBorderColor: '#000',
                    textBorderWidth: 2,
                    textShadowBlur: 2,
                    textShadowColor: '#fff',
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 0,
                    fontFamily: 'Arial',
                    width: 100,
                    color: '#eee',
                    rich: {}
                },
                data: [{value: 40, name: 'km/h'}]
            },
            {
                name: '转速',
                type: 'gauge',
                center: ['20%', '55%'],    // 默认全局居中
                radius: '35%',
                min: 0,
                max: 7,
                endAngle: 45,
                splitNumber: 7,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 5
                },
                title: {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                },
                data: [{value: 1.5, name: 'x1000 r/min'}]
            },
            {
                name: '油表',
                type: 'gauge',
                center: ['77%', '50%'],    // 默认全局居中
                radius: '25%',
                min: 0,
                max: 2,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,
                    length: 10,        // 属性length控制线长
                    lineStyle: {        // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function (v) {
                        switch (v + '') {
                            case '0' :
                                return 'E';
                            case '1' :
                                return 'Gas';
                            case '2' :
                                return 'F';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 2
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [{value: 0.5, name: 'gas'}]
            },
            {
                name: '水表',
                type: 'gauge',
                center: ['77%', '50%'],    // 默认全局居中
                radius: '25%',
                min: 0,
                max: 2,
                startAngle: 315,
                endAngle: 225,
                splitNumber: 2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function (v) {
                        switch (v + '') {
                            case '0' :
                                return 'H';
                            case '1' :
                                return 'Water';
                            case '2' :
                                return 'C';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 2
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [{value: 0.5, name: 'gas'}]
            }
        ]
    };

    setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        option.series[1].data[0].value = (Math.random() * 7).toFixed(2) - 0;
        option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
        option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
        myChart.setOption(option, true);
    }, 2000);
}


//初始化
$(document).ready(function () {
    // clear();
    $(".sidebar-toggle").click();
    bdMap2(2);
    bdMap8();
    area();
    speeed();
    dailySpeed();
    style();
    $('#areaChart').resize(function () {
        areaChart.resize();
    });
    $('#speedChart').resize(function () {
        speedChart.resize();
    });
    $('#dailySpeed').resize(function () {
        speedLevel.resize();
    });
    $('#chart1').resize(function () {
        myChart.resize();
    })


});

//贾超楠
//搜索框搜索获取当前时间车辆位置
function index(style) {

    var x = $(" #search1").val();
    console.log(x);
    var long;
    var lat;
    //经度
    $.ajax({
        type: 'post',
        url: '/getCarLongitude',
        data: {'car_num': x},
        async: false,
        success: function (result3) {
            long = result3;
        }
    });
    //纬度
    $.ajax({
        type: 'post',
        url: '/getCarLatitude',
        data: {'car_num': x},
        async: false,
        success: function (result4) {
            lat = result4;
        }
    });
    if (x == '' || x == undefined || x == null) {
        map = new BMap.Map("vehicle");
        var point1 = new BMap.Point(longitude, latitude);
        map.centerAndZoom(point1, 17);
        // //添加目的地坐标
        map.addOverlay(new BMap.Marker(point1));
        //设置地图样式
        return map;
    } else {

        if (long == '' || long == undefined || long == null) {
            map = new BMap.Map("vehicle");
            var point1 = new BMap.Point(longitude, latitude);
            map.centerAndZoom(point1, 17);
            // //添加目的地坐标
            map.addOverlay(new BMap.Marker(point1));
            //设置地图样式
            return map;
        } else {
            // 创建地图实例
            map = new BMap.Map("vehicle");
            var point1 = new BMap.Point(long, lat);
            // 初始化地图，设置中心点坐标和地图级别,设置为17——100米
            map.centerAndZoom(point1, 17);
            // //添加目的地坐标
            map.addOverlay(new BMap.Marker(point1));
            //设置地图样式
            return map;
        }
    }
}

//贾超楠
//验证框
function proving() {
    // var type = $("#vehicleime").val();
    var type = $("#carId2").val();
    var long1;
    var lat1;
    //获得经度
    $.ajax({
        type: 'post',
        url: '/getCarLongitude',
        data: {'car_num': type},
        async: false,
        success: function (result1) {
            long1 = result1;
        }
    });
    $.ajax({
        type: 'post',
        url: '/getCarLatitude',
        data: {'car_num': type},
        async: false,
        success: function (result2) {
            lat1 = result2;
        }
    });
    var map1 = new BMap.Map("vehicle");
    var point1 = new BMap.Point(long1, lat1);
    // 初始化地图，设置中心点坐标和地图级别,设置为17——100米
    map1.centerAndZoom(point1, 17);
    // //添加目的地坐标
    map1.addOverlay(new BMap.Marker(point1));
    //设置地图样式
    return map1;

}








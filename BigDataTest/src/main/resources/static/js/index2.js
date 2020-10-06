// 历史轨迹

//经纬度坐标（默认长春市政府）
var point = null;
var longitude = 125.330253;//默认经度
var latitude = 43.822795;//纬度

$(document).ready(function(){
    //初始化
    var map = bdMap(2);
    // addLayer(map);

    //地图搜索时间
    $("#search-btn").click(function(){
        var value = $("#search-text").val();
        map = bdMap2(value);
    });
});
//陈开泰
function bdMap(style){
    // 创建地图实例
    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    if(point==null){
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    }else{
        point1 = point;
    }
    // 初始化地图，设置中心点坐标和地图级别,设置为17——100米
    map.centerAndZoom(point1, 12);
    map.enableScrollWheelZoom(true);
    // 覆盖区域图层测试
    map.addTileLayer(new BMap.PanoramaCoverageLayer());

    var stCtrl = new BMap.PanoramaControl(); //构造全景控件
    stCtrl.setOffset(new BMap.Size(20, 20));
    map.addControl(stCtrl);//添加全景控件
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
    map.addControl(new BMap.OverviewMapControl());
    //创建交通图层实例
    var traffic = new BMap.TrafficLayer();
    map.addTileLayer(traffic);
    // map.addControl(new BMap.GeolocationControl());
    if(style != 1){
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    }

    return map;
}

    function bdMap2(area){
    // 创建地图实例
    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    // if(point==null){
    //     // 创建中心点坐标
    //     point1 = new BMap.Point(longitude, latitude);
    // }else{
    //     point1 = point;
    // }
    // // 初始化地图，设置中心点坐标和地图级别,设置为17——100米
    // map.centerAndZoom(point1, 17);
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(area, function(a){
        if (a) {
            map.centerAndZoom(a, 17);
            map.addOverlay(new BMap.Marker(a));
        }else{
            map.centerAndZoom(point1, 17);
            alert("您选择地址没有解析到结果!");
        }
    }, "长春市");
    // map.enableScrollWheelZoom(true);
    // 覆盖区域图层测试
    map.addTileLayer(new BMap.PanoramaCoverageLayer());

    var stCtrl = new BMap.PanoramaControl(); //构造全景控件
    stCtrl.setOffset(new BMap.Size(20, 20));
    map.addControl(stCtrl);//添加全景控件
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
    map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    map.addControl(new BMap.OverviewMapControl());
    //创建交通图层实例
    var traffic = new BMap.TrafficLayer();
    map.addTileLayer(traffic);
    // map.addControl(new BMap.GeolocationControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

    return map;
}



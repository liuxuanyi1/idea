var province = null;
var city = null;
var district = null;
var date;
var page = null;
//经纬度坐标（默认长春理工大学南校区）
var point = null;
var longitude = 125.3202;//默认经度
var latitude = 43.836687;//纬度

//小车经纬度
var tempLongitude;
var tempLatitude;

//车流量数据图表对象
var myChart;
var myChart1;
var myChart2;
var myChart3;
var myChart4;
//陈开泰
//左侧列表
$(document).ready(function(){
    //陈开泰
    //数据在数据库的menu_list_model表中
    var data;
    $('#menuSet').hide();

    $.get("/menuList",function(data){
        // console.log(data.rows);
        $('#sm').sidemenu({
            width:'100%',
            floatMenuWidth:'100%',
            data:convert1(data.rows),
            onSelect:function(item){

                var text = item.text;

                if(text == "车流量数据"){
                    page = "车流量数据";
                    $('#timeChoose').hide();
                    $('#areaChoose').hide();
                    $('#container2').show();
                    $('#chart1').show();
                    $('#chart2').show();
                    $('#chart3').show();
                    $('#chart4').show();
                    $('#label').hide();
                    $('#label1').hide();
                    $('#label2').hide();
                    $('#carChoose').hide();

                    doEcharts();
                }else if(text == "路网流量") {
                    page = "路网流量";
                    $('#timeChoose').show();
                    $('#areaChoose').show();
                    $('#label').hide();
                    $('#label1').hide();
                    $('#label2').hide();
                    $('#dd3').show();
                    $('#carChoose').hide();
                    $('#container2').hide();
                    $('#dd1').hide();
                    $('#dd2').hide();
                    setValue();
                    $('#cc1').combobox('setValue','省份');
                    $('#cc2').combobox('setValue','市');
                    $('#cc3').combobox('setValue','区/县');

                }else if(text == "车辆检索"){

                    page = "车辆检索";
                     $('#timeChoose').show();
                    $('#areaChoose').show();
                    $('#label').hide();
                    $('#label1').hide();
                    $('#label2').hide();
                    $('#dd2').show();
                    $('#carChoose').hide();
                    $('#container2').hide();
                    $('#dd1').hide();
                    $('#dd3').hide();
                    setValue();
                    $('#cc1').combobox('setValue','省份');
                    $('#cc2').combobox('setValue','市');
                    $('#cc3').combobox('setValue','区/县');
                 //bdMap3();
                }
                else if(text == "历史轨迹"){
                    page = "历史轨迹";
                        //
                        $('#timeChoose').show();
                        $('#areaChoose').show();
                        $('#label').hide();
                        $('#label1').hide();
                        $('#label2').hide();
                        $('#dd1').show();
                        $('#carChoose').hide();
                        $('#container2').hide();
                        $('#dd2').hide();
                        $('#dd3').hide();
                        setValue();
                        $('#cc1').combobox('setValue','省份');
                        $('#cc2').combobox('setValue','市');
                        $('#cc3').combobox('setValue','区/县');
                   // bdMap4();
                }
            }
        });
        toggle();
    });

    //陈开泰
    //导航设置树
    $('#tt').tree({
        url: '/menuList',
        loadFilter: function(data){
            return convert1(data.rows)
        },
        animate: true,
        checkbox: true,
        onlyLeafCheck: true,
        lines: true,
    });
});

function setValue() {
    province=null;
    city=null;
    district=null;
}
function judge1() {

    if (province == null || city == null || district == null & page == '历史轨迹') {
        $.messager.alert('提示', '请将省市信息填写完整');
    }
    else {
        bdMap4();
    }
}
function judge2() {

    if (province == null || city == null || district == null & page == '车辆检索') {
        $.messager.alert('提示', '请将省市信息填写完整');
    }
    else {
        bdMap3();
    }
}
function judge3() {

    if(province == null || city == null ||district == null & page=='路网流量'){
        $.messager.alert('提示', '请将省市信息填写完整');
    }
    else{
        bdMap2();
    }
}

function index(){//检索方法
    var text = $('#search').textbox('getValue');
    if(province == null || city == null || page == null){
        if(page == null){
            $.messager.alert('提示', '请选中某一功能再行搜索地点信息');
        }else {
            $.messager.alert('提示', '请将省市信息填写完整');
        }
        reloadContainer2();
        return;
    }
    // // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(text, function(point1){
        point = point1;
        // console.log(point);
        if(page == "历史轨迹"){
            bdMap4();
        }else if(page == "车流量数据"){
            doEcharts();
        }else if(page == "路网流量"){

            $('#label').show();
            var map = bdMap2(2);
            addLayer(map);
        }else if(page == "车辆检索"){
            bdMap3();
//            var map = bdMap2(2do);
//            userSearch(map);
        }
    }, city);

    //重置地点信息
    province = null;
    city = null;
    district = null;
    point = null;

}

/**陈开泰*/
//树过滤为列表
function convert1(rows) {
    function exists(rows, parentId) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].id == parentId) return true;
        }
        return false;
    }

    var nodes = [];
    // 得到顶层节点
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row.parentId)) {
            nodes.push({
                id: row.id,
                text: row.name,
                iconCls:'icon-sum'
            });
        }
    }
    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        var node = toDo.shift();    // 父节点
        // 得到子节点
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.parentId == node.id) {
                var child = {id : row.id, text: row.name , iconCls:'icon-more' };
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}

function toggle(){;
    var opts = $('#sm').sidemenu('options');
    $('#sm').sidemenu('expand');
    opts = $('#sm').sidemenu('options');
    $('#sm').sidemenu('resize',{
        width:'100%'
    })
}

/**陈开泰*/
//左侧导航栏设置
function menuSet(){
    $('#win').window('open');
}



//陈开泰
//导入百度地图
function bdMap(){
    bdMap2(1);
}
//
// function sure() {
//
//
// }
//陈开泰
function bdMap2(style){
    // 创建地图实例
    $('#cc1').combobox('setValue','省份');
    $('#cc2').combobox('setValue','市');
    $('#cc3').combobox('setValue','区/县');
    $('#label').show();
    $('#areaChoose').hide();
    $('#timeChoose').hide();
    $('#label2').hide();
    $('#carChoose').hide();
    $('#dd1').hide();
    $('#dd2').hide();
    $('#dd3').hide();
    $('#container2').show();

    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    if(point==null){
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    }else{
        point1 = point;
    }
    // 初始化地图，设置中心点坐标和地图级别,设置为17——100米
    map.centerAndZoom(district, 17);
    //添加目的地坐标
    map.addOverlay(new BMap.Marker(point1));
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
    // map.addControl(new BMap.GeolocationControl());
    if(style != 1){
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    }

    return map;
}
//黄小莉、范鹏程
// 异步函数: async 函数返回的是一个promise 对象
async function bdMap3(){
    $('#cc1').combobox('setValue','省份');
    $('#cc2').combobox('setValue','市');
    $('#cc3').combobox('setValue','区/县');
    console.log("ok");
    $('#areaChoose').hide();
    $('#timeChoose').hide();
    $('#label2').show();
    $('#carChoose').hide();
    $('#dd1').hide();
    $('#dd2').hide();
    $('#dd3').hide();
    $('#container2').show();

    // 创建地图实例
    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    // 如果默认的位置为空，就使用自己的坐标
    if(point==null){
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    }else{
        point1 = point;
    }
    map.centerAndZoom(district, 17);
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
    map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    map.addControl(new BMap.OverviewMapControl());
    map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    //markers.addEventListener("click",attribute);
    var myIcon = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52, 26), {
        //         指定定位位置。
        //         当标注显示在地图上时，其所指向的地理位置距离图标左上
        //         角各偏移10像素和25像素。您可以看到在本例中该位置即是
        //         图标中央下端的尖角位置。
        anchor: new BMap.Size(27, 13),
        imageSize: new BMap.Size(52,26),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移
    });

    var myIcon_1 = new BMap.Icon('/img/car.png', new BMap.Size(80, 67), {
        //         指定定位位置。
        //         当标注显示在地图上时，其所指向的地理位置距离图标左上
        //         角各偏移10像素和25像素。您可以看到在本例中该位置即是
        //         图标中央下端的尖角位置。
        anchor: new BMap.Size(27, 13),
        imageSize: new BMap.Size(80,67),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移
    });
    //动态获取经度和纬度
    tempLongitude=await getLongitudeForBdMap3("A2A840");
    tempLatitude=await getLatitudeForBdMap3("A2A840");
    tempCarType=await getCarTpyeForBdMap3("A2A840");
    // 创建标注对象并添加到地图
    var marker = new BMap.Marker(new BMap.Point(tempLongitude,tempLatitude), {icon: myIcon});

    function attribute(){
        var p = marker.getPosition();  //获取marker的位置
    }
    marker.addEventListener("click",attribute);

    var marker_1 = new BMap.Marker(new BMap.Point(125.33253373465192,43.83861837062355), {icon: myIcon_1});
    // 添加监听事件用来显示车的位置
    function attribute_1(){
        var p = marker_1.getPosition();  //获取marker的位置
    }
    //marker_1.addEventListener("click",attribute_1)
    // 画直线
    var polyline = new BMap.Polyline([
        new BMap.Point(123.32065555,43.8788625),
        new BMap.Point(125.327277839,43.8390000),
        new BMap.Point(125.33214242,43.83906726838)
    ],{
        strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5   //创建折线
    });

    map.addOverlay(polyline);  //增加折线
    // 增加标注点
    map.addOverlay(marker);
    map.addOverlay(marker_1);

    // 拖动小车
    marker.enableDragging();
    marker_1.enableDragging();
}

$('#ee1').combobox({
    url:'combobox_data.json',
    valueField:'id',
    textField:'text'
});
$('#ee2').combobox({
    url:'combobox_data.json',
    valueField:'id',
    textField:'text'
});
$('#ee3').combobox({
    url:'combobox_data.json',
    valueField:'id',
    textField:'text'
});

function cartype() {
    $("#carChoose").show();
   $("#container2").show();
   $("#label2").hide();
}

// function theLocation(){
//     // 百度地图API功能
//     var map = new BMap.Map("container2");
//     //var poi
// nt = new BMap.Point(116.331398, 39.897445);
//     //map.centerAndZoom(point, 11);
//     //$(".selector").find("option:contains('cc3')").attr("selected",true);
//     //var name = document.getElementById("cc3").value;
//     // var  text=$("#cc3").val($("#testselect option:selected").text());
//     // var itemValue1 = document.getElementById("cc3").value;
//     //
//     // alert('Value:' + itemValue1);
//     // var name= $("#cc3").attr("selected", true);
//     // alert(name);
//     map.centerAndZoom(district,15);  // 用城市名设置地图中心点
//     //var name= $("#cc3").find("option:selected").val();
//
//     map.enableDragging();
//     $('#label1').show();
// }

// // 百度地图动态行驶轨迹
//     var map = new BMap.Map("container2");
//       // 创建Map实例
//    // var name = $("#cc3").find("option:selected");
//     var name= $("#cc3").find("option:selected").val();
//     map.centerAndZoom(name,15);
//     map.enableDragging();
//     map.centerAndZoom(17);

function bdMap4() {
    // 百度地图动态行驶轨迹
    $('#cc1').combobox('setValue','省份');
    $('#cc2').combobox('setValue','市');
    $('#cc3').combobox('setValue','区/县');
    $('#label1').show();
    $('#container2').show();
    $('#areaChoose').hide();
    $('#timeChoose').hide();
    $('#label2').hide();
    $('#carChoose').hide();
    $('#dd1').hide();
    $('#dd2').hide();
    $('#dd3').hide();

    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    // 如果默认的位置为空，就使用自己的坐标
    if (point == null) {
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    } else {
        point1 = point;
    }
    map.centerAndZoom(district, 15);
    map.centerAndZoom(point1, 15);
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    // 单击事件监听,弹出经纬度
    // alertPOI(map);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
}
//黄小利、陈开泰
//加“显示最近一次历史轨迹”按钮实现小车和路线
function bdMap8(){
    // 百度地图动态行驶轨迹
    $('#cc1').combobox('setValue','省份');
    $('#cc2').combobox('setValue','市');
    $('#cc3').combobox('setValue','区/县');
    $('#areaChoose').hide();
    $('#timeChoose').hide();
    $('#label2').hide();
    $('#carChoose').hide();
    $('#dd1').hide();
    $('#dd2').hide();
    $('#dd3').hide();
    $('#container2').show();

    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    // 如果默认的位置为空，就使用自己的坐标
    if (point == null) {
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    } else {
        point1 = point;
    }
    map.centerAndZoom(point1, 17);
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    // 单击事件监听,弹出经纬度
    // alertPOI(map);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
    map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    map.addControl(new BMap.OverviewMapControl());
    map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    var myPs = new Array();//所有路径点
    var pathWay = [];//自定义格式途径点
    var pathWay2 = [];//point格式途径点

    myPs[0] = new BMap.Point(125.32167899887084, 43.836795993705664);
    myPs[1] = new BMap.Point(125.32221232157663, 43.83487070023063);
    myPs[2] = new BMap.Point(125.32521266197995, 43.835982669257625);
    myPs[3] = new BMap.Point(125.32289503376421, 43.838063490906556);
    myPs[4] = new BMap.Point(125.32226621990722, 43.837127130207605);

    for(var i = 1; i< myPs.length-1; i++){
        var temp = myPs[i];
        pathWay.push({
            lng: temp.lng,
            lat: temp.lat,
            html: '途径点'+i,
            pauseTime: 0
        });
        pathWay2.push(temp);
    }


    var width = map.getZoom()*2.6;
    var height = map.getZoom()*1.3;

    var myIcon = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(width,height), {
        anchor : new BMap.Size(width/2, height/2),
        imageSize:new BMap.Size(width,height),
    });

    //改变车的大小
    // myIcon.setSize(new BMap.Size(104,52));
    // myIcon.setImageSize(new BMap.Size(104,52));

    var marker = new BMap.Marker(new BMap.Point(125.31987661001632,43.83861837062355), {icon: myIcon});
    map.addOverlay(marker);   // 添加标识
    var arrPois = [];
    var road = [];

    var driving2 = new BMap.DrivingRoute(map, {
        renderOptions:{map: map, autoViewport: true, enableRotation:true},
        onSearchComplete:function(res){
            if(driving2.getStatus() == 0){
                map.clearOverlays();
                var plan = res.getPlan(0);

                for(var j=0;j<plan.getNumRoutes();j++){
                    var route = plan.getRoute(j);
                    arrPois= arrPois.concat(route.getPath());
                }

                map.addOverlay(new BMap.Polyline(arrPois, {strokeColor:'#111'}));
                map.setViewport(arrPois);//定位，
                console.log(arrPois)
                lushu = new BMapLib.LuShu(map, arrPois, {
                    icon: myIcon,
                    speed:500,
                    enableRotation:true,
                    landmarkPois: pathWay,
                    autoView: true
                });
                road = arrPois;
            }
        },
        onPolylinesSet:function(result){
            //map.clearOverlays();
            lushu.start();
            // setTimeout(function () {
            //     arrPois = arrPois.slice(1, arrPois.length);
            //     console.log("arrPois:" + arrPois.length)
            // }, 200)
        },
        onMarkersSet:function(pois){
            //这里处理途径点图像问题
            console.log(pois);
        }
    });
    //驾车实例
    if(myPs.length >= 2){
        driving2.search(myPs[0], myPs[myPs.length-1],{waypoints:pathWay2});
        // console.log(pathWay2);
    }

    map.addEventListener("zoomend", function () {
        lushu.stop();

        var width = map.getZoom()*2.6;
        var height = map.getZoom()*1.3;

        var myIcon2 = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(width,height), {
            anchor : new BMap.Size(width/2, height/2),
            imageSize:new BMap.Size(width,height),
        });

        var opts = {
            icon: myIcon2,
            speed:100,
            enableRotation:true,
            landmarkPois: pathWay,
            autoView: true
        }

        arrPois = arrPois.slice(lushu.getNowIndex()+1, lushu.length);

        lushu._setOptions(opts);
        lushu._path = arrPois;
        lushu.start();
        bdMap7();
    })
}
function bdMap9() {
    lushu.pause();
}
function  bdMap10() {
    lushu.stop();
}

function hide() {
    lushu.hideInfoWindow();
}
function show() {
    lushu.showInfoWindow();
}


function bdMap7(){
    // 百度地图动态行驶轨迹
    var map = new BMap.Map("container2");
    var point1 = new BMap.Point(longitude, latitude);
    // 如果默认的位置为空，就使用自己的坐标
    if (point == null) {
        // 创建中心点坐标
        point1 = new BMap.Point(longitude, latitude);
    } else {
        point1 = point;
    }
    map.centerAndZoom(point1, 17);
    //设置允许鼠标滑轮缩放操作
    map.enableScrollWheelZoom(true);
    // 单击事件监听,弹出经纬度
    // alertPOI(map);
    //取消双击事件
    map.disableDoubleClickZoom();
    //添加控件
    map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM}));
    map.addControl(new BMap.OverviewMapControl());
    map.setCurrentCity("长春市"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
    var myPs = new Array();//所有路径点
    var pathWay = [];//自定义格式途径点
    var pathWay2 = [];//point格式途径点

    myPs[0] = new BMap.Point(125.318977,43.835672);
    myPs[1] = new BMap.Point(125.319013,43.83666);
    myPs[2] = new BMap.Point(125.319031,43.837739);
    myPs[3] = new BMap.Point(125.320262,43.837886);
    myPs[4] = new BMap.Point(125.320235,43.838432);

    for(var i = 1; i< myPs.length-1; i++){
        var temp = myPs[i];
        pathWay.push({
            lng: temp.lng,
            lat: temp.lat,
            html: '途径点'+i,
            pauseTime: 0
        });
        pathWay2.push(temp);
    }


    var width = map.getZoom()*2.6;
    var height = map.getZoom()*1.3;

    var myIcon = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(width,height), {
        anchor : new BMap.Size(width/2, height/2),
        imageSize:new BMap.Size(width,height),
    });

    //改变车的大小
    // myIcon.setSize(new BMap.Size(104,52));
    // myIcon.setImageSize(new BMap.Size(104,52));

    var marker = new BMap.Marker(new BMap.Point(125.31987661001632,43.83861837062355), {icon: myIcon});
    map.addOverlay(marker);   // 添加标识
    var arrPois = [];
    var road = [];

    var driving2 = new BMap.DrivingRoute(map, {
        renderOptions:{map: map, autoViewport: true, enableRotation:true},
        onSearchComplete:function(res){
            if(driving2.getStatus() == 0){
                map.clearOverlays();
                var plan = res.getPlan(0);

                for(var j=0;j<plan.getNumRoutes();j++){
                    var route = plan.getRoute(j);
                    arrPois= arrPois.concat(route.getPath());
                }

                map.addOverlay(new BMap.Polyline(arrPois, {strokeColor:'#111'}));
                map.setViewport(arrPois);//定位，
                console.log(arrPois)
                lushu = new BMapLib.LuShu(map, arrPois, {
                    icon: myIcon,
                    speed:500,
                    enableRotation:true,
                    landmarkPois: pathWay,
                    autoView: true
                });
                road = arrPois;
            }
        },
        onPolylinesSet:function(result){
            //map.clearOverlays();
            lushu.start();
            // setTimeout(function () {
            //     arrPois = arrPois.slice(1, arrPois.length);
            //     console.log("arrPois:" + arrPois.length)
            // }, 200)
        },
        onMarkersSet:function(pois){
            //这里处理途径点图像问题
            console.log(pois);
        }
    });
    //驾车实例
    if(myPs.length >= 2){
        driving2.search(myPs[0], myPs[myPs.length-1],{waypoints:pathWay2});
        // console.log(pathWay2);
    }

    map.addEventListener("zoomend", function () {
        lushu.stop();

        var width = map.getZoom()*2.6;
        var height = map.getZoom()*1.3;

        var myIcon2 = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(width,height), {
            anchor : new BMap.Size(width/2, height/2),
            imageSize:new BMap.Size(width,height),
        });

        var opts = {
            icon: myIcon2,
            speed:100,
            enableRotation:true,
            landmarkPois: pathWay,
            autoView: true
        }

        arrPois = arrPois.slice(lushu.getNowIndex()+1, lushu.length);

        lushu._setOptions(opts);
        lushu._path = arrPois;
        lushu.start();
    })
}



//陈开泰
//为地图添加查流量图层
function addLayer(map){
    //创建交通图层实例
    var traffic = new BMap.TrafficLayer();
    map.addTileLayer(traffic);
}

//陈开泰
//数据检索
function userSearch(map){
    //用鼠标绘制圆形区域
    var drawingManager = new BMapLib.DrawingManager(map, {
//使用鼠标工具需要引入鼠标工具开源库DrawingManager_min.js及样式文件DrawingManager_min.css
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            scale: 0.8 //工具栏缩放比例
        }
    });
    drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
    drawingManager.open();

    //在鼠标画圆结束后回调函数内进行周边检索
    drawingManager.addEventListener('circlecomplete', function(e) {
        circle = e;
        var radius= parseInt(e.getRadius()); //检索半径必须是整型
        var center= e.getCenter();
        drawingManager.close();
        if (customLayer) {
            map.removeTileLayer(customLayer);
        }
        localSearch.searchNearby(' ', center,radius,{customData:{databoxId: 4032}});//用新创建的databoxid替换该值
    });
}

//陈开泰
//添加数据可视化echarts组件
function doEcharts(){

    if (myChart != null && myChart != ''){
        myChart.dispose();
    }

    // var arr = [];
    // ($(document).ready(function () {
    //     $.ajax({
    //         url: "/getVehicleCount2",
    //         async: true,
    //         timeout: 50000,
    //         data:[],
    //         dataType: 'json',
    //         success: function (json) {
    //             for (var i = 0; i < 6; i++){
    //                 arr.push(json[i])
    //             }
    //             myChart.hideLoading()
    //             // 使用刚指定的配置项和数据显示图表。
    //             myChart.setOption(option, {
    //                 lazyUpate: true
    //             });
    //         },
    //         error: function (error) {
    //             alert('数据请求失败!')
    //         }
    //     });
    //     return arr;
    // }))
    // alert(arr);
    //背景色加深
    $('#container2').css('background-color', 'rgba(204,204,204,0.8)');
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('container2'));

    // 指定图表的配置项和数据
    // var option = {
    //     //     title: {
    //     //         text: '车流量统计'
    //     //     },
    //     //     tooltip: {},
    //     //     legend: {
    //     //         data:['流量']
    //     //     },
    //     //     xAxis: {
    //     //         data: ["轿车","公交车","摩托车","罐车","邮政车","出租车"]
    //     //     },
    //     //     yAxis: {},
    //     //     series: [{
    //     //         name: '数量',
    //     //         type: 'bar',
    //     //         data: [7, 4, 5, 9, 8, 7]
    //     //     }]
    //     // };

    var dataAll = [
        [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
        ],
        [
            [10.0, 9.14],
            [8.0, 8.14],
            [13.0, 8.74],
            [9.0, 8.77],
            [11.0, 9.26],
            [14.0, 8.10],
            [6.0, 6.13],
            [4.0, 3.10],
            [12.0, 9.13],
            [7.0, 7.26],
            [5.0, 4.74]
        ],
        [
            [10.0, 7.46],
            [8.0, 6.77],
            [13.0, 12.74],
            [9.0, 7.11],
            [11.0, 7.81],
            [14.0, 8.84],
            [6.0, 6.08],
            [4.0, 5.39],
            [12.0, 8.15],
            [7.0, 6.42],
            [5.0, 5.73]
        ],
        [
            [8.0, 6.58],
            [8.0, 5.76],
            [8.0, 7.71],
            [8.0, 8.84],
            [8.0, 8.47],
            [8.0, 7.04],
            [8.0, 5.25],
            [19.0, 12.50],
            [8.0, 5.56],
            [8.0, 7.91],
            [8.0, 6.89]
        ]
    ];

    var option = {
        title: {
            text: '车流量数据',
            x: 'center',
            y: 0
        },
        grid: [
            {x: '7%', y: '7%', width: '38%', height: '38%'},
            {x2: '7%', y: '7%', width: '38%', height: '38%'},
            {x: '7%', y2: '7%', width: '38%', height: '38%'},
            {x2: '7%', y2: '7%', width: '38%', height: '38%'}
        ],
        tooltip: {
            formatter: 'Group {a}: ({c})'
        },
        xAxis: [
            {gridIndex: 0, min: 0, max: 20},
            {gridIndex: 1, min: 0, max: 20},
            {gridIndex: 2, min: 0, max: 20},
            {gridIndex: 3, min: 0, max: 20}
        ],
        yAxis: [
            {gridIndex: 0, min: 0, max: 15},
            {gridIndex: 1, min: 0, max: 15},
            {gridIndex: 2, min: 0, max: 15},
            {gridIndex: 3, min: 0, max: 15}
        ],
        series: [
            {
                name: 'I',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: dataAll[0],
                // markLine: markLineOpt
            },
            {
                name: 'II',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: dataAll[1],
                // markLine: markLineOpt
            },
            {
                name: 'III',
                type: 'scatter',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data: dataAll[2],
                // markLine: markLineOpt
            },
            {
                name: 'IV',
                type: 'scatter',
                xAxisIndex: 3,
                yAxisIndex: 3,
                data: dataAll[3],
                // markLine: markLineOpt
            }
        ]
    };

    myChart.setOption(option);
    window.onresize =function () {
        myChart.resize();
    }

    // myChart.showLoading('default',{
    //     text: '加载中.....',
    //     color: '#c23531',
    //     textColor: '#000',
    //     maskColor: 'rgba(255, 255, 255, 0.8)',
    //     zlevel: 0
    // })
}
function myCharts() {
    $('#container2').show();
    $('#carChoose').hide();
    if (myChart4 != null && myChart4 != ''){
        myChart4.dispose();
    }
    $('#container2').css('background-color', 'rgba(204,204,204,0.8)');
    myChart4 = echarts.init(document.getElementById(''));

    var option = {
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [89.3, 90, '周一'],
                [57.1, 75, '周二'],
                [74.4, 66, '周三'],
                [50.1, 89, '周四'],
                [89.7, 120, '周五'],
                [68.1, 140, '周六'],
                [19.6, 99, '周日'],
            ]
        },
        grid: {containLabel: true},
        xAxis: {name: '数量'},
        yAxis: {type: 'category'},
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['高', '低'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#D7DA8B', '#E15457']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
    };

    myChart4.setOptions(option)
}

function csdjas() {
    if(district.isEmptyObject()){ // 普通对象使用 for...in 判断，有 key 即为 false
        console.log("为空");
    }
    else{
        bdMap4();
    }
}
//陈开泰
//加载日期地点框
function reloadContainer2(){
    $('#container2').html(function(){
        $('#container2').css('background-color', 'rgba(204,204,204,0.4)');
        return "<!--时间选择框-->\n" +
            "            <div id=\"timeChoose\" style=\"width: 80%; height: 47%; margin: 2.5%; padding-top: 10%; padding-left:15%; margin-left: 10%;\">\n" +
            "                <h3>请选择日期以及时间：</h3>\n" +
            "                <!--日期时间框-->\n" +
            "                <input id=\"dt\" type=\"text\" style=\"width: 60%;\">\n" +
            "            </div>\n" +
            "\n" +
            "            <!--地点选择框-->\n" +
            "            <div id=\"areaChoose\" style=\"width: 80%; height: 47%; margin: 2.5%; padding-left:15%; margin-left: 10%\">\n" +
            "                <!--<h3>请选择地点信息：</h3>-->\n" +
            "\n" +
            "                <!--&lt;!&ndash;地点选择框&ndash;&gt;-->\n" +
            "                <!--<input id=\"pb1\" type=\"text\" title=\"省：\" style=\"width: 31%; margin: 1%; padding: 0px\">-->\n" +
            "                <!--<input id=\"pb2\" type=\"text\" title=\"市/县：\" style=\"width: 31%; margin: 1%; padding: 0px\">-->\n" +
            "                <!--<input id=\"pb3\" type=\"text\" title=\"区：\" style=\"width: 31%; margin: 1%; padding: 0px\">-->\n" +
            "                <div style=\"width: 24%; height: 100%; margin: 0px; padding: 0px; margin-right: 1%; float: left\">\n" +
            "                    <h3>省份</h3>\n" +
            "                    <input id=\"cc1\" value=\"省份\">\n" +
            "                </div>\n" +
            "\n" +
            "                <div style=\"width: 24%; height: 100%; margin: 0px; padding: 0px; margin-right: 1%; float: left\">\n" +
            "                    <h3>市/县</h3>\n" +
            "                    <input id=\"cc2\" value=\"市\">\n" +
            "                </div>\n" +
            "\n" +
            "                <div style=\"width: 24%; height: 100%; margin: 0px; padding: 0px; margin-right: 1%; float: left\">\n" +
            "                    <h3>区/县</h3>\n" +
            "                    <input id=\"cc3\" value=\"区/县\">\n" +
            "                </div>\n" +
            "\n" +
            "            </div>";
    });

    loadCenter();
}


//陈开泰
function loadCenter(){
    // 时间日期选择框
    $("#dt").datetimebox({
        showSeconds: true,
        required:true,
        onChange:function(data){
            date = $('#dt').datetimebox('getValue');
            // console.log(date);
        }});

    //地点选择框
    $('#cc1').combobox({
        url:'/getPro',
        valueField:'id',
        textField:'name',
        width:'100%',
        editable:false,
        onSelect:function(record){//加载城市下拉框
            // console.log(record);
            var proId = record.id;
            province = record.name;

            $('#cc2').combobox({
                url:'/getCity?id='+proId,

                onSelect:function(record2){//加载区下拉框
                    var cityId = record2.id;
                    city = record2.name;

                    $('#cc3').combobox({
                        url:'/getDis?id='+cityId,
                        onSelect:function(record3){
                            district = record3.name;
                            // console.log(province,city,district);
                        }
                    })
                }
            })
        }
    });

    $('#cc2').combobox({
        editable:false,
        valueField:'id',
        textField:'name',
        width:'100%'
    });

    $('#cc3').combobox({
        editable:false,
        valueField:'id',
        textField:'name',
        width:'100%'
    });
}

function sure() {
    if(district=null){
        alert("请选择地区后再进行确定");
    }
    else{
        bdMap3();
    }
}
//陈开泰
//获取经度和纬度
function getLongitude(data){
    var carNum = data;
    var getLongitudeResult;
    $.get('/getCarLongitude',{id:carNum},function(result){
        return result;
    });
}

//author: 黄小利
//Date: 2019/8/29
//bdMap3在调用<getLongitude>时，存在返回值为 undefined 的情况
//在此使用 async/await 方法针对本问题重构了函数
//使用案例可以参考
//1.   url: https://www.jianshu.com/p/1e75bd387aa0
//2.   url：https://www.jb51.net/article/100661.htm
//TODO:原函数可能在其他被调用处，也发生了类似bug，但是还未查证
function getLongitudeForBdMap3(data){
    var carNum = data;
    var resultL=null;
    // promise 回调函数
    return new Promise(function(resolve){
        $.get('/getCarLongitude',{car_num:carNum},function(result){
            resolve(result) ;
        });
    })
}

//陈开泰、黄小利
function getLatitude(data){
    var carNum = data;
    var resultL=null;
    $.get('/getCarLatitude',{car_num:carNum},function(result){
        return result;
    });
}
//黄小利
function getLatitudeForBdMap3(data){
    var carNum = data;
    var resultL=null;
    return new Promise(function(resolve){
        $.get('/getCarLatitude',{car_num:carNum},function(result){
            resolve(result) ;
        });
    })
}


//获得车型
//黄小利
function getCarTpyeForBdMap3(data){
    // console.log("getCarTpyeForBdMap3");
    var carNum = data;
    var resultL=null;
    return new Promise(function(resolve){
        $.get('/getCarType',{car_num:carNum},function(result){
            resolve(result) ;
        });
    })
}

//点击弹出经纬度
function alertPOI(map){
    map.addEventListener("click", function(e){
        alert(e.point.lng + ", " + e.point.lat);
    });
}
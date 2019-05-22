<template>
    <div class="main">
        <el-button type="primary" @click.stop="goBack" class="goBack">返回</el-button>
        <div class="mapWrap">
            <el-amap ref="map" vid="amap" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugins"
                     :map-manager="amapManager" :events="events"
            >   
                <!-- 点坐标 -->
                <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"
                                :visible="marker.visible" :draggable="marker.draggable" :icon="marker.icon"
                                :offset="marker.offset" :angle="marker.angle"
                                :content="marker.content" :title="marker.title"
                >
                </el-amap-marker>
                
                <!-- 折线 -->
                <el-amap-polyline :path="polyline.path" :events="polyline.events"></el-amap-polyline>

                <!-- 窗体信息 -->
                <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible"
                                     :content="window.content"></el-amap-info-window>
            </el-amap>
        </div>
    </div>
</template>

<script>

    import {AMapManager} from 'vue-amap';
    import {mapGetters, mapActions} from 'vuex'
    import {parseTime, angle} from '../../../assets/js/util'
    import * as actions from '../../store/modules/vehiclelocu/actions'


    let amapManager = new AMapManager();
    export default {
        data() {
            let self = this;
            return {
                zoom: 16,
                center: [121.516, 31.2729], // 31.2729 121.516
                amapManager,
                events: {
                    init(map) {
                    }
                },
                plugins: [

                    {
                        pName: 'OverView',
                        events: {
                            init(instance) {
                            }
                        },
                        isOpen: true,
                    },
                    {
                        pName: 'ToolBar',
                        events: {
                            init(instance) {
                            }
                        }
                    },
                ],


                // 窗体信息
                windows: [],

                // 点坐标
                markers: [],

                strContent: "",

                // 折线
                polyline: {
                    path: [],
                    events: {
                        click(e) {
                            console.log(self.windows);
                            self.$nextTick(() => {
                                let windows = [];
                                self.windows = [];
                                let lng = e.lnglat.lng;
                                let lat = e.lnglat.lat;
                                windows.push({
                                    position: [lng, lat],
                                    content: `<div class="prompt">${self.strContent}</div>`,
                                    visible: true
                                });
                                self.windows = windows;
                            })
                        },
                        end: (e) => {
                            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                            console.log(newPath);
                        }
                    },
                    editable: false,
                },
                inputApplyNo: "",
                inputHistoryEndTime: "",
                inputHistoryStartTime: "",
                cbResPlace: [],
            }
        },
        methods: {
            goBack(){
                history.go(-1);
            },
            
            
            // 对地图添加线的方法
            mapPolyline(res){
                let _this = this;
                let start = null;
                let end = null;
                let markerPosition = [];
                _this.polyline.path = [];
                _this.markers = [];
                let middle = 0;
                if (res.length % 2 === 0) {
                    //偶
                    middle = res.length / 2
                } else {
                    //奇
                    middle = (res.length - 1) / 2
                }
                this.$nextTick(() => {
                    $.each(res, (i, v) => {
                        // latitude 纬度 x
                        // longitude 经度 y
                        markerPosition.push([res[i].longitude, res[i].latitude]);
                        let marker = {
                            events: {},
                            position: [res[i].longitude, res[i].latitude],
                            icon: "../../../assets/image/gray_car.gif",
                            offset: [-15, -34],
                            angle: 0,
                        };



                        if (i === middle) {
                            // 中点添加折线
                            let windows = [];
                            _this.windows = [];
                            windows.push({
                                position: [res[i].longitude, res[i].latitude],
                                content: `<div class="prompt">${_this.strContent}</div>`,
                                visible: true
                            });
                            _this.windows = windows;
                            console.log(_this.windows);
                            // 只添加第一个点和最后一个点
                            _this.center = [res[i].longitude, res[i].latitude];
                            _this.zoom = 14;
                        }
                        if (i === res.length - 1 || i === 0) {
                            _this.markers.push(marker);
                        }
                        if (i === 1 || i === 0) {
                            start = {
                                start: {
                                    x: res[0].latitude,
                                    y: res[0].longitude,
                                },
                                end: {
                                    x: res[1].latitude,
                                    y: res[1].longitude,
                                }
                            }
                        }
                        if (i === res.length - 1 || i === res.length - 2) {
                            end = {
                                start: {
                                    x: res[res.length - 1].latitude,
                                    y: res[res.length - 1].longitude,
                                },
                                end: {
                                    x: res[res.length - 2].latitude,
                                    y: res[res.length - 2].longitude,
                                }
                            }
                        }
                        _this.polyline.path.push(marker.position);


                    })

                    let startAngle = angle(start.start, start.end);
                    let endAngle = angle(end.start, end.end);
                    _this.markers.forEach((v, i) => {
                        let length = _this.markers.length;
                        if (i === 0) {
                            v.angle = startAngle;
                        }
                        if (i === length - 1) {
                            v.angle = endAngle;
                        }
                    })
                    // 获取地图实例
//                    const map = _this.$refs.map.$$getInstance();
//                    console.log(markerPosition)
//                    map.setFitView(markerPosition);
//                    console.log(map);

                })
            },
            // 清空地图
            clearMap(){
                let map = this.$refs.map.$$getInstance();
                map.clearMap();
            },
            //action方法
            ...mapActions([
                'vehiclelocuQueryLocuByTime',
                'queryVehicleByLicensePlatNumber',

                // position
                'queryVehicleLocu', 
                'findByApplyId',
            ]),
        },
        computed: {
            ...mapGetters({
                getVehicleLocuHistory: "getVehicleLocuHistory",
                getVehicleLicensePlatNumber: "getVehicleLicensePlatNumber",

                currentHodometer: 'getCurrentApply',        //行程查询模块 => apply
                getVehicleLocus: 'getVehicleLocus',
            })
        },
        mounted() {
            // 跳转之后
            let id = this.$router.currentRoute.query.id;
            let _this = this;
            if (id !== "" && id !== undefined) {

                _this.findByApplyId({id: id}).then(() => {

                    let res = _this.currentHodometer;       //直接用计算属性

                    console.log("行程查询数据获取成功",res);
                    res.startTime = parseTime(res.startTime);
                    res.endTime = parseTime(res.endTime);
                    let [applyNo, startTime, endTime] = [res.applyNo, res.startTime, res.endTime];

                    let str = `<p class = "mapApplyNo"><span>${res.applyNo}</span></p>
                            <div class = "mapTime">
                                <p class = "mapTimeTo">
                                    <span class = "startPlace">起点 :</span>
                                    <b> ${res.startPlaceInfo.name}</b>
                                </p>
                                <p class = "mapTimeTo"><span>起始时间 :</span><b> ${res.startTime}</b></p>
                                <p class = "mapTimeTo">
                                    <span class = "endPlace">终点 :</span>
                                    <b> ${res.endPlaceInfo.name}</b>
                                </p>
                                <p class = "mapTimeTo"><span>结束时间 :</span><b> ${res.endTime}</b></p>
                            </div>
                            `;

                    _this.strContent = str;

                    _this.queryVehicleLocu({id: id}).then(() => {
                        let res = _this.getVehicleLocus;
                        _this.mapPolyline(res);
                    });
                })

            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .main {
        margin: 10px 10px 0 10px;
        position: absolute;
        top: 66px;
        width: calc(100% - 20px);
        height: calc(100% - 76px);
        background: #f2f2f2;
        box-sizing: border-box;
        .mapWrap {
            width: 100%;
            height: calc(100% - 10px);
            background: #fff;
            position: relative;
        }
        .goBack {
            position: absolute;
            z-index: 999;
            left: 82px;
            margin-top: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, .25);
        }
        .amap-demo {
            position: absolute;
            top: 10px;
            bottom: 10px;
            left: 10px;
            right: 10px;
            height: calc(100% - 20px);
        }
    }

</style>

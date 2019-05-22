<template>
    <div class="main">
        <div class="searchHistoryLocu">
            <el-date-picker
                    v-model="inputHistoryStartTime"
                    type="datetime"
                    :editable = false
                    style="margin-bottom: 10px;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请输入轨迹开始时间">
            </el-date-picker>

            <el-date-picker
                    v-model="inputHistoryEndTime"
                    :editable = false
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请输入轨迹结束时间">
            </el-date-picker>

            <el-autocomplete
                    v-model="inputApplyNo"
                    :fetch-suggestions="querySearchPlace"
                    :trigger-on-focus="false"
                    @select="handleSelectPlace"
                    placeholder="请输入要查询的车牌号码"
            ></el-autocomplete>

            <el-button type="primary" @click="searchHistory">查找</el-button>
        </div>
        <el-amap ref="map" vid="amap" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugins"
                 :map-manager="amapManager" :events="events"
        >
            <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"
                            :visible="marker.visible" :draggable="marker.draggable" :icon="marker.icon"
                            :offset="marker.offset" :angle="marker.angle"
                            :content = "marker.content" :title = "marker.title"
            >
            </el-amap-marker>
            <el-amap-polyline :path="polyline.path" :events="polyline.events"></el-amap-polyline>
            <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible"
                                 :content="window.content"></el-amap-info-window>
        </el-amap>
    </div>
</template>

<script>
    import {AMapManager} from 'vue-amap';
    import {mapGetters, mapActions} from 'vuex'
    import {parseTime,angle} from '../../../assets/js/util'
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
                windows: [],
                markers:[],
                strContent: "",
                polyline: {
                    path: [],
                    events: {
                        mouseover(e) {
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
                        mouseout(e){
                            self.$nextTick(() => {
                                console.log(self.windows)
                                self.windows[0].visible = false;
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
            // 点击查询
            querySearchPlace(queryString, cb) {
                let _this = this;
                this.cbResPlace = [];
                let res = this.getVehicleLicensePlatNumber;
                console.log(res);
                $.each(res, function (i, v) {
                    let inputLicensePlatNumber = res[i].licensePlatNumber;
                    _this.cbResPlace.push({
                        value: inputLicensePlatNumber,
                    })
                })
                let results = queryString ? _this.cbResPlace.filter(this.createStateFilter(queryString)) : _this.cbResPlace;
                cb(results);
            },
            createStateFilter(queryString) {
                return (state) => {


                    return (state.value.indexOf(queryString) === 0);
                };
            },
            handleSelectPlace(item) {
                this.inputApplyNo = item.value;
            },
            // 对地图添加线的方法
            mapPolyline(res){

                let _this = this;
                let start = null;
                let end = null;
                let markerPosition = [];
                _this.polyline.path = [];
                _this.markers = [];
                this.$nextTick(() => {
                    $.each(res, (i, v) => {
                        // latitude 纬度 x
                        // longitude 经度 y
                        markerPosition.push([res[i].longitude, res[i].latitude]);
                        let marker = {
                            events: {
                            },
                            position: [res[i].longitude, res[i].latitude],
                            icon: "../../../assets/image/gray_car.gif",
                            offset: [-15, -34],
                            angle: 0,
                        };
                        // 只添加第一个点和最后一个点
                        _this.center = [res[0].longitude, res[0].latitude];
                        _this.zoom = 16;
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
                            v.angle = startAngle + 180;
                        }
                        if (i === length - 1) {
                            v.angle = endAngle;
                        }
                    })
                })

            },
            // 搜索
            searchHistory(){
                let _this = this;
                let inputHistoryEndTime = this.inputHistoryEndTime;
                let inputHistoryStartTime = this.inputHistoryStartTime;
                let newStartTime = new Date(inputHistoryStartTime);
                let newEndTime = new Date(inputHistoryEndTime);
                let val = this.inputApplyNo;
                if (val !== "" && inputHistoryStartTime !== "" && inputHistoryEndTime !== "") {
                    if(newEndTime <= newStartTime){
                        this.$message({
                            showClose: true,
                            message: '时间区间填写有误！',
                            type: 'error'
                        });
                    }else{
                        _this.vehiclelocuQueryLocuByTime({
                            licensePlatNumber:val,
                            startTime: `${inputHistoryStartTime}`,
                            endTime: `${inputHistoryEndTime}`,
                        }).then(() => {
                            // getVehicleLocuHistory
                            let res = _this.getVehicleLocuHistory;
                            let len = res.length - 1;
                            console.log(res);
                            _this.mapPolyline(res);
                            res.startTime = parseTime(res[0].createdTime);
                            res.endTime = parseTime(res[len].createdTime);
                            let [cardNumber, startTime, endTime] = [res[0].cardNumber, res.startTime, res.endTime]
                            let str = `<p><span>${cardNumber}</span></p>
                                        <p><span>起始时间 :</span><b> ${res.startTime}</b></p>
                                        <p><span>结束时间 :</span><b> ${res.endTime}</b></p>
                                        `;
                            this.strContent = str;
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '时间区间和车牌信息都不能为空！',
                        type: 'error'
                    });
                }


            },
            // 行程单 点击
            handleNodeClickOfHodometer(data, node, self){
                let row = {};
                row.id = data.id;
                let _this = this;
                this.queryVehicleLocu({id: row.id}).then(() => {
                    let res = _this.getVehicleLocus;
                    _this.mapPolyline(res)
                });
                // 获取地图实例
                const map = _this.$refs.map.$$getInstance();

            },
            // 清空地图
            clearMap(){
                let map = this.$refs.map.$$getInstance();
                map.clearMap();
            },
            // 对地图添加线的方法
            mapPolyline(res){
                let _this = this;
                let start = null;
                let end = null;
                let markerPosition = [];
                _this.polyline.path = [];
                _this.markers = [];
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
                        // 只添加第一个点和最后一个点
                        _this.center = [res[0].longitude, res[0].latitude];
                        _this.zoom = 16;
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
                            v.angle = startAngle + 180;
                        }
                        if (i === length - 1) {
                            v.angle = endAngle;
                        }
                    })
                })

            },
            //action方法
            ...mapActions([
                'vehiclelocuQueryLocuByTime',
                'queryVehicleByLicensePlatNumber'
            ]),
        },
        computed: {
            ...mapGetters({
                getVehicleLocuHistory: "getVehicleLocuHistory",
                getVehicleLicensePlatNumber: "getVehicleLicensePlatNumber"
            })
        },
        mounted() {
            this.queryVehicleByLicensePlatNumber({}).then(() => {

            });
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .main {
        .searchHistoryLocu {
            position: absolute;
            z-index: 999;
            left: 80px;
            margin-top: 10px;
        }
        .amap-demo {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }

</style>

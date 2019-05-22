<template>
    <div class="main">
        <!--<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">-->
            <div :class="[ 'el-col','el-col-24','el-col-xs-24','main_left',toggleArrowFlag ? 'el-col-sm-0' : 'el-col-sm-5']"
                 style="height:100%;">
                <el-tabs type="border-card" class="leftTab" @tab-click="tabClick" value="hodometer">
                    <el-tab-pane name="hodometer">
                        <el-button type="primary" slot="label">行程单</el-button>
                        <div class="tab-pane-top">

                            <el-date-picker
                                    v-model="inputHodometerStartTime"
                                    type="datetime"
                                    :editable=false
                                    style="margin-bottom: 10px;width:75%"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请输入行程单开始时间">
                            </el-date-picker>

                            <el-date-picker
                                    v-model="inputHodometerEndTime"
                                    type="datetime"
                                    :editable=false
                                    style="margin-bottom: 10px;width:75%"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请输入行程单结束时间">
                            </el-date-picker>


                            <el-button type="primary" @click="searchHodometer">查找</el-button>
                        </div>
                        <template>
                            <div class="">
                                <el-tree
                                        :data="treeDataOfHodometer"
                                        :props="defaultPropsOfHodometer"
                                        accordion
                                        @node-click="handleNodeClickOfHodometer">
                                </el-tree>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane name="vertical">
                        <el-button type="primary" slot="label">车辆</el-button>
                        <div class="tab-pane-top">
                            <el-input placeholder="请输入要查询的车牌号码" style="width:75%" v-model="inputVertical"></el-input>
                            <el-button type="primary" @click="searchVertical">查找</el-button>
                        </div>
                        <div class="">
                            <el-tree
                                    :data="treeData"
                                    :props="defaultProps"
                                    accordion
                                    :filter-node-method="filterVertical"
                                    ref="treeOfVertical"
                                    @node-click="handleNodeClick">
                            </el-tree>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="community">
                        <el-button type="primary" slot="label">小区</el-button>
                        <div class="tab-pane-top">
                            <el-input placeholder="请输入要查询的小区" style="width:75%" v-model="inputCommunity"></el-input>
                            <el-button type="primary" @click="searchCommunity">查找</el-button>
                        </div>
                        <div class="">
                            <el-tree
                                    :data="treeDataOfCommunity"
                                    :props="defaultPropsOfCommunity"
                                    accordion
                                    @node-click="handleNodeClickOfCommunity">
                            </el-tree>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane name="history">
                        <el-button type="primary" slot="label">历史轨迹</el-button>
                        <div class="tab-pane-top">
                            <el-date-picker
                                    v-model="inputHistoryStartTime"
                                    type="datetime"
                                    :editable = false
                                    style="margin-bottom: 10px;width:75%"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请输入轨迹开始时间">
                            </el-date-picker>

                            <el-date-picker
                                    v-model="inputHistoryEndTime"
                                    type="datetime"
                                    :editable = false
                                    style="margin-bottom: 10px;width:75%"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请输入轨迹结束时间">
                            </el-date-picker>

                            <el-autocomplete
                                    v-model="inputApplyNo"
                                    :fetch-suggestions="querySearchPlace"
                                    :trigger-on-focus="false"
                                    style="margin-bottom: 10px;width:75%"
                                    @select="handleSelectPlace"
                                    placeholder="请输入要查询的车牌号码"
                            ></el-autocomplete>

                            <el-button type="primary" @click="searchHistory">查找</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        <!--</transition>-->
        <!--<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">-->
            <div :class="[ 'el-col','el-col-24','el-col-xs-24','main_right','tabclick',toggleArrowFlag ? ['el-col-sm-24','box_shadow'] : 'el-col-sm-19']"
                 style="height:100%;position:relative">
                <el-amap ref="map" vid="amap" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugins"
                         :map-manager="amapManager" :events="events"
                >
                    <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"
                                    :visible="marker.visible" :draggable="marker.draggable" :icon="marker.icon"
                                    :offset="marker.offset" :angle="marker.angle"
                                    :content="marker.content" :title="marker.title"
                    >

                    </el-amap-marker>
                    <el-amap-polyline :editable="polyline.editable" :strokeColor="polyline.strokeColor"
                                      :path="polyline.path" :events="polyline.events"></el-amap-polyline>
                    <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible"
                                         :content="window.content"></el-amap-info-window>
                    <el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :ref="`polygon_${index}`"
                                     :path="polygon.path" :events="polygon.events">

                    </el-amap-polygon>
                </el-amap>
                <div class = "toggle_arrow">
                    <i v-bind:class="[toggleArrowFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']" @click.stop="toggleArrow"></i>
                </div>
                <div :class="[ 'form_tab',arrowFlag? '' : 'width']" v-show="false">
                    <div class="form_tab_content">
                        <i v-bind:class="[ arrowFlag ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
                           @click.stop="arrowDown"></i>
                        <!--<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">-->
                            <el-tabs type="border-card" v-show="arrowFlag">
                                <el-tab-pane label="车辆汇总">
                                    <form>
                                        <template>
                                            <div>
                                                <el-table
                                                        :data="tableData"
                                                        border
                                                        stripe
                                                        fit
                                                        height="300"
                                                        style="width: 100%">
                                                    <el-table-column
                                                            align="center"
                                                            type="selection"
                                                            width="50">
                                                    </el-table-column>

                                                    <el-table-column
                                                            label="车队名称"
                                                            align="center"

                                                    >
                                                        <template scope="scope">
                                                            <div>
                                                                <el-popover trigger="hover" placement="top">
                                                                    <p>车队名称 : {{ scope.row.carName }}</p>
                                                                    <div slot="reference" class="name-wrapper">
                                                                        <el-tag>
                                                                            {{ scope.row.carName.substring(0, 6) + "..."}}
                                                                        </el-tag>
                                                                    </div>
                                                                </el-popover>
                                                            </div>
                                                        </template>
                                                    </el-table-column>

                                                    <el-table-column
                                                            label="车牌号码"
                                                            align="center"
                                                    >
                                                        <template scope="scope">
                                                            {{ scope.row.carNumber }}
                                                        </template>
                                                    </el-table-column>

                                                    <el-table-column
                                                            label="设备名称"
                                                            align="center"
                                                    >
                                                        <template scope="scope">
                                                            {{ scope.row.deviceName }}
                                                        </template>
                                                    </el-table-column>

                                                    <el-table-column
                                                            label="驾驶员姓名"
                                                            align="center"
                                                    >
                                                        <template scope="scope">
                                                            {{ scope.row.personName }}
                                                        </template>

                                                    </el-table-column>

                                                    <el-table-column
                                                            label="设备ID"
                                                            align="center"
                                                    >
                                                        <template scope="scope">
                                                            {{ scope.row.deviceID }}
                                                        </template>
                                                    </el-table-column>

                                                    <el-table-column
                                                            label="驾驶员电话"
                                                            align="center"
                                                    >
                                                        <template scope="scope">
                                                            {{ scope.row.personTel }}
                                                        </template>
                                                    </el-table-column>

                                                    <el-table-column
                                                            label="修改日期"
                                                            align="center"
                                                    >
                                                        <template scope="scope">
                                                            <!--<el-icon name="time"></el-icon>-->
                                                            <span style="margin-left: 10px">{{ scope.row.time }}</span>
                                                        </template>
                                                    </el-table-column>

                                                    <el-table-column label="操作"
                                                                     align="center"
                                                    >
                                                        <template scope="scope">
                                                            <el-button
                                                                    size="small"
                                                                    @click="handleEdit(scope.$index, scope.row)">编辑
                                                            </el-button>
                                                            <el-button
                                                                    size="small"
                                                                    type="danger"
                                                                    @click="handleDelete(scope.$index, scope.row)"
                                                            >删除
                                                            </el-button>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                <el-pagination
                                                        :current-page="currentPage"
                                                        :page-sizes="[10]"
                                                        :page-size="100"
                                                        layout="total, prev, pager, next, jumper"
                                                        :total="400">
                                                </el-pagination>
                                            </div>
                                        </template>
                                    </form>
                                </el-tab-pane>
                                <el-tab-pane label="传感器数据">传感器数据</el-tab-pane>
                            </el-tabs>
                        <!--</transition>-->
                    </div>
                </div>
            </div>
        <!--</transition>-->
    </div>
</template>
<script>
    import {AMapManager} from 'vue-amap';
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/vehiclelocu/actions'
    import {angle, parseTime, arrAverageNum} from '../../../assets/js/util'


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
                markers: [],
                windows: [],
                polylineWindowsFlag: false,
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
                                self.windows[0].visible = false;
                            })
                        },
                        end: (e) => {
                            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                        }
                    },
                    editable: false,
                },
                polygons: [],

                currentPage: 5,

                arrowFlag: false,
                toggleArrowFlag: false,
                defaultProps: {
                    children: 'vehicleList',
                    label: 'name'
                },
                tableData: [
                    {
                        carName: '方松街道清除公司',
                        carNumber: '沪A23456',
                        deviceName: 'SIM设备',
                        deviceID: '#343434',
                        personName: '宋小明',
                        personTel: '17612108553',
                        time: '2017-10-09',
                        address: '上海市松江区佘山 1518 弄'
                    }
                ],
                // 小区
                max_heightCommunity: "",
                currentPageCommunity: 2,
                inputCommunity: "",
                defaultPropsOfCommunity: {
                    label: 'name',
                },
                // 行程单
                max_heightHodometer: "",
                currentPageHodometer: 2,
                inputHodometerStartTime: '',
                inputHodometerEndTime: '',
                defaultPropsOfHodometer: {
                    label: 'applyNo',
                },
                // 车辆
                inputVertical: "",

                // 历史轨迹
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
            removeMarker() {
                if (!this.markers.length) return;
                this.markers.splice(this.markers.length - 1, 1);
            },
            arrowDown(){
                this.arrowFlag === true ? this.arrowFlag = false : this.arrowFlag = true;
            },
            toggleArrow(){
                this.toggleArrowFlag === true ? this.toggleArrowFlag = false : this.toggleArrowFlag = true;
            },
            // 点击选项卡时触发的事件
            tabClick(tabs){
                this.clearMap();
                this.resetInput();
            },
            // 点击查询小区
            searchCommunity(){
                let value = this.inputCommunity;

                this.queryPlaceInfo({
                    input: this.inputCommunity
                });
            },
            // 建筑工地
            handleNodeClickOfCommunity(data){
                let row = {};
                row.id = data.id;
                let _this = this;
                this.findByPlaceInfoId({id: row.id}).then(() => {
                    let currentCommunity = _this.currentCommunity.places.split(",");
                    let tmp = [];
                    let len = currentCommunity.length / 2;
                    for (let i = 0; i < len; i++) {
                        tmp.push(currentCommunity.splice(0, 2));
                    }
                    _this.polygons.push({
                        path: [tmp],
                        events: {
                            click: () => {
                            }
                        }
                    })
                    let averageX = [];
                    let averageY = [];
                    let averageNum = [];
                    tmp.forEach((v, i, self) => {
                        averageX.push(v[0]);
                        averageY.push(v[1]);
                    })
                    averageNum.push(arrAverageNum(averageX), arrAverageNum(averageY));
                    let marker = {
                        position: averageNum,
                        offset: [-10, -34],
                        content: `<div class = 'mapContent'>${data.name}</div>`,
                    };
                    _this.center = averageNum;
                    _this.markers.push(marker);
                })

            },
            // 行程单
            // 行程单 点击
            handleNodeClickOfHodometer(data, node, self){
                let row = {};
                row.id = data.id;
                let _this = this;
                this.queryVehicleLocu({id: row.id}).then(() => {
                    let res = _this.getVehicleLocus;
                    console.log(res);
                    _this.$nextTick(() => {
                        _this.mapPolyline(res)
                    })
                });
                _this.hoverPolyline(row.id);
                console.log(this.treeDataOfHodometer);
                // 获取地图实例
                const map = _this.$refs.map.$$getInstance();

            },
            handleSizeChangeHodometer(){

            },
            handleCurrentChangeHodometer(){

            },
            // 查询行程单区间
            searchHodometer(){
                let inputHodometerStartTime = this.inputHodometerStartTime;
                let inputHodometerEndTime = this.inputHodometerEndTime;
                let newStartTime = new Date(this.inputHodometerStartTime);
                let newEndTime = new Date(this.inputHodometerEndTime);
                if (inputHodometerStartTime !== "" && inputHodometerEndTime !== "") {
                }
                if (newEndTime > newStartTime) {
                    this.queryApplyStatistics({
                        time: `${inputHodometerStartTime},${inputHodometerEndTime}`
                    }).then(() => {
                        // getApplys
                    });
                } else {
                    this.$message.error('请输入正确的查询时间段');
                }
            },
            // 车辆
            // 点击树查询
            handleNodeClick(data, node, self) {
                let _this = this;
                if (node.level === 3 && typeof (data.id) !== undefined) {
                    _this.markers = [];
                    this.queryLastVehicleLocu({id: data.id}).then(() => {
                        let status = this.getLastVehicleLocu.status;
                        let icon = "";
                        let title = "";
                        if (status === "offLine") {
                            icon = "../../../assets/image/offLine_car.png";
                            title = "离线";
                        }
                        if (status === "onLine") {
                            icon = "../../../assets/image/onLine_car.png";
                            title = "在线";
                        }
                        let marker = {
                            position: [_this.getLastVehicleLocu.longitude, _this.getLastVehicleLocu.latitude],
                            icon: icon,
                            offset: [-10, -34],
                            angle: 80,
                            title: title
                        };
                        _this.markers.push(marker);
                        _this.center = marker.position;
                    });
                }
            },
            // 查找查询
            searchVertical(){
                let searchVerticalcontent = this.inputVertical;
                this.$refs.treeOfVertical.filter(searchVerticalcontent);
            },
            // 树结构查询
            filterVertical(value, data){
                if (!value) {
                    this.$message.error('请输入正确的查询信息');
                    return true
                } else {
                    return data.name.indexOf(value) !== -1;
                }
                ;
            },

            // 历史轨迹查询
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
                            if(res.length !== 0){
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
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '未查到该区间段的历史记录！',
                                    type: 'info'
                                });
                            }
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
            handleEdit(index, row) {
//                console.log(index, row);
            },
            handleDelete(index, row, tableData) {
                this.tableData.splice(index, 1);
            },
            handleCheckChange(data, checked, indeterminate) {
//                console.log(data, checked, indeterminate);
            },
            // 清空地图
            clearMap(){
//                let map = this.$refs.map.$$getInstance();
//                map.clearMap();
                this.polygons = [];
                this.polyline.path = [];
                this.markers = [];
                this.zoom = 16;
            },
            //置空搜选项
            resetInput(){
                // 历史轨迹
                this.inputApplyNo = "";
                this.inputHistoryEndTime = "";
                this.inputHistoryStartTime = "";

                // 车辆
                this.inputVertical = '';

                // 行程单
                this.inputHodometerStartTime = "";
                this.inputHodometerEndTime = "";

                // 小区
                this.inputCommunity = "";

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
                            v.angle = startAngle;
                        }
                        if (i === length - 1) {
                            v.angle = endAngle;
                        }
                    })
                })

            },
            // 对折线添加hover效果
            hoverPolyline(id){
                let _this = this;
                //查询该车信息
                _this.findByApplyId({id: id}).then(() => {
                    let res = _this.currentHodometer;
                    res.startTime = parseTime(res.startTime);
                    res.endTime = parseTime(res.endTime);
                    let [applyNo, startTime, endTime] = [res.applyNo, res.startTime, res.endTime]
                    let str = `<p><span>${res.applyNo}</span></p>
                            <p><span>起始时间 :</span><b> ${res.startTime}</b></p>
                            <p><span>结束时间 :</span><b> ${res.endTime}</b></p>
                            `;
                    _this.strContent = str;
                })
            },
            //action方法
            ...mapActions([
                'queryPlaceInfo',
                'findByPlaceInfoId',
                'saveOrUpdatePlaceInfo',
                'deletePlaceInfo',
                'batchDeletePlaceInfo',

                // 行程单
                'cleanCurrentApply',
                'queryApply',
                'findByApplyId',
                'saveOrUpdateApply',
                'deleteApply',
                'batchDeleteApply',
                'queryApplyStatistics',

                // position
                'queryVehicleLocu',

                //biddingCompanyInfo
                'queryBiddingCompanyInfoWithVehicle',
                //查某辆车最新的坐标
                'queryLastVehicleLocu',

                // 历史轨迹查询
                'vehiclelocuQueryLocuByTime',
                'queryVehicleByLicensePlatNumber'
            ]),
        },
        computed: {
            ...mapGetters({
                treeDataOfCommunity: "getPlaceInfos",
                totalCommunity: "getPlaceInfoTotal",
                currentCommunity: "getCurrentPlaceInfo",

                // 行程单
                treeDataOfHodometer: 'getApplys',
                totalHodometer: 'getApplyTotal',
                currentHodometer: 'getCurrentApply',


                // position
                getVehicleLocus: 'getVehicleLocus',
                getVehicleLocuTotal: 'getVehicleLocuTotal',
                getCurrentVehicleLocu: 'getCurrentVehicleLocu',


                //biddingCompanyInfo
                treeData: 'getBiddingCompanyInfoWithVehicle',

                getLastVehicleLocu: 'getLastVehicleLocu',

                // 历史轨迹查询
                getVehicleLocuHistory: "getVehicleLocuHistory",
                getVehicleLicensePlatNumber: "getVehicleLicensePlatNumber"

            })
        },
        mounted() {


            // 动态计算表格高度
            this.$nextTick(() => {
                let tabs_height = $(".el-tabs").height();
                let tabs__header_height = $(".el-tabs__header").height();
                let tabs__content_height = tabs_height;
                $(".leftTab .el-tabs__content").height(tabs_height - 30);
                let pagination_height = $(".el-pagination").height();
                let tab_pane_height = $(".tab-pane-top").height();


                // 小区
                let max_heightCommunity = tabs__content_height - pagination_height - tab_pane_height - 30;
                this.max_heightCommunity = max_heightCommunity;
                // 行程单
                let max_heightHodometer = tabs__content_height - pagination_height - tab_pane_height - 30;
                this.max_heightHodometer = max_heightHodometer;

            });
            // 跳转之后
            let id = this.$router.currentRoute.query.id;
            let _this = this;
            if (id !== "" && id !== undefined) {
                _this.queryVehicleLocu({id: id}).then(() => {
                    let res = _this.getVehicleLocus;
                    _this.mapPolyline(res);
                });
                _this.findByApplyId({id: id}).then(() => {
                    let res = _this.currentHodometer;
                    res.startTime = parseTime(res.startTime);
                    res.endTime = parseTime(res.endTime);
                    let [applyNo, startTime, endTime] = [res.applyNo, res.startTime, res.endTime]
                    let str = `<p><span>${res.applyNo}</span></p>
                            <p><span>起始时间 :</span><b> ${res.startTime}</b></p>
                            <p><span>结束时间 :</span><b> ${res.endTime}</b></p>
                            `;
                    _this.strContent = str;
                })
            }

            // 页面加载查询ajax
            // 小区
            this.queryPlaceInfo({});
            // 中标公司
            this.queryBiddingCompanyInfoWithVehicle({}).then(() => {
            });
            // 行程单
            this.queryApply({}).then(() => {
                console.log(this.treeDataOfHodometer);
            });
            this.queryApplyStatistics({}).then(() => {
                console.log(this.getLastVehicleLocu);
            });
            // 历史轨迹
            this.queryVehicleByLicensePlatNumber({}).then(() => {

            });

        },


    }
</script>


<style lang="scss" scoped rel="stylesheet/scss">
    .main {
        margin: 10px 15px;
        box-sizing: border-box;
        position: absolute;
        width: calc(100% - 30px);
        height: calc(100% - 100px);
        background: #fff;
        .el-tabs--border-card {
            height: 100%;
            padding: 8px;
            padding-bottom: 0px;
            box-sizing: border-box;
            border: none;
            .el-button {
                padding: 12px;
            }
        }
    }

    .form_nav {
        background: #eff4f8;
        height: 80px;
        padding: 0 15px;
        position: absolute;
        z-index: 999;
        left: 65px;
        top: 15px;
    }

    .form_tab {
        position: absolute;
        z-index: 999;
        left: 0px;
        bottom: 0px;
        width: 100%;
        min-height: 50px;
        background: rgba(255, 255, 255, 0.8);
        &.width {
            width: 60px;
        }
        .form_tab_content {
            position: relative;
            > .el-icon-arrow-down, .el-icon-arrow-up {
                position: absolute;
                font-size: 20px;
                right: 15px;
                top: 20px;
                color: #20a0ff;
                z-index: 999;
            }
        }
    }

    .wrapper {
        line-height: 80px;
    }

    .el-table th {
        background: #eff4f8
    }

    .el-button + .el-button {
        margin-left: 0px;
    }

    .prompt {
        background: white;
        width: 100px;
        height: 30px;
        text-align: center;
    }
</style>
<style lang="scss" rel="stylesheet/scss">
    .leftTab {
        .el-tabs__header {
            position: absolute;
            left: 26%;
            z-index: 99999;
            background: #eff4f8;
            height: 80px;
            padding: 0 15px;
            top: 15px;
            border-bottom: 0 !important;
            line-height: 80px;
            .el-tabs__item {
                border: 0 !important;
                margin: 0 !important;
                padding: 0;
                padding-right: 15px;
                &:nth-child(2) {
                    padding-left: 0px !important;
                }
                &.is-active {
                    border: 0;
                    background: #eff4f8 !important;
                    border-color: #eff4f8 !important;
                }
            }
        }
        .el-tabs__content {
            overflow-x: hidden;
            overflow-y: auto;
        }
    }

</style>



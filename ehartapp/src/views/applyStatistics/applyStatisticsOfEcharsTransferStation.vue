<template>
    <div class="tabclick">
        <div class="tabclick_top">
            <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                    <span class="wrapper">
                         <el-date-picker
                                 v-model="startTime"
                                 :editable=false
                                 type="date"
                                 value-format="yyyy-MM-dd"
                                 placeholder="请输入开始日期">
                        </el-date-picker>
                    </span>
                    <span class="wrapper time_to">
                    </span>
                    <span class="wrapper">
                        <el-date-picker
                                v-model="endTime"
                                :editable=false
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="请输入结束日期">
                    </el-date-picker>
                    </span>
                    <span class="wrapper" style="margin-left:10px;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                    </span>

                </div>
            </div>
            <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 content_top">
                <ul class="el-col el-col-24 el-col-xs-24 el-col-sm-24 content_top_ul">
                    <li class="el-col  box4">
                        <div class="icon_left">
                            <span></span>
                        </div>
                        <div class="icon_right">
                            <p class="icon_right_inner" v-if="String(totalStatisticsList.handlingFee).length > 7">
                                <span class="icon_right_text">总处理费 ( 万元 ) </span>
                                <span class="icon_right_number">{{(Number(totalStatisticsList.handlingFee) / 10000) | currency("", 2)}}</span>
                            </p>

                            <p class="icon_right_inner" v-if="String(totalStatisticsList.handlingFee).length <= 7">
                                <span class="icon_right_text">总处理费 ( 元 ) </span>
                                <span class="icon_right_number">{{totalStatisticsList.handlingFee | currency("", 0)}}</span>
                            </p>
                        </div>
                    </li>

                    <li class="el-col  box2">
                        <div class="icon_left">
                            <span></span>
                        </div>
                        <div class="icon_right">
                            <p class="icon_right_inner">
                                <span class="icon_right_text">总重量 ( 吨 ) </span>
                                <span class="icon_right_number">{{totalStatisticsList.totalWeight}}</span>
                            </p>
                        </div>
                    </li>
                    <li class="el-col  box3">
                        <div class="icon_left">
                            <span></span>
                        </div>
                        <div class="icon_right">
                            <p class="icon_right_inner">
                                <span class="icon_right_text">总次数 ( 次 ) </span>
                                <span class="icon_right_number">{{totalStatisticsList.vehicleCount}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tabclick_bottom">
            <div class="content_main">
                <div id="content_tabs">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="方松中转站" name="first">
                            <div class = "table_content">
                                <table1
                                        :bgirls="aGirls"
                                        v-loading.lock="firstLoading"
                                ></table1>
                            </div>
                            <div class="pagination_wrapper">
                                <el-pagination
                                        :background="true"
                                        @current-change="firstHandleCurrentChange"
                                        :current-page=firstCurrentPage
                                        :page-size="size"
                                        layout="total, prev, pager, next, jumper"
                                        :total=firstTotal>
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/apply/actions'
    import {parseTime, currency} from '../../../assets/js/util'
    import table1 from "@/views/applyStatistics/tableHandleFee";
    import { SERVER_URI } from '../../store/const'


    export default{
        data() {
            return {

                aGirls: [
                    {
                        name: '小丽',
                        age: 22
                    }, {
                        name: '小美',
                        age: 21
                    }, {
                        name: '小荷',
                        age: 24
                    }
                ],
                temps: [],
                activeName2: 'first',
                startTime: "",
                endTime: "",
                value: "village",
                records: [],
                statistics: [
                    {
                        charge: 2323,
                        weight: 2323,
                        startPlaceInfo: {
                            name: 23232,
                        }
                    },
                    {
                        charge: 2323,
                        weight: 2323,
                        startPlaceInfo: {
                            name: 23232,
                        }
                    }
                ],
                tableData: [
                    {
                        startTime: '2016-05-02',
                        licensePlatNumber: '王小虎111',
                        weight: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        startTime: '2016-05-02',
                        licensePlatNumber: '王小虎111',
                        weight: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        startTime: '2016-05-02',
                        licensePlatNumber: '王小虎111',
                        weight: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        startTime: '2016-05-02',
                        licensePlatNumber: '王小虎111',
                        weight: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                height:"",

                size: 6,
                firstTotal: 10,
                firstCurrentPage: 1,
                firstLoading:true,
            };
        },
        components: {
            table1,
        },
        methods: {
            handleClick(tab, event) {
            },
            query(startTime, endTime, type = "company", page = 1){
                let _this = this;
                let newStartTime = new Date(startTime);
                let newEndTime = new Date(endTime);
                if (startTime !== "" && endTime !== "") {
                    if (newStartTime >= newEndTime) {
                        this.$message({
                            showClose: true,
                            message: '时间区间填写有误！',
                            type: 'error'
                        });
                    } else {
                        _this.applyStatistics({
                            startTime,
                            endTime,
                            type,
                            page,
                        }).then(() => {
                            let statisticsList = _this.statisticsList;
                            _this.statistics = statisticsList.records;
                            console.log(_this.statistics)
                            let total = statisticsList.total;
                            let current = statisticsList.current;
                            this.currentPage = current;
                            this.total = total;
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '时间区间和类型不能为空！',
                        type: 'error'
                    });
                }
            },

            // 查询
            searchCarInfo(){
                let query = this.$router.currentRoute.query;
                let [type, startTime, endTime] = [query.type, this.startTime, this.endTime];
                this.query(startTime, endTime, type);

                // 获取表格数据
                this.getTable(startTime, endTime,1,58);

            },
            // 点击进入相应的day
            goDayDetails($event){
                let target = event.currentTarget;
                let id = $(target).attr("data-id");
                let query = this.$router.currentRoute.query;
                let [startPlace, startTime, endTime, type] = [id, this.startTime, this.endTime, query.type];
                let newStartTime = new Date(startTime);
                let newEndTime = new Date(endTime);
                if (startTime !== "" && endTime !== "" && type !== "") {
                    if (newEndTime <= newStartTime) {
                        this.$message({
                            showClose: true,
                            message: '时间区间填写有误！',
                            type: 'error'
                        });
                    } else {
                        this.$router.push({
                            path: '/applyStatistics/applyStatisticsOfDayDetials',
                            query: {
                                startPlaceId: startPlace,
                                startTime: startTime,
                                endTime: endTime,
                                type: type,
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
            // 得出当前月的前一个月
            getPrevMonth(){
                let currentDay = new Date(),
                    currentMonth = new Date().getMonth(),
                    currentDayOfEnd = parseTime(currentDay, '{y}-{m}-{d}');
                let [year, month, day, currentDayOfStart] = ['', '', '', ''];
                currentDayOfEnd.split("-").forEach((v, i, self) => {
                    if (self[1] === "01") {
                        month = "12";
                        year = Number(self[0]) - 1;
                        day = self[2];
                    } else {
                        year = Number(self[0]);
                        month = Number(self[1]) - 1;
                        day = self[2];
                    }
                })
                currentDayOfStart = `${year}-${month}-${day}`;
                return {currentDayOfStart, currentDayOfEnd}
            },

            firstHandleCurrentChange(val) {
                let [ startTime, endTime] = [this.startTime, this.endTime];
                this.getTable(startTime, endTime,val,58);
            },
            getQuery(){
                let query = this.$router.currentRoute.query,
                    startPlaceId = query.startPlaceId,
                    type = query.type;
                // 点击一级菜单
                if (JSON.stringify(query) === "{}") {
                    let time = this.getPrevMonth();
                    this.startTime = time.currentDayOfStart;
                    this.endTime = time.currentDayOfEnd;
                    let [startTime, endTime] = [this.startTime, this.endTime];
                    this.query(startTime, endTime);
                }
                // 返回到上一级页面
                if (startPlaceId !== undefined) {
                    let [startTime, endTime, type] = [query.startTime, query.endTime, query.type];
                    this.startTime = startTime;
                    this.endTime = endTime;
                    this.query(startTime, endTime, type);
                }
                // 点击路由切换
                if (startPlaceId === undefined && type !== undefined) {
                    let [type] = [query.type];
                    let time = this.getPrevMonth();
                    this.startTime = time.currentDayOfStart;
                    this.endTime = time.currentDayOfEnd;
                    let [startTime, endTime] = [this.startTime, this.endTime];
                    this.query(startTime, endTime, type);
                }

            },
            getTable(startTime,endTime,page,startPlaceId){
                let _this = this;
                let newStartTime = new Date(startTime);
                let newEndTime = new Date(endTime);
                let [type] = ['transferStation'];
                if (startTime !== "" && endTime !== "") {
                    if (newStartTime >= newEndTime) {
                        this.$message({
                            showClose: true,
                            message: '时间区间填写有误！',
                            type: 'error'
                        });
                    } else {
                        this.$axios.post(`${SERVER_URI}apply/statisticsOfApplyDetails1`, {
                            page,
                            startTime,
                            endTime,
                            type: type,
                            startPlaceId: startPlaceId
                        }).then(response => {
                                if(startPlaceId === 58){
                                    this.aGirls = response.data.data.records;
                                    this.firstTotal = response.data.data.total;
                                    _this.firstLoading = false;
                                }
                            }
                        ).catch(function (error) {
                            console.log(error);
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '时间区间和类型不能为空！',
                        type: 'error'
                    });
                }
            },
            //action方法
            ...mapActions([
                'applyStatistics',
                'applyStatisticsOfApplyDetails',
            ]),
        },
        mounted(){
            this.getQuery();

            // 获取表格数据
            let [ startTime, endTime] = [this.startTime, this.endTime];
            this.getTable(startTime, endTime,1,58);
            // 动态控制表格高度
            $(".el-tabs__content").height($(".el-tabs").height() - 56)
            $(".table_content").height($(".el-tab-pane").height() - 56);

            // 四个头部动态宽度
//            $(".content_top_ul li").width(($(".content_top_ul").width() - 40)/3);
            $(".content_top_ul li").addClass("el-col el-col-7 el-col-xs-7 el-col-sm-7")


            console.log(this.totalStatisticsList)
        },
        watch: {
            '$route': 'getQuery',
        },
        computed: {
            ...mapGetters({
                statisticsList: "getStatisticsList",
                totalStatisticsList: "getTotalStatisticsList",
                statisticsOfApplyDetailsList: "getStatisticsOfApplyDetailsList",
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $mainColor: #67C23A;
    $mainFontColor: #2D2F33;

    $boxTextColor: #3b445e;

    $box1_color: #ff8207;
    $box1_border: #fca87e;
    $box1_bg: #fffaf8;
    $box1_url: "/assets/image/charge.png";
    $box2_url: "/assets/image/weight.png";
    $box3_url: "/assets/image/count.png";
    $box4_url: "/assets/image/handleCharge.png";


    $box2_color: #01c4c2;
    $box2_border: #67e5df;
    $box2_bg: #f5fffe;

    $box3_color: #6dc349;
    $box3_border: #98e5a1;
    $box3_bg: #f5fff9;

    $box4_color: #f25353;
    $box4_border: #f25353;
    $box4_bg: #fff8f8;

    $content_main_border: #b7dff9;
    $content_main_color: #6fa6e7;
    $icon_top: "/assets/image/content_charge.png";
    $icon_bottom: "/assets/image/content_people.png";

    .time_to {
        position: relative;
        width: 14px;
        display: inline-block;
        height: 10px;
        margin: 0 5px;
        &:after {
            content: "";
            position: absolute;
            bottom: 5px;
            width: 100%;
            height: 1px;
            transform-origin: 0 0;
            background: #cccccc;
        }
    }

    .content_top {
        margin-top: 22px;
        box-sizing: border-box;
        margin-bottom: 30px;
        ul {
            width: 100%;
            height: 100%;
            li {
                margin-right: 20px;
                height: 66px;
                float: left;
                &:last-of-type {
                    margin-right: 0;
                }
                &.box1 {
                    background: $box1_bg;
                    position: relative;
                    .icon_left {
                        position: absolute;
                        left: 0;
                        background-color: $box1_color;
                        span {
                            background: url($box1_url) no-repeat;
                            width: 26px;
                            height: 26px;
                            display: inline-block;
                        }
                    }
                    .icon_right {
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box1_border;
                        width: calc(100% - 66px);
                        .icon_right_inner {
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            white-space: nowrap;
                            overflow: hidden;
                            .icon_right_text {
                                color: $boxTextColor;
                                font-size: 14px;
                                line-height: 66px;
                            }
                            .icon_right_number {
                                color: $box1_color;
                                font-weight: 700;
                                font-size: 24px;
                                line-height: 66px;
                                white-space: nowrap;
                                overflow-x: hidden;
                            }
                        }
                    }
                }
                &.box2 {
                    background: $box2_bg;
                    position: relative;
                    .icon_left {
                        position: absolute;
                        left: 0;
                        background-color: $box2_color;
                        span {
                            background: url($box2_url) no-repeat;
                            width: 26px;
                            height: 26px;
                            display: inline-block;
                        }
                    }
                    .icon_right {
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box2_border;
                        width: calc(100% - 66px);
                        .icon_right_inner {
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            overflow: hidden;
                            .icon_right_text {
                                color: $boxTextColor;
                                margin-top: 10px;
                                font-size: 14px;
                                line-height: 66px;
                            }
                            .icon_right_number {
                                color: $box2_color;
                                font-weight: 700;
                                font-size: 24px;
                                line-height: 66px;
                                white-space: nowrap;
                                overflow-x: hidden;
                            }
                        }
                    }
                }
                &.box3 {
                    background: $box3_bg;
                    position: relative;
                    .icon_left {
                        position: absolute;
                        left: 0;
                        background-color: $box3_color;
                        span {
                            background: url($box3_url) no-repeat;
                            width: 26px;
                            height: 26px;
                            display: inline-block;
                        }
                    }
                    .icon_right {
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box3_border;
                        width: calc(100% - 66px);
                        .icon_right_inner {
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            overflow: hidden;
                            .icon_right_text {
                                color: $boxTextColor;
                                font-size: 14px;
                                line-height: 66px;
                            }
                            .icon_right_number {
                                color: $box3_color;
                                font-weight: 700;
                                font-size: 24px;
                                line-height: 66px;
                                white-space: nowrap;
                                overflow-x: hidden;
                            }
                        }
                    }
                }
                &.box4 {
                    background: $box4_bg;
                    position: relative;
                    .icon_left {
                        position: absolute;
                        left: 0;
                        background-color: $box4_color;
                        span {
                            background: url($box4_url) no-repeat;
                            width: 26px;
                            height: 26px;
                            display: inline-block;
                        }
                    }
                    .icon_right {
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box4_border;
                        width: calc(100% - 66px);
                        .icon_right_inner {
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            white-space: nowrap;
                            overflow: hidden;
                            .icon_right_text {
                                color: $boxTextColor;
                                font-size: 14px;
                                line-height: 66px;
                            }
                            .icon_right_number {
                                color: $box4_color;
                                font-weight: 700;
                                font-size: 24px;
                                line-height: 66px;
                                white-space: nowrap;
                                overflow-x: hidden;
                            }
                        }
                    }
                }
                .icon_left {
                    width: 66px;
                    height: 66px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }
                .icon_right {
                    border: 1px solid transparent;
                    display: inline-block;
                    color: $mainFontColor;
                    height: 66px;
                    .icon_right_number {
                        font-size: 26px;
                        line-height: 26px;
                        font-weight: 700;
                        word-break: break-all;

                    }
                    .icon_right_text {
                        font-size: 18px;
                        line-height: 18px;
                        word-break: break-all;
                    }
                }
            }
        }
    }

    .tabclick {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 20px;
        background: #fff;
        width: calc(100% - 126px);
        padding: 0 20px;
        border: 1px solid #eee;
        border-left: 0;
        .tabclick_top {
            overflow: hidden;
            .form_nav {
                > div {
                    height: 100%;
                    .wrapper {
                        line-height: 60px;
                    }
                }
                background: #fff;
                height: 80px;
                padding: 10px 0;
                border-bottom: 1px solid #ebebeb;
            }
        }
        .tabclick_bottom {
            position: relative;
            height: calc(100% - 212px);
            overflow: hidden;
            .content_main {
                box-sizing: border-box;
                height: 100%;
                ul {
                    width: 100%;
                    overflow: hidden;
                    li {
                        margin-right: 2%;
                        position: relative;
                        margin-bottom: 10px;
                        cursor: pointer;
                        height: 126px;
                        width: 22%;
                        &:nth-of-type(4n) {
                            margin-right: 0;
                        }
                        .icon_top {
                            position: absolute;
                            top: 0;
                            padding: 12px;
                            display: inline-block;
                            width: 100%;
                            height: 82px;
                            border: 1px solid $content_main_border;
                            .icon_text {
                                color: $content_main_color;
                                white-space: nowrap;
                                .icon {
                                    width: 14px;
                                    height: 14px;
                                    background: url($icon_top);
                                    background-size: cover;
                                    display: inline-block;
                                    margin-right: 8px;
                                }
                                .icon_people {
                                    width: 14px;
                                    height: 14px;
                                    background: url($icon_bottom);
                                    background-size: cover;
                                    display: inline-block;
                                    margin-right: 8px;

                                }
                                .noBlod {
                                    font-size: 14px;
                                }
                                .number {
                                    font-size: 20px;
                                    color: $boxTextColor;
                                    overflow-x: hidden;
                                }
                            }
                        }
                        .icon_bottom {
                            text-align: center;
                            position: absolute;
                            display: inline-block;
                            color: #fff;
                            background: $content_main_color;
                            width: 100%;
                            height: 42px;
                            font-size: 18px;
                            line-height: 42px;
                            bottom: 0px;
                            border-bottom-right-radius: 4px;
                            border-bottom-left-radius: 4px;
                        }
                    }
                }
            }
        }
    }

    .el-tab-pane{
        position: relative;
        height: 100%;
        .table_content{
            border:1px solid #eee;
            overflow-x: hidden;
            overflow-y: auto;
            .el-table--border{
                min-height: 0;
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    $tabs_border_hover_color: #409EFF;
    $tabs_border_color: #e4e7ed;

    #content_tabs {
        height: 100%;
        .el-tabs {
            height: 100%;
            .el-tabs__nav {
                border-top: 1px solid transparent;
                border-radius: 0;
                .el-tabs__item {
                    position: relative;
                    &:after {
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 1px;
                        top: -1px;
                        left: 0;
                        transform-origin: 0 0;
                        background: $tabs_border_color;
                    }
                    &:hover {
                        &:before {
                            content: "";
                            position: absolute;
                            width: 100%;
                            height: 1px;
                            top: -1px;
                            left: 0;
                            transform-origin: 0 0;
                            background: $tabs_border_hover_color;
                        }
                        &:after {
                            content: "";
                            position: absolute;
                            width: 100%;
                            height: 0px;
                            top: -1px;
                            left: 0;
                            transform-origin: 0 0;
                            background: #fff;
                        }
                    }
                    &.is-active {
                        &:before {
                            content: "";
                            position: absolute;
                            width: 100%;
                            height: 1px;
                            top: -1px;
                            left: 0;
                            transform-origin: 0 0;
                            background: $tabs_border_hover_color;
                        }
                        &:after {
                            content: "";
                            position: absolute;
                            width: 100%;
                            height: 0px;
                            top: -1px;
                            left: 0;
                            transform-origin: 0 0;
                            background: #fff;
                        }
                    }
                }
            }
        }
    }
</style>

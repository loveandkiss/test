<template>
    <div class="tabclick">
        <div class = "tabclick_top">
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
                    <span class = "wrapper time_to">
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
                    <span class="wrapper" style = "margin-left:10px;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                    </span>

                </div>
            </div>
            <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 content_top">
            <ul class="el-col el-col-24 el-col-xs-24 el-col-sm-24">
                    <li class="el-col el-col-7 el-col-xs-7 el-col-sm-7 box1">
                        <div class="icon_left">
                            <span>
                            </span>
                        </div>
                        <div class="icon_right">
                            <p class="icon_right_inner" v-if="String(totalStatisticsList.totalFee).length > 7">
                                <span class="icon_right_text">总费用 ( 万元 ) </span>
                                <span class = "icon_right_number">{{(Number(totalStatisticsList.totalFee)/10000) | currency("￥",2)}}</span>
                            </p>

                            <p class="icon_right_inner" v-if="String(totalStatisticsList.totalFee).length <= 7">
                                <span class="icon_right_text">总费用 ( 元 ) </span>
                                <span class = "icon_right_number">{{totalStatisticsList.totalFee | currency("￥",0)}}</span>
                            </p>
                        </div>
                    </li>
                    <li class="el-col el-col-7 el-col-xs-7 el-col-sm-7 box2">
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
                    <li class="el-col el-col-7 el-col-xs-7 el-col-sm-7 box3">
                        <div class="icon_left">
                            <span></span>
                        </div>
                        <div class="icon_right">
                            <p class="icon_right_inner">
                                <span class="icon_right_text">累计出车次数 ( 次 ) </span>
                                <span class="icon_right_number">{{totalStatisticsList.vehicleCount}}</span>
                            </p>
                        </div>
                    </li>
                    <!--<li class="el-col el-col-5 el-col-xs-5 el-col-sm-5 box4">-->
                    <!--<div class="icon_left el-col el-col-24 el-col-xs-24 el-col-sm-4">-->
                    <!--<i class="el-icon-upload"></i>-->
                    <!--</div>-->
                    <!--<div class="icon_right el-col el-col-24 el-col-xs-24 el-col-sm-20">-->
                    <!--<p class="icon_right_number">100(车次)</p>-->
                    <!--<p class="icon_right_text">运送消纳场车次</p>-->
                    <!--</div>-->
                    <!--</li>-->
                </ul>
        </div>
        </div>
        <div class="tabclick_bottom">
            <div class = "tabclick_bottom_scroll">
                <div class="content_main">
                    <ul>
                        <li v-for="(value, key, index) in statistics" @click="goDayDetails($event)"
                            :data-id="value.startPlaceInfo.id" class = "el-col el-col-5 el-col-xs-5 el-col-sm-5">
                            <div class="icon_top el-col el-col-24 el-col-xs-24 el-col-sm-24">
                                <p class="icon_text" v-if="String(value.charge).length > 7">
                                    <span class = "icon"></span>
                                    <span class="noBlod">费用</span>
                                    <b class = "number">{{((value.charge)/10000) | currency("￥",2)}}</b>
                                    <span class="noBlod">( 万元 )</span>
                                </p>

                                <p class="icon_text" v-if="String(value.charge).length <= 7">
                                    <span class = "icon"></span>
                                    <span class="noBlod">费用</span>
                                    <b class = "number">{{value.charge | currency("￥",0)}}</b>
                                    <span class="noBlod">( 元 )</span>
                                </p>
                                <p class="icon_text">
                                    <span class = "icon_people"></span>
                                    <span class="noBlod">重量</span>
                                    <b class = "number">{{value.weight}}</b>
                                    <span class="noBlod">( 吨 )</span>
                                </p>
                            </div>
                            <div class="icon_bottom">
                                {{value.startPlaceInfo.name}}
                            </div>
                        </li>
                    </ul>

                </div>
                <!--<div class="loading" style = "height: 40px;width:100%" v-if = "loading"-->
                    <!--v-loading = "loading"-->
                <!--&gt;-->

                <!--</div>-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page=currentPage-->
                <!--<el-pagination-->
                        <!--style = "position: absolute;bottom: 10px;left:30px;"-->
                        <!--:page-size="size"-->
                        <!--layout="total, prev, pager, next, jumper"-->
                        <!--:total="total">-->
                <!--</el-pagination>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/apply/actions'
    import {parseTime,currency} from '../../../assets/js/util'

    export default{
        data() {
            return {
                startTime:"",
                endTime: "",
                value: "village",
                currentPage:1,
                size:16,
                total:1,
                records:[],
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
                loading:true,
            };
        },
        methods: {
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
                            console.log( _this.statistics)
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
                let [type,startTime,endTime] = [query.type , this.startTime , this.endTime];
                this.query(startTime,endTime,type);
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
                    currentDayOfEnd = parseTime(currentDay,'{y}-{m}-{d}');
                let [year,month,day,currentDayOfStart] = ['','','',''];
                currentDayOfEnd.split("-").forEach((v,i,self) => {
                    if(self[1] === "1"){
                        month = "12";
                        year = Number(self[0]) - 1;
                        day = self[2];
                    }else{
                        year = Number(self[0]);
                        month = Number(self[1]) - 1;
                        day = self[2];
                    }
                })
                currentDayOfStart = `${year}-${month}-${day}`;
                return {currentDayOfStart,currentDayOfEnd}
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let page = val;
                let endTime = this.endTime;
                let startTime = this.startTime;
                let newStartTime = new Date(startTime);
                let newEndTime = new Date(endTime);
                let type = this.value,
                    _this = this;
                let currrent = this.getPrevMonth();
                let [currentDayOfStart,currentDayOfEnd] = [currrent.currentDayOfStart,currrent.currentDayOfEnd];
                if (type !== "" && startTime !== "" && endTime !== "") {
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
                            type:type,
                            page,
                        }).then(() => {
                            let statisticsList = _this.statisticsList;
                            _this.statistics = statisticsList.records;

                        });
                    }
                } else {
                    _this.applyStatistics({
                        startTime:currentDayOfStart,
                        endTime:currentDayOfEnd,
                        type:"village",
                        page,
                    }).then(() => {
                        let statisticsList = _this.statisticsList;
                        _this.statistics = statisticsList.records;
                    });
                }
            },
            getQuery(page){
                let query = this.$router.currentRoute.query,
                    startPlaceId = query.startPlaceId,
                    type = query.type;
                // 点击一级菜单
                if(JSON.stringify(query) === "{}"){
                    let time = this.getPrevMonth();
                    this.startTime = time.currentDayOfStart;
                    this.endTime = time.currentDayOfEnd;
                    let [startTime,endTime] = [this.startTime,this.endTime];
                    this.query(startTime, endTime,'',page);
                }
                // 返回到上一级页面
                if(startPlaceId !== undefined){
                    let [startTime,endTime,type] = [query.startTime,query.endTime,query.type];
                    this.startTime = startTime;
                    this.endTime = endTime;
                    this.query(startTime, endTime, type);
                }
                // 点击路由切换
                if(startPlaceId === undefined && type !== undefined){
                    let [type] = [query.type];
                    let time = this.getPrevMonth();
                    this.startTime = time.currentDayOfStart;
                    this.endTime = time.currentDayOfEnd;
                    let [startTime,endTime] = [this.startTime,this.endTime];
                    if(isNaN(Number(page))){ // 切换路由
                        this.query(startTime, endTime, type);
                    }else{
                        this.query(startTime, endTime, type,page);
                    }
                }

            },
            //action方法
            ...mapActions([
                'applyStatistics',
            ]),
        },
        mounted(){
            let _this = this;
            let flag = true;
            let page = 1;
            this.getQuery();
            $(".tabclick_bottom").on("scroll",function () {

                console.log($(this).height()); // 可视区域高度
                console.log($(this).scrollTop()); // 滚动高度
                console.log($(".tabclick_bottom_scroll").height()); // 文档高度
                // 判断是否滚动到底部
                if(parseInt($(this).height() + $(this).scrollTop()) === $(".tabclick_bottom_scroll").height()) {
                    if(flag === true){
                        flag = false;
                        _this.loading = true;
                        page++;
                        _this.getQuery(page);
                        flag = true;
                        _this.loading = false;
//                        alert(_this.total)
                        console.log("2222222222----------------------");
                    }
                }
            })
        },
        watch:{
            '$route':'getQuery'
        },
        computed: {
            ...mapGetters({
                statisticsList: "getStatisticsList",
                totalStatisticsList:"getTotalStatisticsList",
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $mainColor: #67C23A;
    $mainFontColor: #2D2F33;

    $boxTextColor:#3b445e;

    $box1_color:#ff8207;
    $box1_border:#fca87e;
    $box1_bg:#fffaf8;
    $box1_url:"/assets/image/charge.png";
    $box2_url:"/assets/image/weight.png";
    $box3_url:"/assets/image/count.png";

    $box2_color:#01c4c2;
    $box2_border:#67e5df;
    $box2_bg:#f5fffe;

    $box3_color:#6dc349;
    $box3_border:#98e5a1;
    $box3_bg:#f5fff9;

    $content_main_border:#b7dff9;
    $content_main_color:#6fa6e7 ;
    $icon_top:"/assets/image/content_charge.png";
    $icon_bottom:"/assets/image/content_people.png";

    .time_to{
        position: relative;
        width: 14px;
        display: inline-block;
        height: 10px;
        margin: 0 5px;
        &:after {
            content:"";
            position: absolute;
            bottom: 5px;
            width: 100%;
            height: 1px;
            transform-origin: 0 0;
            background: #cccccc;
        }
    }

    .content_top {
        margin-top:22px;
        box-sizing: border-box;
        margin-bottom: 30px;
        ul {
            width: 100%;
            height: 100%;
            li {
                margin-right:20px;
                height: 60px;
                &:last-of-type{
                    margin-right: 0;
                }
                &.box1{
                    background: $box1_bg;
                    position: relative;
                    .icon_left{
                        position: absolute;
                        left:0;
                        background-color: $box1_color;
                        span{
                            background: url($box1_url);
                            width: 24px;
                            height: 24px;
                            display: inline-block;
                        }
                    }
                    .icon_right{
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box1_border;
                        width: calc(100% - 60px);
                        .icon_right_inner{
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            white-space: nowrap;
                            .icon_right_text{
                                color:$boxTextColor;
                                font-size: 16px;
                                line-height: 60px;
                            }
                            .icon_right_number{
                                color:$box1_color;
                                font-weight: 700;
                                font-size: 26px;
                                line-height: 60px;
                                white-space: nowrap;
                                overflow-x: hidden;
                                }
                        }
                    }
                }
                &.box2{
                    background: $box2_bg;
                    position: relative;
                    .icon_left{
                        position: absolute;
                        left:0;
                        background-color: $box2_color;
                        span{
                            background: url($box2_url);
                            width: 24px;
                            height: 24px;
                            display: inline-block;
                        }
                    }
                    .icon_right{
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box2_border;
                        width: calc(100% - 60px);
                        .icon_right_inner{
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            .icon_right_text{
                                color:$boxTextColor;
                                font-size: 16px;
                                line-height: 60px;
                            }
                            .icon_right_number{
                                color:$box2_color;
                                font-weight: 700;
                                font-size: 26px;
                                line-height: 60px;
                            }
                        }
                    }
                }
                &.box3{
                    background: $box3_bg;
                    position: relative;
                    .icon_left{
                        position: absolute;
                        left:0;
                        background-color: $box3_color;
                        span{
                            background: url($box3_url);
                            width: 24px;
                            height: 24px;
                            display: inline-block;
                        }
                    }
                    .icon_right{
                        position: absolute;
                        right: 0;
                        box-sizing: border-box;
                        border: 1px solid $box3_border;
                        width: calc(100% - 60px);
                        .icon_right_inner{
                            height: 100%;
                            width: 100%;
                            padding-left: 10px;
                            .icon_right_text{
                                color:$boxTextColor;
                                font-size: 16px;
                                line-height: 60px;
                            }
                            .icon_right_number{
                                color:$box3_color;
                                font-weight: 700;
                                font-size: 26px;
                                line-height: 60px;
                            }
                        }
                    }
                }
                &.box4{
                    background: #8bc2f8;
                    box-shadow: 0 0 5px #8bc2f8;
                    border-radius: 5px
                }
                .icon_left {
                    width: 60px;
                    height: 60px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color:#fff;
                }
                .icon_right {
                    border: 1px solid transparent;
                    display: inline-block;
                    color: $mainFontColor;
                    height: 60px;
                    .icon_right_number {
                        font-size: 24px;
                        line-height: 24px;
                        margin-bottom: 10px;
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

    .tabclick{
        position: absolute;
        right: 0;
        top:0;
        bottom:20px;
        background: #fff;
        width: calc(100% - 126px);
        padding: 0 20px;
        border:1px solid #eee;
        border-left:0;
        .tabclick_top{
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
                border-bottom:1px solid #ebebeb;
            }
        }
        .tabclick_bottom{
            position: relative;
            height: calc(100% - 212px);
            overflow-y: scroll;
            overflow-x: hidden;
            .tabclick_bottom_scroll{
                position: absolute;
                width: 100%;
                background: #fff;
                top:0px;
                .content_main {
                    box-sizing: border-box;
                    ul {
                        width: 100%;
                        overflow: hidden;
                        li {
                            margin-right:2%;
                            position: relative;
                            margin-bottom: 10px;
                            cursor:pointer;
                            height: 124px;
                            &:nth-of-type(4n){
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
                                        color:$content_main_color;
                                        white-space: nowrap;
                                        .icon{
                                            width: 14px;
                                            height: 14px;
                                            background: url($icon_top);
                                            background-size: cover;
                                            display: inline-block;
                                            margin-right: 8px;
                                        }
                                        .icon_people{
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
                                        .number{
                                            font-size: 20px;
                                            color:$boxTextColor;
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
                                border-bottom-right-radius:4px;
                                border-bottom-left-radius:4px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

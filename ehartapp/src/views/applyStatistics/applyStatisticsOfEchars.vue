<template>
    <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 tabclick"
         style="height:100%;background: #fff;position: absolute;top:80px;height: calc(100% - 80px)">
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
                <span class="wrapper">
                    <el-date-picker
                            v-model="endTime"
                            :editable=false
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入结束日期">
                </el-date-picker>
                </span>


                <span class="wrapper">
                  <el-select v-model="value" placeholder="请选择类型">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                  </el-select>
                </span>
                <span class="wrapper">
                    <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                </span>

            </div>
        </div>
        <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24"
             style="height: calc(100% - 100px);position: relative">
            <div class="content_top">
                <ul class="el-col el-col-24 el-col-xs-24 el-col-sm-24">
                    <li class="el-col el-col-5 el-col-xs-5 el-col-sm-5 box1">
                        <div class="icon_left el-col el-col-4 el-col-xs-4 el-col-sm-4">
                            <i class="el-icon-upload"></i>
                        </div>
                        <div class="icon_right el-col el-col-18 el-col-xs-18 el-col-sm-18">
                            <p class="icon_right_number">{{totalStatisticsList.totalFee | currency("￥",2)}}</p>
                            <p class="icon_right_text">当月总费用(元)</p>
                        </div>
                    </li>
                    <li class="el-col el-col-5 el-col-xs-5 el-col-sm-5 box2">
                        <div class="icon_left el-col el-col-4 el-col-xs-4 el-col-sm-4">
                            <i class="el-icon-upload"></i>
                        </div>
                        <div class="icon_right el-col el-col-18 el-col-xs-18 el-col-sm-18">
                            <p class="icon_right_number">{{totalStatisticsList.totalWeight}}</p>
                            <p class="icon_right_text">当月总重量(吨)</p>
                        </div>
                    </li>
                    <li class="el-col el-col-5 el-col-xs-5 el-col-sm-5 box3">
                        <div class="icon_left el-col el-col-4 el-col-xs-4 el-col-sm-4">
                            <i class="el-icon-upload"></i>
                        </div>
                        <div class="icon_right el-col el-col-18 el-col-xs-18 el-col-sm-18">
                            <p class="icon_right_number">{{totalStatisticsList.vehicleCount}}</p>
                            <p class="icon_right_text">当月累计出车次数(车次)</p>
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

            <div class="content_main">

                <ul>
                    <li v-for="(value, key, index) in statistics" @click="goDayDetails($event)"
                        :data-id="value.startPlaceInfo.id" class = "el-col el-col-5 el-col-xs-5 el-col-sm-5">
                        <div class="icon_top el-col el-col-24 el-col-xs-24 el-col-sm-24">
                            <div class="icon_top_left el-col el-col-24 el-col-xs-24 el-col-sm-4">
                                <i class="el-icon-upload"></i>
                            </div>
                            <div class="icon_top_right el-col el-col-24 el-col-xs-24 el-col-sm-20">
                                <p class="icon_text">
                                    <span class="noBlod">费用</span>
                                    <b>{{value.charge | currency("￥",2)}}</b>
                                    <span class="noBlod"></span>
                                </p>
                                <p class="icon_text">
                                    <span class="noBlod">重量</span>
                                    <b>{{value.weight}}</b>
                                    <span class="noBlod">(吨)</span>
                                </p>

                            </div>
                        </div>
                        <div class="icon_bottom">
                            {{value.startPlaceInfo.name}}
                        </div>
                    </li>
                </ul>

            </div>
            <el-pagination
                    style = "position: absolute;bottom: 10px;left:30px;"
                    @current-change="handleCurrentChange"
                    :current-page=currentPage
                    :page-size="size"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
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
                options: [{
                    label: "小区",
                    value: 'village',
                }, {
                    label: "运输公司",
                    value: 'company',
                }, {
                    label: "消纳场地",
                    value: 'treatmentPlant',
                }],
                value: "village",
                currentPage:1,
                size:8,
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
            };
        },
        methods: {
            query(page){
                let endTime = this.endTime;
                let startTime = this.startTime;
                let newStartTime = new Date(startTime);
                let newEndTime = new Date(endTime);
                let type = this.value,
                    _this = this;
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
                this.query();
            },
            // 点击进入相应的day
            goDayDetails($event){
                let target = event.currentTarget;
                let id = $(target).attr("data-id");
                let [startPlace, startTime, endTime, type] = [id, this.startTime, this.endTime, this.value];
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
            //action方法
            ...mapActions([
                'applyStatistics',
            ]),
        },
        mounted(){
            let query = this.$router.currentRoute.query;
            if(JSON.stringify(query) === "{}"){
                // 填充默认数据
                let time = this.getPrevMonth();
                this.startTime = time.currentDayOfStart;
                this.endTime = time.currentDayOfEnd;

                let _this = this;
                this.applyStatistics({
                    page: 1,
                    startTime:time.currentDayOfStart,
                    endTime:time.currentDayOfEnd,
                    type: this.value,
                }).then(() => {
                    let statisticsList = this.statisticsList;
                    let statistics = statisticsList.records;
                    this.statistics = statistics;

                    let records = statisticsList.records;
                    let total = statisticsList.total;
                    let size = statisticsList.size;
                    let current = statisticsList.current;
                    let pages = statisticsList.pages;
                    this.currentPage = current;
                    this.total = total;
                    this.records = records;
                });
            }else{
                // startPlaceId=51&startTime=2017-11-19&endTime=2017-12-19&type=company
                let [startPlaceId,startTime,endTime,type] = [query.startPlaceId,query.startTime,query.endTime,query.type];
                this.value = type,
                    this.startTime = startTime,
                    this.endTime = endTime;
                this.applyStatistics({
                    page: 1,
                    startPlaceId,
                    startTime,
                    endTime,
                    type,
                }).then(() => {
                    let statisticsList = this.statisticsList;
                    let statistics = statisticsList.records;
                    this.statistics = statistics;

                    let records = statisticsList.records;
                    let total = statisticsList.total;
                    let size = statisticsList.size;
                    let current = statisticsList.current;
                    let pages = statisticsList.pages;
                    this.currentPage = current;
                    this.total = total;
                    this.records = records;
                });
            }
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
    .form_nav {
        > div {
            background: #eff4f8;
            height: 100%;
            padding: 0 15px;
            .wrapper {
                line-height: 60px;
            }
        }
        background: #fff;
        height: 80px;
        padding: 10px 0;
    }

    .content_top {
        box-sizing: border-box;
        height: 120px;
        margin-bottom: 20px;
        ul {
            width: 100%;
            height: 100%;
            padding:0 30px;
            li {
                margin-right:5%;
                height: 120px;
                padding-top: 2%;
                &:last-of-type{
                    margin-right: 0;
                }
                &.box1{
                    background: #8892fc;
                    box-shadow: 0 0 5px #8892fc;
                    border-radius: 5px
                }
                &.box2{
                    background: #bc8cef;
                    box-shadow: 0 0 5px #bc8cef;
                    border-radius: 5px
                }
                &.box3{
                    background: #ffa799;
                    box-shadow: 0 0 5px #ffa799;
                    border-radius: 5px
                }
                &.box4{
                    background: #8bc2f8;
                    box-shadow: 0 0 5px #8bc2f8;
                    border-radius: 5px
                }
                .icon_left {
                    width: 50px;
                    height: 50px;
                    border-radius: 4px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
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

    .content_main {
        box-sizing: border-box;
        height: calc(100% - 140px);
        ul {
            width: 100%;
            padding:0 30px;
            overflow: hidden;
            li {
                margin-right:5%;
                border: 1px solid $mainColor;
                position: relative;
                height: 150px;
                margin-bottom: 10px;
                cursor:pointer;
                &:nth-of-type(4n){
                    margin-right: 0;
                }
                .icon_top {
                    position: absolute;
                    top: 0;
                    padding: 15px;
                    display: inline-block;
                    width: 100%;
                    font-size: 24px;
                    .icon_top_left {
                        color: $mainColor;
                    }
                    .icon_top_right {
                        .icon_text {
                            .noBlod {
                                font-size: 18px;
                            }
                        }
                    }
                }
                .icon_bottom {
                    text-align: center;
                    position: absolute;
                    bottom: -1px;
                    display: inline-block;
                    color: #fff;
                    background: $mainColor;
                    width: 100%;
                    height: 52px;
                    font-size: 25px;
                    line-height: 52px;
                }
            }
        }
    }
</style>

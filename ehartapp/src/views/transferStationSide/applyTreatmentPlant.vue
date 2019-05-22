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

                <span class="wrapper">
                    <el-input v-model="input" placeholder="请输入车牌号码" style="margin-left:10px;"></el-input>
                </span>
                <span class="wrapper">
                    <el-button type="primary" @click.stop="searchCarInfo" style="margin-left:10px;">查找</el-button>
                </span>
                </div>
            </div>


        </div>
        <div class = "table_pagination">
            <template>
                <el-table
                        v-loading.lock="loading"
                        :data="tableData"
                        border
                        stripe
                        fit
                        :height="height"
                        style="width: 100%">
                    <el-table-column
                            label="车牌号码"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.licensePlatNumber}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="垃圾重量（吨）"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.weight}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="费用（元）"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.charge | currency("",0)}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="行程单开始时间"
                            align="center"
                            min-width="120"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px">{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="行程单结束时间"
                            align="center"
                            min-width="120"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px">{{scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="startPlaceInfo.name"
                            label="起点">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="endPlaceInfo.name"
                            label="终点">
                    </el-table-column>

                    <el-table-column label="操作"
                                     align="center"
                                     min-width="80"
                    >
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    @click="queryApplyInMap(scope.$index, scope.row)">查看行程单
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination_wrapper">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page=currentPage
                            :page-size="size"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/apply/actions'
    import {currency} from '../../../assets/js/util'

    export default{
        data() {
            return {
                input: '',
                startTime: "",
                endTime: "",
                height: "",
                ruleFormEdit: {},
                loading: false,
                tableData: [],
                total: 1,
                currentPage: 1,
                size: 6,
            };
        },
        methods: {
            searchCarInfo(){
                let query = this.$router.currentRoute.query;
                let [type, id, startTime, endTime] = [query.type, query.id, this.startTime, this.endTime];
                this.query(type, id, this.currentPage, this.input, startTime, endTime);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let query = this.$router.currentRoute.query;
                let [type,id,startTime,endTime] = [query.type,query.id,this.startTime,this.endTime];
                this.query(type,id,val,this.input,startTime,endTime);
            },
            // 查看行程单
            queryApplyInMap(index, row) {
                let id = row.id;
                this.$router.push({
                    path: '/searchHistoryLocu',
                    query: {id}
                });
            },
            getQuery(){
                let query = this.$router.currentRoute.query;
                let [type, id, startTime, endTime] = [query.type, query.id, this.startTime, this.endTime];
                this.query(type, id, this.currentPage, this.input, startTime, endTime);
            },
            query(type, id, page = 1, input, startTime, endTime){
                this.applyQueryapplybytreatmentplant({
                    type,
                    id,
                    page,
                    input,
                    startTime,
                    endTime
                }).then(() => {
                    let res = this.table;
                    console.log(res);
                    this.tableData = res.records;
                    this.currentPage = res.current;
                    this.total = res.total;
                });
            },
            //action方法
            ...mapActions([
                'applyQueryapplybytreatmentplant',
            ]),
        },
        mounted(){
            // 控制表格高度
            let _this = this;
//            this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
            this.getQuery();
            _this.loading = false;
        },
        watch: {
            '$route': 'getQuery',
        },
        computed: {
            ...mapGetters({
                table: "getApplyQueryapplybytreatmentplantList",
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
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

    .table_pagination {
        overflow: hidden;
        border: 1px solid #eee;
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
        border-left:0;

        .tabclick_top {
            overflow: hidden;
            .form_nav {
                > div {
                    height: 100%;
                    .wrapper {
                        line-height: 60px;
                        .el-input {
                            width: 200px;
                        }
                    }
                }
                background: #fff;
                height: 80px;
                padding: 10px 0;
                border-bottom: 1px solid #ebebeb;
                margin-bottom: 20px;
            }
        }
    }
</style>

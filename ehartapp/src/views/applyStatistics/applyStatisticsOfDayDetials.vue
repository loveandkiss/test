    <template>
        <div class = "tabclick_parent">
            <div class="tabclick">
                <div class = "tabclick_top">
                    <div class = "form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                        <div>
                     <span class="wrapper" style="float:left;">
                        <el-button type="primary" @click.stop="goBack">返回上一级</el-button>
                      </span>
                        </div>
                    </div>
                    <div class = "table_pagination">
                        <template>
                            <el-table
                                    v-loading.lock="loading"
                                    :data="records"
                                    border
                                    :height="height"
                                    stripe
                                    fit
                                    style="width: 100%">

                                <el-table-column prop="startPlaceInfo.name" label="小区" align="center" v-if = "type === 'village'">
                                </el-table-column>

                                <el-table-column prop="startPlaceInfo.name" label="运输公司" align="center" v-if = "type === 'company'">
                                </el-table-column>

                                <el-table-column prop="startPlaceInfo.name" label="消纳场地" align="center" v-if = "type === 'treatmentPlant'">
                                </el-table-column>

                                <el-table-column
                                        label="日期"
                                        align="center"
                                        min-width="120"
                                >
                                    <template scope="scope">
                                        <span style="margin-left: 10px">{{scope.row.startTime  | parseTime('{y}-{m}-{d}')}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="重量(吨)"
                                        show-overflow-tooltip
                                        align="center"
                                >
                                    <template scope="scope">
                                        {{ scope.row.weight}}
                                    </template>
                                </el-table-column>



                                <el-table-column
                                        label="费用(元)"
                                        align="center"
                                >
                                    <template scope="scope">
                                        {{scope.row.charge | currency("",0)}}
                                    </template>
                                </el-table-column>


                                <el-table-column label="操作"
                                                 align="center"
                                                 min-width="120"
                                >
                                    <template scope="scope">
                                        <el-button
                                                size="small"
                                                @click="handleEdit(scope.$index, scope.row)">查看
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
                loading: true,
                currentPage:1,
                size:10,
                total:1,
                records:[],
                height:'',
                type:"",
                historyFlag:false,
            };
        },
        methods: {
            goBack(){
                let query = this.$router.currentRoute.query;
                let [startPlaceId,startTime,endTime,type] = [query.startPlaceId,query.startTime,query.endTime,query.type];
                this.$router.push({
                    path: '/applyStatistics/applyStatisticsOfEcharsVillage',
                    query: {
                        startPlaceId,
                        startTime,
                        endTime,
                        type,
                    }
                });
                this.historyFlag = true;
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.query(val);
            },
            handleEdit(index, row){
                let [dateTime,startPlaceId,type] = [parseTime(row.startTime),row.startPlaceInfo.id,this.type];
                this.$router.push({
                    path: '/applyStatistics/applyStatisticsOfDayDetials/applyStatisticsOfApplyDetials',
                    query: {
                        dateTime,
                        startPlaceId,
                        type:type,
                    }
                });
            },
            query(page){
                let _this = this;
                let query = this.$router.currentRoute.query;
                let [startPlace,startTime,endTime,type] = [query.startPlaceId,query.startTime,query.endTime,query.type];
                this.type = query.type;
                this.applyStatisticsOfDayDetails({
                    startPlaceId:startPlace,
                    startTime:startTime,
                    endTime:endTime,
                    type:type,
                    page:page,
                }).then(() => {
                    _this.loading = false;
                    let statisticsOfDayDetailsList = this.statisticsOfDayDetailsList;
                    let records = statisticsOfDayDetailsList.records;
                    let total = statisticsOfDayDetailsList.total;
                    let size = statisticsOfDayDetailsList.size;
                    let current = statisticsOfDayDetailsList.current;
                    let pages = statisticsOfDayDetailsList.pages;
                    this.currentPage = current;
                    this.total = total;
                    this.records = records;
                });
            },
            ...mapActions([
               'applyStatisticsOfDayDetails',
            ]),
        },
        mounted(){
            // 控制表格高度
            this.height = $(".apply_form").height()  - 40;
            if(this.historyFlag === false){
                this.query();
            }
        },
        computed: {
            ...mapGetters({
                statisticsOfDayDetailsList:"getStatisticsOfDayDetailsList",
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .tabclick_parent{
        margin: 10px 10px 0 10px;
        position: absolute;
        top: 66px;
        width: calc(100% - 20px);
        height: calc(100% - 76px);
        background: #f2f2f2;
        box-sizing: border-box;
        .tabclick{
            width: 100% ;
        }
    }
    .table_pagination{
        overflow: hidden;
        border:1px solid #eee;
    }
    .tabclick {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 20px;
        background: #fff;
        padding: 0 20px;
        border: 1px solid #eee;
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
                margin-bottom: 20px;
            }
        }
    }
</style>

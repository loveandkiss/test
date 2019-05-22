<template>
        <div class = "el-col el-col-24 el-col-xs-24 el-col-sm-24 tabclick" style = "height:100%">
            <div class = "form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                     <span class="wrapper" style = "float:left;">
                      </span>
                    <span class="wrapper" style = "float:right;">
                        <el-button type="primary" @click.stop = "searchCarInfo">查找</el-button>
                      </span>
                    <span class="wrapper" style = "float:right;margin-right:20px;">
                          <el-input v-model="input" placeholder="请输入车牌号"></el-input>
                      </span>
                </div>
            </div>
            <form>
                <template>
                    <el-table
					        v-loading.lock="loading"
                            :data="tableData"
                            border
                            stripe
                            fit
                            :height = "height"
                            style="width: 100%">
                        <el-table-column
                                label="流水号"
                                align = "center"

                        >
                            <template scope="scope">
                                {{ scope.row.serialNumber}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="垃圾重量（吨）"
                                align = "center"

                        >
                            <template scope="scope">
                                {{ scope.row.weight}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="费用（元）"
                                align = "center"

                        >
                            <template scope="scope">
                                {{ scope.row.charge}}
                            </template>
                        </el-table-column>


			   <el-table-column
                                label="车牌号码"
                                align = "center"

                        >
                            <template scope="scope">
                                {{ scope.row.licensePlatNumber}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="行程单开始时间"
                                align="center"
                                min-width="100"
                        >
                            <template scope="scope">
                                <span style="margin-left: 10px" v-if="scope.row.startTime === null"></span>
                                <span style="margin-left: 10px" v-else>{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="行程单结束时间"
                                align="center"
                                min-width="100"
                        >
                            <template scope="scope">
                                <span style="margin-left: 10px" v-if="scope.row.endTime === null"></span>
                                <span style="margin-left: 10px" v-else>{{scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
                    </el-table>
                    <el-pagination
                            style = "margin-top:5px;"
                            @current-change="handleCurrentChange"
                            :current-page=currentPage
                            :page-sizes="[10]"
                            :page-size="size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </template>
            </form>
        </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as actions from '../../store/modules/apply/actions'
    export default{

        data() {
            return {
                currentPage: 1,
                input: '',
                height:"",
                size:10,
                formLabelWidth: '120px',
                loading:true,

            };
        },
        methods: {
            searchCarInfo(){
                this.queryApplyException({
                    page:this.currentPage,
                    input:this.input
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryApplyException({
                    page:val
                });
            },
            //action方法
            ...mapActions([
                'queryApplyException',
                'findByApplyId',
                'saveOrUpdateApply',
                'deleteApply',
                'batchDeleteApply'
            ]),
        },
        mounted(){
            // 控制表格高度
            this.$nextTick(() => {
                this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
                this.queryApplyException({}).then(() => {
                    this.loading = false;
                });
            })

        },
        computed:{
            ...mapGetters({
                tableData: "getApplys",
                total : "getApplyTotal",
                current: "getCurrentApply"
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .form_nav {
        > div {
            background: #eff4f8;
            height: 100%;
            width: 100%;
            padding: 0 15px;
            .wrapper {
                line-height: 60px;
            }
        }
        background: #fff;
        height: 80px;
        padding: 10px 0;
        margin: 10px 0;
    }
</style>

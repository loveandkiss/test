<template>
        <div class = "tabclick">
            <div class="tabclick_top">
                <div class = "form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                    <div>
                    <span class="wrapper" v-show = "false">
                        <el-date-picker
                        v-model="startTime"
                        :editable=false
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请输入开始日期">
                        </el-date-picker>
                    </span>
                    <span class = "wrapper time_to" v-show = "false">
                    </span>
                    <span class="wrapper" v-show = "false">
                        <el-date-picker
                        v-model="endTime"
                        :editable=false
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请输入结束日期">
                        </el-date-picker>
                    </span>
                    <span class="wrapper">
                        <el-input v-model="input" placeholder="请输入车牌号" style = "margin-left:10px;"></el-input>
                    </span>
                    <span class="wrapper">
                        <el-button type="primary" @click.stop="searchCarInfo" style = "margin-left:10px;">查找</el-button>
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
                                {{ scope.row.charge | currency("",0)}}
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

                        <el-table-column label="操作"
                                         align = "center"
                                         min-width="80"
                        >
                            <template scope="scope">
                                <el-button
                                        size="small"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination_wrapper">
                        <el-pagination
                                style = "margin-top:5px;"
                                @current-change="handleCurrentChange"
                                :current-page=currentPage
                                :page-sizes="[10]"
                                :page-size="size"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </template>
            </div>
            <el-dialog title="编辑行程单" :visible.sync="dialogFormVisibleEdit">
                <el-form :model="ruleFormEdit"  ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="流水号" prop="serialNumber">
                        <el-input disabled type="text" v-model="ruleFormEdit.serialNumber" auto-complete="off" placeholder="请输入流水号"></el-input>
                    </el-form-item>

                    <el-form-item label="垃圾重量（吨）" prop="weight">
                        <el-input disabled type="text" v-model="ruleFormEdit.weight" auto-complete="off" placeholder="请输入垃圾重量（吨）"></el-input>
                    </el-form-item>


                    <el-form-item label="车牌号码" prop="licensePlatNumber">
                        <el-input disabled type="text" v-model="ruleFormEdit.licensePlatNumber" auto-complete="off" placeholder="请输入车牌号码"></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间" prop="startTime">

                        <el-date-picker
                                v-model="ruleFormEdit.startTime"
                                type="datetime"
                                :editable=false
                                >
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间：" prop="endTime">
                        <el-date-picker
                                v-model="ruleFormEdit.endTime"
                                type="datetime"
                                :disabled=true
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="起点：" prop="startPlace" v-show="false">
                        <el-input type="text" v-model="ruleFormEdit.startPlace" auto-complete="off" placeholder="请输入起点"></el-input>
                    </el-form-item>

                    <el-form-item label="起点">
                        <el-select  v-model="ruleFormEdit1.aaa" placeholder="请选择起点" @change="querySearch">
                            <el-option
                                    v-for="item in options"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>



                    <el-form-item label="终点" prop="endPlace">
                        <el-input disabled type="text" v-model="ruleFormEdit1.name" auto-complete="off" placeholder="请输入终点"></el-input>
                    </el-form-item>



                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
                    <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                    <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as actions from '../../store/modules/apply/actions'
    import {parseTime, currency,locationStroageObj} from '../../../assets/js/util'
    import { SERVER_URI } from '../../store/const'

    export default{

        data() {
            return {
                options: [],
                dialogFormVisibleEdit : false,
                ruleFormEdit:{

                },
                ruleFormEdit1: {},
                currentPage: 1,
                input: '',
                startTime:"",
                endTime:"",
                height:"",
                size:10,
                formLabelWidth: '120px',
                loading:true,

            };
        },
        methods: {
            submitFormEdit(formName){
                 console.log(this.ruleFormEdit);
                this.$axios.post(`${SERVER_URI}apply/saveOrUpdate`,
                    this.ruleFormEdit).then(response => {
                    this.successEdit();
                    }
                ).catch(function (error) {
                    console.log(error);
                });
                debugger;
            },
            // 编辑
            handleEdit(index, row) {
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;
                this.ruleFormEdit1 = row.endPlaceInfo;
            },
            dengerColor:function(row,index){
                return {"color":"red"}
            },
            searchCarInfo(){
                let [startTime,endTime] = [this.startTime,this.endTime];
                this.queryApplyExceptionOfOrigin({
                    page:this.currentPage,
                    input:this.input,
                    startTime,
                    endTime,
                });
            },

            querySearch(queryString) {
//                alert(queryString);
                var _this = this;
                this.options.forEach((v, i, arr) => {
                    console.log(arr);
                    if (arr[i].name === queryString) {
                        _this.ruleFormEdit.startPlace = arr[i].id;
                    }
                })

            },
            // 修改成功
            successEdit () {
                let _this = this;
                this.queryApplyExceptionOfOrigin({}).then(() => {
                    let page = _this.currentPage;
                    this.queryApplyExceptionOfOrigin({
                        page: page
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '编辑成功!'
                        });
                        this.dialogFormVisibleEdit = false;
                    })
                });

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryApplyExceptionOfOrigin({
                    page:val,
                    input:this.input,
                });
            },
            //action方法
            ...mapActions([
                'queryApplyExceptionOfOrigin',
                'findByApplyId',
                'saveOrUpdateApply',
                'deleteApply',
                'batchDeleteApply'
            ]),
        },
        mounted(){
            this.$axios.post(`${SERVER_URI}placeinfo/queryPlaceInfos`, {
            }).then(response => {
                    this.options = response.data.data.records;
                }
            ).catch(function (error) {
                console.log(error);
            });
            // 控制表格高度
            this.$nextTick(() => {
//                this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
                this.queryApplyExceptionOfOrigin({}).then(() => {
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
                        .el-input{
                            width:200px;
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

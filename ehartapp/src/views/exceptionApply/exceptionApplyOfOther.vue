<template>
    <div class="tabclick">
        <div class="tabclick_top">
            <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                <span class="wrapper" v-show="false">
                    <el-date-picker
                            v-model="startTime"
                            :editable=false
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入开始日期">
                    </el-date-picker>
                </span>
                    <span class="wrapper time_to" v-show="false">
                </span>
                    <span class="wrapper" v-show="false">
                    <el-date-picker
                            v-model="endTime"
                            :editable=false
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入结束日期">
                    </el-date-picker>
                </span>

                    <span class="wrapper">
                    <el-input v-model="input" placeholder="请输入车牌号" style="margin-left:10px;"></el-input>
                </span>
                    <span class="wrapper">
                    <el-button type="primary" @click.stop="searchCarInfo" style="margin-left:10px;">查找</el-button>
                </span>
                </div>
            </div>
        </div>
        <div class="table_pagination">
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
                            label="流水号"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.serialNumber}}
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
                            {{ scope.row.charge | currency("", 0)}}
                        </template>
                    </el-table-column>


                    <el-table-column
                            label="车牌号码"
                            align="center"

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
                            <span style="margin-left: 10px"
                                  v-else>{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="行程单结束时间"
                            align="center"
                            min-width="100"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px" v-if="scope.row.startTime === null"></span>
                            <span style="margin-left: 10px"
                                  v-else>{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination_wrapper">
                    <el-pagination
                            style="margin-top:5px;"
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
            <el-form :model="ruleFormEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">

                <el-form-item label="流水号" prop="serialNumber">
                    <el-input type="text" :disabled="serialNumberDisabled" v-model="ruleFormEdit.serialNumber"
                              auto-complete="off" placeholder="请输入流水号"></el-input>
                </el-form-item>

                <el-form-item label="垃圾重量（吨）" prop="weight">
                    <el-input type="text" :disabled="weightDisabled" v-model="ruleFormEdit.weight" auto-complete="off"
                              placeholder="请输入垃圾重量（吨）"></el-input>
                </el-form-item>


                <el-form-item label="车牌号码" prop="licensePlatNumber">
                    <el-input type="text" :disabled="licensePlatNumberDisabled" v-model="ruleFormEdit.licensePlatNumber" auto-complete="off"
                              placeholder="请输入车牌号码"></el-input>
                </el-form-item>

                <el-form-item label="开始时间: " prop="startTime">
                    <el-date-picker
                            :disabled="startTimeDisabled"
                            v-model="ruleFormEdit.startTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="结束时间: " prop="endTime">
                    <el-date-picker
                            :disabled="endTimeDisabled"
                            v-model="ruleFormEdit.endTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                    <!--<el-input type="text" v-model="ruleFormEdit.startTime" auto-complete="off" placeholder="请输入行程单开始时间"></el-input>-->
                </el-form-item>


                <el-form-item label="起点" prop="startPlace" v-show="false">
                    <el-input type="text" v-model="ruleFormEdit.startPlace" auto-complete="off"
                              placeholder="请输入终点"></el-input>
                </el-form-item>

                <el-form-item label="起点">
                    <el-select v-model="ruleFormEditStart.name" placeholder="请选择起点" @change="querySearchStart" :disabled="startPlaceDisabled">
                        <el-option
                                v-for="item in optionsStart"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="终点" prop="endPlace" v-show="false">
                    <el-input type="text" v-model="ruleFormEdit.endPlace" auto-complete="off"
                              placeholder="请输入终点"></el-input>
                </el-form-item>

                <el-form-item label="终点">
                    <el-select v-model="ruleFormEditEnd.name" placeholder="请选择终点" @change="querySearchEnd" :disabled="endPlaceDisabled">
                        <el-option
                                v-for="item in optionsEnd"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
                <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                <el-button @click="cancleSubmit">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/apply/actions'
    import {currency} from '../../../assets/js/util'
    import {SERVER_URI} from '../../store/const'

    export default{

        data() {
            return {
                optionsStart: [],
                optionsEnd: [],
                dialogFormVisibleEdit: false,
                ruleFormEdit: {},
                ruleFormEditStart: {name: ""},
                ruleFormEditEnd: {name: ""},
                currentPage: 1,
                input: '',
                startTime: "",
                endTime: "",
                height: "",
                size: 6,
                formLabelWidth: '120px',
                loading: true,

                serialNumberDisabled:true,
                weightDisabled:true,
                licensePlatNumberDisabled:true,
                startTimeDisabled:true,
                endTimeDisabled:true,
                startPlaceDisabled:true,
                endPlaceDisabled:true,

            };
        },
        methods: {
            cancleSubmit(){
                let _this = this;
                this.queryApplyExceptionOfOther({}).then(() => {
                    let page = _this.currentPage;
                    this.queryApplyExceptionOfOther({
                        page: page
                    }).then(() => {
                        _this.dialogFormVisibleEdit = false;
                    })
                });
            },

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
            // 修改成功
            successEdit () {
                let _this = this;
                this.queryApplyExceptionOfOther({}).then(() => {
                    let page = _this.currentPage;
                    this.queryApplyExceptionOfOther({
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
            // 编辑
            handleEdit(index, row) {
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;

                // 获取那个字段不可编辑
//                this.getDisabled("serialNumber");
//                this.getDisabled("weight");
//                this.getDisabled("licensePlatNumber");
//                this.getDisabled("startTime");
//                this.getDisabled("endTime");
//
//                this.getDisabled("start",true);
//                this.getDisabled("end",true);
                console.log(row)
                    if (this.ruleFormEdit.serialNumber === "") {
                        this.serialNumberDisabled =  false;
                    } else {
                        this.serialNumberDisabled =  true;
                    }


                    if (this.ruleFormEdit.weight === "") {
                        this.weightDisabled=false;
                    } else {
                        this.weightDisabled=true;
                    }


                    if (this.ruleFormEdit.licensePlatNumber === "") {
                        this.licensePlatNumberDisabled=false;
                    } else {
                        this.licensePlatNumberDisabled=true;
                    }


                    if (this.ruleFormEdit.startTime === ""||this.ruleFormEdit.startTime === undefined ||this.ruleFormEdit.startTime === null) {
                        this.startTimeDisabled=false;
                    } else {
                        this.startTimeDisabled=true;
                    }


                    if (this.ruleFormEdit.endTime === ""||this.ruleFormEdit.endTime === undefined ||this.ruleFormEdit.endTime === null) {
                        this.endTimeDisabled=false;
                    } else {
                        this.endTimeDisabled=true;
                    }


                    if (this.ruleFormEditStart.name === "") {
                        this.startPlaceDisabled=false;
                    } else {
                        this.startPlaceDisabled=true;
                    }


                    if (this.ruleFormEditEnd.name === "") {
                        this.endPlaceDisabled=false;
                    } else {
                        this.endPlaceDisabled=true;
                    }

            },
            querySearchStart(queryString) {
                var _this = this;
                this.optionsStart.forEach((v, i, arr) => {
                    console.log(arr);
                    if (arr[i].name === queryString) {
                        _this.ruleFormEdit.startPlace = arr[i].id;
                    }
                })
            },
            querySearchEnd(queryString) {
                var _this = this;
                this.optionsEnd.forEach((v, i, arr) => {
                    console.log(arr);
                    if (arr[i].name === queryString) {
                        _this.ruleFormEdit.endPlace = arr[i].id;
                    }
                })
            },
            searchCarInfo(){
                let [startTime, endTime] = [this.startTime, this.endTime];
                this.queryApplyExceptionOfOther({
                    page: this.currentPage,
                    input: this.input,
                    startTime,
                    endTime,
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryApplyExceptionOfOther({
                    page: val,
                    input: this.input,
                });
            },
            getDisabled(params,place){
                if(!place){
                    if (this.ruleFormEdit[params] === "" || this.ruleFormEdit[params] === undefined || this.ruleFormEdit[params] === null) {
                        this[`${params}Disabled`] = false;
                    } else {
                        this[`${params}Disabled`] = true;
                    }
                }else{
                    debugger
                    if (this[`ruleFormEdit${params}`][name] === "") {
                        this[`${params}PlaceDisabled`] = false;
                    } else {
                        this[`${params}PlaceDisabled`] = false;
                    }
                }

            },
            //action方法
            ...mapActions([
                'queryApplyExceptionOfOther',
                'findByApplyId',
                'saveOrUpdateApply',
                'deleteApply',
                'batchDeleteApply'
            ]),
        },
        mounted(){

            this.$axios.post(`${SERVER_URI}placeinfo/queryPlaceInfos`, {}).then(response => {
                    this.optionsStart = response.data.data.records;
                    this.optionsEnd = response.data.data.records;
                }
            ).catch(function (error) {
                console.log(error);
            });
            // 控制表格高度
            this.$nextTick(() => {
                this.queryApplyExceptionOfOther({}).then(() => {
                    this.loading = false;
                });
            })


        },
        computed: {
            ...mapGetters({
                tableData: "getApplys",
                total: "getApplyTotal",
                current: "getCurrentApply"
            }),
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
        border-left: 0;
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

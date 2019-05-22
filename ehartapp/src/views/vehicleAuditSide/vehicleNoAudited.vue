<template>
    <div class="el-col el-col-24 el-col-xs-24 el-col-sm-22 tabclick" style="height:100%">
        <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
            <div>
                <span class="wrapper" style="float:right;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                      </span>
                <span class="wrapper" style="float:right;margin-right:20px;">
                          <el-input v-model="input" placeholder="请输入车牌号码"></el-input>
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
                        :height="height"
                        style="width: 100%">

                    <el-table-column
                            label="车队名称"
                            show-overflow-tooltip
                            align="center"
                    >
                        <template scope="scope">
                            {{ scope.row.motorcadeName }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="所属公司名称"
                            show-overflow-tooltip
                            align="center"
                            prop="biddingCompanyInfo.companyName"
                    >
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
                            label="设备名称"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.facilityName }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="驾驶员姓名"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.driverName}}
                        </template>

                    </el-table-column>

                    <el-table-column
                            label="设备ID"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.facilityId }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="驾驶员电话"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.driverPhone }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="修改日期"
                            align="center"
                            min-width="120"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px">{{scope.row.lastupdatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作"
                                     align="center"
                    >
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    @click="handleEdit(scope.$index, scope.row)">审核
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page=currentPage
                        :page-sizes="[10]"
                        :page-size="size"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </template>
        </form>
        <el-dialog title="审核车辆" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="ruleFormEdit" :rules="rulesEdit" ref="ruleFormEdit" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="车队名称" prop="motorcadeName">
                    <el-input type="text" v-model="ruleFormEdit.motorcadeName" :disabled="true" auto-complete="on"
                              placeholder="请输入车队名称"></el-input>
                </el-form-item>

                <el-form-item label="所属公司ID" prop="placeId" v-show="false">
                    <el-input type="text"
                              v-model="ruleFormEdit.companyId"
                              auto-complete="on"
                              placeholder="请输入所属公司ID"></el-input>
                </el-form-item>

                <el-form-item label="所属公司名称">
                    <el-select v-model="ruleFormEdit1.companyName" :disabled="true" placeholder="请输入公司名称"
                               @change="querySearch">
                        <el-option
                                v-for="item in options"
                                :key="item.companyName"
                                :label="item.companyName"
                                :value="item.companyName"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="车牌号码" prop="licensePlatNumber">
                    <el-input type="text" v-model="ruleFormEdit.licensePlatNumber" auto-complete="on"
                              :disabled="true" placeholder="请输入车队名称"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="facilityName">
                    <el-input v-model="ruleFormEdit.facilityName" :disabled="true" placeholder="请输入设备名称"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员姓名" prop="driverName">
                    <el-input v-model="ruleFormEdit.driverName" :disabled="true" placeholder="请输入驾驶员姓名"></el-input>
                </el-form-item>
                <el-form-item label="设备ID" prop="facilityId">
                    <el-input v-model="ruleFormEdit.facilityId" :disabled="true" placeholder="请输入设备ID"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员电话" prop="driverPhone">
                    <el-input v-model="ruleFormEdit.driverPhone" :disabled="true" placeholder="请输入驾驶员电话"></el-input>
                </el-form-item>

                <el-form-item label="上传" prop="upload" v-show = "false">
                    <el-input v-model="ruleFormEdit.upload"></el-input>
                </el-form-item>
                <el-form-item label="资质证明">
                    <el-upload
                            action="http://180.169.20.145:8094/spring-uploader/test/webUploader"
                            class="upload-demo"
                            multiple
                            ref="uploadDemo"
                            :disabled="true"
                            :file-list="fileList">
                        <el-button size="small" type="info">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="状态" prop="auditResult">
                    <el-radio-group v-model="ruleFormEdit.auditResult">
                        <el-radio  label="通过">通过</el-radio>
                        <el-radio  label="不通过">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="审核意见" prop="auditComment">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="ruleFormEdit.auditComment">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/vehicle/actions'
    import {UPLOAD_URL} from '../../main'

    export default{

        data() {
            return {
                currentPage: 1,
                input: '',
                height: "",
                size: 6,
                selection: [],
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                formLabelWidth: '120px',
                ruleFormEdit: {
                },
                ruleFormEdit1: {},
                isSubmit: false,
                rulesEdit: {},
                loading: true,
                options: [],
                fileList: []
            };
        },
        methods: {
            searchCarInfo(){
                this.queryVehicleNoAudited({
                    page: this.currentPage,
                    input: this.input
                });
            },
            addInfo(formName){
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryVehicleNoAudited({
                    page: val
                });
            },
            // 编辑
            handleEdit(index, row) {
                console.log(row);
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;
                this.ruleFormEdit1 = row.biddingCompanyInfo;
                this.ruleFormEdit.auditResult  ="通过";
                this.ruleFormEdit.auditComment  ="";


                // 上传图片回显
                let _this = this;
                this.fileList = [];
                let file = JSON.parse(row.upload);
                file.forEach((v,k,self) => {
                    _this.fileList.push({
                        name: v.name,
                        url: v.url,
                    });
                    this.$nextTick(() => {
                        let ul = _this.$refs.uploadDemo.$children[1].$el;
                        $(ul).find("li").eq(k).find("a").attr("href", UPLOAD_URL + v.url);
                    })
                })
            },
            submitFormEdit(formName){
                this.saveOrUpdateVehicle(this.ruleFormEdit).then(() => this.successEdit());
            },
            // 修改成功
            successEdit () {
                this.queryVehicleNoAudited({}).then(() => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
                    this.dialogFormVisibleEdit = false;
                });
            },
            failEdit(){
                this.$message({
                    type: 'info',
                    message: '编辑失败!'
                });
                this.dialogFormVisibleEdit = false;
            },
            querySearch(queryString) {
                var _this = this;
                this.options.forEach((v, i, arr) => {
                    if (arr[i].companyName === queryString) {
                        _this.ruleFormEdit.companyId = arr[i].id;
                    }
                })

            },
            //action方法
            ...mapActions([
                'findBiddingCompanyInfoByName',
                'queryVehicleNoAudited',
                'findByVehicleId',
                'saveOrUpdateVehicle',
                'deleteVehicle',
                'batchDeleteVehicle'
            ]),
        },
        mounted(){
            let _this = this;
            // 控制表格高度
            this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
            this.queryVehicleNoAudited({}).then(() => {
                _this.loading = false;
            });
            this.findBiddingCompanyInfoByName({}).then(() => {
                let res = _this.biddingCompanyInfoList;
                _this.options = res;
            })

        },
        computed: {
            ...mapGetters({
                tableData: "getVehicles",
                total: "getVehicleTotal",
                current: "getCurrentVehicle",
                biddingCompanyInfoList: "getBiddingCompanyInfoList"
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .form_nav {
        > div {
            background: #eff4f8;
            height: 100%;
            width: calc(100% - 15px);
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

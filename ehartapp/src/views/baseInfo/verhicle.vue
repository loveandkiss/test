<template>
    <div class="tabclick">
        <div class="tabclick_top">
            <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                    <span class="wrapper" style="float:left;">
                        <el-button type="success" @click.stop="addInfo('ruleForm2')">添加车辆信息</el-button>
                        <el-button type="danger" @click.stop="allDelete">全部删除</el-button>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:60px;">
                        <el-input v-model="input" placeholder="请输入车牌号码"></el-input>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:10px;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                    </span>
                </div>
            </div>
        </div>

        <div class="table_pagination">
            <template>
                <el-table
                        v-loading.lock="loading"
                        :data="tableData"
                        ref="deepRow"
                        border
                        stripe
                        fit
                        @selection-change="selectionChange"
                        :height="height"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            align="center"
                            width="50">
                    </el-table-column>

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
                            <!--<el-icon name="time"></el-icon>-->
                            <span style="margin-left: 10px">{{scope.row.lastupdatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="状态"
                            align="center"

                    >

                        <template scope="scope">
                            <!--冻结-->
                            <el-tag type="success" v-if="scope.row.auditResult == '已审核'">已审核</el-tag>
                            <!--启用-->
                            <el-tag type="gray" v-if="scope.row.auditResult == '未审核'">未审核</el-tag>
                        </template>

                    </el-table-column>

                    <el-table-column label="操作"
                                     align="center"
                                     min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                <div class="table_edit" @click="handleEdit(scope.$index, scope.row)">
                                    <div class="table_edit_icon">

                                    </div>
                                </div>

                                <div class="table_delete" @click="handleDelete(scope.$index, scope.row)">
                                    <div class="table_delete_icon">

                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination_wrapper">
                    <el-pagination
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
        <el-dialog title="添加车辆信息" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="车队名称" prop="motorcadeName">
                    <el-input type="text" v-model="ruleForm2.motorcadeName" auto-complete="on"
                              placeholder="请输入车队名称"></el-input>
                </el-form-item>

                <el-form-item label="所属公司ID" prop="placeId" v-show="false">
                    <el-input type="text"
                              v-model="ruleForm2.companyId"
                              auto-complete="on"
                              placeholder="请输入所属公司ID"></el-input>
                </el-form-item>

                <el-form-item label="所属公司名称" prop="estimateDriver">
                    <el-select v-model="ruleForm2.estimateDriver" placeholder="请输入公司名称" @change="querySearch">
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
                    <el-input type="text" v-model="ruleForm2.licensePlatNumber" auto-complete="on"
                              placeholder="请输入车队名称"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="facilityName">
                    <el-input v-model="ruleForm2.facilityName" placeholder="请输入设备名称"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员姓名" prop="driverName">
                    <el-input v-model="ruleForm2.driverName" placeholder="请输入驾驶员姓名"></el-input>
                </el-form-item>
                <el-form-item label="设备ID" prop="facilityId">
                    <el-input v-model="ruleForm2.facilityId" placeholder="请输入设备ID"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员电话" prop="driverPhone">
                    <el-input v-model="ruleForm2.driverPhone" placeholder="请输入驾驶员电话"></el-input>
                </el-form-item>
                <!--v-show = "false"-->
                <el-form-item label="上传" prop="upload" v-show = "false">
                    <el-input v-model="ruleForm2.upload"></el-input>
                </el-form-item>

                <el-form-item label="上传资质证明">
                    <el-upload
                            class="upload-demo"
                            action="http://180.169.20.145:8094/spring-uploader/test/webUploader"
                            :on-remove="handleRemoveAdd"
                            :on-success="handleSuccess"
                            multiple
                            ref="uploadDemo"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑车辆信息" :visible.sync="dialogFormVisibleEdit"
                   :before-close="cancleFormEdit"
        >
            <el-form :model="ruleFormEdit" :rules="rules2" ref="ruleFormEdit" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="车队名称" prop="motorcadeName">
                    <el-input type="text" v-model="ruleFormEdit.motorcadeName" auto-complete="on"
                              placeholder="请输入车队名称"></el-input>
                </el-form-item>

                <el-form-item label="所属公司ID" prop="placeId" v-show="false">
                    <el-input type="text"
                              v-model="ruleFormEdit.companyId"
                              auto-complete="on"
                              placeholder="请输入所属公司ID"></el-input>
                </el-form-item>

                <el-form-item label="所属公司名称">
                    <el-select v-model="ruleFormEdit1.companyName" placeholder="请输入公司名称" @change="querySearch">
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
                              placeholder="请输入车队名称"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="facilityName">
                    <el-input v-model="ruleFormEdit.facilityName" placeholder="请输入设备名称"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员姓名" prop="driverName">
                    <el-input v-model="ruleFormEdit.driverName" placeholder="请输入驾驶员姓名"></el-input>
                </el-form-item>
                <el-form-item label="设备ID" prop="facilityId">
                    <el-input v-model="ruleFormEdit.facilityId" placeholder="请输入设备ID"></el-input>
                </el-form-item>
                <el-form-item label="驾驶员电话" prop="driverPhone">
                    <el-input v-model="ruleFormEdit.driverPhone" placeholder="请输入驾驶员电话"></el-input>
                </el-form-item>
                <!--v-show = "false"-->
                <el-form-item label="上传" prop="upload" v-show = "false">
                    <el-input v-model="ruleFormEdit.upload"></el-input>
                </el-form-item>

                <el-form-item label="资质证明">
                    <el-upload
                            class="upload-demo"
                            action="http://180.169.20.145:8094/spring-uploader/test/webUploader"
                            :on-remove="handleRemoveEdit"
                            :on-success="handleEditSuccess"
                            multiple
                            ref="uploadDemo"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                <el-button @click="cancleFormEdit">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/vehicle/actions'
    import {UPLOAD_URL} from '../../main'
    import {isMobile, isCarNo, isChineseName} from '../../../assets/js/validate'

    export default{

        data() {
            const validateMobile = (rule, value, callback) => {
                if (!isMobile(value)) {
                    callback(new Error('请输入正确的手机号'))
                } else {
                    callback()
                }
            }
            const validateCarNo = (rule, value, callback) => {
                if (!isCarNo(value)) {
                    callback(new Error('请输入正确的车牌号'))
                } else {
                    callback()
                }
            }
            const validateChineseName = (rule, value, callback) => {
                if (!isChineseName(value)) {
                    callback(new Error('请输入正确的驾驶员姓名'))
                } else {
                    callback()
                }
            }


            return {
                currentPage: 1,
                input: '',
                height: "",
                size: 6,
                selection: [],
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                formLabelWidth: '120px',
                ruleForm2: {
                    motorcadeName: "",
                    estimateDriver: "",
                    licensePlatNumber: '',
                    companyName: '',
                    facilityName: '',
                    driverName: '',
                    facilityId: '',
                    driverPhone: '',
                    upload: '',
                },
                ruleFormEdit: {},
                ruleFormEdit1: {},
                isSubmit: false,
                rules2: {
                    motorcadeName: [
                        {required: true, message: '请输入车队名称', trigger: 'blur'},
                    ],
                    estimateDriver: [
                        {required: true, message: '请输入公司名称', trigger: 'change'},
                    ],
                    licensePlatNumber: [
                        {required: true, message: '请输入车队号码', trigger: 'blur'},
                        {required: true, trigger: 'blur', validator: validateCarNo}
                    ],
                    facilityName: [
                        {required: true, message: '请输入设备名称', trigger: 'blur'}
                    ],
                    driverName: [
                        {required: true, message: '请输入驾驶员姓名', trigger: 'blur'},
                        {required: true, trigger: 'blur', validator: validateChineseName}
                    ],
                    facilityId: [
                        {required: true, message: '请输入设备ID', trigger: 'blur'}
                    ],
                    driverPhone: [
                        {required: true, message: '请输入驾驶员电话', trigger: 'blur'},
                        {required: true, trigger: 'blur', validator: validateMobile}

                    ],
                },
                loading: true,
                options: [],
                fileList: [],
                // 编辑的文件列表
                fileListEdit: [],
                // 深复制对象
                deepPreviousRow: '',
                deepIndex: 0,
            };
        },
        methods: {
            // 取消编辑
            cancleFormEdit(){
                let _this = this;
                let row = JSON.parse(this.deepPreviousRow);
                this.dialogFormVisibleEdit = false;
                this.tableData.forEach((v, i, self) => {
                    if (i === _this.deepIndex) {
                        for (let k of Object.keys(v)) {
                            v[k] = row[k];
                        }
                    }
                })
            },
            // 上传
            handleRemoveAdd(file, fileList) {
                let ruleFormAdd = JSON.parse(this.ruleForm2.upload);
                ruleFormAdd.forEach((v, i, self) => {
                    if (v.url === file.url) {
                        self.splice(i, 1);
                    }
                })
                this.ruleForm2.upload = JSON.stringify(ruleFormAdd);
            },
            handleRemoveEdit(file, fileList) {
                let ruleFormEdit = JSON.parse(this.ruleFormEdit.upload);
                ruleFormEdit.forEach((v, i, self) => {
                    if (v.url === file.url) {
                        self.splice(i, 1);
                    }
                })
                this.ruleFormEdit.upload = JSON.stringify(ruleFormEdit);
            },
            handleEditSuccess(response, file, fileList){
                // UPLOAD_URL
                let _this = this;
                let temp = [];

                let fileTemp = [];
                let upload = this.ruleFormEdit.upload;
                let fileStr = JSON.parse(upload);
                fileStr.forEach((v, k, self) => {
                    fileTemp.push({
                        name: v.name,
                        url: v.url,
                    });
                })
                console.log(fileTemp);

                temp.push({
                    name: file.name,
                    url: file.response.result.urls[0],
                });

                let newArr = [...fileTemp,...temp]
                let tempStr = JSON.stringify(newArr);
                this.ruleFormEdit.upload = "";
                this.ruleFormEdit.upload = tempStr;

                this.$nextTick(() => {
                    let ul = _this.$refs.uploadDemo.$children[1].$el;
                    $(ul).find("li").last().find("a").attr("href", UPLOAD_URL + response.result.urls[0]);
                })
            },
            handleSuccess(response, file, fileList){
                // UPLOAD_URL
                let _this = this;
                let temp = [];
                console.log(fileList);
                fileList.forEach((v, k, self) => {
                    temp.push({
                        name: v.name,
                        url: v.response.result.urls[0],
                    });
                })
                let tempStr = JSON.stringify(temp);
                this.ruleForm2.upload = "";
                this.ruleForm2.upload = tempStr;

                this.$nextTick(() => {
                    let ul = _this.$refs.uploadDemo.$children[1].$el;
                    $(ul).find("li").last().find("a").attr("href", UPLOAD_URL + response.result.urls[0]);
                })
            },
            searchCarInfo(){
                this.queryVehicle({
                    page: this.currentPage,
                    input: this.input
                });
            },
            addInfo(formName){
                // 清空上传列表
                this.fileList = [];
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryVehicle({
                    page: val,
                    input:this.input
                });
            },
            // 编辑
            handleEdit(index, row) {
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;
                this.ruleFormEdit1 = row.biddingCompanyInfo;

                this.deepPreviousRow = JSON.stringify(row);
                this.deepIndex = index;
                let _this = this;
                this.fileList = [];
                let file = JSON.parse(row.upload);
                file.forEach((v, k, self) => {
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
                let _this = this;
                let tempArr = [];
                let upload = this.ruleFormEdit.upload;
                if (upload !== "") {
                    let file = JSON.parse(upload);
                    _this.fileListEdit = [];
                    file.forEach((v, k, self) => {
                        _this.fileListEdit.push({
                            name: v.name,
                            url: v.url,
                        });
                    })
                }
                this.fileListEdit.forEach((v, i, arr) => {
                    let temObj = {};
                    for (let k of Object.keys(v)) {
                        if (k === "url") {
                            temObj.url = v[k];
                        }
                        if (k === "name") {
                            temObj.name = v[k];
                        }
                    }
                    tempArr.push(temObj);
                })
                _this.ruleFormEdit.upload = JSON.stringify(tempArr);
                if (JSON.stringify(tempArr) !== "[]") {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.saveOrUpdateVehicle(this.ruleFormEdit).then(() => {
                                this.successEdit();
                                this.fileListEdit = [];
                            });
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$message.error("请上传资质证明！");
                }
            },
            // 删除
            handleDelete(index, row) {
                let _this = this;
                this.$confirm('是否删除该条信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteVehicle({
                        id: row.id
                    }).then(() => {
                        this.queryVehicle({
                            page: _this.currentPage
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 勾选
            selectionChange(selection){
                this.selection = selection;
            },
            // 点击删除操作
            allDelete(){
                var _this = this;
                var ids = [];
                if (this.selection != "") {
                    this.$confirm('是否删除全部信息', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.each(_this.selection, function (i, v) {
                            ids.push(_this.selection[i].id);
                        })
                        this.batchDeleteVehicle({items: ids}).then(() => {
                            _this.currentPage = 1;
                            this.queryVehicle({
                                page: 1
                            }).then(() => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message.error("请勾选信息");
                }
            },
            // 添加
            submitForm(formName) {
                let _this = this;
                let tempArr = [];
                let upload = this.ruleForm2.upload;
                if (upload !== "") {
                    let file = JSON.parse(upload);
                    _this.fileList = [];
                    file.forEach((v, k, self) => {
                        _this.fileList.push({
                            name: v.name,
                            url: v.url,
                        });
                    })
                }
                this.fileList.forEach((v, i, arr) => {
                    let temObj = {};
                    for (let k of Object.keys(v)) {
                        if (k === "url") {
                            temObj.url = v[k];
                        }
                        if (k === "name") {
                            temObj.name = v[k];
                        }
                    }
                    tempArr.push(temObj);
                })
                _this.ruleForm2.upload = JSON.stringify(tempArr);
                if (JSON.stringify(tempArr) !== "[]") {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.saveOrUpdateVehicle(this.ruleForm2).then(() => {
                                this.successSubmit();
                                this.$refs[formName].resetFields();
                            });
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$message.error("请上传资质证明！");
                }

            },
            successSubmit () {
                let _this = this;
                this.queryVehicle({}).then(() => {
                    _this.currentPage = 1;
                    this.queryVehicle({
                        page: 1
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.dialogFormVisible = false;
                    })
                });
            },
            //取消操作
            cancelSubmit(){
                let _this = this;
                this.queryVehicle({}).then(() => {
                    let page = _this.currentPage;
                    this.queryVehicle({
                        page: page
                    }).then(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                        this.dialogFormVisible = false;
                    })
                });
            },
            // 修改成功
            successEdit () {
                let _this = this;
                this.queryVehicle({}).then(() => {
                    let page = _this.currentPage;
                    this.queryVehicle({
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
            failEdit(){
                let _this = this;
                this.queryVehicle({}).then(() => {
                    let page = _this.currentPage;
                    this.queryVehicle({
                        page: page
                    }).then(() => {
                        this.$message({
                            type: 'info',
                            message: '编辑失败!'
                        });
                        this.dialogFormVisibleEdit = false;
                    })
                });
            },
            querySearch(queryString) {
                var _this = this;
                this.options.forEach((v, i, arr) => {
                    if (arr[i].companyName === queryString) {
                        _this.ruleForm2.companyId = arr[i].id;
                        _this.ruleFormEdit.companyId = arr[i].id;
                    }
                })

            },
            //action方法
            ...mapActions([
                'findBiddingCompanyInfoByName',
                'queryVehicle',
                'findByVehicleId',
                'saveOrUpdateVehicle',
                'deleteVehicle',
                'batchDeleteVehicle'
            ]),
        },
        mounted(){
            let _this = this;
            // 控制表格高度
//            this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
            this.queryVehicle({}).then(() => {
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

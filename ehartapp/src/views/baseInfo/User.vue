<template>
    <div class="tabclick">
        <div class="tabclick_top">
            <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                    <span class="wrapper" style="float:left;">
                        <el-button type="success" @click.stop="addInfo('ruleForm2')">添加用户信息</el-button>
                        <el-button type="danger" @click.stop="allDelete">全部删除</el-button>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:60px;">
                        <el-input v-model="input" placeholder="请输入用户名"></el-input>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:10px;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
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
                        @selection-change="selectionChange"
                        :height="height"
                        ref = "tableHeight"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            align="center"
                            width="50">
                    </el-table-column>

                    <el-table-column
                            label="用户名称"
                            show-overflow-tooltip
                            align="center"
                    >
                        <template scope="scope">
                            {{ scope.row.userName }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="登录用户名"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.loginName}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="岗位名称"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.postName}}
                        </template>

                    </el-table-column>

                    <el-table-column
                            label="状态"
                            align="center"

                    >
                        <template scope="scope">
                            <!--冻结-->
                            <el-tag type="success" v-if="scope.row.status == 1">启用</el-tag>
                            <!--启用-->
                            <el-tag type="gray" v-if="scope.row.status == 0">冻结</el-tag>
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--label="创建人"-->
                            <!--align="center"-->

                    <!--&gt;-->
                        <!--<template scope="scope">-->
                            <!--{{ scope.row.createdBy }}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            label="备注信息"
                            align="center"
                            show-overflow-tooltip
                    >
                        <template scope="scope">
                            {{ scope.row.memo }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="修改日期"
                            align="center"
                            min-width="120"
                    >
                        <template scope="scope">
                            <!--<el-icon name="time"></el-icon>-->
                            {{scope.row.lastupdatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                        </template>
                    </el-table-column>

                    <el-table-column label="操作"
                                     align="center"
                                     min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                <div class = "table_edit" @click="handleEdit(scope.$index, scope.row)">
                                    <div class = "table_edit_icon">

                                    </div>
                                </div>

                                <div  class = "table_delete" @click="handleDelete(scope.$index, scope.row)">
                                    <div class = "table_delete_icon">

                                    </div>
                                </div >
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class = "pagination_wrapper">
                    <el-pagination
                        :background = "true"
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
        <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input type="text" v-model="ruleForm2.userName" auto-complete="on"
                              placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="登录用户名" prop="loginName">
                    <el-input type="text" v-model="ruleForm2.loginName" auto-complete="on"
                              placeholder="请输入登录用户名称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="on"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" prop="postName">
                    <el-input v-model="ruleForm2.postName" auto-complete="on" placeholder="请输入岗位名称"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="ruleForm2.status">
                        <el-radio class="radio" label="1">启用</el-radio>
                        <el-radio class="radio" label="0">冻结</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input v-model="ruleForm2.memo" auto-complete="on" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisibleEdit"
                   :before-close="cancleEdit"
        >
            <el-form :model="ruleFormEdit" :rules="rules2" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input type="text" v-model="ruleFormEdit.userName" auto-complete="on"
                              placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="登录用户名" prop="loginName">
                    <el-input type="text" v-model="ruleFormEdit.loginName" auto-complete="on"
                              placeholder="请输入登录用户名称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-button type="primary" @click="resetPassWord">重置密码</el-button>
                    <el-input type="text" v-show="false" v-model="ruleFormEdit.password" auto-complete="on"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" prop="postName">
                    <el-input v-model="ruleFormEdit.postName" auto-complete="on" placeholder="请输入岗位名称"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="ruleFormEdit.status">
                        <el-radio class="radio" label="1">启用</el-radio>
                        <el-radio class="radio" label="0">冻结</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input v-model="ruleFormEdit.memo" auto-complete="on" placeholder="请输入备注"></el-input>
                </el-form-item>

                <el-input v-model="ruleFormEdit.userFlag" v-show = "false"></el-input>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                <el-button @click="cancleEdit">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/user/actions'
    export default{

        data() {
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback()
                }
            };
            return {
                loading: true,
                currentPage: 1,
                input: '',
                height: "",
                size: 6,
                selection: [],
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                ruleForm2: {
                    userName: "",
                    loginName: '',
                    password: '',
                    postName: '',
                    status: "1",
                    memo: '',
                    createdBy: "",
                    createdTime: ""
                },
                ruleFormEdit: {
                    userName: "",
                    loginName: '',
                    password: '',
                    postName: '',
                    status: "1",
                    memo: '',
                    createdBy: "",
                    createdTime: "",
                    userFlag:"1"

                },
                isSubmit: false,

                rules2: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    loginName: [
                        {required: true, message: '请输入登录用户名', trigger: 'blur'}
                    ],

                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur',},
                        {required: true, trigger: 'blur', validator: validatePassword}
                    ],
                    postName: [
                        {required: true, message: '请输入岗位名称', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change'}
                    ],
                    memo: [
                        {required: true, message: '备注', trigger: 'blur'}
                    ],
                },
                // 深复制对象
                deepPreviousRow: '',
                deepIndex: 0,

                firstName:"",
                lastName:"",




        };
        },
        methods: {
            //重置密码功能
            resetPassWord(){
                this.ruleFormEdit.password = "111111";
                this.$message({
                    type: 'info',
                    message: '您的密码已经重置为111111！'
                });
            },
            // 取消编辑
            cancleEdit(){
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
            searchCarInfo(){
                this.queryUser({
                    page: this.currentPage,
                    input: this.input
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryUser({
                    page: val,
                    input:this.input
                });
            },
            // 添加信息
            addInfo(formName){
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                })
            },
            // 编辑
            handleEdit(index, row) {
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;

                this.deepPreviousRow = JSON.stringify(row);
                this.deepIndex = index;

                this.firstName = JSON.stringify(this.ruleFormEdit.loginName);
            },
            submitFormEdit(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(_this.firstName === _this.lastName) {
                            _this.ruleFormEdit.userFlag = 1;
                        }else{
                            _this.ruleFormEdit.userFlag = 0;
                        }
                        this.saveOrUpdateUser(this.ruleFormEdit).then(() => {
                            if(_this.tableData.loginNameIsExist){
                                _this.$message.error("用户名重复");
                            }else{
                                _this.successEdit();
                            }
                        });
                    } else {
                        return false;
                    }
                })

            },
            // 删除
            handleDelete(index, row) {
                let _this = this;
                this.$confirm('是否删除该条信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteUser({
                        id: row.id
                    }).then(() => {
                        this.queryUser({
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
                        this.batchDeleteUser({items: ids}).then(() => {
                            _this.currentPage = 1;
                            this.queryUser({
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.ruleFormEdit.userFlag = 2;
                        this.saveOrUpdateUser(this.ruleForm2).then(() => {
                            if(_this.tableData.loginNameIsExist){
                                _this.$message.error("用户名重复");
                                _this.tableData.loginNameIsExist = null;
                            }else{
                                _this.successSubmit()
                                _this.$refs[formName].resetFields();
                            }
                        });
                    } else {
                        return false;
                    }
                })
            },
            successSubmit () {
                let _this = this;
                this.queryUser({}).then(() => {
                    _this.currentPage =1;
                    this.queryUser({
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
                this.queryUser({}).then(() => {
                    let page = _this.currentPage;
                    this.queryUser({
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
                this.queryUser({}).then(() => {
                    let page = _this.currentPage;
                    this.queryUser({
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
                this.queryUser({}).then(() => {
                    let page = _this.currentPage;
                    this.queryUser({
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
            //action方法
            ...mapActions([
                'queryUser',
                'findByUserId',
                'saveOrUpdateUser',
                'deleteUser',
                'batchDeleteUser'
            ]),
        },
        watch:{
            "ruleFormEdit.loginName":function (val,oldValue) {
                this.lastName = JSON.stringify(val);
            }
        },
        mounted(){
            let _this = this;
            // 控制表格高度
//            console.log($(this.$refs.tableHeight.$el).height())
//            this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
            this.queryUser({}).then(() => {
                _this.loading = false;
            });
        },
        computed: {
            ...mapGetters({
                tableData: "getUsers",
                total: "getUserTotal",
                current: "getCurrentUser"
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">

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
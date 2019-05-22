
<template>
        <div class = "tabclick">
            <div class="tabclick_top">
                <div class = "form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                    <div>
                        <span class="wrapper" style = "float:left;">
                            <el-button type="success" @click.stop="addInfo('ruleForm2')">添加运输公司</el-button>
                            <el-button type="danger" @click.stop = "allDelete">全部删除</el-button>
                        </span>

                        <span class="wrapper" style="float:left;margin-left:60px;">
                            <el-input v-model="input" placeholder="请输入公司名称"></el-input>
                        </span>

                        <span class="wrapper" style="float:left;margin-left:10px;">
                            <el-button type="primary" @click.stop = "searchCarInfo">查找</el-button>
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
                            @selection-change = "selectionChange"
                            :height = "height"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                align = "center"
                                width="50">
                        </el-table-column>

                        <el-table-column
                                label="企业名称"
                                show-overflow-tooltip
                                align = "center"
                        >
                            <template scope="scope">
                                {{ scope.row.companyName }}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="联系人"
                                align = "center"

                        >
                            <template   scope="scope">
                                {{ scope.row.contacter}}
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="状态"
                                align = "center"

                        >
                            <template scope="scope">
                                <!--冻结-->
                                <el-tag type="success" v-if="scope.row.status == 1">启用</el-tag>
                                <!--启用-->
                                <el-tag type="gray" v-if="scope.row.status == 0">冻结</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="修改日期"
                                align = "center"
                                min-width="120"
                        >
                            <template scope="scope">
                                <!--<el-icon name="time"></el-icon>-->
                                <span style="margin-left: 10px">{{scope.row.lastupdatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作"
                                         align = "center"
                                         min-width="80"
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
            <el-dialog title="添加车辆信息" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="企业名称" prop="companyName">
                        <el-input type="text" v-model="ruleForm2.companyName" auto-complete="on" placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="contacter">
                        <el-input type="text" v-model="ruleForm2.contacter" auto-complete="on" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="ruleForm2.status">
                            <el-radio class="radio" label = "1" >启用</el-radio>
                            <el-radio class="radio" label = "0" >冻结</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :disabled="isSubmit" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="编辑企业信息" :visible.sync="dialogFormVisibleEdit"
                       :before-close = "cancleEdit"
            >
                <el-form :model="ruleFormEdit" :rules="rules2" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="企业名称" prop="companyName">
                        <el-input type="text" v-model="ruleFormEdit.companyName" auto-complete="on" placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="contacter">
                        <el-input type="text" v-model="ruleFormEdit.contacter" auto-complete="on" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="ruleFormEdit.status">
                            <el-radio class="radio" label = "1" >启用</el-radio>
                            <el-radio class="radio" label = "0" >冻结</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
                    <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                    <el-button @click="cancleEdit">取消</el-button>
                </div>
            </el-dialog>
        </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as actions from '../../store/modules/biddingcompanyinfo/actions'
    export default{

        data() {
            return {
                currentPage: 1,
                input: '',
                height:"",
                size:6,
                selection: [],
                dialogFormVisible: false,
                dialogFormVisibleEdit : false,
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
                    companyName :"",
                    contacter: '',
                    status:"1"
                },
                ruleFormEdit:{

                },

                isSubmit:false,
                rules2: {
                    // companyName contacter status
                    companyName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' },
                    ],
                    contacter: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                },
                loading:true,
                // 深复制对象
                deepPreviousRow:'',
                deepIndex:0,
            };
        },
        methods: {
            // 取消编辑
            cancleEdit(){
                let _this = this;
                let row = JSON.parse(this.deepPreviousRow);
                this.dialogFormVisibleEdit = false;
                this.tableData.forEach((v,i,self) => {
                    if(i === _this.deepIndex){
                        for(let k of Object.keys(v)){
                            v[k] = row[k];
                        }
                    }
                })
            },
            searchCarInfo(){
                this.queryBiddingCompanyInfo({
                    page:this.currentPage,
                    input:this.input
                });
            },
            formatter(row, column) {
                return row.address;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryBiddingCompanyInfo({
                    page:val,
                    input:this.input
                });
            },
            // 添加信息
            addInfo(formName){
                this.dialogFormVisible = true;
                this.$nextTick(() =>{
                    this.$refs[formName].resetFields();
                })

            },
            // 编辑
            handleEdit(index, row) {
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;

                this.deepPreviousRow = JSON.stringify(row);
                this.deepIndex = index;
            },
            submitFormEdit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveOrUpdateBiddingCompanyInfo(this.ruleFormEdit).then(() => {
                            this.successEdit()
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
                    this.deleteBiddingCompanyInfo({
                        id : row.id
                    }).then(() => {
                        if(_this.tableData.TheComanyHasVehicles){
                            this.$message.error("该公司下面存在车辆，不能删除！");
                        }else{
                            this.queryBiddingCompanyInfo({
                                page: _this.currentPage
                            }).then(() => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            });
                        }
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
                if(this.selection != "") {
                    this.$confirm('是否删除全部信息', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.each(_this.selection, function (i, v) {
                            ids.push(_this.selection[i].id);
                        })
                        this.batchDeleteBiddingCompanyInfo({items:ids}).then(() => {
                            if(_this.tableData.TheComanyHasVehicles){
                                this.$message.error("该公司下面存在车辆，不能删除！");
                            }else{
                                _this.currentPage = 1;
                                this.queryBiddingCompanyInfo({
                                    page: 1
                                }).then(() => {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                });
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message.error("请勾选信息");
                }
            },
            // 添加
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveOrUpdateBiddingCompanyInfo(this.ruleForm2).then(() => {
                            this.successSubmit()
                            this.$refs[formName].resetFields();
                        });
                    } else {
                        return false;
                    }
                })
            },
            successSubmit () {

                let _this = this;
                this.queryBiddingCompanyInfo({}).then(() => {
                    _this.currentPage =1;
                    this.queryBiddingCompanyInfo({
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
                this.queryBiddingCompanyInfo({}).then(() => {
                    let page = _this.currentPage;
                    this.queryBiddingCompanyInfo({
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
                this.queryBiddingCompanyInfo({}).then(() => {
                    let page = _this.currentPage;
                    this.queryBiddingCompanyInfo({
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
                this.queryBiddingCompanyInfo({}).then(() => {
                    let page = _this.currentPage;
                    this.queryBiddingCompanyInfo({
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
                'queryBiddingCompanyInfo',
                'findByBiddingCompanyInfoId',
                'saveOrUpdateBiddingCompanyInfo',
                'deleteBiddingCompanyInfo',
                'batchDeleteBiddingCompanyInfo'
            ]),
        },
        mounted(){
            let _this = this;
            // 控制表格高度

//            this.height = $(".table_pagination").height() - $(".pagination_wrapper").height();
            this.queryBiddingCompanyInfo({}).then(() => {
                _this.loading = false;
            });
        },
        computed:{
            ...mapGetters({
                tableData: "getBiddingCompanyInfos",
                total : "getBiddingCompanyInfoTotal",
                current: "getCurrentBiddingCompanyInfo"
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

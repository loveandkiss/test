<template>
    <div class="content-right">
        <!--  -->
        <div class="tabclick_top">
            <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                    <span class="wrapper" style="float:left;">
                         <el-date-picker
                            v-model="selectDate"
                            type="date"
                            :clearable="false"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:10px;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:10px;">
                        <el-button type="primary" @click.stop="resetTime">重置</el-button>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:260px;">
                        <!-- <el-input v-model="input" placeholder="请输入用户名"></el-input> -->
                        <el-button type="success" @click.stop="handleAddData('addForm')">添加数据</el-button>
                        <el-button type="danger" @click.stop="handleConfirm">确认数据</el-button>
                    </span>
                    
                </div>
            </div>
        </div>
        <!--  -->
        <div class = "table_pagination">
            <template>
                <!-- 表格 -->
                <el-table
                        v-loading.lock="loading"
                        :data="tableData"   
                        border
                        stripe
                        fit
                        :height="height"
                        highlight-current-row
                        @selection-change="selectionChange"
                        @current-change="handleCurrentRow"
                        ref = "tableHeight"
                        style="width: 100%">
                     <el-table-column
                            type="selection"
                            align="center"
                            width="50">
                    </el-table-column>

                     <el-table-column
                        type="index"
                        label="序号"
                        width="100"
                        align="center"
                        :index="indexMethod">
                    </el-table-column>

                    <!-- <el-table-column
                            label="序号"
                            show-overflow-tooltip
                            align="center"
                    >
                        <template scope="scope">
                            {{ scope.row.userName }}
                        </template>
                    </el-table-column> -->

                    <el-table-column
                            prop='licensePlatNumber'
                            label="车牌号"
                            align="center"

                    >
                        <!-- <template scope="scope">
                            {{ scope.row.loginName}}
                        </template> -->
                    </el-table-column>

                    <el-table-column
                            label="重量(吨)"
                            align="center"
                    >
                        <template scope="scope">
                            {{ scope.row.weight}}
                        </template>

                    </el-table-column>
                    <el-table-column
                            label="时间"
                            align="center"
                    >
                        <template scope="scope">
                            {{ scope.row.createdTime | parseTime()}}
                        </template>

                    </el-table-column>

                    <el-table-column
                            label="分类"
                            align="center"
                    >
                    <!-- 手动/自动 -->
                        <template scope="scope">
                             {{ scope.row.category}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="类型"
                            align="center"
                    >
                    <!-- 手动/自动 -->
                        <template scope="scope">
                             {{ scope.row.intoType}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     align="center"
                                     width="280"
                    >
                        <template scope="scope">
                            <!-- <div>
                                <div class = "table_edit" @click="handleEditData(scope.$index, scope.row)">
                                    <div class = "table_edit_icon">

                                    </div>
                                </div>
                                <div  class = "table_delete" @click="handleDeleteData(scope.$index, scope.row)">
                                    <div class = "table_delete_icon">

                                    </div>
                                </div >
                            </div> -->

                            <el-button
                                    size="small"
                                    @click="queryApplyInMap(scope.$index, scope.row)">查看行程单
                            </el-button>
                            <el-button
                              size="small"
                              type="primary"
                              @click="handleEditData(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                              size="small"
                              type="primary"
                              @click="handleDeleteData(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class = "pagination_wrapper">
                    <el-pagination
                        :background="true"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10]"
                        :page-size="size"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
                </div>
            </template>
        </div>


        <!--添加数据的 弹窗 -->
        <!-- 
            show-close      是否显示关闭按钮                            true  显示  false 不显示
            before-close    关闭前的回调，会暂停 Dialog 的关闭           function(done)，done 用于关闭 Dialog       


         -->

         <!-- 

             车牌号  重量   时间  类型

          -->
        <el-dialog 
            title="添加数据" 
            :visible.sync="dialogFormVisible"
            :show-close ="true"
            :before-close="handleClose">
            
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="0">
                    <el-col  :span="12">
                        <el-form-item label="车牌" prop="licensePlatNumber">
                            <el-select v-model="addForm.licensePlatNumber"  placeholder="请输入车牌号码">
                                <el-option
                                    v-for="item in licensePlatNumberList"
                                    :key="item.id"
                                    :label="item.licensePlatNumber"
                                    :value="item.licensePlatNumber"
                                >
                                </el-option>
                            </el-select>


                            <!-- <el-input type="text" v-model="addForm.licensePlatNumber" auto-complete="on" placeholder="请输入车牌号码"></el-input> -->
                        
                        </el-form-item>
                    </el-col>
                    <el-col  :span="12">
                        <el-form-item label="重量(KG)" prop="weight">
                            <!-- <el-input-number v-model="addForm.weight" :precision="2" :step="1" :max="10000"></el-input-number> -->
                             <el-input type="text" v-model.number="addForm.weight" auto-complete="on" placeholder="请输入垃圾称重重量"></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="isSubmit" @click="addSubmitForm('addForm')">提交</el-button>
                <el-button @click="handleClose">取消</el-button>
                <!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
            </div>
            
        </el-dialog>



        <!--编辑数据的 弹窗 -->
        <el-dialog 
            title="编辑数据" 
            :visible.sync="dialogFormVisibleEdit"
            :show-close ="true"
            :before-close="cancleEdit">

            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="0">
                    <el-col  :span="12">
                        <el-form-item label="车牌" prop="licensePlatNumber">
                            <el-select v-model="editForm.licensePlatNumber"  placeholder="请输入车牌号码">
                            <el-option
                                v-for="item in licensePlatNumberList"
                                :key="item.id"
                                :label="item.licensePlatNumber"
                                :value="item.licensePlatNumber"
                            >
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="12">
                        <el-form-item label="重量" prop="weight">
                             <el-input type="text" v-model.number="editForm.weight" auto-complete="on" placeholder="请输入垃圾称重重量"></el-input>
                            <!-- <el-input-number v-model="editForm.weight" :precision="2" :step="1" :max="10000"></el-input-number> -->
                        </el-form-item>
                   </el-col>
                </el-row>
                <!-- <el-row :gutter="0">
                    <el-col  :span="12">
                        <el-form-item label="时间" prop="time">
                        <el-date-picker
                            v-model="editForm.time"
                            type="datetime"
                            placeholder="选择时间">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="editForm.type"  placeholder="数据添加类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSubmitForm('editForm')">提交</el-button>
                <el-button @click="cancleEdit">取消</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import {parseTime} from '../../../assets/js/util';
     import { SERVER_URI } from '../../store/const';
    // import * as actions from '../../store/modules/user/actions'
    export default{

        data() {
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback()
                }
            };

            // 自定义验证规则
            const checkWeight = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('垃圾重量不能为空'));
                }
                setTimeout(() => {

                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字'));
                    } else {
                        // callback();
                        if (value < 0) {
                            callback(new Error('必须为正数'));
                        } else {
                            callback();
                        }

                    }
                }, 500);
            };
            return {
                selectDate: null,         //时间对象   //按天查找
                loading: true,
                currentPage: 1,         //当前页
                input: '',              //查找的内容
                height: "",
                size: 6,                //每页显示数据的条数 设置为6条
                dialogFormVisible: false,       //控制"添加弹框"显示与隐藏
                dialogFormVisibleEdit: false,   //控制"编辑弹框"显示与隐藏
                formLabelWidth: '120px',

                addForm: {
                    licensePlatNumber: '',           //车牌号
                    weight: '',                      //重量
                    // time:'',                        //时间对象
                    // type: '',                        //类型
                },
                
                // 
                editForm: {
                    id:'',          //该条数据的id
                    licensePlatNumber:'',           //车牌号
                    weight:'',                      //重量
                    // time:'',                        //时间
                    // type:'',                        //类型
                },
                isSubmit: false,
                
                //简单的验证规则
                rules: {
                    licensePlatNumber: [
                        {required: true, message: '请选择车牌号', trigger: 'change',type:'string'},
                    ],


                    weight: [
                        // {required: true, message: '请输入重量', trigger: 'blur',type:'string'},
                        { validator: checkWeight, trigger: 'blur' }
                    ],

                    time: [
                        {required: true, message: '请选择时间', trigger: 'change',type:'date'},
                    ],
                    type: [
                        {required: true, message: '请选择数据类型', trigger: 'change',type:'number'},
                    ],

                },
                // 深复制对象
                deepPreviousRow: '',
                deepIndex: 0,

                firstName:"",
                lastName:"",

                lpList:[],   //车牌号列表
                typeList:[      //数据添加类型
                    {label:"手动",value:1},
                    {label:"自动",value:2}
                ],
                currentRow:{},      //当前行
                selection: [],      //勾选(多选)

                query:{
                    page: 1,
                    size: 6,
                    // date: '2019-03-15',
                    date: '',
                    loginName:'admin',
                    passWord:'111111'
                }
            };
        },

        methods: {
            //重置时间
            resetTime(){
                 this.selectDate = null;
                 this.query.date = "";
            },
            // 查看行程单(编程式导航)
            queryApplyInMap(index, row) {
                let id = row.id;
                this.$router.push({
                    path: '/searchHistoryLocu',
                    query: {id}
                });
            },
             // 勾选
            selectionChange(selection){

                // console.log('selection',selection)
                this.selection = selection;
            },



            // 点击确认操作
            handleConfirm(){
                var _this = this;
                var ids = [];

                if (this.selection != "") {
                    this.$confirm('是否已选数据信息', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // jquery对象遍历数组方法=>each方法
                        $.each(_this.selection, function (i, v) {
                            ids.push(_this.selection[i].id);
                        })

                        // console.log('ids', {ids})
                        // return 
                        this.$axios.post(`${SERVER_URI}/apply/batchUpd`, {ids})
                        .then(response => {
                            this.$message({
                                type: 'success',
                                message: '勾选数据确认成功!'
                            });
                            // 刷新数据
                            this.getData();
                        })
                        .catch(function (error) {
                            this.$message({
                            type: 'error',
                            message: '数据删除失败!'
                            });
                        });

                        // $.each(_this.selection, function (i, v) {
                        //     ids.push(_this.selection[i].id);
                        // })
                        
                        // this.batchDeleteUser({items: ids})
                        // .then(() => {
                        //     // 删除成功后刷新页面
                        //     _this.currentPage = 1;
                        //     this.queryUser({
                        //         page: 1
                        //     }).then(() => {
                        //         this.$message({
                        //             type: 'success',
                        //             message: '删除成功!'
                        //         });
                        //     });
                        // });


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

            handleCurrentRow(val) {
                console.log('val',val)
                this.currentRow = val;
            },
            //点击弹框左上角关闭按钮
            handleClose(done) {
                this.dialogFormVisible = false
                // done();
                // var that = this;

                // this.$confirm('确认关闭？')
                // .then(_ => {
                     
                //     done();
                // })
                // .catch(_ => {});
            },

            // 自定义索引
             indexMethod(index) {
                return (this.currentPage - 1) * this.size + index + 1 ;
            },

            // 取消编辑(点击弹框右上角关闭按钮或者右下角取消按钮)
            // 直接关闭就可以，不需要添加其他逻辑，被注释的内容可删除
            cancleEdit(){
                // let _this = this;
                // let row = JSON.parse(this.deepPreviousRow);
                this.dialogFormVisibleEdit = false;
                // this.tableData.forEach((v, i, self) => {
                //     if (i === _this.deepIndex) {
                //         for (let k of Object.keys(v)) {
                //             v[k] = row[k];
                //         }
                //     }
                // })
            },



            // 查找
            searchCarInfo(){
                // parseTime('{y}-{m}-{d} {h}:{i}:{s}')
                if(this.selectDate){
                    this.query.date = parseTime(this.selectDate.getTime(),'{y}-{m}-{d}');
                }
                this.getData();
            },
            // 翻页(上一个/下一页)
            handleCurrentChange(val) {
                this.currentPage = val;
                this.query.page = val;
                this.getData();
            },


            // 添加信息=>打开弹窗
            handleAddData(formName){
                // console.log('formName', formName)
                // return 

                this.dialogFormVisible = true;

                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                })

            },

            // 修改(编辑)=>打开弹窗
            // 该编辑没有调用详情接口获取数据
            handleEditData(index, row) {
                this.dialogFormVisibleEdit = true;
                console.log('row', row)
                this.editForm.id = row.id;
                this.editForm.licensePlatNumber = row.licensePlatNumber;
                this.editForm.weight = parseInt(row.weight * 1000);
            },

            

            // 删除
            handleDeleteData(index, row) {
                var query = {id:row.id}
                let _this = this;
                this.$confirm('是否删除该条信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {     //确认时
                    this.$axios.post(`${SERVER_URI}/apply/delete`, query)
                        .then(response => {
                            this.$message({
                                type: 'success',
                                message: '数据删除成功!'
                            });
                            // 刷新数据
                            this.getData();
                        })
                        .catch(function (error) {
                            this.$message({
                            type: 'error',
                            message: '数据删除失败!'
                            });
                        });

                }).catch(() => {        //取消时
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // 添加 => 提交操作
            addSubmitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        // _this.editForm.userFlag = 2;
                        // this.saveOrUpdate(this.addForm)
                        // .then(() => {
                        //     alert('aaaaaa')
                        //     _this.getData();
                        //      _this.dialogFormVisible = false;

                        // });

                        this.$axios.post(`${SERVER_URI}apply/saveOrUpdate`, this.addForm)
                        .then(response => {
                            //关闭弹出框
                            this.dialogFormVisible = false;     
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            // 刷新数据
                            this.getData();
                        })
                        .catch(function (error) {
                            this.$message({
                            type: 'error',
                            message: '添加失败!'
                            });
                        });
                    } else {
                        return false;
                    }
                })
            },

            // 编辑  => 提交
            editSubmitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(`${SERVER_URI}apply/saveOrUpdate`, this.editForm)
                        .then(response => {
                            //关闭弹出框
                            this.dialogFormVisibleEdit = false;     
                            this.$message({
                                type: 'success',
                                message: '编辑提交成功!'
                            });
                            // 刷新数据
                            this.getData();
                        })
                        .catch(function (error) {
                            this.$message({
                            type: 'error',
                            message: '编辑提交失败!'
                            });
                        });
                    } else {
                        return false;
                    }
                })

            },


            // successSubmit () {
            //     let _this = this;
            //     this.queryUser({}).then(() => {
            //         _this.currentPage = 1;
            //         this.queryUser({
            //             page: 1
            //         }).then(() => {
            //             this.$message({
            //                 type: 'success',
            //                 message: '添加成功!'
            //             });
            //             this.dialogFormVisible = false;
            //         })
            //     });
            // },
            
            //取消操作
            // cancelSubmit(){
            //     let _this = this;
            //     this.queryUser({}).then(() => {
            //         let page = _this.currentPage;
            //         this.queryUser({
            //             page: page
            //         }).then(() => {
            //             this.$message({
            //                 type: 'info',
            //                 message: '取消操作'
            //             });
            //             this.dialogFormVisible = false;
            //         })
            //     });
            // },


            // 修改成功
            // successEdit () {
            //     let _this = this;
            //     this.queryUser({}).then(() => {
            //         let page = _this.currentPage;
            //         this.queryUser({
            //             page: page
            //         }).then(() => {
            //             this.$message({
            //                 type: 'success',
            //                 message: '编辑成功!'
            //             });
            //             this.dialogFormVisibleEdit = false;
            //         })
            //     });

            // },


            // failEdit(){
            //     let _this = this;
            //     this.queryUser({}).then(() => {
            //         let page = _this.currentPage;
            //         this.queryUser({
            //             page: page
            //         }).then(() => {
            //             this.$message({
            //                 type: 'info',
            //                 message: '编辑失败!'
            //             });
            //             this.dialogFormVisibleEdit = false;
            //         })
            //     });
            // },




            getData(){

                 let _this = this;
                // 控制表格高度
    //            console.log($(this.$refs.tableHeight.$el).height())
    //            this.height = $(".tabclick").height() - $(".form_nav").height() - 80;

                // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用

                // 查询参数
                // var query = {
                //     page: 1,
                //     size: 6,
                //     date: '2019-03-15',
                //     loginName:'admin',
                //     passWord:'111111'
                // };


                this['everyDayTableDataList'](this.query)
                .then(() => {
                    console.log('数据请求成功...............',this)
                    _this.loading = false;
                });


          


                // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
                // 带命名空间(namespaced: true)  调用方法1
                // this['user/queryUser']({}).then(() => {
                //     _this.loading = false;
                // });

                // 带命名空间(namespaced: true)  调用方法2
                // this.$store.dispatch('user/queryUser',{}).then(()=>{
                //     _this.loading = false;
                // });

                console.log('this.$store',this.$store)
            },


            //action方法  带命名空间(namespaced: true)
            // ...mapActions([
            //     'user/queryUser',           
            //     'user/findByUserId',         
            //     'user/saveOrUpdateUser',         
            //     'user/deleteUser',           
            //     'user/batchDeleteUser'       
            // ]),

            //action方法  
            ...mapActions([
                //获取列表
                'everyDayTableDataList',
                //获取车牌号列表  
                'getLicensePlatNumberList',     
                // 添加或者编辑
                // 'saveOrUpdate',
            ]),


        },
        // 监听
        watch:{
            
            "editForm.loginName":function (val,oldValue) {
                this.lastName = JSON.stringify(val);
            }
        },
        mounted(){
            
            // 获取表格数据
           this.getData();

            // 获取车牌号列表
           this['getLicensePlatNumberList']({})
           .then(() => {
                    console.log('车牌号列表数据请求成功...............',this.licensePlatNumberList)
            });

           
        },

        computed: {
            //Getter  
            ...mapGetters({
                // 表格数据
                tableData: "tableData",   
                // 总条数   
                total: "dataTotal",
                // 车牌号列表  
                licensePlatNumberList: "licensePlatNumberList",
                // 
                // current: "getCurrentUser"
            })



            //Getter  带命名空间(namespaced: true)
            // ...mapGetters({
            //     tableData: "user/getUsers",
            //     total: "user/getUserTotal",
            //     current: "user/getCurrentUser"
            // })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">

    .table_pagination{
        overflow: hidden;
        border:1px solid #eee;
    }
    // 内容区样式
    .content-right {
        // 相对定位
        position: absolute;
        right: 0;
        top: 0;
        bottom: 20px;
        background: #fff;
        width: 100%;
        // width: calc(100% - 126px);
        
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
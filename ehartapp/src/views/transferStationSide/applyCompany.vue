

<template>
    <div class="tabclick">
      <!-- 查找/添加 -->
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
                    <span class = "wrapper time_to">
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
                        <el-input v-model="input" placeholder="请输入车牌号码" style = "margin-left:10px;"></el-input>
                    </span>
                    <span class="wrapper" style = "margin-left:10px;">
                        <el-button type="primary" @click.stop="searchCarInfo">查找</el-button>
                        <el-button type="success" @click.stop="addApply('ruleForm2')">添加</el-button>
                    </span>

                </div>
            </div>
        </div>
        <div  class = "table_pagination">
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
                            prop="biddingCompanyInfo.companyName"
                            label="公司"
                            align="center">
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
                                     min-width="240"
                    >
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    @click="queryApplyInMap(scope.$index, scope.row)">查看行程单
                            </el-button>
                            <el-button
                              size="small"
                              type="primary"
                              @click="editApply(scope.$index, scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class = "pagination_wrapper">

                    <!--<el-pagination-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page=currentPage-->
                            <!--:page-sizes="[10]"-->
                            <!--:page-size="size"-->
                            <!--layout="total, sizes, prev, pager, next, jumper"-->
                            <!--:total="total">-->
                    <!--</el-pagination>-->

                    <!-- page-size	每页显示条目个数      total	总条目数    current-page	当前页数   layout	组件布局，子组件名用逗号分隔-->
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

      <!-- 添加  visible	是否显示 Dialog，支持 .sync 修饰符-->
      <el-dialog title="添加行程单" :visible.sync="dialogFormVisible" width="50%">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="0">
            <el-col  :span="12">
              <el-form-item label="车牌号码" prop="licensePlatNumber">
                <el-select v-model="ruleForm2.licensePlatNumber"  placeholder="请输入车牌号码">
                  <el-option
                    v-for="item in lpList"
                    :key="item.id"
                    :label="item.licensePlatNumber"
                    :value="item.licensePlatNumber"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="0">
              <el-col  :span="12">
                <el-form-item label="开始时间" prop="startTime">
                  <el-date-picker
                    v-model="ruleForm2.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col  :span="12">
                <el-form-item label="结束时间" prop="endTime">
                  <el-date-picker
                    v-model="ruleForm2.endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
          </el-row>

          <el-form-item label="开始地点" prop="startPlace">
            <el-select v-model="ruleForm2.startPlace"  placeholder="请输入开始地点">
              <el-option
                v-for="item in placeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结束地点"  prop="endPlace">
            <el-select v-model="ruleForm2.endPlace"  placeholder="请输入开始地点">
              <el-option
                v-for="item in placeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-input-number v-model="ruleForm2.weight" :precision="2" :step="1" :max="10000"></el-input-number>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="isSubmit" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <!-- 编辑 -->
      <el-dialog title="编辑行程单" :visible.sync="dialogFormVisibleEdit"
                 :before-close="cancleEdit"
      >
        <el-form :model="ruleFormEdit" :rules="rules2" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="0">
            <el-col  :span="12">
              <el-form-item label="车牌号码" prop="licensePlatNumber">
                <el-select v-model="ruleFormEdit.licensePlatNumber"  placeholder="请输入车牌号码">
                  <el-option
                    v-for="item in lpList"
                    :key="item.id"
                    :label="item.licensePlatNumber"
                    :value="item.licensePlatNumber"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col  :span="12">
              <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                  v-model="ruleFormEdit.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col  :span="12">
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                  v-model="ruleFormEdit.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="开始地点" prop="startPlace">
            <el-select v-model="ruleFormEdit.startPlace"  placeholder="请输入开始地点">
              <el-option
                v-for="item in placeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结束地点"  prop="endPlace">
            <el-select v-model="ruleFormEdit.endPlace"  placeholder="请输入开始地点">
              <el-option
                v-for="item in placeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-input-number v-model="ruleFormEdit.weight" :precision="2" :step="1" :max="10000"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm2('ruleFormEdit')">保存</el-button>
          <el-button @click="cancleEdit">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as actions from '../../store/modules/apply/actions';
    import {currency} from '../../../assets/js/util';
    import { SERVER_URI } from '../../store/const';

    export default{
        data() {
            return {
              pickerOptions1: {
                shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                }, {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                }, {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }]
              },

              input: '',      //查询时输入的车牌号
              startTime:"",
              endTime:"",
              height: "",
              loading: false,
              tableData:[],
              total:1,
              currentPage:1,
              size: 6,

              dialogFormVisible: false,     //对话框显示或者隐藏
              dialogFormVisibleEdit: false,   //对话框显示或者隐藏

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

              // 添加数据
              ruleForm2: {
                licensePlatNumber: '',    //车牌号
                startTime: '',            //开始时间
                endTime: '',              //结束时间
                startPlace: "",           //开始地点
                endPlace: '',             //结束地点
                weight:''                 //垃圾重量
              },
              // 编辑数据
              ruleFormEdit: {
                id:'',
                licensePlatNumber: '',
                startTime: '',
                endTime: '',
                startPlace: "",
                endPlace: '',
                weight:''
              },

              isSubmit: false,
              lpList:[],
              placeList:[],
              rules2: {
                licensePlatNumber: [
                  {required: true, message: '请选择车牌号', trigger: 'change',type:'string'},
                ],
                startTime: [
                  {required: true, message: '请选择开始时间', trigger: 'change',type:'date'}
                ],
                endTime: [
                  {required: true, message: '请选择结束时间',  trigger: 'change',type:'date'}
                ],
                weight: [
                  {required: true, message: '请输入重量', trigger: 'blur',type:'number'}
                ],
                startPlace: [
                  { required: true, message: '请选择开始地点', trigger: 'change',type:'number' }
                ],
                endPlace: [
                  { required: true, message: '请选择结束地点', trigger: 'change',type:'number'}
                ],
              }
            };
        },
        methods: {
            // 查找
            searchCarInfo(){
                let query = this.$router.currentRoute.query;
                let [type,id,startTime,endTime] = [query.type,query.id,this.startTime,this.endTime];
                this.query(type,id,this.currentPage,this.input,startTime,endTime);
            },

            // 翻页(currentPage 改变时会触发  => 回调参数为当前页currentPage)
            handleCurrentChange(val) {
              this.currentPage = val;   //给当前页重新赋值
              let query = this.$router.currentRoute.query;
              let [type,id,startTime,endTime] = [query.type,query.id,this.startTime,this.endTime];
              this.query(type,id,this.currentPage,this.input,startTime,endTime);
            },

            // 查看行程单(编程式导航)
            queryApplyInMap(index, row) {
                let id = row.id;
                this.$router.push({
                    path: '/searchHistoryLocu',
                    query: {id}
                });
            },

            
            getData(){        //
              let query = this.$router.currentRoute.query;
              let [type, id, startTime, endTime] = [query.type, query.id, this.startTime, this.endTime];
              this.query(type, id, this.currentPage, this.input, startTime, endTime);
            },


            // 添加
            addApply(formName){
              this.dialogFormVisible = true;      //弹出弹窗

              //将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
              this.$nextTick(() => {
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs[formName].resetFields();
              })

            },


            // 编辑
            editApply(index,item){
              
              item.startTime = new Date(item.startTime);
              item.endTime = new Date(item.endTime);
              this.ruleFormEdit = item;
              this.dialogFormVisibleEdit = true;    //弹出弹窗
              // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
              this.$nextTick(() => {
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs['ruleFormEdit'].resetFields();
              })

            },

            // 添加时点击提交，主页面需要刷新
            submitForm(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  var query={...this.ruleForm2};
                  query.startTime = query.startTime.getTime();    //时间对象转换为时间戳
                  query.endTime = query.endTime.getTime();        //时间对象转化为时间戳

                  this.$axios.post(`${SERVER_URI}apply/saveOrUpdate`, query)
                  .then(response => {
                      this.dialogFormVisible = false;     //关闭弹出框
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
                  console.log('error submit!!');
                  return false;
                }
              });
            },

            // 编辑时点击保存，主页也需要刷新页面
            submitForm2(formName){

              this.$refs[formName].validate((valid) => {
                if (valid) {
                  var query = {...this.ruleFormEdit};
                  query.startTime = query.startTime.getTime();
                  query.endTime = query.endTime.getTime();
                  this.$axios.post(`${SERVER_URI}apply/saveOrUpdate`, query)
                  .then(response => {
                      this.dialogFormVisibleEdit = false;     //关闭弹出框
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      // 添加成功,需要重新刷新页面
                      this.getData();
                  })
                  .catch(function (error) {
                    this.$message({
                      type: 'error',
                      message: '添加失败!'
                    });
                  });

                } else {
                  console.log('error submit!!');
                  return false;
                }
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


            query(type,id,page = 1,input,startTime,endTime){
              let query = {
                    type,
                    id,
                    page,
                    input,
                    startTime,
                    endTime
              };
              console.log('query', query)
                // 首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
                //    store.dispatch('actionA').then(() => {
                //      // ...
                //    })

                // 在组件中使用 this.$store.dispatch('xxx') 分发 action（需要先在根节点注入 store）
                this.$store.dispatch('applyQueryapplybycompany',query)
                .then(() => {
                  //  console.log('this.table............2', this.table)
                    let res = this.table;
                    // console.log(res);
                    this.tableData = res.records;
                    this.currentPage = res.current;
                    this.total = res.total;
                });

                // 下面代码是使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
                // this.applyQueryapplybycompany(query)
                // .then(() => {
                //    console.log('this.table............2', this.table)
                //     let res = this.table;
                //     // console.log(res);
                //     this.tableData = res.records;
                //     this.currentPage = res.current;
                //     this.total = res.total;
                // });


            },

            //action方法
            ...mapActions([
                'applyQueryapplybycompany',
            ]),
        },

        mounted(){
            // 控制表格高度
            let _this = this;
            this.getData();
            _this.loading = false;

            // console.log('this.....applyCompany', this)

            // 获取地点列表供下拉单使用
            this.$axios.post(`${SERVER_URI}placeinfo/findAllPlace`, {})
            .then(response => {
                this.placeList = response.data.data;
              }
            ).catch(function (error) {
              console.log('ddd',error);
            });


            // 获取车牌号列表供下拉单使用
            this.$axios.post(`${SERVER_URI}vehicle/findAllVehicle`, {})
            .then(response => {
                this.lpList = response.data.data;
                console.log('dd',this.lpList)
              }
            ).catch(function (error) {
              console.log('ddd',error);
            });
        },
        watch:{
            '$route':'getData',
            'startTime':function (val,oldValue) {
                console.log(val)
                console.log(this.endTime);
//                if (val !== "" && endTime !== "")
//                let newStartTime = new Date(val);
//                let newEndTime = new Date(this.endTime);
//                if (startTime !== "" && endTime !== "") {
//                    if (newStartTime >= newEndTime) {
//                        this.$message({
//                            showClose: true,
//                            message: '时间区间填写有误！',
//                            type: 'error'
//                        });
//                    }
                }
        },
        computed: {
            ...mapGetters({
                table: "getApplyQueryapplybycompanyList", //表格数据
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


<template>
    <div class="tabclick">
        <div class="tabclick_top">
            <div class="form_nav el-col el-col-24 el-col-xs-24 el-col-sm-24">
                <div>
                    <span class="wrapper" style="float:left;">
                        <el-button type="success" @click.stop="addInfo('ruleForm2')">添加场地信息</el-button>
                        <el-button type="danger" @click.stop="allDelete">全部删除</el-button>
                    </span>
                    <span class="wrapper" style="float:left;margin-left:60px;">
                        <el-input v-model="input" placeholder="请输入场地名称"></el-input>
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
                            label="场地名称"
                            show-overflow-tooltip
                            align="center"
                    >
                        <template scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="联系人"
                            align="center"

                    >
                        <template scope="scope">
                            {{ scope.row.contacter}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="场地类型"
                            align="center"

                    >
                        <template scope="scope">
                            <!--冻结-->
                            <el-tag type="success" v-if="scope.row.type == 1">小区</el-tag>
                            <!--启用-->
                            <el-tag type="success" v-if="scope.row.type == 2">垃圾中转站</el-tag>
                            <el-tag type="success" v-if="scope.row.type == 3">垃圾焚烧厂及处理厂</el-tag>
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

                    <el-table-column label="操作"
                                     align="center"
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

        <el-dialog title="添加场地信息" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="场地名称" prop="name">
                    <el-input type="text" v-model="ruleForm2.name" auto-complete="on" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contacter">
                    <el-input type="text" v-model="ruleForm2.contacter" auto-complete="on"
                              placeholder="请输入车队名称"></el-input>
                </el-form-item>
                <el-form-item label="场地类型" prop="type">
                    <el-radio-group v-model="ruleForm2.type">
                        <el-radio class="radio" label="1">小区</el-radio>
                        <el-radio class="radio" label="2">垃圾中转站</el-radio>
                        <el-radio class="radio" label="3">垃圾焚烧厂及处理厂</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="ruleForm2.status">
                        <el-radio class="radio" label="1">启用</el-radio>
                        <el-radio class="radio" label="0">冻结</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="点的坐标" prop="places">
                    <el-button @click="dialogFormVisiblePosition = true">获取点的坐标</el-button>
                    <el-input type="text" :readonly=true v-model="ruleForm2.places"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="isSubmit" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑场地信息" :visible.sync="dialogFormVisibleEdit"
                   :before-close="cancleEdit"
        >
            <el-form :model="ruleFormEdit" :rules="rules2" ref="ruleFormEdit" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="场地名称" prop="name">
                    <el-input type="text" v-model="ruleFormEdit.name" auto-complete="on"
                              placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contacter">
                    <el-input type="text" v-model="ruleFormEdit.contacter" auto-complete="on"
                              placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="场地类型" prop="type">
                    <el-radio-group v-model="ruleFormEdit.type">
                        <el-radio class="radio" label="1">小区</el-radio>
                        <el-radio class="radio" label="2">垃圾中转站</el-radio>
                        <el-radio class="radio" label="3">垃圾焚烧厂及处理厂</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="ruleFormEdit.status">
                        <el-radio class="radio" label="1">启用</el-radio>
                        <el-radio class="radio" label="0">冻结</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="点的坐标" prop="place">
                    <el-button @click="showMap">获取点的坐标</el-button>
                    <el-input type="text" :readonly=true v-model="ruleFormEdit.places"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                <el-button @click="cancleEdit">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择场地坐标" :visible.sync="dialogFormVisiblePosition">
            <template>
                <div class="amap-page-container">
                    <el-amap
                            ref="map"
                            vid="amapDemo"
                            :center="center"
                            :zoom="zoom"
                            class="amap-demo"
                            :amap-manager="amapManager"
                            :events="events">
                        <el-amap-search-box class="search-box" :search-option="searchOption" ref = "searchBox"
                                            :on-search-result="onSearchResult">

                        </el-amap-search-box>

                        <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"
                                        :content="marker.content" :offset="marker.offset"
                        >
                        </el-amap-marker>


                        <el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :ref="`polygon_${index}`"
                                         :path="polygon.path" :events="polygon.events">

                        </el-amap-polygon>
                    </el-amap>
                    <div class="toolbar">
                        <el-button type="primary" @click="resetMap">重置地图</el-button>
                    </div>
                </div>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getPosition">提交</el-button>
                <el-button @click="dialogFormVisiblePosition = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {AMapManager} from 'vue-amap';
    import {mapGetters, mapActions} from 'vuex'
    import * as actions from '../../store/modules/placeinfo/actions'
    import {arrAverageNum} from '../../../assets/js/util'

    let amapManager = new AMapManager();
    export default{


        data () {
            let self = this;
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
                    type: "",
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                ruleForm2: {
                    name: "",
                    contacter: '',
                    type: "1",
                    status: "1",
                    places: "",
                },
                ruleFormEdit: {},
                isSubmit: false,
                rules2: {
                    name: [
                        {required: true, message: '请输入场地名称', trigger: 'blur'},
                    ],
                    companyName: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'},
                    ],
                    contacter: [
                        {required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择场地类型', trigger: 'change'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change'}
                    ],
                    places: [
                        {required: true, message: '请选取点的坐标', trigger: 'blur'}
                    ],
                },
                dialogFormVisiblePosition: false,
                zoom: 16,
                center: [121.59996, 31.197646],

                address: '',
                markers: [],
                amapManager: amapManager,
                polygons: [{
                    path: [],
                }],
                events: {
                    click(e) {
                        self.$nextTick(() => {
                            let {lng, lat} = e.lnglat;
                            self.lng = lng;
                            self.lat = lat;

                            // 这里通过高德 SDK 完成。
                            let geocoder = new AMap.Geocoder({
                                radius: 1000,
                                extensions: "all"
                            });
                            geocoder.getAddress([lng, lat], function (status, result) {
                                if (status === 'complete' && result.info === 'OK') {
                                    if (result && result.regeocode) {
                                        self.$nextTick(() => {
                                            let marker = {
                                                position: [lng, lat],
                                                offset: [-10, -34],
                                            };
                                            self.markers.push(marker);
                                            // 画出地块
                                            self.polygons[0].path.push([lng, lat]);
                                        });
                                    }
                                }
                            });
                        })
                    }
                },
                lng: 0,
                lat: 0,
                searchOption: {
                    city: '上海',
                    citylimit: true
                },

                // 深复制对象
                deepPreviousRow: '',
                deepIndex: 0,

                editFlag : false,
            };
        },
        methods: {
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
            // 地图搜索
            onSearchResult(pois) {
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        let {lng, lat} = poi;
                        lngSum += lng;
                        latSum += lat;
                        let marker = {
                            position: [poi.lng, poi.lat],
                            offset: [-10, -34],
                        };
//                    this.markers.push(marker);
                        this.markers.push(marker);
                    });
                    let center = [
                        Number((lngSum / pois.length).toFixed(5)),
                        Number((latSum / pois.length).toFixed(5))
                    ];
                    this.center = center;

                }
            },
            searchCarInfo(){
                this.queryPlaceInfo({
                    page: this.currentPage,
                    input: this.input
                });
            },
            formatter(row, column) {
                return row.address;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryPlaceInfo({
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
                this.resetMap();
                this.ruleForm2.places = "";
                this.ruleFormEdit.places = "";
                $(".search-box-wrapper").find("input").val("");
            },
            // 编辑
            handleEdit(index, row) {
                this.dialogFormVisibleEdit = true;
                this.ruleFormEdit = row;

                this.deepPreviousRow = JSON.stringify(row);
                this.deepIndex = index;
                // 进去显示地图

                this.resetMap();
                let name = row.name;
                if (name === "" || name === undefined || name === null) {
                    name = "暂无相关信息";
                }
                let position = row.places.split(",");
                let tmp = [];
                let len = position.length / 2;
                for (let i = 0; i < len; i++) {
                    tmp.push(position.splice(0, 2));
                }
                this.polygons[0].path.push(tmp);
                // 寻找中心点 和 地块名称
                let averageX = [];
                let averageY = [];
                let averageNum = [];
                tmp.forEach((v, i, self) => {
                    averageX.push(v[0]);
                    averageY.push(v[1]);
                })
                averageNum.push(arrAverageNum(averageX), arrAverageNum(averageY));
                let marker = {
                    position: averageNum,
                    offset: [-10, -34],
                    content: `<div class = 'mapContent'>${name}</div>`,
                };
                this.center = averageNum;
                this.markers.push(marker);
                this.zoom = 16;

                this.editFlag = true;
            },
            submitFormEdit(formName){
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveOrUpdatePlaceInfo(this.ruleFormEdit).then(() => {
                            this.successEdit();
                            this.resetMap();
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
                    this.deletePlaceInfo({
                        id: row.id
                    }).then(() => {
                        this.queryPlaceInfo({
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
                let _this = this;
                let ids = [];
                if (this.selection != "") {
                    this.$confirm('是否删除全部信息', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.each(_this.selection, function (i, v) {
                            ids.push(_this.selection[i].id);
                        })
                        this.batchDeletePlaceInfo({items: ids}).then(() => {
                            _this.currentPage = 1;
                            this.queryPlaceInfo({
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
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveOrUpdatePlaceInfo(this.ruleForm2).then(() => {
                            this.successSubmit();
                            this.resetMap();
                            this.$refs[formName].resetFields();
                        });
                    } else {
                        return false;
                    }
                })
            },
            successSubmit () {
                let _this = this;
                this.queryPlaceInfo({}).then(() => {
                    _this.currentPage =1;
                    this.queryPlaceInfo({
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
                this.queryPlaceInfo({}).then(() => {
                    let page = _this.currentPage;
                    this.queryPlaceInfo({
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
                this.queryPlaceInfo({}).then(() => {
                    let page = _this.currentPage;
                    this.queryPlaceInfo({
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
                this.queryPlaceInfo({}).then(() => {
                    let page = _this.currentPage;
                    this.queryPlaceInfo({
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
            // 控制地图显示
            resetMap(){
                this.polygons[0].path = [];
                this.markers = [];
            },
            // 显示地图
            showMap(){
                this.dialogFormVisiblePosition = true;
            },
            // 获取点的坐标
            getPosition(){
                console.log(this.ruleFormEdit.places)
                console.log(this.polygons[0].path)
                console.log(JSON.stringify(this.polygons[0].path))
                    // 判断地图里面至少有三个点
                if(this.editFlag){
                    this.dialogFormVisiblePosition = false;
                    this.editFlag = false;
                    if (this.polygons[0].path.length !== 0){
                        let position = String(this.polygons[0].path);
                        console.log(String(position));
                        this.ruleForm2.places = position;
                        this.ruleFormEdit.places = position;
                    }
                }else{
                    if (this.polygons[0].path.length < 3 ) {
                        this.$message({
                            type: 'info',
                            message: '请至少选择三个点'
                        });
                        this.resetMap();
                    } else {
                        this.$message({
                            type: 'success',
                            message: '坐标选取成功!'
                        });
                        console.log(this.polygons[0].path)
                        let position = String(this.polygons[0].path);
                        console.log(String(position));
                        this.ruleForm2.places = position;
                        this.ruleFormEdit.places = position;
                    }
                }
                this.dialogFormVisiblePosition = false;

            },
            //action方法
            ...mapActions([
                'queryPlaceInfo',
                'findByPlaceInfoId',
                'saveOrUpdatePlaceInfo',
                'deletePlaceInfo',
                'batchDeletePlaceInfo'
            ]),
        },
        mounted(){
            let _this = this;
            // 控制表格高度
//            this.height = $(".tabclick").height() - $(".form_nav").height() - 80;
            this.queryPlaceInfo({}).then(() => {
                _this.loading = false;
            });

        },
        computed: {
            ...mapGetters({
                tableData: "getPlaceInfos",
                total: "getPlaceInfoTotal",
                current: "getCurrentPlaceInfo"
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .amap-demo {
        height: 500px;
    }
    .el-vue-search-box-container {
        position: relative;
        width: 360px;
        height: 45px;
        background: #eee;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .15);
        border-radius: 2px 3px 3px 2px;
        z-index: 10;
        top: -500px;
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

<template>
    <div>
        <div class = "header el-col el-col-24 el-col-xs-24 el-col-sm-24">
            <div class = "title el-col el-col-6 el-col-xs-6 el-col-sm-6">
                <div class = "img_box">
                    <img src = "assets/image/title.png"/>
                </div>
            </div>

            <el-menu class="el-menu-demo el-col el-col-2 el-col-xs-2 el-col-sm-2" id = "admin" mode="horizontal">
                <el-submenu index="2">
                    <template slot="title" style="position: relative">
                        {{user}}
                        <div class="admin_arrow">
                        </div>
                    </template>
                    <el-menu-item index="1" @click = "loginOut">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
            <div class = "menu-item el-col el-col-1 el-col-xs-1 el-col-sm-1">
            </div>
            <div class = "menu-item el-col el-col-15 el-col-xs-15 el-col-sm-15">
                <el-menu :default-active="route" class="el-menu-demo" mode="horizontal" style = "float: right" >
                    <!-- 
                        /applyStatistics        清运数据 
                        /transferStationSide    行程查询    
                        /exceptionApplySide     异常跟踪
                        /baseInfoManageSide     信息管理 
                     -->
                    <el-menu-item v-for="(value, key, index) in sysMenuList" :index="value.menuHref">
                        <router-link  :to = "value.menuHref">{{value.menuName}}</router-link>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
        <!-- 嵌套路由视图视口 -->
        <router-view></router-view>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    // 获取本地数据的方法
    import {locationStroageObj} from '../../assets/js/util';

    export default {
        data() {
            return{
                user:"",
                sysMenuList:[],
                route:"/applyStatistics",
            }
        },
        // 监听
        watch:{
            // 路由记录发生改变，该函数会被调用
            $route(to,form,next) {
                // console.log('to', to)
                // console.log('form', form)
                if(to.path.includes("/applyStatistics")){
                    this.route = "/applyStatistics";
                }
                if(to.path.includes("/transferStationSide")){
                    this.route = "/transferStationSide";
                }
                if(to.path.includes("/exceptionApplySide")){
                    this.route = "/exceptionApplySide";
                }
                if(to.path.includes("/transferStationSide")){
                    this.route = "/transferStationSide";
                }
                if(to.path.includes("/baseInfoManageSide")){
                    this.route = "/baseInfoManageSide";
                }
            }
        },
        mounted(){
//            let to = this.$router.currentRoute;
//            if(to.path.includes("/applyStatistics")){
//                this.route = "/applyStatistics";
//            }
//            if(to.path.includes("/transferStationSide")){
//                this.route = "/transferStationSide";
//            }
//            if(to.path.includes("/exceptionApplySide")){
//                this.route = "/exceptionApplySide";
//            }
//            if(to.path.includes("/transferStationSide")){
//                this.route = "/transferStationSide";
//            }
//            if(to.path.includes("/baseInfoManageSide")){
//                this.route = "/baseInfoManageSide";
//            }

            let userList = locationStroageObj.get('userList');
            this.user = userList.user.loginName;
            let sysMenuListTemp = userList.user.sysMenuList;
            this.sysMenuList = [

                ...sysMenuListTemp,
                {
                    "id":7,
                    "menuCode":"M0007",
                    "menuName":"每日数据",
                    "menuDesc":"每日数据",
                    "menuType":"M",
                    "menuHref":"/everyDayDataSide",
                    "parentId":"0",
                    "sort":5,
                    "level":1,
                    "createdBy":1,
                    "createdTime":1512013366000,
                    "lastupdatedBy":1,
                    "lastupdatedTime":1512013373000
                },
            ];
            
            console.log('我在header里面配置一级导航菜单.......this.sysMenuList',this.sysMenuList)










            
        },
        methods:{
            loginOut(){
                locationStroageObj.delete("userList");
                sessionStorage.clear();
                this.$router.push({ path: '/login' });
            }
        },
        computed:{
            ...mapGetters({
                userList:'user',
                tableData: "getUsers",
                total : "getUserTotal",
                current: "getCurrentUser"
            })
        },
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $bgColor:#3a7dd8;
    $hoverColor:#529bff;
    $admin_arrow:"/assets/image/arrow_top.png";
    .admin_arrow{
        display: none;
        position: absolute;
        width: 15px;
        height: 10px;
        background: url($admin_arrow);
        background-size: cover;
        bottom: 1px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transition: height .3s ease 0s;
        -moz-transition: height .3s ease 0s;
        -o-transition: height .3s ease 0s;
        -ms-transition: height .3s ease 0s;
        transition: height .3s ease 0s;
    }
    .header{
        height: 66px;
        background-color: $bgColor;
        color: #fff;
        top: 0;
        left: 0;
        line-height: 66px;
        z-index: 100;
        position: relative;
        padding:0 20px 0 24px;
        margin:0 auto;
        .title{
            float:left;
            .img_box{
                img{
                    display:inline-block;
                    vertical-align: middle;
                }
            }
        }
        #admin{
            float:right;
            font-size:16px;
            padding:0 15px;
            background-color: $bgColor;
            height:100%;
            border:0;
            color: #fff;
            >.el-submenu{
                height:100%;
                float: none;
                &.is-opened{
                    .admin_arrow{
                        display: block;
                    }
                }
            }
            &:hover{
                padding:0 15px;
                cursor: pointer;
                float:right;
                font-size:16px;
                background-color: $hoverColor;
                text-decoration: none;
                -webkit-transition: background-color .3s ease 0s;
                -moz-transition: background-color .3s ease 0s;
                -o-transition: background-color .3s ease 0s;
                -ms-transition: background-color .3s ease 0s;
                transition: background-color .3s ease 0s;
            };
        }
        .menu-item{
            float:right;
            height:100%;
        }
        .el-menu--horizontal {
            background-color: $bgColor;
            border-bottom: none;
            .el-menu-item{
                height:100%;
                line-height:65px;
                color:#fff;
                font-size:16px;
                border:none;
                padding: 0px;
                min-width: 100px;
                &+.el-menu-item{
                    margin-left:28px;
                }
                &:hover{
                    border:none;
                    background-color: $hoverColor;
                    text-decoration: none;
                    -webkit-transition: background-color .3s ease 0s;
                    -moz-transition: background-color .3s ease 0s;
                    -o-transition: background-color .3s ease 0s;
                    -ms-transition: background-color .3s ease 0s;
                    transition: background-color .3s ease 0s;
                }
                a{
                    display:inline-block;
                    text-align: center;
                    padding:0 20px;
                    width: 100%;
                    margin-top: -1px;
                }
                &.is-active{
                    border:none;
                    background-color: $hoverColor;
                    text-decoration: none;
                    -webkit-transition: background-color .3s ease 0s;
                    -moz-transition: background-color .3s ease 0s;
                    -o-transition: background-color .3s ease 0s;
                    -ms-transition: background-color .3s ease 0s;
                    transition: background-color .3s ease 0s;
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    $bgColor:#3a7dd8;
    $hoverColor:#529bff;
    #admin {
        >.el-submenu {
            height:100%;
            .el-submenu__title {
                height: 100%;
                line-height: 66px;
                border-bottom: 0;
                color:#fff;
                font-size: 16px;
                padding: 0;
                .el-submenu__icon-arrow{
                    font-size: 20px;
                    color: #fff
                }
                &:hover{
                    border:none;
                    background-color: $hoverColor;
                    text-decoration: none;
                    -webkit-transition: background-color .3s ease 0s;
                    -moz-transition: background-color .3s ease 0s;
                    -o-transition: background-color .3s ease 0s;
                    -ms-transition: background-color .3s ease 0s;
                    transition: background-color .3s ease 0s;
                }
                a{
                    display:inline-block;
                    text-align: center;
                    padding:0 20px;
                }
                &.is-active{
                    border:none;
                    background-color: $hoverColor;
                    text-decoration: none;
                    -webkit-transition: background-color .3s ease 0s;
                    -moz-transition: background-color .3s ease 0s;
                    -o-transition: background-color .3s ease 0s;
                    -ms-transition: background-color .3s ease 0s;
                    transition: background-color .3s ease 0s;
                }
            }
            .el-menu{
                left:-5px;
                width:105px;
                .el-menu-item{
                    color:#272c30;
                    text-align:center;
                    height: 60px;
                    line-height: 60px;
                    width: 100%;
                    min-width: 100px;
                    margin:0;
                    &:hover{
                        color:#272c30;
                        background: #fff;
                    }
                    &.is-active{
                        color:#272c30;
                        background: #fff;
                    }
                }
            }
        }
    }

</style>

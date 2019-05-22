<template>
    <div class="main_submeau">
        <div class="tab_left">
            <el-menu :default-active="route"
                        @select="handleSelect"
                        @open="handleOpen"
                        @close="handleClose"
                        :unique-opened = true
                        ref = "subMeau"
                        class="el-menu-vertical-demo" id = "elMeau">
                <!-- 运输公司 -->
                <el-submenu index="company">
                    <template slot="title">
                        <router-link to="/transferStationSide/applyCompany" class="meau_link">
                            <div class="meau_inner">
                                <div class="meau_icon vertical">
                                </div>
                                <span class="meau_text">运输公司</span>
                            </div>
                        </router-link>
                    </template>

                    <el-menu-item v-for="(value, key, index) in company" :index="String(value.id)" class = "subMeau">
                        <div v-if=" value.companyName.length > 6">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ value.companyName }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ value.companyName.substring(0, 6) + "..."}}
                                </div>
                            </el-popover>
                        </div>
                        <div v-else>
                            {{ value.companyName}}
                        </div>
                    </el-menu-item>
                </el-submenu>
                <!-- 小区 -->
                <el-submenu index="village">
                    <template slot="title">
                        <router-link to="/transferStationSide/applyVillage" class="meau_link">
                            <div class="meau_inner">
                                <div class="meau_icon village">
                                </div>
                                <span class="meau_text">小区</span>
                            </div>
                        </router-link>
                    </template>
                    <el-menu-item v-for="(value, key, index) in village" :index="String(value.id)" class = "subMeau">
                        <div v-if=" value.name.length > 6">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ value.name }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ value.name.substring(0, 6) + "..."}}
                                </div>
                            </el-popover>
                        </div>
                        <div v-else>
                            {{ value.name}}
                        </div>
                    </el-menu-item>
                </el-submenu>
                <!-- 消纳场地 -->
                <el-submenu index="treatmentPlant">
                    <template slot="title">
                        <router-link to="/transferStationSide/applyTreatmentPlant" class="meau_link" >
                            <div class="meau_inner">
                                <div class="meau_icon treatmentPlant">
                                </div>
                                <span class="meau_text">消纳场地</span>
                            </div>
                        </router-link>
                    </template>
                    <el-menu-item v-for="(value, key, index) in treatmentPlant" :index="String(value.id)" class = "subMeau">
                        <div v-if=" value.name.length > 6">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ value.name }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ value.name.substring(0, 6) + "..."}}
                                </div>
                            </el-popover>
                        </div>
                        <div v-else>
                            {{ value.name}}
                        </div>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Transfer from "../../../node_modules/iview/src/components/transfer/transfer";
    import {locationStroageObj} from '../../../assets/js/util';
    import {mapGetters, mapActions} from 'vuex'

    export default{
        components: {Transfer},
        data() {
            return {
                route: "",          //
                company: "",
                village: "",
                treatmentPlant: "",
            };
        },
        methods: {
            handleDeliver(type, id){
                if (type === "company") {
                    this.$router.push({
                        path: '/transferStationSide/applyCompany',
                        query: {type, id}
                    });
                }
                if (type === "village") {
                    this.$router.push({
                        path: '/transferStationSide/applyVillage',
                        query: {type, id}
                    });
                }
                if (type === "treatmentPlant") {
                    this.$router.push({
                        path: '/transferStationSide/applyTreatmentPlant',
                        query: {type, id}
                    });
                }
            },

            // 菜单激活回调
            handleSelect(key, keyPath) {
                let [type, id] = [keyPath[0], keyPath[1]];      //ES6语法  解构赋值
                this.handleDeliver(type, id);

            },
            // sub-menu 展开的回调
            handleOpen(key, keyPath){
                console.log('key....展开的回调', key)
                let [type] = [key];     //ES6语法  解构赋值
                this.handleDeliver(type);
            },
            // sub-menu 收起的回调
            handleClose(key, keyPath){
                console.log('key....收起的回调', key)
                let [type] = [key];     //ES6语法  解构赋值
                this.handleDeliver(type);
            },

        },
        mounted(){
            // 获取二级菜单
            let userList = locationStroageObj.get('userList');
            this.village = userList.village;
            this.treatmentPlant = userList.treatmentPlant;
            this.company = userList.company;
            let query = this.$router.currentRoute.query;
            // console.log('mounted........this.$router',this.$router)
            if(JSON.stringify(query) !== "{}"){
                this.$refs.subMeau.open(query.type);
            }else{
                this.$refs.subMeau.open("company");
            }
        },

    }
</script>
<style lang="scss" rel="stylesheet/scss">
    $vertical: "/assets/image/vertical.png";
    $vertical_hover: "/assets/image/vertical_hover.png";

    $village: "/assets/image/village.png";
    $village_hover: "/assets/image/village_hover.png";

    $treatmentPlant: "/assets/image/treatmentPlant.png";
    $treatmentPlant_hover: "/assets/image/treatmentPlant_hover.png";

    $placeManage: "/assets/image/placeManage.png";
    $placeManage_hover: "/assets/image/placeManage_hover.png";

    $color_hover: #3b8cff;
    $meau_hover: "/assets/image/meau_hover.png";
    .main_submeau {
        margin: 10px 10px 0 10px;
        position: absolute;
        top: 66px;
        width: calc(100% - 20px);
        height: calc(100% - 76px);
        background: #f2f2f2;
        box-sizing: border-box;
        .tab_left {
            width: 126px;
            background: #f2f2f2;
            position: absolute;
            max-height: calc(100% - 5px);
            top: 0;
            left: 0px;
            overflow-y: scroll;
            z-index:2;
            &::-webkit-scrollbar{
                width: 0;
            }
            .el-menu {
                    border: none;
                    background: #fff;
                    width: 120px;
                    margin-left:5px;
                    height: 100%;
                    /*z-index:999;*/
                    .el-submenu:focus,.el-submenu:hover,.el-submenu.is-opened,.el-submenu.hover{
                        outline: 0;
                        background-color: #fff;
                        color: $color_hover;
                        position: relative;
                        z-index:9999;
                        min-height: 80px;
                        .el-submenu__title{
                            height: 80px;
                            line-height: 80px;
                            padding:0 !important;
                            position: relative;
                            &:before {
                                content: "";
                                position: absolute;
                                left:-2px;
                                width: 5px;
                                height: 100%;
                                transform-origin: 0 0;
                                background: url($meau_hover) no-repeat;
                                background-size: cover;
                                z-index:999;
                            }
                            &:after {
                                content: "";
                                position: absolute;
                                right: -3px;
                                width: 5px;
                                height: 100%;
                                transform-origin: 0 0;
                                background: #fff;
                            }
                            &:hover{
                                background: #fff;
                            }
                            .el-submenu__icon-arrow{
                                right:5px;
                                margin-top:12px;
                                color: $color_hover;
                            }
                        }

                        .meau_link {
                            padding-left: 0 ;
                            display: inline-block;
                            height: 80px;
                            .meau_inner {
                                width: 100%;
                                height: 80px;
                                text-align: center;
                                position: relative;
                                .meau_icon {
                                    height: 22px;
                                    position: absolute;
                                    top: 20px;
                                    width: 32px;
                                    &.vertical {
                                        background: url($vertical_hover);
                                    }
                                    &.village {
                                        background: url($village_hover);
                                    }
                                    &.treatmentPlant {
                                        background: url($treatmentPlant_hover);
                                    }
                                    &.placeManage {
                                        background: url($placeManage_hover);
                                    }
                                    background-size: cover;
                                }
                                .meau_text {
                                    width: 100%;
                                    height: 16px;
                                    color: $color_hover;
                                    position: absolute;
                                    top: 50px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                }
                            }
                        }
                    }
                    .el-submenu {
                        box-sizing: border-box;
                        min-height: 80px;
                        border: 1px solid #eee;
                        color: #666;
                        font-size: 14px;
                        padding: 0 !important;
                        position: relative;
                        border-right: 0px solid #eee;
                        .el-submenu__title{
                            height: 80px;
                            line-height: 80px;
                            padding:0 !important;
                            &:after {
                                content: "";
                                position: absolute;
                                width: 0px;
                                height: 100%;
                                transform-origin: 0 0;
                            }
                            &:hover{
                                background: #fff;
                            }
                            .el-submenu__icon-arrow{
                                right:5px;
                                margin-top:12px;
                            }
                        }
                        .meau_link {
                            padding-left: 0 ;
                            display: inline-block;
                            height: 80px;
                            width: 100%;
                            .meau_inner {
                                width: 100%;
                                height: 80px;
                                text-align: center;
                                position: relative;
                                .meau_icon {
                                    height: 22px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    position: absolute;
                                    top: 20px;
                                    width: 32px;
                                    background-size: cover;
                                    &.vertical {
                                        background: url($vertical);
                                    }
                                    &.village {
                                        background: url($village);
                                    }
                                    &.treatmentPlant {
                                        background: url($treatmentPlant);
                                    }
                                    &.placeManage {
                                        background: url($placeManage);
                                    }
                                }
                                .meau_text {
                                    display: block;
                                    height: 16px;
                                    line-height: 16px;
                                    color: #666;
                                    position: absolute;
                                    top: 50px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                }
                            }
                        }

                        & * {
                            vertical-align: baseline;
                        }
                        &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5) {
                            border-bottom: none;
                        }

                    }
                }
        }
    }
    #elMeau {
        .el-submenu{
            .el-menu{
                background: #ecf5ff;
                padding: 10px 0;
                margin-left: -1px;
                border-left: 1px solid #eee;
                .subMeau{
                    padding: 0;
                    padding-left: 30px !important;
                    width:100%;
                    min-width: 100px;
                    text-align: left;
                    font-size: 12px;
                    position: relative;
                    height: 40px;
                    line-height: 40px;
                    &:hover,&:active,&.is-active{
                        color:$color_hover;
                        &:before {
                            content: "";
                            position: absolute;
                            left: 20px;
                            width: 4px;
                            height: 4px;
                            transform-origin: 0 0;
                            background:$color_hover;
                            border-radius: 2px;
                            top:50%;
                            margin-top: -2px;
                        }
                    }

                }
            }
        }
    }


</style>


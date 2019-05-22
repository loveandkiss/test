<template>
    <div class="main">
        <div class="tab_left">
            <el-menu :default-active="route" class="el-menu-demo" @select="handleSelect">
                <el-menu-item index="company">
                    <router-link to="/applyStatistics/applyStatisticsOfEcharsCompany" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon vertical">
                            </div>
                            <span class="meau_text">运输公司</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="village">
                    <router-link to="/applyStatistics/applyStatisticsOfEcharsVillage" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon village">
                            </div>
                            <span class="meau_text">小区</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="transferStation">
                    <router-link to="/applyStatistics/applyStatisticsOfEcharsTransferStation" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon transferStation">
                            </div>
                            <span class="meau_text">中转站</span>
                        </div>
                    </router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <!--  -->
        <router-view></router-view>
    </div>
</template>
<script>
    import {toUpperStr} from '../../../assets/js/util'
    export default{
        data() {
            return {
                route: "",
            };
        },
        methods: {
            handleDeliver(type, id){
                this.$router.push({
                    path: `/applyStatistics/applyStatisticsOfEchars${toUpperStr(type)}`,
                    query: {type}
                });
            },

            handleSelect(key, keyPath) {
                let [type] = [keyPath[0]];
                this.handleDeliver(type);
            }
        },
        mounted(){
            let route = this.$router.currentRoute;
            this.route = route.query.type;
            if(route.path === "/applyStatistics"){
                this.route = "company";
            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $vertical: "/assets/image/vertical.png";
    $vertical_hover: "/assets/image/vertical_hover.png";
    $village: "/assets/image/village.png";
    $village_hover: "/assets/image/village_hover.png";
    $treatmentPlant: "/assets/image/treatmentPlant2.png";
    $treatmentPlant_hover: "/assets/image/treatmentPlant_hover2.png";
    $color_hover: #3b8cff;
    $meau_hover: "/assets/image/meau_hover.png";
    .main {
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
            left: 0;
            .el-menu {
                background: #fff;
                border: none;
                width: 120px;
                margin-left:5px;
                .el-menu-item:focus, .el-menu-item:hover, .el-menu-item.is-active {
                    outline: 0;
                    background-color: #fff;
                    color: $color_hover;
                    position: relative;
                    &:before {
                        content: "";
                        position: absolute;
                        left: -2px;
                        width: 5px;
                        height: 100%;
                        transform-origin: 0 0;
                        background: url($meau_hover) no-repeat;
                        background-size: cover;
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
                    .meau_link {
                        display: inline-block;
                        height: 80px;
                        .meau_inner {
                            width: 100%;
                            height: 80px;
                            text-align: center;
                            .meau_icon {
                                height: 22px;
                                position: absolute;
                                top: 20px;
                                width: 32px;
                                background-size: cover;
                                &.vertical {
                                    background: url($vertical_hover) no-repeat center;
                                }
                                &.village {
                                    background: url($village_hover) no-repeat center;
                                }
                                &.transferStation {
                                    background: url($treatmentPlant_hover) no-repeat center;
                                }
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
                .el-menu-item {
                    box-sizing: border-box;
                    height: 80px;
                    border: 1px solid #eee;
                    color: #666;
                    font-size: 14px;
                    padding: 0 !important;
                    position: relative;
                    border-right: 0px solid #eee;

                    &:after {
                        content: "";
                        position: absolute;
                        width: 0px;
                        height: 100%;
                        transform-origin: 0 0;
                    }
                    & * {
                        vertical-align: baseline;
                    }
                    &:nth-of-type(1), &:nth-of-type(2) {
                        border-bottom: none;
                    }
                    .meau_link {
                        display: inline-block;
                        height: 80px;
                        width: 100%;
                        .meau_inner {
                            width: 100%;
                            height: 80px;
                            text-align: center;
                            .meau_icon {
                                left: 50%;
                                transform: translateX(-50%);
                                position: absolute;
                                top: 20px;
                                width: 32px;
                                height: 22px;
                                background-size: cover;
                                &.vertical {
                                    background: url($vertical) no-repeat center;
                                }
                                &.village {
                                    background: url($village) no-repeat center;
                                }
                                &.transferStation {
                                    background: url($treatmentPlant) no-repeat center;
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
                }
            }
        }
    }

</style>

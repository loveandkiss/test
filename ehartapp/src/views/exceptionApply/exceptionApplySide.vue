
<template>
    <div class = "main">
        <div class = "tab_left">
            <el-menu :default-active="route" class="el-menu-demo">

                <el-menu-item index="/exceptionApplySide/exceptionApplyOfOrigin">
                    <router-link to = "/exceptionApplySide/exceptionApplyOfOrigin" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon exceptionApplyOfOrigin">
                            </div>
                            <span class="meau_text">垃圾来源不明</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="/exceptionApplySide/exceptionApplyOfAway">
                    <router-link to = "/exceptionApplySide/exceptionApplyOfAway" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon exceptionApplyOfAway">
                            </div>
                            <span class="meau_text">垃圾去向不明</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="/exceptionApplySide/exceptionApplyOfVehicle">
                    <router-link to = "/exceptionApplySide/exceptionApplyOfVehicle" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon exceptionApplyOfVehicle">
                            </div>
                            <span class="meau_text">车辆未知</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="/exceptionApplySide/exceptionApplyOfOther">
                    <router-link to = "/exceptionApplySide/exceptionApplyOfOther" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon exceptionApplyOfOther">
                            </div>
                            <span class="meau_text">未知</span>
                        </div>
                    </router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Transfer from "../../../node_modules/iview/src/components/transfer/transfer";
    export default{
        components: {Transfer},
        data() {
            return {
                route: "",
            };
        },
        mounted(){
            let route = this.$route.path;
            this.route = route;
            if(route === "/exceptionApplySide"){
                this.route = "/exceptionApplySide/exceptionApplyOfOrigin";
            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $exceptionApplyOfOrigin: "/assets/image/exceptionApplyOfOrigin.png";
    $exceptionApplyOfOrigin_hover: "/assets/image/exceptionApplyOfOrigin_hover.png";

    $exceptionApplyOfAway: "/assets/image/placeManage.png";
    $exceptionApplyOfAway_hover: "/assets/image/placeManage_hover.png";

    $exceptionApplyOfVehicle: "/assets/image/exceptionApplyOfVehicle.png";
    $exceptionApplyOfVehicle_hover: "/assets/image/exceptionApplyOfVehicle_hover.png";

    $exceptionApplyOfOther: "/assets/image/verticalManage.png";
    $exceptionApplyOfOther_hover: "/assets/image/verticalManage_hover.png";




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
        /*z-index:9;*/
        .tab_left {
            width: 126px;
            background: #f2f2f2;
            position: absolute;
            left: 0;
            z-index: 20;
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
                            position: relative;
                            .meau_icon {
                                height: 22px;
                                position: absolute;
                                top: 20px;
                                width: 32px;
                                &.exceptionApplyOfOrigin {
                                    background: url($exceptionApplyOfOrigin_hover);
                                }
                                &.exceptionApplyOfVehicle {
                                    background: url($exceptionApplyOfVehicle_hover);
                                }
                                &.exceptionApplyOfAway {
                                    background: url($exceptionApplyOfAway_hover);
                                }
                                &.exceptionApplyOfOther {
                                    background: url($exceptionApplyOfOther_hover);
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
                    &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5) {
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
                            position: relative;
                            .meau_icon {
                                height: 22px;
                                width: 100%;
                                left: 50%;
                                transform: translateX(-50%);
                                position: absolute;
                                top: 20px;
                                width: 32px;
                                height: 22px;
                                background-size: cover;
                                &.exceptionApplyOfOrigin {
                                    background: url($exceptionApplyOfOrigin);
                                }
                                &.exceptionApplyOfVehicle {
                                    background: url($exceptionApplyOfVehicle);
                                }
                                &.exceptionApplyOfAway {
                                    background: url($exceptionApplyOfAway);
                                }
                                &.exceptionApplyOfOther {
                                    background: url($exceptionApplyOfOther);
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

<template>
    <div class="main">
        <div class="tab_left">
            <el-menu :default-active="route" class="el-menu-demo">
                <el-menu-item index="User">
                    <router-link to="/baseInfoManageSide/User" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon userManage">
                            </div>
                            <span class="meau_text">用户管理</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="biddingCompany">
                    <router-link to="/baseInfoManageSide/biddingCompany" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon entrustManage">
                            </div>
                            <span class="meau_text">委托方管理</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="verhicle">
                    <router-link to="/baseInfoManageSide/verhicle" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon verticalManage">
                            </div>
                            <span class="meau_text">车辆管理</span>
                        </div>
                    </router-link>
                </el-menu-item>

                <el-menu-item index="PlaceInfo">
                    <router-link to="/baseInfoManageSide/PlaceInfo" class="meau_link">
                        <div class="meau_inner">
                            <div class="meau_icon placeManage">
                            </div>
                            <span class="meau_text">场地管理</span>
                        </div>
                    </router-link>
                </el-menu-item>

            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
    export default{
        data() {
            return {
                route: "",
            };
        },
        mounted(){
            let route = this.$router.currentRoute;
            this.route = route.path.split("/")[2];
            if(route.path === "/baseInfoManageSide"){
                this.route = "User";
            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    $userManage: "/assets/image/userManage.png";
    $userManage_hover: "/assets/image/userManage_hover.png";

    $entrustManage: "/assets/image/entrustManage.png";
    $entrustManage_hover: "/assets/image/entrustManage_hover.png";

    $verticalManage: "/assets/image/verticalManage.png";
    $verticalManage_hover: "/assets/image/verticalManage_hover.png";

    $placeManage: "/assets/image/placeManage.png";
    $placeManage_hover: "/assets/image/placeManage_hover.png";

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
                                &.userManage {
                                    background: url($userManage_hover);
                                }
                                &.entrustManage {
                                    background: url($entrustManage_hover);
                                }
                                &.verticalManage {
                                    background: url($verticalManage_hover);
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
                                left: 50%;
                                transform: translateX(-50%);
                                position: absolute;
                                top: 20px;
                                width: 32px;
                                height: 22px;
                                background-size: cover;
                                &.userManage {
                                    background: url($userManage);
                                }
                                &.entrustManage {
                                    background: url($entrustManage);
                                }
                                &.verticalManage {
                                    background: url($verticalManage);
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
                }
            }
        }
    }

</style>

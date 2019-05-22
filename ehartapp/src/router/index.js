import Vue from "vue";
import Router from "vue-router";
import * as filters from "../../assets/js/util"; // 导入工具函数


import CarPosition from "@/views/positionWatch/carPosition";

import ExceptionApply from "@/views/exceptionApply/exceptionApply";

import HistoryLocu from "@/views/historylocu/historylocu";

// 查看行程记录
import searchHistoryLocu from "@/views/historylocu/searchHistoryLocu";




import BaseInfoManageSide from "@/views/baseInfo/baseInfoManageSide";
import User from "@/views/baseInfo/User";
import placeInfo from "@/views/baseInfo/placeInfo";
import VerhicleSide from "@/views/verhicle/verhicleSide";
import Verhicle from "@/views/baseInfo/verhicle";
import BiddingCompany from "@/views/baseInfo/biddingCompany";

import ExceptionApplySide from "@/views/exceptionApply/exceptionApplySide";
import ExceptionApplyOfOrigin from "@/views/exceptionApply/exceptionApplyOfOrigin";
import ExceptionApplyOfAway from "@/views/exceptionApply/exceptionApplyOfAway";
import ExceptionApplyOfVehicle from "@/views/exceptionApply/exceptionApplyOfVehicle";
import ExceptionApplyOfOther from "@/views/exceptionApply/exceptionApplyOfOther";
// 其他的页面
import transferStationApply from "@/views/transferStation/transferStationApply";
import arriveInTransfer from "@/views/transferStation/arriveInTransfer";


import vehicleAppointSide from "@/views/vehicleAppoint/vehicleAppointSide";
import vehicleAppoint from "@/views/vehicleAppoint/vehicleAppoint";


import vehicleAuditSide from "@/views/vehicleAuditSide/vehicleAuditSide";
import vehicleNoAudited from "@/views/vehicleAuditSide/vehicleNoAudited";
import vehicleIsAudited from "@/views/vehicleAuditSide/vehicleIsAudited";



// 每日路由配置开始
import everyDayDataSide from "@/views/everyDayDataSide/everyDayDataSide";
import Index from "@/views/everyDayDataSide/Index";
// 每日路由配置结束





import applyStatisticsSide from "@/views/applyStatistics/applyStatisticsSide";
import applyStatisticsOfEchars3 from "@/views/applyStatistics/applyStatisticsOfEchars3";
import applyStatisticsOfEchars2 from "@/views/applyStatistics/applyStatisticsOfEchars2";
import applyStatisticsOfEchars from "@/views/applyStatistics/applyStatisticsOfEchars";
import applyStatisticsOfEcharsCompany from "@/views/applyStatistics/applyStatisticsOfEcharsCompany";
import applyStatisticsOfEcharsTransferStation from "@/views/applyStatistics/applyStatisticsOfEcharsTransferStation";
import applyStatisticsOfEcharsVillage from "@/views/applyStatistics/applyStatisticsOfEcharsVillage";


import applyStatisticsOfDayDetials from "@/views/applyStatistics/applyStatisticsOfDayDetials";
import applyStatisticsOfApplyDetials from "@/views/applyStatistics/applyStatisticsOfApplyDetials";

// 行程查询
import transferStationSide from "@/views/transferStationSide/transferStationSide";
import applyCompany from "@/views/transferStationSide/applyCompany";
import applyVillage from "@/views/transferStationSide/applyVillage";
import applyTreatmentPlant from "@/views/transferStationSide/applyTreatmentPlant";
// 404 页面
import error from "@/views/errorPage/404";
// login
import login from "@/views/login/index";
// header
import headerPage from "../components/header.vue";


// import Test from '@/views/vehicleAppoint/test'
// import details from '@/views/vehicleAppoint/details'
//
// import demo5 from '@/views/vehicleAppoint/demo5'
// import demo6 from '@/views/vehicleAppoint/demo6'





Vue.use(Router)
//global utility filters.(注册全局过滤器)
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
export default new Router({
    // 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
    // vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
    scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes:[

        {
            path: '/headerPage',
            component: headerPage,
            // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
            children:[
                {
                    path: '/table2',
                    // component: Table
                    component: arriveInTransfer
                },
                {
                    path: '/table',
                    // component: Table
                    component: transferStationApply
                },
                {
                    path: '/vehicleAppoint',
                    component: vehicleAppoint
                },
                {
                    path: '/carPosition',
                    component: CarPosition
                },
                {
                    path: '/exceptionApply',
                    component: ExceptionApply
                },
                {
                    path: '/historyLocu',
                    component: HistoryLocu
                },
                // 行程
                {
                    path: '/searchHistoryLocu',
                    component: searchHistoryLocu

                },
                //------------------------------清运数据----------------------------//
                {
                    path: '/applyStatistics',
                    component: applyStatisticsSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[
                        // 运输公司
                        {
                            path: '/applyStatistics/applyStatisticsOfEcharsCompany',
                            component: applyStatisticsOfEcharsCompany
                        },
                        // 小区
                        {
                            path: '/applyStatistics/applyStatisticsOfEcharsVillage',
                            // component: applyStatistics,
                            // component: applyStatisticsOfEchars2,
                            // component: applyStatisticsOfEchars3,
                            component: applyStatisticsOfEcharsVillage
                        },
                        // 中转站
                        {
                            path: '/applyStatistics/applyStatisticsOfEcharsTransferStation',
                            component: applyStatisticsOfEcharsTransferStation
                        },
                        {
                            path: '',
                            component: applyStatisticsOfEcharsCompany,
                        },
                    ]
                },
                {
                    path: '/applyStatistics/applyStatisticsOfDayDetials',
                    component: applyStatisticsOfDayDetials,

                },
                {
                    path: '/applyStatistics/applyStatisticsOfDayDetials/applyStatisticsOfApplyDetials/',
                    component: applyStatisticsOfApplyDetials,
                },
                {
                    path: '/verhicleSide',
                    component: VerhicleSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[

                        {
                            path: "",
                            component: Verhicle
                        }
                    ]
                },

                //-------------------------------行程查询-----------------------------//
                {
                    path: '/transferStationSide',
                    component: transferStationSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[
                        // 运输公司
                        {
                            path: '/transferStationSide/applyCompany',
                            component: applyCompany,
                        },
                        // 小区
                        {
                            path: '/transferStationSide/applyVillage',
                            component: applyVillage,
                        },
                        // 消纳场地
                        {
                            path: '/transferStationSide/applyTreatmentPlant',
                            component: applyTreatmentPlant,
                        },
                        {
                            path: "",
                            component: applyCompany
                        }
                    ]
                },



                //每日数据 
                {
                    path: '/everyDayDataSide',
                    component: everyDayDataSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[
                        {
                            path: '', 
                            component: Index 
                        },
                        // {
                        //     path:'/everyDayDataSide',
                        //     redirect: '/everyDayDataSide/Index'
                        // }
                        
                    ]
                },



                {
                    path: '/vehicleAuditSide',
                    component: vehicleAuditSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[

                        {
                            path: "",
                            component: vehicleNoAudited
                        }
                    ]
                },

                // -------------------------------信息管理------------------------------//
                {
                    path: '/baseInfoManageSide',
                    component: BaseInfoManageSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[
                        {
                            path: '/baseInfoManageSide/User',
                            component: User,
                        },
                        {
                            path: '/baseInfoManageSide/placeInfo',
                            component: placeInfo,
                        },
                        {
                            path: '/baseInfoManageSide/verhicle',
                            component: Verhicle,
                        },
                        {
                            path: '/baseInfoManageSide/biddingCompany',
                            component: BiddingCompany,
                        },
                        {
                            path: '',
                            component: User,
                        },
                        {
                            path: '/vehicleAuditSide/vehicleNoAudited',
                            component: vehicleNoAudited,
                        },
                        {
                            path: '/vehicleAuditSide/vehicleIsAudited',
                            component: vehicleIsAudited,
                        },
                    ]
                },

                //--------------------------------异常跟踪-------------------------------//
                {
                    path: '/exceptionApplySide',
                    component: ExceptionApplySide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[
                        // 垃圾来源不明
                        {
                            path: '/exceptionApplySide/exceptionApplyOfOrigin',
                            component: ExceptionApplyOfOrigin,
                        },
                        // 垃圾去向不明
                        {
                            path: '/exceptionApplySide/ExceptionApplyOfAway',
                            component: ExceptionApplyOfAway,
                        },
                        // 车辆未知
                        {
                            path: '/exceptionApplySide/exceptionApplyOfVehicle',
                            component: ExceptionApplyOfVehicle,
                        },
                        {
                            path: '',
                            component: ExceptionApplyOfOrigin,
                        },
                        // 未知
                        {
                            path: '/exceptionApplySide/exceptionApplyOfOther',
                            component: ExceptionApplyOfOther,
                        },
                    ]
                },
                {
                    path: '/vehicleAppointSide',
                    component: vehicleAppointSide,
                    // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
                    children:[
                        {
                            path: '/vehicleAppoint/vehicleAppoint',
                            component: vehicleAppoint,
                        },
                        // {
                        //     path: '/vehicleAppoint/Test',
                        //     component: Test,
                        //     children:[
                        //         {
                        //             path: '/vehicleAppoint/Test/:personName',
                        //             component: details,
                        //         },
                        //     ]
                        // },
                        // {
                        //     path: '/vehicleAppoint/demo5',
                        //     component: demo5,
                        //
                        // },
                        // {
                        //     path: '/vehicleAppoint/demo6/:personName',
                        //     component: demo6,
                        // },
                        {
                            path: '',
                            component: vehicleAppoint,
                        }
                    ]
                },
                {
                    path: '/user',
                    component: User
                },
            ]
        },
        // 登录页面
        {
            path: '/login',
            component: login
        },
        {
            path: '/',
            component: login
        },
        // 警告（404 页面）
        {
            path: '*',
            component: error
        },
    ]
})



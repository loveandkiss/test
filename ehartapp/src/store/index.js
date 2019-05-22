import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';     // 

import everyDayData from './modules/everyDayData';     // 每日数据

import vehicle from './modules/vehicle';
import biddingCompanyInfo from './modules/biddingCompanyInfo';
import placeInfo from './modules/placeInfo';
import transferStationApply from './modules/transferStationApply';
import vehicleAppoint from './modules/vehicleAppoint';
import apply from './modules/apply';
import vehiclelocu from './modules/vehiclelocu';


Vue.use(Vuex);

// 创建状态管理器
export default new Vuex.Store({
    modules: {
        user,
        everyDayData,       //每日数据
        vehicle,
        biddingCompanyInfo,
        placeInfo,
        transferStationApply,
        vehicleAppoint,
        apply,
        vehiclelocu,
    }
});

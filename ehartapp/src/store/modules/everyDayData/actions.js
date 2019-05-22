import Vue from 'vue'


// import * as xxx from 'xxx'  会将 "xxx" 中所有 export 导出的内容组合成一个对象返回(或import * as obj from 'xx'  这种写法是把所有的输出包裹到obj对象里)
// 下面URL就是一个对象
// import * as URL from './mutation-types';



import {EVERYDAYDATA_LIST,EVERYDAYDATA_LICENSENUMBER,EVERYDAYDATA_EDITDATA,EVERYDAYDATA_DELETEDATA,EVERYDAYDATA_SAVEORUPDATE,EVERYDAYDATA_CONFIRM} from './mutation-types';







// 获取列表
export function everyDayTableDataList ({ commit }, params) {
    // 请求后台(异步)
    return Vue.http.post(EVERYDAYDATA_LIST,params)
        .then((response) =>{

            console.log('response',response);

            
            commit("everyDayTableDataList", response.body);
        })
        .catch((error)=>{
            console.log(error);
        });
}

// 获取车牌号列表
export function getLicensePlatNumberList ({ commit }, params) {
    return Vue.http.post(EVERYDAYDATA_LICENSENUMBER,params)
        .then((response) =>{
            commit("getLicensePlatNumberList", response.body);
        })
        .catch((error)=>{
            console.log(error);
        });
}


// 添加、编辑
export function saveOrUpdate ({ commit }, params) {
    return Vue.http.post(EVERYDAYDATA_SAVEORUPDATE,params)
        .then((response) =>{
            // commit("everyDayTableDataList", response.body);
            console.log('saveOrUpdate---response',response); 
        })
        .catch((error)=>{
            console.log(error);
        });

    // if(params.id !== null && params.id !== undefined){
    //     return Vue.http.post(URL.PLACEINFO_SAVEORUPDATE, params)
    //         .then((response) => commit("updatePlaceInfoSuccess", response.body))
    //         .catch(function (error) {console.log(error);});
    // }else{
    //     return Vue.http.post(URL.PLACEINFO_SAVEORUPDATE, params)
    //         .then((response) => commit("savePlaceInfoSuccess", response.body))
    //         .catch(function (error) {console.log(error);});
    // }
}



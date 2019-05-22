import Vue from 'vue'
import * as URL from './mutation-types'

export function queryApplyId ({ commit }, params) {

    return Vue.http.post(URL.APPLY_QUERYBYID,params)
        .then((response) => commit("queryApplyIdSuccess", response.body))
        .catch(function (error) {console.log(error);});

}

export function cleanCurrentApply ({ commit }, params) {
    return commit("cleanCurrentApplyByState", params);
}

export function queryApply ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERY,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function queryApplyException ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYEXCEPTION,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function queryApplyExceptionOfOrigin ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYEXCEPTIONOFORIGIN,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function queryApplyExceptionOfAway ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYEXCEPTIONOFAWAY,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function queryApplyExceptionOfVehicle ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYEXCEPTIONOFVEHICLE,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function queryApplyExceptionOfOther ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYEXCEPTIONOFOTHER,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function queryApplyOut ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYOUT,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}


export function queryApplyStatistics ({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYSTATISTICS,params)
            .then((response) => commit("queryApplySuccess", response.body))
.catch(function (error) {console.log(error);});
}

export function selectApplyStatistics({ commit }, params) {
    return Vue.http.post(URL.APPLY_SELECTSTATISTICS,params)
        .then((response) => commit("queryApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function applyStatistics({ commit }, params) {
    return Vue.http.post(URL.APPLY_STATISTICS,params)
        .then((response) => commit("queryApplyStatisticsSuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function applyStatisticsTotal({ commit }, params) {
    return Vue.http.post(URL.APPLY_STATISTICSTOTAL,params)
        .then((response) => commit("queryApplyStatisticsTotalSuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function applyStatisticsOfDayDetails({ commit }, params) {
    return Vue.http.post(URL.APPLY_STATISTICSOFDAYDETAILS,params)
        .then((response) => commit("queryApplyStatisticsOfDayDetailsSuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function applyStatisticsOfApplyDetails({ commit }, params) {
    return Vue.http.post(URL.APPLY_STATISTICSOFAPPLYDETAILS,params)
        .then((response) => commit("queryApplyStatisticsOfApplyDetailsSuccess", response.body))
        .catch(function (error) {console.log(error);});
}



// async findList ({dispatch, commit,rootState}, query) {

//     let _option = {
//       url:  SERVER_AT_URL+'/business/findList.do',
//       data: query,
//       userId:rootState.user.cmccSysId,
//       module:"richeninfo"
//     };


//     var res=await atforward(_option);

//     if(res.result==0){
//       return Promise.resolve(res);
//     }else{
//       return Promise.reject(res);
//     }
//   },


// 获取 "行程查询"=>"运输公司"的数据
export function applyQueryapplybycompany({ commit }, params) {
    var res = Vue.http.post(URL.APPLY_QUERYAPPLYBYCOMPANY,params)
            .then((response) => {
                console.log('applyQueryapplybycompany...............1',response)
                commit("applyQueryapplybycompanySuccess", response.body)
            })
            .catch(function (error) {console.log(error);});
        // console.log('res......获取 "行程查询"=>"运输公司"的数据', res)               //res是一个Promise对象
    return res;
}





export function applyQueryapplybyvillage({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYAPPLYBYVILLAGE,params)
        .then((response) => commit("applyQueryapplybyvillageSuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function applyQueryapplybytreatmentplant({ commit }, params) {
    return Vue.http.post(URL.APPLY_QUERYAPPLYBYTREATMENTPLANT,params)
        .then((response) => commit("applyQueryapplybytreatmentplantSuccess", response.body))
        .catch(function (error) {console.log(error);});
}



// 行程查询
export function findByApplyId ({ commit }, params) {
    // return commit("findApplyByState", params);
    return Vue.http.post(URL.APPLY_FINDBYID,params)
         .then((response) =>{
             return commit("findByApplyIdSuccess", response.body);
         })
         .catch((error)=>{
            console.log(error);
        });
}

export function saveOrUpdateApply ({ commit }, params) {
    if(params.id !== null && params.id !== undefined){
        return Vue.http.post(URL.APPLY_SAVEORUPDATE, params)
            .then((response) => commit("updateApplySuccess", response.body))
            .catch(function (error) {console.log(error);});
    }else{
        return Vue.http.post(URL.APPLY_SAVEORUPDATE, params)
            .then((response) => commit("saveApplySuccess", response.body))
            .catch(function (error) {console.log(error);});
    }
}

export function deleteApply ({ commit }, params) {
    return Vue.http.post(URL.APPLY_DELETE, params)
        .then((response) => commit("deleteApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}

export function batchDeleteApply ({ commit }, params) {
    return Vue.http.post(URL.APPLY_BATCHDELETE, params)
        .then((response) => commit("batchDeleteApplySuccess", response.body))
        .catch(function (error) {console.log(error);});
}
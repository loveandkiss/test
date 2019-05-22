import Vue from 'vue'


// import * as xxx from 'xxx'  会将 "xxx" 中所有 export 导出的内容组合成一个对象返回(或import * as obj from 'xx'  这种写法是把所有的输出包裹到obj对象里)
// 下面URL就是一个对象
import * as URL from './mutation-types';





// 分发action  提交mutation
// 登录
export function findUserByLoginNameAndPassWord ({ commit }, params) {
    // 请求后台(异步)
    return Vue.http.post(URL.USER_FINDUSERBYLOGINNAMEANDPASSWORD,params)
        .then((response) =>{
            commit("findUserByLoginNameAndPassWordSuccess", response.body);
        })
        .catch((error)=>{
            console.log(error);
        });
}



export function cleanCurrentUser ({ commit }, params) {
    return commit("cleanCurrentUserByState", params);
}



export function queryUser ({ commit }, params) {
    // 请求后台(异步)
    //  URL.USER_QUERY => http://117.131.65.22:8070/user/query
    // 在发送请求后，使用then方法来处理响应结果，then方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数。
    // 这段程序的then方法只提供了successCallback，而省略了errorCallback。
    // catch方法用于捕捉程序的异常，catch方法和errorCallback是不同的，errorCallback只在响应失败时调用，而catch则是在整个请求到响应过程中，只要程序出错了就会被调用。
    // 在then方法的回调函数内，你也可以直接使用this，this仍然是指向Vue实例的：
    return Vue.http.post(URL.USER_QUERY,params)
        .then((response) =>{    //then方法
            console.log("response",response);                        
            console.log("response.body",response.body);  
            // 把请求成功的数据渲染到页面上
            return commit("queryUserSuccess", response.body)        //提交mutation并传入载荷（payload=response.body）
        })
        .catch(function (error) {console.log(error);});         //catch方法
}

export function findByUserId ({ commit }, params) {
    return commit("findUserByState", params);
    // return Vue.http.post(URL.USER_FINDBYID,params)
    //      .then((response) => commit("findByUserIdSuccess", response.body))
    //      .catch(function (error) {console.log(error);});
}

export function saveOrUpdateUser ({ commit }, params) {
    if(params.id !== null && params.id !== undefined){
        return Vue.http.post(URL.USER_SAVEORUPDATE, params)
            .then((response) => commit("updateUserSuccess", response.body))
            .catch(function (error) {console.log(error);});
    }else{
        return Vue.http.post(URL.USER_SAVEORUPDATE, params)
            .then((response) => commit("saveUserSuccess", response.body))
            .catch(function (error) {console.log(error);});
    }
}

export function deleteUser ({ commit }, params) {

    return Vue.http.post(URL.USER_DELETE, params)
        .then((response) => commit("deleteUserSuccess", response.body))
        .catch(function (error) {console.log(error);});

}

export function batchDeleteUser ({ commit }, params) {
    return Vue.http.post(URL.USER_BATCHDELETE, params)
        .then((response) => commit("batchDeleteUserSuccess", response.body))
        .catch(function (error) {console.log(error);});
}
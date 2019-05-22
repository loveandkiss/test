import Vue from 'vue'

// vue 地图(引入vue-amap)
import VueAMap from 'vue-amap';
/*引入资源请求插件*/
/* 在vue项目使用vue-resource的过程中，临时增加了一个需求，需要在任何一个页面任何一次http请求，
增加对token过期的判断，如果token已过期，需要跳转至登录页面。如果要在每个页面中的http请求操作中添加一次判断，
那么会是一个非常大的修改工作量。那么vue-resource是否存在一个对于任何一次请求响应捕获的的公共回调函数呢？
答案是有的! 注意的是 vue 2.0后vue-resource不再更新，推荐使用ajax请求神器axios工具*/
import VueResource from 'vue-resource';

import App from './App.vue';
import  router from './router/index';
import store from './store';

import iview from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 运动和去除elelment的一些预设样式
import '../assets/css/animate.css';
import '../assets/css/index.scss';

import {locationStroageObj} from '../assets/js/util';
// 声明图片服务器地址
export const UPLOAD_URL = "http://180.169.20.145:8094/spring-uploader/"

//引入import axios from 'axios'
import axios from 'axios';
Vue.prototype.$axios = axios;

// 添加请求拦截器（在请求或响应被 then 或 catch 处理前拦截它们。）
axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    if(sessionStorage.token){
        config.headers['x-auth-token'] = sessionStorage.token;
    }
    return config
})



window.onload = function () {
    Vue.config.productionTip = false

    Vue.use(iview);

    Vue.use(ElementUI);
    Vue.use(VueAMap);

    /*使用VueResource插件*/
    Vue.use(VueResource);
    // 可以全局定义一个拦截器，用于预处理和后处理的请求
    Vue.http.interceptors.push((request, next)=>{
        if(sessionStorage.token){

            request.headers.set('x-auth-token',sessionStorage.token);
        }
        next((response) => {
            return response;
        })
    })


    // 初始化vue-amap
    VueAMap.initAMapApiLoader({
        // 高德key
        key: '6fbe55c2696465509cb458c444e7a74f',
        // 插件集合 （插件按需引入）
        plugin: [
            'Geocoder',
            'AMap.Autocomplete',    //输入提示插件
            'AMap.PlaceSearch',     //POI搜索插件
            'AMap.Scale',           //右下角缩略图比例尺
            'AMap.OverView',         //地图鹰眼插件
            'AMap.ToolBar',            //地图工具条
            'AMap.PolyEditor',           //编辑折现多边形
            'AMap.CircleEditor'     //圆形编辑器插件
        ],
        // 引入map ui报错bug暂未修复
        // uiVersion: '1.0.11',
    });

    // 使用router配置拦截(全局前置守卫)
   router.beforeEach((to, from, next) => {
        // 获取本地存储(临时存储)-----token
       let token =  locationStroageObj.get("userList");
    //    console.log('token',token)
       if (token === null || JSON.stringify(token) === "{}") { // 没有登录
            // 
           if (to.path !== '/login') {
               return next({ path: '/login' })
           } else {
               next()
           }

       }else {    //登录了
           if (to.path === '/login') {
               return next({path: '/applyStatistics'})
           }
           if (to.path === '/') {
               return next({path: '/applyStatistics'})
           }
        //确保要调用 next 方法，否则钩子就不会被 resolved。
           next()
       }
    })


    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })

}


// actions就是一个对象,里面有若干方法
import * as actions from './actions';
// getters就是一个对象
import * as getters from './getters'


// initial state
const initialState = {
    objs: [],           //表格数据
    total:0,            //数据的总条数
    licensePlatNumberList:[],  //车牌号列表

    current: {},
    
    user:{}
}



// mutations
const mutations = {
     // 
     everyDayTableDataList (state, body) {
        const code = body.code;
        if(code == "200"){      //ajax请求成功时，改变状态
            state.objs = body.data.records      //列表数据

            console.log('state.objs', state.objs)
            state.total = body.data.total;      //总条数

        }else if(code == "500"){        //ajax请求报500时，获取数据失败
            console.log("获取失败:"+body.msg);
        }
    },
    // 获取车牌
    getLicensePlatNumberList (state, body) {
        const code = body.code;
        if(code == "200"){      //ajax请求成功时，改变状态
            state.licensePlatNumberList = body.data      //列表数据
        }else if(code == "500"){        //ajax请求报500时，获取数据失败
            console.log("获取失败:"+body.msg);
        }
    },

    // 保存后刷新页面
    // savePlaceInfoSuccess (state, body) {
    //     const code = body.code;
    //     if(code == "200"){
    //         const data = body.data;
    //         state.objs.push(data);
    //         state.current = {};
    //     }else if(code == "500"){
    //         console.log("新增失败:"+body.msg);
    //     }
    // },
    
    // 编辑保存后刷新页面
    // updatePlaceInfoSuccess (state, body) {
    //     const code = body.code;
    //     if(code == "200"){
    //         const data = state.current;
    //         const index = state.objs.findIndex((p) => p.id === data.id);
    //         if (index !== -1) {
    //             state.objs.splice(index, 1, data)
    //         }
    //     }else if(code == "500"){
    //         console.log("更新失败:"+body.msg);
    //     }
    // },


}

export default {
// 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
// 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
//   namespaced: true,
  state: { ...initialState },
  actions,
  getters,
  mutations
}

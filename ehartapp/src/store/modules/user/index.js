// actions就是一个对象,里面有若干方法
import * as actions from './actions';
// getters就是一个对象
import * as getters from './getters'

// initial state
const initialState = {
    objs: [],           //表格数据
    current: {},
    total:0,            //数据的总条数 
    user:{}
}



// mutations
const mutations = {

    findUserByLoginNameAndPassWordSuccess (state, body) {
        const code = body.code;
        if(code == "200"){
            state.user = body.data
        }else if(code == "500"){
            console.log("获取失败:"+body.msg);
        }
    },

    cleanCurrentUserByState (state, body) {
        state.current = {};
    },

    // 
    queryUserSuccess (state, body) {
        const code = body.code;
        if(code == "200"){      //ajax请求成功时，改变状态
            state.objs = body.data.records      //
            state.total = body.data.total;      //总条数

        }else if(code == "500"){        //ajax请求报500时，获取数据失败
            console.log("获取失败:"+body.msg);
        }
    },

    findUserByState (state, data) {
        const record = state.objs.find(p => p.id === data.id);
        if (!record) {
            return null;
        } else {
            state.current = record;
            return record;
        }
    },

    findByUserIdSuccess (state, body) {
        const code = body.code;
        if(code == "200"){
            const data = body.data;
            state.current = data;
            state.objs.push(data);
            console.log("获取成功！");
        }else if(code == "500"){
            console.log("获取失败:"+body.msg);
        }
    },

    saveUserSuccess (state, body) {
        const code = body.code;
        if(code == "200"){
            const data = body.data;
            state.objs.push(data);
            state.current = {};
        }else if(code == "500"){
            if(body.msg === "loginNameIsExist"){
                state.objs.loginNameIsExist = "loginNameIsExist";
            }
            console.log("新增失败:"+body.msg);
        }
    },

    updateUserSuccess (state, body) {
        const code = body.code;
        if(code == "200"){
            const data = state.current;
            const index = state.objs.findIndex((p) => p.id === data.id);
            if (index !== -1) {
                state.objs.splice(index, 1, data)
            }
        }else if(code == "500"){
            if(body.msg === "loginNameIsExist"){
                state.objs.loginNameIsExist = "loginNameIsExist";
            }
            console.log("更新失败:"+body.msg);
        }
    },

    deleteUserSuccess(state, body) {
        const code = body.code;
        if(code == "200"){
            // const data = body.data;
            const data = state.current;
            state.objs = state.objs.filter(p => p.id !== data.id)
        }else if(code == "500"){
            console.log("删除失败:"+body.msg);
        }
    },

    batchDeleteUserSuccess(state, body) {
        const code = body.code;
        if(code == "200"){
            const data = body.data;
            for(var i = 0;i < data.length; i++) {
                state.objs = state.objs.filter(p => p.id !== data[i].id)
            }
        }else if(code == "500"){
            console.log("删除失败:"+body.msg);
        }
    }
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

// Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
// 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
 
//列表数据
export const tableData = state =>{
    return state.objs;
};
            
 //总条数
export const dataTotal = state =>{
    return state.total;
};
      
 //车牌号列表数据
export const licensePlatNumberList = state => {
    return state.licensePlatNumberList;
};      



// ------------------
// export const getCurrentUser = state => state.current;
// export const user = state => state.user;


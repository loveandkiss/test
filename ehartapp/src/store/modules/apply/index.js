// 行程查询模块
import * as actions from "./actions";
import * as getters from "./getters";


// initial state
const initialState = {
    
    objs: [],
    current: {},
    total: 0,
    idList: [],
    statisticsList: [],
    totalStatisticsList: [],
    statisticsOfDayDetailsList: [],
    statisticsOfApplyDetailsList: [],

    applyQueryapplybycompanyList: [],
    applyQueryapplybyvillageList: [],
    applyQueryapplybytreatmentplantList: [],

    statisticsTotalList: [],
    totalStatisTotalticsList: [],



}

// mutations
const mutations = {
    cleanCurrentApplyByState (state, body) {
        state.current = {};
    },
    queryApplyIdSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.idList = body.data.records
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    queryApplySuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.objs = body.data.records
            state.total = body.data.total;
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    queryApplyStatisticsSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.statisticsList = body.data.pageList;
            state.totalStatisticsList = body.data.totalInfo;

        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },


    queryApplyStatisticsTotalSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            debugger
            state.statisticsTotalList = body.data.pageList;
            state.totalStatisticsList = body.data.totalInfo;

        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    queryApplyStatisticsOfDayDetailsSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.statisticsOfDayDetailsList = body.data;
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    queryApplyStatisticsOfApplyDetailsSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.statisticsOfApplyDetailsList = body.data;
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    applyQueryapplybycompanySuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.applyQueryapplybycompanyList = body.data;
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    applyQueryapplybyvillageSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.applyQueryapplybyvillageList = body.data;
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },

    applyQueryapplybytreatmentplantSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            state.applyQueryapplybytreatmentplantList = body.data;
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },


    findApplyByState (state, data) {
        const record = state.objs.find(p => p.id === data.id);
        if (!record) {
            return null;
        } else {
            state.current = record;
            return record;
        }
    },
    findByApplyIdSuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            const data = body.data;
            state.current = data;
            console.log("获取成功！");
        } else if (code == "500") {
            console.log("获取失败:" + body.msg);
        }
    },
    saveApplySuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            const data = body.data;
            state.objs.push(data);
            state.current = {};
        } else if (code == "500") {
            console.log("新增失败:" + body.msg);
        }
    },
    updateApplySuccess (state, body) {
        const code = body.code;
        if (code == "200") {
            const data = state.current;
            const index = state.objs.findIndex((p) => p.id === data.id);
            if (index !== -1) {
                state.objs.splice(index, 1, data)
            }
        } else if (code == "500") {
            console.log("更新失败:" + body.msg);
        }
    },

    deleteApplySuccess(state, body) {
        const code = body.code;
        if (code == "200") {
            // const data = body.data;
            const data = state.current;
            state.objs = state.objs.filter(p => p.id !== data.id)
            state.total--;
        } else if (code == "500") {
            console.log("删除失败:" + body.msg);
        }
    },
    
    batchDeleteApplySuccess(state, body) {
        const code = body.code;
        if (code == "200") {
            const data = body.data;
            for (var i = 0; i < data.length; i++) {
                state.objs = state.objs.filter(p => p.id !== data[i].id)
                state.total--;
            }
        } else if (code == "500") {
            console.log("删除失败:" + body.msg);
        }
    }
}

export default {
    state: {...initialState},
    actions,
    getters,
    mutations
}

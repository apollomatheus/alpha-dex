const config = require('../config').config;
const TaskHandler = require('../utils').tasks;

const state = {
    tasks: require('../utils').tasks,
    tasks_results: [],
};

const mutations = {
    PushOrders(state,param) {
        if (param.taskid) {
            var i = 0;
            var witness = config.WITNESS_MIN;
            if (param.control.witness) {
                witness = param.control.witness;
            }
            if (state.tasks_results[param.taskid]) {
                state.tasks_results[param.taskid] = null;
            }

            var url_num = 0;
            var url_list = config.WITNESS_TRUSTED;
            //push network request to witness and get orders
            tasks.open('www', param.taskid, (NetHandler) => {
                NetHandler.do('get', url_list[url_num], {
                    ok() {
                        if (!state.tasks_results[param.taskid]) {
                            state.tasks_results[param.taskid] = [];
                        }
                        state.tasks_results[param.taskid].push(NetHandler._result);
                    },
                    error() {
                        console.log('Got error to witness.');
                    }
                });
                url_num++;
            },url_list.length-1);
        }
    },
    PutOrder(state,param) {
        if (param.amount && param.pair && param.valid) {

        }
    },

}

module.exports = {
    state,
    mutations,
}
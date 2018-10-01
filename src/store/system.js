const state = {
    page: '',
}

const mutations = {
    UpdatePage(state,params) {
        if (params.page) {
            state.page = params.page;
        }
    },
};

module.exports = {
    state,
    mutations,
}
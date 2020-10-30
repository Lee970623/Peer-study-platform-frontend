import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user:{
        SID:'',
        username:'',
    }
}

const getters = {
    getUser(state) {
        return state.user;
    }
}

const mutations = {
    updateUser(state, user){
        state.user = user;
    }
}

const actions = {
    async updateUserInfo(context, user){
        context.commit('updateUser',user)
    }
}
export default new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    }
)
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const state = {
    login:false
}
const actions = {
    checkLogin({commit,state},payload){
        commit("checkLogin",payload)
    }
}
const mutations = {
    checkLogin(state,payload){
        console.log(payload)
        state.login = payload;
    }
}
const getters = {
    login(state){
        return state.login;
    }
}
export default new Vuex.Store({
    actions,mutations,getters,state
})


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    editPopupVisible : false,
    editPosterData: {},
    breadcrumb: [],
    currentPosterId: 0,
    formForWhat: 'add',
    currentPosterComment: []
  },
  mutations: {
    login (state){
      state.isLogin = true;
    },
    logout (state){
      state.isLogin = false;
    },
    showEditPopup(state){
      state.editPopupVisible = true;
    },
    hideEditPopup(state){
      state.editPopupVisible = false;
    },
    editPosterDataChange(state, data){
      state.editPosterData = data;
    },
    setbreadcrumbroute(state, data){
      state.breadcrumb = data;
    },
    formForWhatChange(state, data){
      state.formForWhat = data;
    },
    changeCurrentPosterComment(state, data){
      state.currentPosterComment = data;
    },
    changeCurrentPosterId(state, data){
      state.currentPosterId = data;
    },
  }
})

export default store;

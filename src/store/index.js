import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import editor from './modules/editor';
// FIXME (cfy) 调试时使用
// import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    editor,
  },
  getters,
// plugins: [createLogger()],
});

// 设置全局Store previewPage.vue中使用
window._$store = store;

export default store;

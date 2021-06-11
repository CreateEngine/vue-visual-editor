import Vue from 'vue';
import { editorConfig } from '../../config/editorConfig';

const state = {
  unitType: [
    { value: 'px', label: 'px' },
    { value: 'vw', label: 'vw' },
  ],
  globalConfig: {
    style: {
      backgroundColor: '',
      backgroundImage: '',
    },
  },
  selectComponent: {},
  canvasComponentList: [],
  historyList: [],
  eventTypeList: [{
    label: '跳转链接',
    value: 'link',
  }],
};
const mutations = {
  SET_GLOBALCONFIG: (state, globalConfig) => {
    state.globalConfig = globalConfig;
  },
  SET_STYLECONFIG: (state, config) => {
    state.globalConfig.style = { ...state.globalConfig.style, ...config };
  },
  SET_FONTCONFIG: (state, config) => {
    state.globalConfig.style.font = { ...state.globalConfig.style.font, ...config };
  },
  SET_SELECTCOMPONENT: (state, component) => {
    state.selectComponent = component;
  },
  SET_COMPONENTLIST(state, list) {
    state.canvasComponentList = list;
  },
  DELETECOMPONENT(state, index) {
    if (state.canvasComponentList.length - 1 === index) {
      if (index === 0) {
        this.commit('editor/SET_SELECTCOMPONENT', {});
      } else {
        this.commit('editor/SET_SELECTCOMPONENT', {
          ...state.canvasComponentList[index - 1],
        });
      }
    } else {
      this.commit('editor/SET_SELECTCOMPONENT', {
        ...state.canvasComponentList[index + 1],
      });
    }
    this.commit('editor/ADDHISTORY');
    Vue.nextTick(() => {
      state.canvasComponentList.splice(index, 1);
    });
  },
  DELETECHILDRENCOMPONENT(state, index) {
    state.canvasComponentList.forEach(item => {
      item.options.columns.forEach(childItem => {
        childItem.children.forEach(childrenComponent => {
          if (childrenComponent.renderId === state.selectComponent.renderId) {
            Vue.nextTick(() => {
              childItem.children.splice(index, 1);
              this.commit('editor/SET_SELECTCOMPONENT', {
                ...state.canvasComponentList[index],
              });
              this.commit('editor/ADDHISTORY');
            });
          }
        })
      })
    })

  },
  MODIFYCOMPONENT(state, item) {
    const newItem = Object.assign({}, item);
    const tempItem = {};
    for (const key in newItem) {
      if (key !== 'index') {
        tempItem[key] = newItem[key];
      }
    }
    state.canvasComponentList[newItem.index] = tempItem;
    this.commit('editor/ADDHISTORY');
  },
  ADDHISTORY(state) {
    const selectComponentTemp = JSON.stringify(state.selectComponent);
    const canvasComponentListTemp = JSON.stringify(state.canvasComponentList);
    const historyItem = {
      selectComponent: selectComponentTemp,
      canvasComponentList: canvasComponentListTemp,
    };
    if (state.historyList.length === editorConfig.history.maxSteps) {
      state.historyList.shift();
    }
    state.historyList.push(historyItem);
  },
  USEHISTORY(state, index) {
    this.commit('editor/SET_COMPONENTLIST',
      JSON.parse(state.historyList[index].canvasComponentList)
    );
    this.commit('editor/SET_SELECTCOMPONENT',
      JSON.parse(state.historyList[index].selectComponent)
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

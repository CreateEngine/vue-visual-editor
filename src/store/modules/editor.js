import Vue from "vue";
import { editorConfig } from "../../config/editorConfig";

const state = {
  unitType: [
    { value: "px", label: "px" },
    { value: "vw", label: "vw" },
  ],
  globalConfig: {
    style: {
      backgroundColor: "",
      backgroundImage: "",
    },
  },
  selectComponent: {},
  canvasComponentList: [],
  historyList: [],
  eventTypeList: [
    {
      label: "跳转链接",
      value: "link",
    },
  ],
};
const mutations = {
  SET_GLOBALCONFIG: (state, globalConfig) => {
    state.globalConfig = globalConfig;
  },
  SET_STYLECONFIG: (state, config) => {
    state.globalConfig.style = { ...state.globalConfig.style, ...config };
  },
  SET_FONTCONFIG: (state, config) => {
    state.globalConfig.style.font = {
      ...state.globalConfig.style.font,
      ...config,
    };
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
        this.commit("editor/SET_SELECTCOMPONENT", {});
      } else {
        this.commit("editor/SET_SELECTCOMPONENT", {
          ...state.canvasComponentList[index - 1],
        });
      }
    } else {
      this.commit("editor/SET_SELECTCOMPONENT", {
        ...state.canvasComponentList[index + 1],
      });
    }
    this.commit("editor/ADDHISTORY");
    Vue.nextTick(() => {
      state.canvasComponentList.splice(index, 1);
    });
  },
  DELETECHILDRENCOMPONENT(state, { index, childComponent }) {
    Vue.nextTick(() => {
      childComponent.splice(index, 1);
      let selectComponent = {}
      if(state.historyList.length>1){
        selectComponent = state.historyList[state.historyList.length-2].selectComponent
      }
      this.commit('editor/SET_SELECTCOMPONENT', {
        ...JSON.parse(selectComponent),
      });
      this.commit("editor/ADDHISTORY");
    });
  },
  MODIFYCOMPONENT(state, selectComponent) {
    const currentRenderId = selectComponent.renderId;
    state.canvasComponentList.forEach((itemOuter,indexOuter) => {
      if (itemOuter.renderId === currentRenderId) {
        state.canvasComponentList[indexOuter]=selectComponent;
      }
      if (itemOuter.options && itemOuter.options.columns) {
        itemOuter.options.columns.forEach((itemInner,indexInner) => {
          itemInner.children.forEach((item,index) => {
            if (item.renderId === currentRenderId) {
              state.canvasComponentList[indexOuter].options.columns[indexInner].children[index]=selectComponent;
            }
          });
        });
      }
    });
    this.commit('editor/SET_SELECTCOMPONENT',selectComponent);
    this.commit("editor/ADDHISTORY");
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
    this.commit(
      "editor/SET_COMPONENTLIST",
      JSON.parse(state.historyList[index].canvasComponentList)
    );
    this.commit(
      "editor/SET_SELECTCOMPONENT",
      JSON.parse(state.historyList[index].selectComponent)
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

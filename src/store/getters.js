const getters = {
  globalConfig: state => state.editor.globalConfig,
  unitType: state => state.editor.unitType,
  selectComponent: state => state.editor.selectComponent,
  canvasComponentList: state => state.editor.canvasComponentList,
  historyList: state => state.editor.historyList,
  eventTypeList: state => state.editor.eventTypeList,
};
export default getters;

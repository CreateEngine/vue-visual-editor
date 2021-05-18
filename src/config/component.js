export const category = {
  businessComponent: "业务组件",
};

// 组件JSON数据结构

// 以下结构是返回生成的JSON数据
// {
// "category": "businessComponent" ,    //  类型：String, 组件所属分类，如businessComponent代表业务组件
// "name": "Notices",                   //  类型：String, 组件名称，如Notices
// "renderId": "Notices-1620807374976"  //  类型：String, 渲染到画布上的组件id，组件名称+生成渲染到画布上的时间戳
// "options": {                         //  类型: JSON, 组件渲染配置项
//   datas:[]                           //  类型：Array, 组件渲染数据
// },
// }

// 以下结构是生成组件所需生成的JSON数据
// {
// "icon": 'icondemo',                  //  类型：String, 组件小图标，如icondemo
// "name": "Notices",                   //  类型：String, 组件名称，如Notices
// "options": {                         //  类型: JSON, 组件渲染配置项
//   datas:[]                           //  类型：Array, 组件渲染数据
// },
// }
export const businessComponent = [
  {
    icon: "iconliebiao",
    name: "ADatePicker",
    options: {
      datas: [],
    },
  },
  {
    icon: "iconliebiao",
    name: "APagination",
    options: {
      datas: [],
    },
  },
];

export const componentNameMap = {
  ADatePicker:'日历',
  APagination:'分页'
};

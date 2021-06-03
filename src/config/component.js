

export const category = {
  'basicComponent': '基础组件',
  'functionalComponent': '功能组件',
  'businessComponent': '业务组件',
  'layoutComponent': '布局组件'
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
export const businessComponent = [{
  'icon': 'iconlunbo',
  'name': 'Banner',
  'options': {
    'datas': [],
  },
}, {
  'icon': 'icongonggao',
  'name': 'Announcement',
  'options': {
    'datas': [],
  },
}, {
  'icon': 'iconcaidan',
  'name': 'FunctionMenu',
  'options': {
    'datas': [],
  },
}, {
  'icon': 'iconliebiao',
  'name': 'TabList',
  'options': {
    'datas': [],
  },
}];

export const functionalComponent = [
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

export const basicComponent = [
  {
    icon: 'iconwenzi',
    name: 'MText',
    options: {
      datas: '这是一段文字',
      commonStyle: {
        unit: 'px',
        lineHeight: '1.4',
        color: '#000000',
        textAlign: 'center',
      },
    },
  },
  {
    icon: 'icontupian',
    name: 'MImage',
    options: {
      // FIXME（sf）默认图片 暂时放在服务器上
      datas: 'https://appjavatest.linkdood.cn:10669/mqt-manager-center/api/static-files/upload/demo.png',
      commonStyle: {
        unit: 'px',
      },
    },
  },
  {
    icon: 'iconanniu',
    name: 'MButton',
    options: {
      datas: '按钮',
      commonStyle: {
        unit: 'px',
        width: '140',
        height: '40',
        backgroundColor: '#ffffff',
        lineHeight: '4',
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: '#333333',
        borderRadius: '5',
        fontSize: '14',
        color: '#000000',
        textAlign: 'center',
      },
    },
  },
  {
    icon: 'iconfengexian',
    name: 'MDivider',
    options: {
      datas: '',
      commonStyle: {
        unit: 'px',
        width: '',
        height: '1',
        marginTop: '5',
        marginBottom: '5',
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: '#333333',
      },
    },
  },
  {
    icon: 'iconlunbo',
    name: 'MSlider',
    options: {
      // FIXME（sf）默认图片 暂时放在服务器上
      datas: [{ url: 'https://appjavatest.linkdood.cn:10669/mqt-manager-center/api/static-files/upload/demo.png', link: '' }],
      commonStyle: {
        unit: 'px',
        color: '#000000',
      },
    },
  },
];

export const layoutComponent = [
  {
    icon: "iconliebiao",
    name: "LGrid",
    options: {
      datas: [],
      gutter:0,
      columns:1,
    },
  },
];

export const componentNameMap = {
  MText: '文字',
  MImage: '图片',
  MButton: '按钮',
  MDivider: '分割线',
  MSlider: '图片轮播',
  ADatePicker: '日历',
  APagination: '分页',
  Banner: '轮播',
  Announcement: '公告',
  FunctionMenu: '动态菜单组',
  TabList: '帖子列表',
  LGrid: '栅格布局'
};

页面生成器使用说明
=================

需要安装的依赖
-------------
`管理端模板项目相关环境`
`npm install --save html2canvas@1.0.0-rc.7`
`npm install --save vuedraggable@2.24.3`

**iconfont**字体库
-----------------
[如何使用iconfont来引用fontClass图标](https://blog.csdn.net/weixin_43630802/article/details/103663758)

文件说明
-----------
```
.
|—— index.vue                               // 主入口文件
|—— readMe.md                               // 说明文件
|—— components                              // 组件封装文件夹
|   |── CanvasPanel                         // 画布面板
|   |   |── index.vue                       // 画布面板入口文件
|   |   |── images                          // 图片文件夹
|   |   |── PreviewPage.vue                 // 预览组件
|   |   |── RenderList.vue                  // 渲染组件列表
|   |   |── RenderItem                      // 渲染单个组件
|   |   |   |── index                       // 可渲染单个组件入口文件
|   |   |   |── lists                       // 可渲染组件列表文件夹
|   |   |   |── index.vue                   // 可渲染组件列表入口文件
|   |   |   |   |── business                // 业务组件列表
|   |   |   |   └── images                  // 组件引用的图片资源
|   |── ComponentPanel                      // 组件面板
|   |   |── index.vue                       // 组件面板入口文件
|   |   └── CategoryWidget.vue              // 组件列表
|   |── ConfigPanel                         // 配置面板
|   |   └── index.vue                       // 配置面板入口文件
|   |── Layout                              // 布局组件
|   |   |── EditorHeader.vue                // 头部组件
|   |   |── EditorContent.vue               // 内容组件
|   |   └── Tool.vue                        // 工具组件
|   └── Setting                             // 设置组件
|   |   └── index.vue                       // 设置组件入口文件
|   └── utils                               // 实用工具方法
|   |   └── index.js                        // 实用工具方法入口文件
|—— config                                  // 配置文件夹
|   |   └── component.js                    // 组件配置文件
|   |   └── editorConfig.js                 // 编辑器配置文件
|   |   └── global.js                       // 全局配置入口文件
|—— iconfont                                // iconfont字体库

```
## Notes

### 基础设置

-----Router@6 React18

1. 安装依赖，设置路由
2. 拆分组件，设置单独文件夹，
   components：与页面相关组件
   context：全局 contextAPi -->将 contextApi 拆分设置个独立的 contextApi
   pages：Router 页面
   reducer：dispatch(变量)独立文件，reducer 文件拆分独立使用
   utils：可重用组件
   testing：测试
3. 整体使用 ReactRouter Link 未使用 NavLink，
   重定向使用 navigate()
   共享页面，未使用 reactroute6
4. 注：
   css：
   整体使用依赖：styled-components（解耦 CSS）用变量设置 css，增加 css 独立性，在页面直接设置 css，增加 css 可维护性

### ShearLayOut

设置 productscontextApi 文件，使用 usereducer 控制按钮，在 dispatch 添加变量引入 productscontextAPi(**每次使用自行添加**)
设置 button toggle 的相关函数以及 dispatch

1. Navbar
   nav 栏 link 设置为独立文件，增加后续维护性，惊醒 links 的增删改
   解构出 drilling 的 toggle 函数，添加至按钮事件，依据 boolean 变量进行 sidebar 的显示。
   可用：display || visibility || opacity || transforms 等 css 设置
2. Sidebar
   逻辑同上

### ErrorPage

className->page-100 -->index.css 文件
link -> "/"->返回主页
# pangpang-studyrepository

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:09:37
 * @LastEditTime: 2023-02-10 18:36:58
 * @LastEditors: 最爱白菜吖
 * @FilePath: /electron-nest-admin/view/main.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import pinia from './store';
import Auth from './directives/auth';
const app = createApp(App);
// 自定义认证
app.directive('auth', Auth);
// 自定义图标
app.use(pinia).use(Antd).use(router).mount('#app');

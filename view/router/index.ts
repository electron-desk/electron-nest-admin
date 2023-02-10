/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:33:42
 * @LastEditTime: 2023-02-10 18:36:13
 * @LastEditors: 最爱白菜吖
 * @FilePath: /electron-nest-admin/view/router/index.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const AppLayout = () => import('../components/AppLayout.vue');
const Login = () => import('../pages/login/index.vue');
import useAdminStore from '../store/admin';
const router = createRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
  ],
  history: createWebHashHistory(),
});
const pages = import.meta.glob('../pages/**/*.vue');
const viewMap = new Map();
for (const index in pages) {
  const path = index.replace('../pages', '').replace('.vue', '');
  viewMap.set(path, pages[index]);
}
function generatePermissionTree(
  permissions: Permission[],
  parentId = 0,
): RouteRecordRaw[] {
  const tmp: RouteRecordRaw[] = [];
  for (const p of permissions) {
    if (p.parentId === parentId) {
      const r: RouteRecordRaw = {
        name: p.uniqueKey,
        component:
          p.component === 'AppLayout' ? AppLayout : viewMap.get(p.component),
        path: p.path,
        meta: {
          title: p.name,
        },
        children: [],
      } as RouteRecordRaw;
      if (p.redirect) {
        r.redirect = p.redirect;
      }
      r.children = generatePermissionTree(permissions, p.id);
      tmp.push(r);
    }
  }
  return tmp;
}
router.beforeEach(async (to, from, next) => {
  const adminStore = useAdminStore();
  const token = localStorage.getItem('token');
  if (!token) {
    router.getRoutes().forEach((r) => {
      router.removeRoute(r.name as string);
    });
    adminStore.$reset();
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login', replace: true });
    }
  } else {
    // 如果已经初始化了权限，这就直接执行，【防止重复初始化造成的循环重定向】
    if (adminStore.permissionList.length > 0) {
      next();
    } else {
      try {
        await adminStore.getAdminInfo();
        for (const r of generatePermissionTree(
          adminStore.permissionList.filter((p) => p.path !== null),
        )) {
          router.addRoute(r);
        }
        next({ ...to, replace: true });
      } catch (error) {
        // 防止token错误或者超时
        localStorage.clear();
        next({ path: '/login' });
      }
    }
  }
});
router.afterEach((to) => {
	document.title = to.meta.title as unknown as string;
});
export default router;

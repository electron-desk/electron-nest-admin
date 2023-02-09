import { defineStore } from "pinia";
import { getCurrentAdmin } from "../api/admin";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-17 01:05:17
 * @LastEditTime: 2022-08-27 01:12:45
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\store\admin.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
interface State {
	admin: Admin;
	permissionList: Permission[];
}
const defaultState = {
	admin: { username: "", id: 0, roleId: 0, password: "", email: "" },
	permissionList: [],
};
const useAdminStore = defineStore("admin", {
	state: (): State => ({
		admin: defaultState.admin,
		permissionList: defaultState.permissionList,
	}),
	actions: {
		async getAdminInfo() {
			const res = await getCurrentAdmin();
			this.admin = res.data.admin;
			this.permissionList = res.data.permissionList;
		},
		logout() {
			this.admin = defaultState.admin;
			this.permissionList = defaultState.permissionList;
		},
	},
});
export default useAdminStore;

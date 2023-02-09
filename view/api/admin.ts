import request from "../utils/request";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-17 01:11:03
 * @LastEditTime: 2022-08-20 23:39:40
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\api\admin.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export function getCurrentAdmin() {
	return request.get<
		any,
		ResponseSuccess<{ admin: Admin; permissionList: Permission[] }>
	>("/admin/admin/admin/current");
}
export function getAdminList(current = 1, pageSize = 15) {
	return request.get<any, IPagination<Admin>>("/admin/admin", {
		params: {
			current,
			pageSize,
		},
	});
}
export function deleteAdminById(id: number) {
	return request.delete<any, ResponseSuccess<Admin>>("/admin/admin/" + id);
}
export function addAdmin(admin: Omit<Admin, "id">) {
	return request.post<any, ResponseSuccess>("/admin/admin", admin);
}
export function updateAdmin(id: number, admin: Admin) {
	return request.patch<any, ResponseSuccess>("/admin/admin/" + id, admin);
}

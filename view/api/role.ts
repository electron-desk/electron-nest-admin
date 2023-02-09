import request from "../utils/request";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 14:39:28
 * @LastEditTime: 2022-08-16 22:16:02
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\api\role.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export function getRoleListByPage(current: number = 1, pageSize: number = 15) {
	return request.get<any, IPagination<Role>>("/admin/role", {
		params: { current, pageSize },
	});
}
export function deleteRole(id: number) {
	return request.delete<any, ResponseSuccess>(`/admin/role/${id}`);
}
export function addRole(role: { name: string; permissionList: number[] }) {
	return request.post<any, ResponseSuccess>("/admin/role", role);
}
export function updateRole(
	id: number,
	role: { name: string; permissionList: number[] }
) {
	return request.patch<any, ResponseSuccess>("/admin/role/" + id, role);
}
export function getPermissionList() {
	return request.get<any, ResponseSuccess<Permission[]>>(
		"/admin/role/permission/list"
	);
}

import request from "../utils/request";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-28 16:25:29
 * @LastEditTime: 2022-08-29 14:00:16
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\api\permission.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export function updatePermission(id: number, permission: Permission) {
	return request.patch<any, ResponseSuccess>(
		"/admin/permission/" + id,
		permission
	);
}

export function doAddPermission(permission: Permission) {
	return request.post<any, ResponseSuccess>("/admin/permission", permission);
}
export function deletePermissionById(id: number) {
	return request.delete<any, ResponseSuccess>("/admin/permission/" + id);
}

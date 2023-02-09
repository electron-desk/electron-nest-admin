import request from "../utils/request";

/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-19 17:52:26
 * @LastEditTime: 2022-08-29 23:02:20
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \vue3-admin\src\api\user.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
export function getUserList(
	current: number = 1,
	pageSize: number = 15,
	keyword = {}
) {
	return request.get<any, IPagination<User>>("/admin/user", {
		params: { current, pageSize, ...keyword },
	});
}
export function deleteUserById(id: number) {
	return request.delete<any, ResponseSuccess>("/admin/user/" + id);
}
export function doAddUser(user: Omit<User, "id">) {
	return request.post<any, ResponseSuccess>("/admin/user", user);
}
export function updateUser(id: number, user: User) {
	return request.patch<any, ResponseSuccess>("/admin/user/" + id, user);
}

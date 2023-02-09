/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-19 17:23:10
 * @LastEditTime: 2022-08-29 22:15:47
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \vue3-admin\src\api\login.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import request from "../utils/request";
export function doLogin(user: User) {
	return request.post<any, ResponseSuccess<{ token: string }>>(
		"/admin/admin/login",
		user
	);
}
export function captcha() {
	return request.get<
		any,
		ResponseSuccess<{ cacheKey: string; captcha: string }>
	>("/admin/admin/login/captcha?v=" + new Date().getMilliseconds());
}

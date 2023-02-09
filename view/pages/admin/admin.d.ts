/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-17 01:12:18
 * @LastEditTime: 2022-08-20 22:07:58
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\admin\admin.d.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
declare interface Admin {
	id: number;
	roleId: number | null;
	username: string;
	password: string;
	email: string;
}

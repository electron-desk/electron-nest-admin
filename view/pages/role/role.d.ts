/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 14:41:14
 * @LastEditTime: 2022-08-16 22:34:34
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\role\role.d.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
declare interface Role {
	id: number;
	name: string;
	permissionList: Permission[];
}

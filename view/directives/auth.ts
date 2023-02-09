import { onUpdated } from "vue";
/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-23 14:39:06
 * @LastEditTime: 2022-08-25 15:21:29
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\directives\auth.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { DirectiveBinding } from "vue";
import useAdminStore from "../store/admin";
export default {
	mounted(el: Element, binding: DirectiveBinding<any>) {
		const value = binding.value;
		const useAdmin = useAdminStore();
		const res = useAdmin.permissionList.some(
			(p) => p.uniqueKey === binding.value
		);
		if (!value) {
			return;
		}
		if (!res) {
			// 这样操作之后不会重新出来
			// el.parentNode?.removeChild(el);
			(el as HTMLElement).style.display = "none";
		}
	},
	updated(el: Element, binding: DirectiveBinding<any>) {
		const value = binding.value;
		if (!value) {
			return;
		}
		const useAdmin = useAdminStore();
		const res = useAdmin.permissionList.some(
			(p) => p.uniqueKey === binding.value
		);
		if (!res) {
			(el as HTMLElement).style.display = "none";
		} else {
			(el as HTMLElement).style.display = "block";
		}
	},
};

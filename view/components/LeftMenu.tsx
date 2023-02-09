import { defineComponent, h, resolveComponent, toRaw } from "vue";
import useAdminStore from "../store/admin";
import MyIcon from "./MyIcon";
/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-26 07:29:04
 * @LastEditTime: 2022-08-28 23:25:25
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\components\LeftMenu.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */

export default defineComponent({
	setup() {
		const adminStore = useAdminStore();
		function generatePermissionTree(
			permissions: Permission[],
			parentId = 0
		) {
			const tmp = [];
			for (let p of permissions) {
				if (p.parentId === parentId) {
					p.children = generatePermissionTree(permissions, p.id);
					tmp.push(p);
				}
			}
			return tmp;
		}
		// 为了防止响应式的重复渲染 toRaw 解除adminStore.permissionList响应追踪
		const res = generatePermissionTree(
			toRaw(adminStore.permissionList).filter((p) => p.path !== null)
		).map((p) => {
			if (p.children!.length > 0 && p.path !== "/") {
				return (
					<a-sub-menu
						key={p.path}
						v-slots={{
							title: () => (
								<span>
									{p?.icon && <MyIcon icon={p?.icon} />}
									<span>{p.name}</span>
								</span>
							),
						}}
					>
						{p.children?.map((p2) => (
							<a-menu-item key={p2.path}>
								{p2?.icon && <MyIcon icon={p2?.icon} />}{" "}
								<span>
									<router-link to={p2.path}>
										{p2.name}
									</router-link>
								</span>
							</a-menu-item>
						))}
					</a-sub-menu>
				);
			}
			return (
				<a-menu-item key={p.path}>
					{p?.icon && <MyIcon icon={p?.icon} />}{" "}
					<span>
						<router-link to={p.path}>{p.name}</router-link>
					</span>
				</a-menu-item>
			);
		});
		return () => <>{res}</>;
	},
});

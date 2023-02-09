import { message } from "ant-design-vue";
import { defineComponent, PropType } from "vue";
import { deletePermissionById } from "../../../api/permission";
import useAdminStore from "../../../store/admin";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-26 07:24:22
 * @LastEditTime: 2022-08-29 14:11:50
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\permission\components\DeletePermission.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export default defineComponent({
	props: {
		permission: {
			type: Object as PropType<Permission>,
			required: true,
		},
	},
	setup({ permission }) {
		const adminStore = useAdminStore();
		function deletePermission() {
			deletePermissionById(permission.id).then((res) => {
				if (res.success) {
					adminStore.permissionList =
						adminStore.permissionList.filter(
							(p) => p.id !== permission.id
						);
					message.success("删除成功");
				} else {
					message.error(res.errorMessage);
				}
			});
		}
		return () => (
			<a-popconfirm title="删除权限" onConfirm={deletePermission}>
				<a-button type="primary" danger>
					删除
				</a-button>
			</a-popconfirm>
		);
	},
});

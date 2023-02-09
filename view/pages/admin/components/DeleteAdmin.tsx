import { message } from "ant-design-vue";
import { defineComponent, PropType } from "vue";
import { deleteAdminById } from "../../../api/admin";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-20 15:52:50
 * @LastEditTime: 2022-08-20 17:01:21
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\admin\components\DeleteAdmin.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export default defineComponent({
	props: {
		admin: {
			type: Object as PropType<Admin>,
			required: true,
		},
	},
	emits: {
		deleteAdmin: (id: number) => true,
	},
	setup({ admin }, { emit }) {
		function deleteAdmin() {
			deleteAdminById(admin.id).then((res) => {
				if (res.success) {
					emit("deleteAdmin", admin.id);
					message.success("删除成功");
				} else {
					message.error(res.errorMessage);
				}
			});
		}
		return () => (
			<a-popconfirm title="删除管理员" onConfirm={deleteAdmin}>
				<a-button type="primary" danger>
					删除
				</a-button>
			</a-popconfirm>
		);
	},
});

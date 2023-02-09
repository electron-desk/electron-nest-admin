/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-20 23:27:53
 * @LastEditTime: 2022-08-20 23:48:06
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\admin\components\EditAdmin.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { message } from "ant-design-vue";
import {
	defineComponent,
	ref,
	reactive,
	onUpdated,
	PropType,
	toRaw,
} from "vue";
import { updateAdmin } from "../../../api/admin";
import { getRoleListByPage } from "../../../api/role";

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		admin: {
			type: Object as PropType<Admin>,
			required: true,
		},
	},
	emits: {
		cancel: (refresh?: Boolean) => true,
	},
	setup(props, { emit }) {
		const roleList = ref<Role[]>([]);
		const formRef = ref();
		const formState = reactive<Admin>({
			id: 0,
			roleId: null,
			username: "",
			password: "",
			email: "",
		});
		function ok() {
			formRef.value
				.validate()
				.then(() => {
					updateAdmin(formState.id, formState).then((res) => {
						if (res.success) {
							message.success("添加成功");
							emit("cancel", true);
						} else {
							message.error(res.errorMessage);
						}
					});
				})
				.cache((e: any) => {
					console.log(e);
				});
		}
		function cancel() {
			emit("cancel");
		}
		onUpdated(() => {
			if (props.visible) {
				formState.username = props.admin.username;
				formState.email = props.admin.email;
				formState.id = props.admin.id;
				formState.roleId = props.admin.roleId;
				getRoleListByPage().then((res) => {
					roleList.value = res.data.list;
				});
			} else {
				formRef.value.resetFields();
			}
		});
		return () => (
			<a-modal
				visible={props.visible}
				title="添加管理员"
				onCancel={cancel}
				onOk={ok}
			>
				<a-form
					model={formState}
					ref={formRef}
					label-col={{
						span: 5,
					}}
					wrapper-col={{ span: 16 }}
				>
					<a-form-item
						hidden
						label="id"
						name="id"
						rules={[{ required: true, message: "id不可以为空" }]}
					>
						<a-input v-model:value={formState.id} />
					</a-form-item>
					<a-form-item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: "用户名不可以为空" },
						]}
					>
						<a-input v-model:value={formState.username} />
					</a-form-item>
					<a-form-item label="密码" name="password">
						<a-input v-model:value={formState.password} />
					</a-form-item>
					<a-form-item
						label="邮箱"
						name="email"
						rules={[{ required: true, message: "邮箱不可以为空" }]}
					>
						<a-input v-model:value={formState.email} />
					</a-form-item>
					<a-form-item
						label="角色"
						name="roleId"
						rules={[{ required: true, message: "角色不可以为空" }]}
					>
						<a-select v-model:value={formState.roleId}>
							<a-select-option value={null}>
								请选择
							</a-select-option>
							{roleList.value.map((role) => (
								<a-select-option value={role.id}>
									{role.name}
								</a-select-option>
							))}
						</a-select>
					</a-form-item>
				</a-form>
			</a-modal>
		);
	},
});

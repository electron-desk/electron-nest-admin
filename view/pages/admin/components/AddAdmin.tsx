import { message } from "ant-design-vue";
import { defineComponent, ref, reactive, onUpdated } from "vue";
import { addAdmin } from "../../../api/admin";
import { getRoleListByPage } from "../../../api/role";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-20 17:30:39
 * @LastEditTime: 2022-08-20 22:18:25
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\admin\components\AddAdmin.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export default defineComponent({
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
	},
	emits: {
		cancel: (refresh?: Boolean) => true,
	},
	setup(props, { emit }) {
		const roleList = ref<Role[]>([]);
		const formRef = ref();
		const formState = reactive<Omit<Admin, "id">>({
			roleId: null,
			username: "",
			password: "",
			email: "",
		});
		function ok() {
			formRef.value
				.validate()
				.then(() => {
					console.log(formState);
					addAdmin(formState).then((res) => {
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
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: "用户名不可以为空" },
						]}
					>
						<a-input v-model:value={formState.username} />
					</a-form-item>
					<a-form-item
						label="密码"
						name="password"
						rules={[{ required: true, message: "密码不可以为空" }]}
					>
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

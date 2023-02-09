import {
	defineComponent,
	onUpdated,
	PropType,
	reactive,
	ref,
	toRaw,
} from "vue";
import MyIcon from "../../../components/MyIcon";
import * as antIcons from "@ant-design/icons-vue";
import { updatePermission } from "../../../api/permission";
import { message } from "ant-design-vue";
import useAdminStore from "../../../store/admin";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-26 07:01:26
 * @LastEditTime: 2022-08-29 14:33:55
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\permission\components\EditPermission.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export default defineComponent({
	props: {
		visible: Boolean,
		permission: {
			type: Object as PropType<Permission>,
			required: true,
		},
	},
	emits: {
		cancel: (refresh?: boolean) => true,
	},
	setup(props, { emit }) {
		const adminStore = useAdminStore();

		function cancel() {
			emit("cancel");
		}
		function savePermission() {
			formRef.value.validate().then(() => {
				updatePermission(formState.id, formState).then((res) => {
					if (res.success) {
						emit("cancel", true);
						adminStore.permissionList =
							adminStore.permissionList.map((p) => {
								if (p.id === props.permission.id) {
									Object.assign(p, toRaw(formState));
								}
								return p;
							});
						message.success("更新成功");
					} else {
						message.error(res.errorMessage);
					}
				});
			});
		}
		function generatePermissionTree(
			permissions: Permission[],
			parentId = 0
		): Permission[] {
			const tmp: Permission[] = [];
			for (let p of permissions) {
				if (p.parentId === parentId) {
					p.children = generatePermissionTree(permissions, p.id);
					if (p.children.length === 0) {
						delete p.children;
					}
					tmp.push(p);
				}
			}
			return tmp;
		}
		const formRef = ref();
		const formState = reactive<Permission>({} as Permission);
		// 为了防止响应式的重复渲染 toRaw 解除adminStore.permissionList响应追踪
		const treeData = [{ id: 0, name: "顶级权限" }].concat(
			generatePermissionTree(toRaw(adminStore.permissionList))
		);
		onUpdated(() => {
			if (props.visible) {
				Object.assign(formState, props.permission);
			}
		});
		return () => (
			<a-drawer
				size={"large"}
				onClose={cancel}
				title="编辑权限"
				visible={props.visible}
				v-slots={{
					extra: () => (
						<a-space>
							<a-button onClick={cancel}>取消</a-button>
							<a-button type="primary" onClick={savePermission}>
								更新
							</a-button>
						</a-space>
					),
				}}
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
						label="权限"
						name="name"
						rules={[
							{ required: true, message: "权限名不可以为空" },
						]}
					>
						<a-input v-model:value={formState.name} />
					</a-form-item>
					<a-form-item label="路径" name="path">
						<a-input v-model:value={formState.path} />
					</a-form-item>
					<a-form-item label="父级权限" name="parentId">
						<a-tree-select
							field-names={{
								children: "children",
								label: "name",
								value: "id",
							}}
							v-model:value={formState.parentId}
							show-search
							style="width: 100%"
							placeholder="请选择权限"
							allow-clear
							tree-default-expand-all
							tree-data={treeData}
						></a-tree-select>
					</a-form-item>
					<a-form-item label="图标" name="icon">
						<a-select v-model:value={formState.icon} show-search>
							{Object.keys(antIcons)
								.slice(0, -4)
								.map((icon) => (
									<a-select-option
										key={icon}
										value={icon}
										label={icon}
									>
										<MyIcon icon={icon} />
										&nbsp;&nbsp;{icon}
									</a-select-option>
								))}
						</a-select>
					</a-form-item>
					<a-form-item label="组件路径" name="component">
						<a-input v-model:value={formState.component} />
					</a-form-item>
					<a-form-item label="重定向" name="redirect">
						<a-input v-model:value={formState.redirect} />
					</a-form-item>
					<a-form-item
						label="唯一标识"
						name="uniqueKey"
						rules={[
							{
								required: true,
								message: "唯一标示不可以为空",
							},
						]}
					>
						<a-input v-model:value={formState.uniqueKey} />
					</a-form-item>
				</a-form>
			</a-drawer>
		);
	},
});

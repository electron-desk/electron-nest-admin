<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-25 22:38:12
 * @LastEditTime: 2022-08-29 14:31:34
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\permission\index.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<script setup lang="ts">
import { computed, ref, toRaw } from "vue";
import useAdminStore from "../../store/admin";
import EditPermission from "./components/EditPermission";
import DeletePermission from "./components/DeletePermission";
import AddPermission from "./components/AddPermission";
import MyIcon from "../../components/MyIcon";
const adminStore = useAdminStore();
const isShowEdit = ref(false);
const isShowAdd = ref(false);
const current = ref<Permission>({} as Permission);
function showEdit(permission: Permission) {
	isShowEdit.value = true;
	current.value = permission;
}
function cancelEdit(refresh?: boolean) {
	if (refresh) {
	}
	isShowEdit.value = false;
}
function cancelAdd(refresh?: boolean) {
	if (refresh) {
	}
	isShowAdd.value = false;
}
const columns = [
	{
		title: "权限",
		dataIndex: "name",
		key: "name",
		fixed: "left",
	},
	{
		title: "路径",
		dataIndex: "path",
		key: "path",
	},
	{
		title: "图标",
		dataIndex: "icon",
		key: "icon",
	},
	{
		title: "组件路径",
		dataIndex: "component",
		key: "component",
	},
	{
		title: "重定向",
		dataIndex: "redirect",
		key: "redirect",
	},
	{
		title: "唯一标识",
		dataIndex: "uniqueKey",
		key: "uniqueKey",
	},
	{
		title: "管理",
		key: "action",
		fixed: "right",
	},
];
function generatePermissionTree(
	permissions: Permission[],
	parentId = 0
): Permission[] {
	const tmp: Permission[] = [];
	for (let p of permissions) {
		if (p.parentId === parentId) {
			// @ts-ignore
			p.key = p.id + "";
			p.children = generatePermissionTree(permissions, p.id);
			if (p.children.length === 0) {
				delete p.children;
			}
			tmp.push(p);
		}
	}
	return tmp;
}
function showAddModal() {
	isShowAdd.value = true;
}
const treeData = computed(() => {
	return generatePermissionTree(toRaw(adminStore.permissionList));
});
</script>
<template>
	<a-button type="primary" @click="showAddModal">新增</a-button>
	<AddPermission :visible="isShowAdd" @cancel="cancelAdd" />
	<EditPermission
		:permission="current"
		:visible="isShowEdit"
		@cancel="cancelEdit"
	/>
	<a-table
		:scroll="{ x: 1300 }"
		:defaultExpandAllRows="true"
		rowKey="id"
		:columns="columns"
		:data-source="treeData"
	>
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'icon'">
				<MyIcon :icon="record.icon" />
			</template>
			<template v-if="column.key === 'action'">
				<a-space>
					<a-button type="primary" @click="showEdit(record)">
						编辑
					</a-button>
					<DeletePermission :permission="record" />
				</a-space>
			</template>
		</template>
	</a-table>
</template>

<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 13:57:57
 * @LastEditTime: 2022-08-27 13:58:21
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\role\index.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-button type="primary" @click="showAdd">新增</a-button>
	<AddRole ref="addRef" />
	<EditRole ref="editRef" :role="current" @updateRole="updateRole" />
	<a-table
		:columns="columns"
		:data-source="tableData.list"
		:pagination="{
			position: ['bottomCenter'],
		}"
	>
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'action'">
				<a-space>
					<DeleteRole :id="record.id" @deleteRole="deleteRole" />
					<a-button type="primary" @click="showEdit(record)"
						>编辑</a-button
					>
				</a-space>
			</template>
		</template>
	</a-table>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getRoleListByPage } from "../../api/role";
import DeleteRole from "./components/DeleteRole.vue";
import AddRole from "./components/AddRole.vue";
import EditRole from "./components/EditRole.vue";
const addRef = ref<InstanceType<typeof AddRole> | null>(null);
const editRef = ref<InstanceType<typeof EditRole> | null>(null);
const columns = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "角色名称",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "管理",
		dataIndex: "action",
		key: "action",
	},
];
onMounted(() => {
	getRoleList();
});
const tableData = reactive<{ list: Role[] }>({
	list: [],
});
const current = ref<Role>({} as Role);
function getRoleList(current = 1, pageSize = 15) {
	getRoleListByPage(current, pageSize).then((res) => {
		tableData.list = res.data.list;
	});
}
function updateRole(role: Role) {
	for (let r of tableData.list) {
		if (r.id === role.id) {
			r.name = role.name;
			r.permissionList = role.permissionList;
			break;
		}
	}
}
function deleteRole() {
	getRoleList();
}
function showAdd() {
	if (addRef.value) {
		addRef.value.visible = true;
	}
}
function showEdit(record: Role) {
	if (editRef.value) {
		editRef.value.visible = true;
	}
	current.value = record;
}
</script>
<style scoped></style>

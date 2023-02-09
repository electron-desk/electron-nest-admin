<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 13:57:41
 * @LastEditTime: 2022-08-25 15:22:13
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\admin\index.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-button v-auth="addAdmin" type="primary" @click="showAdd">添加</a-button>
	<AddAdmin :visible="isShowAdd" @cancel="cancelAdd" />
	<EditAdmin :visible="isShowEdit" @cancel="cancelEdit" :admin="current" />
	<a-table
		rowKey="id"
		:pagination="pagination"
		:dataSource="tableData.list"
		:loading="tableData.loading"
		:columns="columns"
		@change="change"
	>
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'role'">
				{{ record.role.name }}
			</template>
			<template v-else-if="column.key === 'action'">
				<a-space>
					<DeleteAdmin :admin="record" @deleteAdmin="deleteAdmin" />
					<a-button type="primary" @click="showEdit(record)"
						>编辑</a-button
					>
				</a-space>
			</template>
		</template>
	</a-table>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { getAdminList } from "../../api/admin";
import DeleteAdmin from "./components/DeleteAdmin";
import AddAdmin from "./components/AddAdmin";
import EditAdmin from "./components/EditAdmin";
const columns = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "用户名",
		dataIndex: "username",
		key: "username",
	},
	{
		title: "邮箱",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "角色",
		dataIndex: "role",
		key: "role",
	},
	{
		title: "管理",
		dataIndex: "action",
		key: "action",
	},
];
const tableData = reactive<{
	list: Admin[];
	total: number;
	current: number;
	pageSize: number;
	loading: boolean;
}>({
	list: [],
	total: 0,
	current: 1,
	pageSize: 15,
	loading: true,
});
const addAdmin = ref("addAdmin111");
setTimeout(() => {
	addAdmin.value = "addAdmin";
}, 2000);
const isShowAdd = ref(false);
const isShowEdit = ref(false);
const current = ref<Admin>({} as Admin);
function cancelEdit() {
	isShowEdit.value = false;
}
function showEdit(admin: Admin) {
	current.value = admin;
	isShowEdit.value = true;
}
function showAdd() {
	isShowAdd.value = true;
}
function cancelAdd(refresh?: Boolean) {
	if (refresh) {
		getAdminListByPage();
	}
	isShowAdd.value = false;
}
function deleteAdmin(id: number) {
	// 可以回调
	getAdminListByPage();
}
function getAdminListByPage(page = 1) {
	tableData.loading = true;
	getAdminList(page).then((res) => {
		tableData.list = res.data.list;
		tableData.total = res.data.total;
		tableData.current = res.data.current;
		tableData.pageSize = res.data.pageSize;
		tableData.loading = false;
	});
}
const pagination = computed(() => ({
	total: tableData.total,
	current: tableData.current,
	pageSize: tableData.pageSize,
	position: ["bottomCenter"],
}));
function change(pagination: { pageSize: number; current: number }) {
	getAdminListByPage(pagination.current);
}
onMounted(() => {
	getAdminListByPage();
});
</script>
<style scoped></style>

<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:54:04
 * @LastEditTime: 2022-08-30 12:48:03
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\user\index.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<EditUser ref="editUserRef" :user="current" />
	<AddUser ref="addUserRef" @cancel="cancelAdd" />
	<a-form layout="inline" :model="formState">
		<a-form-item label="用户名" name="username">
			<a-input
				v-model:value="formState.username"
				placeholder="请输入用户名"
			/>
		</a-form-item>
		<a-form-item label="邮箱" name="email">
			<a-input v-model:value="formState.email" placeholder="请输入邮箱" />
		</a-form-item>
		<a-form-item :wrapper-col="{ span: 10 }">
			<a-space>
				<a-button type="primary" @click="search">
					<template #icon><SearchOutlined /></template>
				</a-button>
				<a-button type="primary" @click="exportUser">
					<template #icon><DownloadOutlined /></template>
					导出
				</a-button>
				<a-button type="primary" @click="showAddUserModal">
					<template #icon><UserAddOutlined /></template>
					添加
				</a-button>
			</a-space>
		</a-form-item>
	</a-form>
	<a-table
		:columns="columns"
		:data-source="tableData.list"
		@change="change"
		:pagination="{
			position: ['bottomCenter'],
		}"
	>
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'action'">
				<a-space>
					<a-button type="primary" @click="showEditModal(record)"
						>编辑</a-button
					>
					<DeleteUser :id="record.id" @delete-user="deleteUser" />
				</a-space>
			</template>
			<template v-else-if="column.key === 'avatar'">
				<a-image
					v-if="record.avatar"
					:width="200"
					:src="record.avatar"
				/>
			</template>
			<template v-else-if="column.key === 'username'">
				<span @click="copyInfo(record.username)">{{
					record.username
				}}</span>
			</template>
			<template v-else-if="column.key === 'email'">
				<span @click="copyInfo(record.email)">{{ record.email }}</span>
			</template>
		</template>
	</a-table>
</template>

<script setup lang="ts">
import {
	SearchOutlined,
	DownloadOutlined,
	UserAddOutlined,
} from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getUserList } from "../../api/user";
import DeleteUser from "./components/DeleteUser.vue";
import AddUser from "./components/AddUser.vue";
import EditUser from "./components/EditUser.vue";
import copy from "copy-to-clipboard";
import { message } from "ant-design-vue";

const formState = reactive({
	username: "",
	email: "",
});
const addUserRef = ref<InstanceType<typeof AddUser> | null>(null);
const editUserRef = ref<InstanceType<typeof EditUser> | null>(null);
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
		title: "头像",
		dataIndex: "avatar",
		key: "avatar",
	},
	{
		title: "邮箱",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "管理",
		dataIndex: "action",
		key: "action",
	},
];
const tableData = reactive<{ list: User[] }>({
	list: [],
});
const current = ref<User>({} as User);
function search() {
	getUserByPage(1);
}
function copyInfo(info: string) {
	copy(info);
	message.info("拷贝成功");
}
function exportUser() {
	let str = `id,姓名,邮箱\n`;
	tableData.list.forEach((u) => {
		str += `${u.id},${u.username},${u.email}\n`;
	});
	//encodeURIComponent解决中文乱码
	let uri =
		"data:application/vnd.ms-excel;charset=utf-8,\ufeff" +
		encodeURIComponent(str);
	//通过创建a标签实现
	let link = document.createElement("a");
	link.href = uri;
	//对下载的文件命名
	link.download = "用户数据表.csv";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
function cancelAdd(refresh?: boolean) {
	if (refresh) {
		getUserByPage();
	}
}
function showEditModal(user: User) {
	current.value = user;
	if (editUserRef.value) {
		editUserRef.value.visible = true;
	}
}
function showAddUserModal() {
	if (addUserRef.value) {
		addUserRef.value.visible = true;
	}
}
function deleteUser() {
	getUserByPage();
}
function getUserByPage(current: number = 1) {
	getUserList(current, 15, formState).then((res) => {
		tableData.list = res.data.list;
	});
}
function change(pagination: { page: number; pageSize: number }) {
	getUserByPage(pagination.page);
}
onMounted(() => {
	getUserByPage();
});
</script>
<style scoped></style>

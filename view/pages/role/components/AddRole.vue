<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 15:17:18
 * @LastEditTime: 2022-08-16 22:29:07
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\role\components\AddRole.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-modal :visible="visible" title="新增角色" @ok="ok" @cancel="cancel">
		<a-form
			ref="formRef"
			:model="formState"
			@finish="onFinish"
			autocomplete="off"
			:label-col="{
				span: 5,
			}"
			:wrapper-col="{ span: 16 }"
		>
			<a-form-item
				label="角色名"
				name="name"
				:rules="[{ required: true, message: '角色名不可以为空' }]"
			>
				<a-input v-model:value="formState.name" />
			</a-form-item>
			<a-form-item
				label="权限"
				name="permissionList"
				:rules="[
					{
						type: 'array',
						required: true,
						message: '权限不可以为空',
						validator,
					},
				]"
			>
				<a-tree
					checkStrictly
					defaultExpandAll
					checkable
					:field-names="fieldNames"
					:tree-data="permissionList"
					v-model:checkedKeys="formState.permissionList"
				>
				</a-tree>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { message, TreeProps } from "ant-design-vue";
import { Rule } from "ant-design-vue/lib/form";
import { onMounted, reactive, ref, watch } from "vue";
import { addRole, getPermissionList } from "../../../api/role";
const visible = ref(false);
const formRef = ref();
const formState = reactive<{
	name: string;
	permissionList: { checked: number[] };
}>({
	name: "",
	permissionList: { checked: [] },
});
const permissionList = ref<Permission[]>([]);
const fieldNames: TreeProps["fieldNames"] = {
	children: "children",
	title: "name",
	key: "id",
};
defineExpose({ visible });
function validator(_rule: Rule, value: { checked: string[] }) {
	if (value.checked.length > 0) {
		return Promise.resolve();
	}
	return Promise.reject();
}

function onFinish(role: Role) {
	console.log(role);
}
function cancel() {
	visible.value = false;
}
function generatePermissionTree(permissionList: Permission[], parentId = 0) {
	let tmp: Permission[] = [];
	for (let p of permissionList) {
		if (p.parentId === parentId) {
			p.children = generatePermissionTree(permissionList, p.id);
			tmp.push(p);
		}
	}
	return tmp;
}
onMounted(() => {
	getPermissionList().then((res) => {
		permissionList.value = generatePermissionTree(res.data);
	});
});
watch(visible, () => {
	if (!visible.value) {
		formRef.value.resetFields();
	}
});
function ok() {
	formRef.value
		.validate()
		.then(() => {
			addRole({
				name: formState.name,
				permissionList: formState.permissionList.checked,
			}).then((res) => {
				if (res.success) {
					message.success("添加成功");
					visible.value = false;
				} else {
					message.error(res.errorMessage);
				}
			});
		})
		.catch((e: any) => {
			console.log(e);
		});
}
</script>
<style scoped></style>

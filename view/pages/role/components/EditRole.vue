<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 21:53:49
 * @LastEditTime: 2022-08-27 01:13:35
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\role\components\EditRole.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-modal :visible="visible" title="编辑角色" @ok="ok" @cancel="cancel">
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
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import { getPermissionList, updateRole } from "../../../api/role";
const props = defineProps<{ role: Role }>();
const visible = ref(false);
defineExpose({ visible });
const formRef = ref();
const emits = defineEmits<{
	(e: "updateRole", data: Role): void;
}>();
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
onUpdated(() => {
	formState.name = props.role.name;
	formState.permissionList = {
		checked: props.role.permissionList.map((p) => p.id),
	};
});
function ok() {
	formRef.value
		.validate()
		.then(() => {
			updateRole(props.role.id, {
				name: formState.name,
				permissionList: formState.permissionList.checked,
			}).then((res) => {
				if (res.success) {
					message.success("编辑成功");
					emits("updateRole", {
						name: formState.name,
						id: props.role.id,
						permissionList: formState.permissionList.checked.map(
							(p) => {
								return { id: p };
							}
						),
					} as Role);
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

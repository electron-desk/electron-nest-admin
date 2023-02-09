<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 14:45:47
 * @LastEditTime: 2022-08-30 15:26:55
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\user\components\AddUser.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-modal title="添加用户" :visible="visible" @cancel="cancel" @ok="ok">
		<a-row style="margin-bottom: 16px">
			<a-col :span="8" :offset="10">
				<a-upload
					:show-upload-list="false"
					v-model:file-list="fileList"
					:action="uploadUrl"
					@change="handleChange"
				>
					<a-avatar
						:size="64"
						v-if="imageUrl"
						:src="imageUrl"
						alt="avatar"
					/>
					<a-avatar v-else :size="64" alt="avatar">
						上传头像
					</a-avatar>
				</a-upload>
			</a-col>
		</a-row>
		<a-form
			:model="formState"
			ref="formRef"
			:label-col="{ span: 5 }"
			:wrapper-col="{ span: 16 }"
		>
			<a-form-item
				label="用户名"
				name="username"
				:rules="[{ required: true, message: '请输入用户名' }]"
			>
				<a-input v-model:value="formState.username" />
			</a-form-item>
			<a-form-item
				label="密码"
				name="password"
				:rules="[
					{ required: true, message: '请输入密码' },
					{ type: 'string', min: 6 },
				]"
			>
				<a-input v-model:value="formState.password" />
			</a-form-item>
			<a-form-item
				label="邮箱"
				name="email"
				:rules="[
					{
						required: true,
						type: 'email',
						message: '邮箱格式不合法',
					},
				]"
			>
				<a-input v-model:value="formState.email" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { reactive, ref, watch } from "vue";
import { doAddUser } from "../../../api/user";
import type { UploadChangeParam } from "ant-design-vue";
const baseURL = import.meta.env.VITE_APP_baseURL;
const uploadUrl = baseURL
	? baseURL + "/admin/upload/upload"
	: "/admin/upload/upload";
const loading = ref<boolean>(false);
const imageUrl = ref<string>("");
const fileList = ref([]);
const formRef = ref();
const visible = ref(false);
const formState = reactive<User>({} as User);
const emits = defineEmits<{ (e: "cancel", refresh?: boolean): void }>();
defineExpose({ visible });
watch(fileList, () => {
	// @ts-ignore
	if (fileList.value[0] && fileList.value[0].response) {
		// @ts-ignore
		formState.avatar = fileList.value[0].response.data.url;
	} else {
		formState.avatar = "";
		imageUrl.value = "";
	}
});
function getBase64(img: Blob, callback: (base64Url: string) => void) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
}
const handleChange = (info: UploadChangeParam) => {
	if (info.file.status === "uploading") {
		loading.value = true;
		return;
	}
	if (info.file.status === "done") {
		// @ts-ignore
		getBase64(info.file.originFileObj, (base64Url: string) => {
			imageUrl.value = base64Url;
			loading.value = false;
		});
	}
	if (info.file.status === "error") {
		loading.value = false;
		message.error("upload error");
	}
};

function ok() {
	formRef.value.validate().then(() => {
		doAddUser(formState).then((res) => {
			if (res.success) {
				message.success("添加成功");
				visible.value = false;
				emits("cancel", true);
			} else {
				message.error(res.errorMessage);
			}
		});
	});
}
watch(visible, () => {
	if (!visible.value) {
		fileList.value = [];
		formRef.value.resetFields();
	}
});
function cancel() {
	visible.value = false;
}
</script>
<style></style>

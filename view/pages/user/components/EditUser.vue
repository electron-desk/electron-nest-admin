<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 14:43:12
 * @LastEditTime: 2022-08-30 15:27:07
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\user\components\EditUser.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-modal title="编辑用户" :visible="visible" @cancel="cancel" @ok="ok">
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
			:model="user"
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
			<a-form-item label="密码" name="password">
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
import { message, UploadChangeParam } from "ant-design-vue";
import { onUpdated, ref } from "vue";
import { updateUser } from "../../../api/user";
const baseURL = import.meta.env.VITE_APP_baseURL;
const uploadUrl = baseURL
	? baseURL + "/admin/upload/upload"
	: "/admin/upload/upload";
const loading = ref<boolean>(false);
const imageUrl = ref<string>("");
const fileList = ref([]);
const formRef = ref();
const formState = ref<User>({} as User);
const props = defineProps<{ user: User }>();
const visible = ref<boolean>(false);
defineExpose({ visible });
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
onUpdated(() => {
	formState.value = props.user;
	if (props.user.avatar) {
		imageUrl.value = props.user.avatar;
	}
});
function cancel() {
	visible.value = false;
	fileList.value = [];
}
function ok() {
	formRef.value.validate().then(() => {
		// @ts-ignore
		if (fileList.value[0] && fileList.value[0].response) {
			// @ts-ignore
			formState.value.avatar = fileList.value[0].response.data.url;
		}
		updateUser(props.user.id, formState.value).then((res) => {
			if (res.success) {
				visible.value = false;
				message.success("更新成功");
			} else {
				message.error(res.errorMessage);
			}
		});
	});
}
</script>
<style scoped></style>

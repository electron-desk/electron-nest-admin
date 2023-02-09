<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:35:06
 * @LastEditTime: 2022-08-30 12:56:45
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\login\index.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->

<template>
	<div id="login-container">
		<div id="login-form">
			<a-typography-title style="text-align: center">
				跃码教育中台系统
			</a-typography-title>
			<a-typography-title style="text-align: center" :level="5">
				Vue3+vite3+pinia+tsx+setup项目实战
			</a-typography-title>

			<a-form
				:model="formState"
				name="basic"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 16 }"
				autocomplete="off"
				@finish="onFinish"
				@finishFailed="onFinishFailed"
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
					:rules="[{ required: true, message: '密码不可以为空' }]"
				>
					<a-input-password v-model:value="formState.password" />
				</a-form-item>
				<a-form-item name="cacheKey" hidden>
					<a-input-password v-model:value="formState.cacheKey" />
				</a-form-item>
				<a-form-item
					label="验证码"
					name="captcha"
					:rules="[{ required: true, message: '验证码不可以为空' }]"
				>
					<a-row :gutter="6">
						<a-col span="14">
							<a-input v-model:value="formState.captcha" />
						</a-col>
						<a-col span="10">
							<img :src="svgCaptcha" @click="changeCaptcha" />
						</a-col>
					</a-row>
				</a-form-item>
				<a-form-item :wrapper-col="{ offset: 8, span: 16 }">
					<a-button type="primary" html-type="submit">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { captcha, doLogin } from "../../api/login";

interface FormState {
	username: string;
	password: string;
	cacheKey: string;
	captcha: string;
}
const formState = reactive<FormState>({
	username: "最爱白菜吖",
	password: "123456",
	cacheKey: "",
	captcha: "",
});
const router = useRouter();
const onFinish = (user: User) => {
	doLogin(user).then((res) => {
		if (res.success) {
			localStorage.setItem("token", res.data.token);
			message.success("登录成功");
			router.replace("/");
		} else {
			message.error(res.errorMessage);
		}
	});
};
const svgCaptcha = ref("");
function changeCaptcha() {
	captcha().then((res) => {
		svgCaptcha.value = res.data.captcha;
		formState.cacheKey = res.data.cacheKey;
	});
}
onMounted(() => {
	changeCaptcha();
});
const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};
</script>
<style lang="scss">
#login-container {
	width: 100vw;
	height: 100vh;
	background-image: url(../../assets/bg.jpg);
	background-size: cover;
	position: relative;

	#login-form {
		padding-top: 70px;
		background-color: white;
		border-radius: 6px;
		position: absolute;
		width: 500px;
		height: 400px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>

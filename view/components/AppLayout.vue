<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:53:20
 * @LastEditTime: 2022-08-30 14:33:36
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\components\AppLayout.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-layout>
		<a-layout-header class="header">
			<div class="logo" />
			<a-row>
				<a-col :span="22">
					<a-menu
						v-model:selectedKeys="selectedKeys1"
						theme="dark"
						mode="horizontal"
						:style="{ lineHeight: '64px' }"
					>
						<a-menu-item key="1">nav 1</a-menu-item>
						<a-menu-item key="2">nav 2</a-menu-item>
						<a-menu-item key="3">nav 3</a-menu-item>
					</a-menu>
				</a-col>
				<a-col
					:span="2"
					style="color: white"
				>
					<a-dropdown>
						<a
							style="color: white"
							@click.prevent
						>
							{{ adminStore.admin.username }}
							<DownOutlined />
						</a>
						<template #overlay>
							<a-menu>
								<a-menu-item>
									<a
										href="javascript:;"
										@click="doLogout"
									>
										退出
									</a>
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</a-col>
			</a-row>
		</a-layout-header>
		<a-layout>
			<a-layout-sider
				v-model:collapsed="collapsed"
				width="200"
				style="background: #fff"
			>
				<a-menu
					v-model:selectedKeys="selectedKeys2"
					v-model:openKeys="openKeys"
					mode="inline"
					:style="{ height: '100%', borderRight: 0 }"
				>
					<LeftMenu />
				</a-menu>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<a-layout-content
					:style="{
						background: '#fff',
						padding: '24px',
						margin: '16px 0',
						minHeight: '768px',
					}"
				>
					<router-view></router-view>
				</a-layout-content>
				<a-layout-footer style="text-align: center">
					跃码教育 ©2018 版权所有
				</a-layout-footer>
			</a-layout>
		</a-layout>
	</a-layout>
</template>
<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAdminStore from '../store/admin'
import LeftMenu from './LeftMenu'

const adminStore = useAdminStore()
const selectedKeys1 = ref<string[]>([]),
	selectedKeys2 = ref<string[]>([]),
	openKeys = ref<string[]>(['sub1'])
const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
function getSelectedKeys() {
	let tmpPath = ''
	for (let path of route.path.split('/')) {
		if (path === '') {
			continue
		}
		tmpPath += '/' + path
		selectedKeys2.value.push(tmpPath)
		openKeys.value.push(tmpPath)
	}
}
function doLogout() {
	adminStore.logout()
	localStorage.clear()
	router.replace('/login')
}
function resize() {
	if (document.body.clientWidth < 980) {
		collapsed.value = true
	} else {
		collapsed.value = false
	}
}
onMounted(() => {
	getSelectedKeys()
	resize()
	window.addEventListener('resize', () => {
		resize()
	})
})
</script>
<style>
#components-layout-demo-top-side-2 .logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

.site-layout-background {
	background: #fff;
}
</style>

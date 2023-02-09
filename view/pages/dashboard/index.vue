<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:53:48
 * @LastEditTime: 2022-08-29 13:51:32
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\dashboard\index.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-row :gutter="6">
		<a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8">
			<a-card title="总访问量">
				<h1>
					<a-typography-title>126,560</a-typography-title>
				</h1>
			</a-card>
		</a-col>
		<a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8">
			<a-card title="用户数">
				<h1>
					<a-typography-title>16,560</a-typography-title>
				</h1>
			</a-card>
		</a-col>
		<a-col :xs="2" :sm="4" :md="8" :lg="8" :xl="8">
			<a-card title="日访问量">
				<h1>
					<a-typography-title>6,560</a-typography-title>
				</h1>
			</a-card>
		</a-col>
	</a-row>
	<a-row>
		<a-col :xs="2" :sm="4" :md="12" :lg="12" :xl="12">
			<a-tabs v-model:activeKey="activeKey" destroyInactiveTabPane>
				<a-tab-pane key="1" tab="周访问趋势">
					<Access />
				</a-tab-pane>
				<a-tab-pane key="2" tab="用户增长趋势">
					<UserLine />
				</a-tab-pane>
			</a-tabs>
		</a-col>
		<a-col :xs="2" :sm="4" :md="12" :lg="12" :xl="12">
			<a-card title="用户分布">
				<UserMap />
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserPie from "./components/UserPie.vue";
import Access from "./components/Access.vue";
import UserLine from "./components/UserLine.vue";
import UserMap from "./components/UserMap.vue";
const activeKey = ref("1");
</script>
<style scoped></style>

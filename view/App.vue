<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:09:37
 * @LastEditTime: 2022-08-21 00:30:14
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\App.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
</script>

<template>
	<a-config-provider :locale="zhCN">
		<a
			class="qq-share"
			target="_blank"
			href="http://qm.qq.com/cgi-bin/qm/qr?k=rS6Flwm9aurMY8xTMJmct5eZXp-CM7Y6&jump_from=webapi"
			><img
				border="0"
				src="http://pub.idqqimg.com/wpa/images/group.png"
				alt="web/react/vue/ts-3"
				title="跃码教育交流群"
		/></a>
		<router-view></router-view>
	</a-config-provider>
</template>

<style scoped>
.qq-share {
	position: fixed;
	right: 18px;
	top: 300px;
	z-index: 99999;
}
</style>

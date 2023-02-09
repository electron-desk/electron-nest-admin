<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-29 13:24:27
 * @LastEditTime: 2022-08-29 13:26:33
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\dashboard\components\UserLine.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->

<template>
	<div ref="userPieRef" class="user-pie"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const userPieRef = ref<HTMLDivElement>();
onMounted(() => {
	// 基于准备好的dom，初始化echarts实例
	const myChart = echarts.init(userPieRef.value as HTMLDivElement);
	const option = {
		xAxis: {
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: "bar",
			},
		],
	};

	// 绘制图表
	myChart.setOption(option);
	window.addEventListener("resize", () => {
		myChart.resize();
	});
});
</script>
<style scoped>
.user-pie {
	height: 500px;
}
</style>

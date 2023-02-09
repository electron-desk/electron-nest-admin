<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-17 00:44:57
 * @LastEditTime: 2022-08-17 00:58:37
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\dashboard\components\UserPie.vue
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
		title: {
			text: "Nightingale Chart",
			subtext: "Fake Data",
			left: "center",
		},
		tooltip: {
			trigger: "item",
			formatter: "{a} <br/>{b} : {c} ({d}%)",
		},
		legend: {
			left: "center",
			top: "bottom",
			data: [
				"rose1",
				"rose2",
				"rose3",
				"rose4",
				"rose5",
				"rose6",
				"rose7",
				"rose8",
			],
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		series: [
			{
				name: "Area Mode",
				type: "pie",
				radius: [20, 140],
				center: ["75%", "50%"],
				roseType: "area",
				itemStyle: {
					borderRadius: 5,
				},
				data: [
					{ value: 30, name: "rose 1" },
					{ value: 28, name: "rose 2" },
					{ value: 26, name: "rose 3" },
					{ value: 24, name: "rose 4" },
					{ value: 22, name: "rose 5" },
					{ value: 20, name: "rose 6" },
					{ value: 18, name: "rose 7" },
					{ value: 16, name: "rose 8" },
				],
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
	width: 500px;
	height: 500px;
}
</style>

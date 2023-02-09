<template>
	<div ref="usrMapRef" class="map-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import chinaMap from "./china.json";
const usrMapRef = ref<HTMLDivElement>();
onMounted(() => {
	// @ts-ignore
	echarts.registerMap("china", { geoJSON: chinaMap });

	const myChart = echarts.init(usrMapRef.value as HTMLDivElement);
	// 地图数据
	const chinaGeoCoordMap = {
		黑龙江: [127.9688, 45.368],
		内蒙古: [110.3467, 41.4899],
		吉林: [125.8154, 44.2584],
		北京市: [116.4551, 40.2539],
		辽宁: [123.1238, 42.1216],
		河北: [114.4995, 38.1006],
		天津: [117.4219, 39.4189],
		山西: [112.3352, 37.9413],
		陕西: [109.1162, 34.2004],
		甘肃: [103.5901, 36.3043],
		宁夏: [106.3586, 38.1775],
		青海: [101.4038, 36.8207],
		新疆: [87.9236, 43.5883],
		西藏: [91.11, 29.97],
		四川: [103.9526, 30.7617],
		重庆: [114.298572, 30.584355],
		山东: [117.1582, 36.8701],
		河南: [113.4668, 34.6234],
		江苏: [118.8062, 31.9208],
		安徽: [117.29, 32.0581],
		湖北: [114.3896, 30.6628],
		浙江: [119.5313, 29.8773],
		福建: [119.4543, 25.9222],
		江西: [116.0046, 28.6633],
		湖南: [113.0823, 28.2568],
		贵州: [106.6992, 26.7682],
		云南: [102.9199, 25.4663],
		广东: [113.12244, 23.009505],
		广西: [108.479, 23.1152],
		海南: [110.3893, 19.8516],
		上海: [121.4648, 31.2891],
	};
	// 飞线点数据
	const chinaDatas = [
		[
			{
				name: "广东",
				value: 18.7,
			},
		],
		[
			{
				name: "北京市",
				value: 12.5,
			},
		],
		[
			{
				name: "上海",
				value: 10.3,
			},
		],
		[
			{
				name: "浙江",
				value: 8.5,
			},
		],
		[
			{
				name: "江苏",
				value: 6.9,
			},
		],
		[
			{
				name: "四川",
				value: 5.9,
			},
		],
		[
			{
				name: "湖北",
				value: 4.5,
			},
		],
		[
			{
				name: "山东",
				value: 3.4,
			},
		],
		[
			{
				name: "陕西",
				value: 3.3,
			},
		],
		[
			{
				name: "河南",
				value: 3.0,
			},
		],
	];

	let formdata = "湖北"; // 中心点
	// @ts-ignore
	const convertData = function (data) {
		const res = [];
		for (let i = 0; i < data.length; i++) {
			const dataItem = data[i];
			// @ts-ignore
			const fromCoord = chinaGeoCoordMap[dataItem[0].name];
			// const toCoord = [108.384366, 30.439702] //中心点地理坐标
			const toCoord = [114.3896, 30.6628]; //中心点地理坐标
			if (fromCoord && toCoord) {
				res.push([
					{
						// 飞线从哪里出发
						coord: toCoord,
					},
					{
						// 飞线去往哪里
						coord: fromCoord,
						value: dataItem[0].value,
					},
				]);
			}
		}
		return res;
	};
	// @ts-ignore
	const series = [];
	[[formdata, chinaDatas]].forEach(function (item, i) {
		series.push(
			{
				type: "lines",
				coordinateSystem: "geo",
				zlevel: 2,
				effect: {
					show: true,
					period: 4, //箭头指向速度，值越小速度越快
					trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
					symbol: "arrow", //箭头图标
					symbolSize: 5, //图标大小
					color: "#fcdd6e", // 图标颜色
				},
				lineStyle: {
					normal: {
						show: true,
						width: 1, //尾迹线条宽度
						opacity: 1, //尾迹线条透明度
						curveness: 0.3, //尾迹线条曲直度
						color: "#fcdd6e", // 飞线颜色
					},
					color: "#fcdd6e",
				},
				data: convertData(item[1]),
			},
			{
				type: "effectScatter",
				coordinateSystem: "geo",
				zlevel: 2,
				rippleEffect: {
					//涟漪特效
					period: 4, //动画时间，值越小速度越快
					brushType: "stroke", //波纹绘制方式 stroke, fill
					scale: 10, //波纹圆环最大限制，值越大波纹越大
					color: "#fcdd6e",
				},
				label: {
					normal: {
						show: false,
						position: "right", //显示位置
						offset: [5, 0], //偏移设置
						// @ts-ignore
						formatter: function (params) {
							//圆环显示文字
							return params.data.name;
						},
						fontSize: 13,
					},
					emphasis: {
						show: false,
					},
				},
				symbol: "circle",
				// @ts-ignore
				symbolSize: function (val) {
					return 5; //圆环大小
				},
				itemStyle: {
					normal: {
						show: false,
						color: "#fce182",
					},
				},
				// @ts-ignore
				data: item[1].map(function (dataItem) {
					return {
						//在这里定义你所要展示的数据
						// name: dataItem[0].name,
						// value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
						name: dataItem[0].name,
						// @ts-ignore
						value: chinaGeoCoordMap[dataItem[0].name].concat([
							dataItem[0].value,
						]),
					};
				}),
			},
			//中心点
			{
				type: "effectScatter",
				coordinateSystem: "geo",
				zlevel: 15,
				rippleEffect: {
					period: 4,
					brushType: "stroke",
					scale: 4,
					color: "#38ff85",
				},
				label: {
					normal: {
						show: false,
						position: "right",
						//offset:[5, 0],
						color: "#38ff85",
						formatter: "{b}",
						textStyle: {
							color: "#38ff85",
						},
					},
					emphasis: {
						show: false,
						color: "#38ff85",
					},
				},
				symbol: "circle",
				symbolSize: 5,
				itemStyle: {
					color: "#38ff85",
				},
				data: [
					{
						name: item[0],
						// @ts-ignore
						value: chinaGeoCoordMap[item[0]].concat([10]),
					},
				],
			}
		);
	});

	let option = {
		// bgColor: '#1a1e45',
		tooltip: {
			trigger: "item",
		},
		legend: {
			orient: "horizontal", //图例的排列方向
			// textStyle: { color: '#1a1e45' },
			x: "left", //图例的位置
			y: "-20000000000000",
		},
		visualMap: {
			//颜色的设置  dataRange
			// textStyle: { color: '#1a1e45' },
			x: "left",
			y: "bottom",
			// splitList: [{ start: 0, end: 150000 }],
			show: false,
			// text:['高','低'],// 文本，默认为数值文本
			// color: ['#1a1e45'],
		},
		geo: {
			map: "china",
			zoom: 1.2,
			label: {
				normal: {
					show: false,
					textStyle: {
						color: "#FFFFFF",
					},
				},
				emphasis: {
					show: false,
				},
			},
			roam: false, //是否允许缩放
			itemStyle: {
				normal: {
					color: "#1a1e45", //地图背景色
					borderColor: "#22ccfb", //省市边界线00fcff 516a89
					borderWidth: 1,
					textStyle: "#fff",
				},
				emphasis: {
					color: "#22ccfb", //悬浮背景
				},
			},
			data: [],
		},
		// @ts-ignore
		series: series,
	};
	// 绘制图表
	myChart.setOption(option);
	window.addEventListener("resize", () => {
		myChart.resize();
	});
});
</script>
<style scoped>
.map-chart {
	width: 100%;
	height: 500px;
}
</style>

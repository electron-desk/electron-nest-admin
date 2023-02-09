import { defineComponent, h, resolveComponent } from "vue";
import * as antIcons from "@ant-design/icons-vue";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-26 09:15:37
 * @LastEditTime: 2022-08-29 14:35:08
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\components\MyIcon.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export default defineComponent({
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
	// 解构赋值会造成响应式的丢失，又踩了一次坑
	setup(props) {
		return () => <>{h(antIcons[props.icon as keyof typeof antIcons])}</>;
	},
});

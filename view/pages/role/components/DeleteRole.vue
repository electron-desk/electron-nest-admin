<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-16 14:50:02
 * @LastEditTime: 2022-08-16 16:31:05
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\role\components\DeleteRole.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
	<a-popconfirm title="删除角色" @confirm="confirm">
		<a-button danger type="primary">删除</a-button>
	</a-popconfirm>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { deleteRole } from "../../../api/role";
interface Props {
	(e: "deleteRole"): void;
}
const props = defineProps<{ id: number }>();
const emits = defineEmits<Props>();
function confirm() {
	deleteRole(props.id).then((res) => {
		if (res.success) {
			emits("deleteRole");
			message.success("删除成功");
		} else {
			message.error(res.errorMessage);
		}
	});
}
</script>
<style scoped></style>

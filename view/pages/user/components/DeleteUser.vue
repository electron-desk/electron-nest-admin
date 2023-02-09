<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 14:28:33
 * @LastEditTime: 2022-08-09 18:38:02
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\pages\user\components\DeleteUser.vue
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved. 
-->
<template>
    <a-popconfirm title="删除用户" @confirm="deleteUser">
        <a-button type="primary" danger>删除</a-button>
    </a-popconfirm>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { deleteUserById } from '../../../api/user';

const props = defineProps<{ id: number }>()
const emits = defineEmits<{ (e: 'deleteUser', id: number): void }>()
function deleteUser() {
    deleteUserById(props.id).then(res => {
        if (res.success) {
            message.success('删除成功')
            emits('deleteUser', props.id)
        } else {
            message.error(res.errorMessage)
        }
    })
}
</script>
<style scoped>
</style>

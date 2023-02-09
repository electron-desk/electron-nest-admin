/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-09 11:40:08
 * @LastEditTime: 2022-08-20 17:23:48
 * @LastEditors: 最爱白菜吖
 * @FilePath: \vue3-admin\src\utils\request.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */

import { message } from 'ant-design-vue'
import axios, { AxiosRequestHeaders } from 'axios'
const baseURL = import.meta.env.VITE_APP_baseURL
const request = axios.create({
	baseURL: baseURL ? baseURL : '/',
	timeout: 5000,
})
request.interceptors.request.use((c) => {
	const token = localStorage.getItem('token')
	if (token) {
		c.headers = {
			...c.headers,
			Authorization: `Bearer ${token}`,
		} as AxiosRequestHeaders
	}
	return c
})
request.interceptors.response.use(
	(res) => {
		return res.data
	},
	(e) => {
		message.error(e.response.data.errorMessage || e.message)
		return Promise.reject(e.response.data.errorMessage)
	}
)
export default request

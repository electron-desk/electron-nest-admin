/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-25 15:07:02
 * @LastEditTime: 2023-02-09 18:42:42
 * @LastEditors: 最爱白菜吖
 * @FilePath: \electron-nest-admin\view\global.d.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
declare global {
  interface ResponseSuccess<T = {}> {
    success: boolean;
    errorMessage?: string;
    data: T;
  }
  interface IPagination<T> {
    success: boolean;
    errorMessage?: string;
    data: {
      list: T[];
      current: 1;
      pageSize: number;
      total: number;
      totalPage: number;
    };
  }
}

export {};

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-28 21:18:57
 * @LastEditTime: 2022-08-28 21:39:26
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\permission\dto\create-permission.dto.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    name: 'name',
    description: '权限名称',
    minLength: 2,
    maxLength: 12,
    example: '最爱白菜吖',
  })
  @Length(2, 12, { message: '权限名称必须在2-12个字符之间' })
  name: string;
  @ApiProperty({
    name: 'parentId',
    description: '父级id',
    minLength: 2,
    maxLength: 12,
    example: 0,
  })
  parentId: number;
  @ApiProperty({
    name: 'uniqueKey',
    description: '唯一标识',
  })
  uniqueKey: string;
  @ApiProperty({
    name: 'path',
    description: '路由地址',
    required: false,
  })
  path: string;
  @ApiProperty({
    name: 'redirect',
    description: '重定向地址',
    required: false,
  })
  redirect: string;
  @ApiProperty({
    name: 'icon',
    description: '图标',
    required: false,
  })
  icon!: string;
}

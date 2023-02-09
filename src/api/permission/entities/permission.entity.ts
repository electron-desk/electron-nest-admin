/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-28 21:18:57
 * @LastEditTime: 2022-08-29 21:06:48
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\permission\entities\permission.entity.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { Role } from '../../role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { RolePermission } from '../../role/entities/rolePermission.entity';
@Table({
  timestamps: true,
  paranoid: true,
})
export class Permission extends Model<Permission> {
  @ApiProperty({
    name: 'name',
    description: '权限名称',
  })
  @Column
  name: string;
  @BelongsToMany(() => Role, () => RolePermission)
  role: Role;
  @ApiProperty({
    name: 'parentId',
    description: '父级id',
  })
  @Column
  parentId: number;

  @ApiProperty({
    name: 'uniqueKey',
    description: '唯一标识',
  })
  @Column
  uniqueKey: string;
  @ApiProperty({
    name: 'path',
    description: '路由地址',
  })
  @Column
  path: string;
  @ApiProperty({
    name: 'component',
    description: '组件对应的文件地址，或者父组件的文件地址',
  })
  @Column
  component: string;
  @ApiProperty({
    name: 'redirect',
    description: '重定向地址',
  })
  @Column
  redirect: string;
  @ApiProperty({
    name: 'icon',
    description: '图标',
  })
  @Column
  icon!: string;
}

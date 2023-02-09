/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-28 21:18:57
 * @LastEditTime: 2022-08-28 22:32:01
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\permission\permission.module.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}

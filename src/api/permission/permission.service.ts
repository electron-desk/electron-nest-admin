/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-28 21:18:57
 * @LastEditTime: 2022-08-28 22:43:01
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\permission\permission.service.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission)
    private readonly permissionModal: typeof Permission,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionModal.create(createPermissionDto);
  }
  findPermissionByUniqueKey(uniqueKey: string) {
    return this.permissionModal.findOne({ where: { uniqueKey } });
  }
  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return this.permissionModal.findByPk(id);
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionModal.update(updatePermissionDto, { where: { id } });
  }

  remove(id: number) {
    return this.permissionModal.destroy({ where: { id } });
  }
}

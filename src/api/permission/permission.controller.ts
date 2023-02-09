/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-28 21:18:57
 * @LastEditTime: 2022-08-29 21:04:10
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\permission\permission.controller.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiMapResponse } from '../../decorator/api.map.response';
import { error, success } from '../../utils/response';
import e from 'express';
@ApiTags('权限')
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: '添加权限',
  })
  @ApiMapResponse()
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionService.findPermissionByUniqueKey(
      createPermissionDto.uniqueKey,
    );
    if (permission !== null) {
      return error('权限的uniqueKey重复了');
    }
    const res = await this.permissionService.create(createPermissionDto);
    if (res.id > 0) {
      return success();
    } else {
      return error('新增失败');
    }
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const permission = await this.permissionService.findOne(id);
    if (permission === null) {
      return error('权限不存在');
    }
    const p = await this.permissionService.findPermissionByUniqueKey(
      updatePermissionDto.uniqueKey,
    );
    if (p !== null && p.id !== id) {
      return error('权限的uniqueKey重复了');
    }
    const [row] = await this.permissionService.update(id, updatePermissionDto);
    if (row === 0) {
      return error('更新失败');
    }
    return success();
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const permission = await this.permissionService.findOne(id);
    if (permission === null) {
      return error('权限不存在');
    }
    const row = await this.permissionService.remove(+id);
    if (row > 0) {
      return success();
    }
    return error('删除失败');
  }
}

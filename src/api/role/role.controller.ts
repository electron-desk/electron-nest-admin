import { pagination, success, error } from './../../utils/response';
/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-09-02 22:01:59
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\api\role\role.controller.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { ApiPaginatedResponse } from '../../decorator/api.paginated.response';
import { ApiMapResponse } from '../../decorator/api.map.response';
import { ApiArrayResponse } from '../../decorator/api.array.response';
import { Permission } from '../permission/entities/permission.entity';
@ApiTags('角色')
@ApiExtraModels(Role)
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '添加角色',
  })
  @ApiMapResponse()
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.findByName(createRoleDto.name);
    if (role !== null) {
      return error('角色已经存在');
    }
    const res = await this.roleService.create({
      name: createRoleDto.name,
    } as Role);
    if (res.id > 0) {
      if (createRoleDto.permissionList.length > 0) {
        const rolePermissionList = [];
        for (const pid of createRoleDto.permissionList) {
          rolePermissionList.push({
            roleId: res.id,
            permissionId: pid,
            deleteAt: null,
          });
        }
        await this.roleService.addRolePermission(res.id, rolePermissionList);
      }
      return success();
    }
    return error('添加失败');
  }
  @ApiOperation({
    summary: '角色列表',
  })
  @ApiPaginatedResponse(Role)
  @ApiQuery({
    name: 'current',
    description: '当前页码',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    description: '每页数量',
    example: 15,
  })
  @ApiQuery({
    name: 'name',
    description: '角色名称',
    example: '最爱白菜吖',
    required: false,
  })
  @Get()
  async findAll(
    @Query('current', new DefaultValuePipe(1), ParseIntPipe) current: number,
    @Query('pageSize', new DefaultValuePipe(15), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const { rows, count } = await this.roleService.findAll(
      current,
      pageSize,
      name,
    );
    return success(pagination(rows, count, current, pageSize));
  }

  @ApiOperation({
    summary: '角色详情',
  })
  @ApiMapResponse(Role)
  @ApiParam({
    name: 'id',
    description: '角色id',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleService.findOne(+id);
    return success(role);
  }

  @ApiOperation({
    summary: '编辑角色',
  })
  @ApiParam({
    name: 'id',
    description: '角色id',
    example: 1,
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    let role = await this.roleService.findByName(updateRoleDto.name);
    if (role !== null && role.id !== id) {
      return error('角色已经存在');
    }
    role = await this.roleService.findOne(+id);
    if (role === null) {
      return error('角色不存在');
    }
    if (updateRoleDto.permissionList.length > 0) {
      const rolePermissionList = [];
      for (const pid of updateRoleDto.permissionList) {
        rolePermissionList.push({
          roleId: id,
          permissionId: pid,
          deleteAt: null,
        });
      }
      await this.roleService.addRolePermission(id, rolePermissionList);
    }

    const res = await this.roleService.update(+id, {
      name: updateRoleDto.name,
    } as Role);
    if (res.every((v) => v > 0)) {
      return success();
    }
    return error('更新失败');
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @ApiMapResponse()
  @ApiParam({
    name: 'id',
    description: '角色id',
    example: 1,
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleService.findOne(id);
    if (role === null) {
      return error('角色不存在');
    }
    const res = await this.roleService.remove(+id);
    if (res > 0) {
      return success();
    }
    return error('删除失败');
  }
  @ApiOperation({
    summary: '权限列表',
  })
  @ApiArrayResponse(Permission)
  @Get('permission/list')
  async getPermissionList() {
    const permissionList = await this.roleService.getAllPermission();
    return success(permissionList);
  }
}
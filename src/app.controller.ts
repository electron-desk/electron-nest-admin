import { Role } from './api/role/entities/role.entity';
import { error, success } from './utils/response';
/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-08-29 20:59:54
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\app.controller.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './api/admin/admin.service';
import { RoleService } from './api/role/role.service';
import { UserService } from './api/user/user.service';
import { AppService } from './app.service';
import { Permission } from './api/permission/entities/permission.entity';
import { Public } from './decorator/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: '初始化数据',
  })
  @ApiQuery({
    name: 'key',
    description: '初始化数据的key',
    example: '1355081829',
  })
  @Public()
  @Get('init')
  async init(@Query('key') key: string) {
    if (key !== '1355081829') {
      return error('key错误');
    }
    const admin = await this.adminService.findOne(1);
    if (admin !== null) {
      return error('不可以重复初始化');
    }
    Array(15)
      .fill(0)
      .map((_, i) => {
        this.roleService.create({ name: `role ${i + 1}` } as Role);
      });

    this.adminService.create({
      username: '最爱白菜吖',
      email: '	1355081829@qq.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      salt: 'SBszpF',
      roleId: 1,
    });
    Array(50)
      .fill(0)
      .forEach((_, i) => {
        this.adminService.create({
          username: '最爱白菜吖-' + i,
          email: `1355081829${i}@qq.com`,
          password: 'e10adc3949ba59abbe56e057f20f883e',
          salt: 'SBszpF',
          roleId: 1,
        });
      });
    Array(50)
      .fill(0)
      .map((_, i) => {
        this.userService.create({
          username: `user-${i + 1}`,
          password: '135508188829',
          email: `135508188829${i}@qq.com`,
          salt: '135508188829',
        });
      });
    const permissionList = [
      {
        name: '仪表盘',
        icon: 'DashboardOutlined',
        path: '/',
        component: 'AppLayout',
        redirect: '/dashboard',
        uniqueKey: 'dashboard',
        children: [
          {
            name: '仪表盘',
            path: '/dashboard',
            uniqueKey: 'dashboardIndex',
            component: '/dashboard/index',
          },
        ],
      },
      {
        name: '用户管理',
        path: '/user',
        uniqueKey: 'user',
        component: 'AppLayout',
        redirect: '/user/list',
        children: [
          {
            name: '用户列表',
            path: '/user/list',
            uniqueKey: 'userList',
            component: '/user/index',
            children: [
              {
                name: '删除用户',
                uniqueKey: 'deleteUser',
              },
              {
                name: '添加用户',
                uniqueKey: 'addUser',
              },
              {
                name: '编辑用户',
                uniqueKey: 'editUser',
              },
            ],
          },
        ],
      },
      {
        name: '角色管理',
        path: '/role',
        uniqueKey: '/role',
        component: 'AppLayout',
        redirect: '/role/list',
        children: [
          {
            name: '角色列表',
            path: '/role/list',
            uniqueKey: 'roleList',
            component: '/role/index',
            children: [
              {
                name: '删除角色',
                uniqueKey: 'deleteRole',
                parentId: 0,
              },
              {
                name: '添加角色',
                uniqueKey: 'addRole',
                parentId: 0,
              },
              {
                name: '编辑角色',
                uniqueKey: 'editRole',
                parentId: 0,
              },
            ],
          },
        ],
      },
      {
        name: '管理员管理',
        path: '/admin',
        uniqueKey: 'admin',
        component: 'AppLayout',
        redirect: '/admin/list',
        children: [
          {
            name: '管理员列表',
            path: '/admin/list',
            uniqueKey: 'adminList',
            component: '/admin/index',
            children: [
              {
                name: '删除管理员',
                uniqueKey: 'deleteAdmin',
                parentId: 0,
              },
              {
                name: '添加管理员',
                uniqueKey: 'addAdmin',
                parentId: 0,
              },
              {
                name: '编辑管理员',
                uniqueKey: 'editAdmin',
                parentId: 0,
              },
            ],
          },
        ],
      },
      {
        name: '权限管理',
        path: '/permission',
        uniqueKey: 'permission',
        component: 'AppLayout',
        redirect: '/permission/list',
        children: [
          {
            name: '权限列表',
            path: '/permission/list',
            uniqueKey: 'permissionList',
            component: '/permission/index',
            children: [
              {
                name: '删除权限',
                uniqueKey: 'deletePermission',
              },
              {
                name: '添加权限',
                uniqueKey: 'addPermission',
              },
              {
                name: '编辑权限',
                uniqueKey: 'editPermission',
              },
            ],
          },
        ],
      },
    ];
    await this.addPermission(permissionList);
    return success();
  }
  async addPermission(permissionList, parentId = 0) {
    for (const p of permissionList) {
      let children = [];
      if (p.children) {
        children = p.children;
      }
      p.icon = 'DashboardOutlined';
      p.parentId = parentId;
      const res = await this.roleService.addPermission(
        p as unknown as Permission,
      );
      if (children.length > 0) {
        await this.addPermission(children, res.id);
      }
    }
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

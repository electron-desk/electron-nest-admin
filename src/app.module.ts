/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-09-30 13:24:04
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\app.module.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './api/admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { RoleModule } from './api/role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './api/permission/permission.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UploadModule } from './api/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { mkdirSync } from 'fs';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
mkdirSync(join(process.env.USERPROFILE || process.env.HOME, 'codedesktop'), {
  recursive: true,
});
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', '..', 'ui', 'nest-admin-vue'),
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      autoLoadModels: true,
      storage:
        (process.env.USERPROFILE || process.env.HOME) +
        '/codedesktop/.nest-admin-vue.sqlite3',
      // sync: {
      //   alter: true,
      // },
      synchronize: true,
    }),
    JwtModule.register({
      secret: '1355081829@qq.com',
      secretOrPrivateKey: '1355081829@qq.com',
      signOptions: { expiresIn: '24h' },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 300 * 1000, // 300 seconds
    }),
    AdminModule,
    UserModule,
    RoleModule,
    PermissionModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

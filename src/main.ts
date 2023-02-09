/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-08-27 01:28:10
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \nest-admin\src\main.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseMapDto } from './decorator/api.map.response';
import { PaginatedDto } from './decorator/api.paginated.response';
import { HttpExceptionFilter } from './http-exception.filter';
import { json } from 'express';
import { ResponseArrayto } from './decorator/api.array.response';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.enableCors();
  app.use(json({ limit: '100mb' }));
  app.setGlobalPrefix('/admin');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('武汉跃码教育--中台系统项目实战API文档')
    .setDescription(
      'nest(nodejs)+mysql开发的后台管理系统 [最爱白菜吖](https://space.bilibili.com/388985971)',
    )
    .setContact('最爱白菜吖', '', '1355081829@qq.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto, ResponseMapDto, ResponseArrayto],
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3008, () => {
    console.log('http://localhost:3008/api');
  });
}
bootstrap();

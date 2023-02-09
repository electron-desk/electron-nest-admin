import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-29 15:34:49
 * @LastEditTime: 2022-08-29 15:36:59
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\admin\dto\captcha.dto.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export class CaptchaDto {
  @ApiProperty({
    name: 'captcha',
    description: 'svg验证码',
  })
  captcha: string;
  @ApiProperty({
    name: 'cacheKey',
    description: '唯一的key，登录验证的时候需要',
    example: 'dCcytGcWkszcdGbe',
  })
  cacheKey: string;
}

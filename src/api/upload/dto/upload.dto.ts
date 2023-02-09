import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-30 00:33:34
 * @LastEditTime: 2022-08-30 00:37:43
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\upload\dto\upload.dto.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class UploadMultiDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

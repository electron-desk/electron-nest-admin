/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-29 23:23:44
 * @LastEditTime: 2022-08-30 11:27:55
 * @LastEditors: 最爱白菜吖
 * @FilePath: \nest-admin\src\api\upload\upload.controller.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { randomStr } from '../../utils/randomStr';
import { UploadService } from './upload.service';
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import { success } from '../../utils/response';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiMapResponse } from '../../decorator/api.map.response';
import { ApiArrayResponse } from '../../decorator/api.array.response';
import { UploadDto, UploadMultiDto } from './dto/upload.dto';
@ApiTags('文件上传')
@ApiExtraModels(UploadDto, UploadMultiDto)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @ApiOperation({
    summary: '单文件上传',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单文件上传',
    type: UploadDto,
  })
  @ApiMapResponse()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const ext = file.mimetype.split('/')[1];
    const fileName = randomStr(32);
    const date = new Date();
    const filePath = join(
      process.env.USERPROFILE || process.env.HOME,
      'nestAdmin',
      'upload',
      `${date.getFullYear()}`,
      `${date.getMonth()}`,
    );
    const url = `http://localhost:3006/upload/${date.getFullYear()}/${date.getMonth()}/${fileName}.${ext}`;
    mkdirSync(filePath, {
      recursive: true,
    });
    const ws = createWriteStream(join(filePath, `${fileName}.${ext}`));
    ws.write(file.buffer);
    return success({ url });
  }

  @ApiOperation({
    summary: '多文件上传',
  })
  @ApiOperation({
    summary: '多文件上传',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多文件上传',
    type: UploadMultiDto,
  })
  @ApiArrayResponse()
  @Post('upload/multi')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFileMulti(@UploadedFiles() files: Array<Express.Multer.File>) {
    let fileList = [];
    for (const file of files) {
      const ext = file.mimetype.split('/')[1];
      const fileName = randomStr(32);
      const date = new Date();
      const filePath = join(
        process.env.USERPROFILE || process.env.HOME,
        'nestAdmin',
        'upload',
        `${date.getFullYear()}`,
        `${date.getMonth()}`,
      );
      const url = `http://localhost:3006/upload/${date.getFullYear()}/${date.getMonth()}/${fileName}.${ext}`;
      mkdirSync(filePath, {
        recursive: true,
      });
      const ws = createWriteStream(join(filePath, `${fileName}.${ext}`));
      ws.write(file.buffer);
      fileList.push(url);
    }
    return success([...fileList]);
  }
}

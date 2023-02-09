import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends CreatePermissionDto {
  @ApiProperty({
    name: 'id',
    description: '权限id',
    minimum: 1,
    example: 1,
  })
  @Min(1, { message: '权限id必须大于0' })
  id: number;
}

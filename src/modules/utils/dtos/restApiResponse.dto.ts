import { ApiProperty } from '@nestjs/swagger';

export class RestApiResponse {
  constructor(
    data: any,
    httpStatus = 200,
    message: any = 'Success',
    errors: string = undefined,
  ) {
    this.statusCode = httpStatus;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }

  @ApiProperty({ type: 'number' })
  statusCode: number;

  message: any;

  errors: string;

  data: any;
}

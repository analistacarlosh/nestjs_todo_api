import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PaginationDto {
  constructor(
    selectedPage: number,
    pageCount: number,
    pageSize: number,
    dataCount: number,
  ) {
    this.pageNumber = Number(selectedPage);
    this.totalRowCount = Math.ceil(pageCount / pageSize);
    this.pageSize = Number(pageSize);
    this.dataCount = Number(dataCount);
  }

  @ApiProperty({ type: 'number' })
  pageNumber: number;

  @ApiProperty({ type: 'number' })
  totalRowCount: number;

  @ApiProperty({ type: 'number' })
  dataCount: number;

  @ApiProperty({ type: 'number' })
  pageSize: number;
}

export class ErrorDto {
  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  code: string;
  message: string;
}

export class PaginatedResponse {
  constructor(
    data: any,
    pagination: PaginationDto,
    statusCode = 200,
    message = 'Success',
    title: string = null,
    errors: ErrorDto[] = null,
  ) {
    if (title === null && errors === null) {
      this.statusCode = statusCode;
      this.pagination = pagination;
      this.data = data;
      this.message = message;
    } else {
      this.message = null;
      this.title = title;
      this.errors = errors;
    }
  }

  data: any;

  @ApiProperty({ type: 'number', example: 200 })
  statusCode: number;

  @ApiProperty({ type: 'string', example: 'Success' })
  message: string;

  @ApiProperty({ allOf: [{ $ref: getSchemaPath(PaginationDto) }] })
  pagination: PaginationDto;

  title: string;

  errors: ErrorDto[];
}

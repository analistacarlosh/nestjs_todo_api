import { getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponse } from '../dtos/paginatedResponse.dto';
import { RestApiResponse } from '../dtos/restApiResponse.dto';

export class SwaggerDocumentationHelper {
  static SimpleOkResponseSchema = {
    allOf: [
      { $ref: getSchemaPath(RestApiResponse) },
      {
        properties: {
          statusCode: { type: 'number', example: 200 },
          message: { type: 'string', example: 'Success' },
        },
      },
    ],
  };

  static ForbiddenResponse = {
    allOf: [
      { $ref: getSchemaPath(RestApiResponse) },
      {
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'string', example: 'Forbidden resource' },
          error: { type: 'string', example: 'Forbidden' },
        },
      },
    ],
  };

  static ObjectDoesNotExistSchema(message: string) {
    return {
      allOf: [
        { $ref: getSchemaPath(RestApiResponse) },
        {
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: { type: 'string', example: message },
          },
        },
      ],
    };
  }

  static OkResponseObjectArraySchema(ref: string) {
    return {
      allOf: [
        { $ref: getSchemaPath(RestApiResponse) },
        {
          properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Success' },
            data: { type: 'array', items: { $ref: ref } },
          },
        },
      ],
    };
  }

  static OkResponseObjectSchema(ref: string) {
    return {
      allOf: [
        { $ref: getSchemaPath(RestApiResponse) },
        {
          properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Success' },
            data: { $ref: ref },
          },
        },
      ],
    };
  }

  static OkResponsePaginationSchema(ref: string) {
    return {
      allOf: [
        { $ref: getSchemaPath(PaginatedResponse) },
        {
          properties: {
            data: { type: 'array', items: { $ref: ref } },
          },
        },
      ],
    };
  }
}

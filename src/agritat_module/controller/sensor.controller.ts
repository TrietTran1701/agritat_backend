import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  Req,
  Get,
  Query,
  Put,
} from '@nestjs/common';
import { query, Request } from 'express';
import { CreateSensorReq, UpdateSensorReq } from '../request';
import { AuthMiddleware } from '../../nmd_core/common/middlewares/bearer.middleware';
import { ValidationPipe } from '../../nmd_core/common/pipes/validation.pipe';
import { ReturnInternalServerError } from '../../nmd_core/common/utils/custom.error';
import { PagingPipe } from '../../nmd_core/common/pipes/paging.pipe';
import { SensorService } from '../service/sensor.service';

@Controller('/sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {} // private readonly authMiddleWare: AuthMiddleware, // private readonly productService: ProductService,

  @Post('/create')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createSensor(
    @Req() req: Request,
    @Body() createSensorReq: CreateSensorReq,
  ) {
    try {
      const res = await this.sensorService.create(createSensorReq);

      return {
        statusCode: 200,
        message: 'Create sensor successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('')
  async getSensor(
    @Req() req: Request,
    // @Body() createSensorReq: CreateSensorReq,
    @Query() query,
  ) {
    try {
      const res = await this.sensorService.getById(query.id);

      return {
        statusCode: 200,
        message: 'Get sensor successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('/all')
  async getSensorsByOwnerId(@Req() req: Request, @Query() query) {
    try {
      const res = await this.sensorService.getByOwnerId(query.ownerId);
      return {
        statusCode: 200,
        message: 'Get sensors successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Put('/update')
  async updateOwner(
    @Req() req: Request,
    @Body() updateProductReq: UpdateSensorReq,
  ) {
    // await this.authMiddleWare.validateBearer(req);

    try {
      const res = await this.sensorService.updateSensor(updateProductReq);
      return {
        statusCode: 200,
        message: 'Update sensors successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }
}

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
import { CreatePlantReq, UpdatePlantReq } from '../request';
import { AuthMiddleware } from '../../nmd_core/common/middlewares/bearer.middleware';
import { ValidationPipe } from '../../nmd_core/common/pipes/validation.pipe';
import { ReturnInternalServerError } from '../../nmd_core/common/utils/custom.error';
import { PagingPipe } from '../../nmd_core/common/pipes/paging.pipe';
import { PlantService } from '../service/plant.service';

@Controller('/plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {} // private readonly authMiddleWare: AuthMiddleware, // private readonly productService: ProductService,

  @Post('/create')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createPlant(
    @Req() req: Request,
    @Body() createPlantReq: CreatePlantReq,
  ) {
    try {
      const res = await this.plantService.create(createPlantReq);

      return {
        statusCode: 200,
        message: 'Create plant successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('')
  async getPlant(
    @Req() req: Request,
    // @Body() createPlantReq: CreatePlantReq,
    @Query() query,
  ) {
    try {
      const res = await this.plantService.getById(query.id);

      return {
        statusCode: 200,
        message: 'Get plant successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('/all')
  async getPlantsByOwnerId(@Req() req: Request, @Query() query) {
    try {
      const res = await this.plantService.getByOwnerId(query.ownerId);
      return {
        statusCode: 200,
        message: 'Get plants successfully',
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
    @Body() updateProductReq: UpdatePlantReq,
  ) {
    // await this.authMiddleWare.validateBearer(req);

    try {
      const res = await this.plantService.updatePlant(updateProductReq);
      return {
        statusCode: 200,
        message: 'Update plants successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }
}

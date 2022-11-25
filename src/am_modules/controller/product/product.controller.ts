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
import { CreateProductReq, UpdateProductReq } from '../../request';
import { AuthMiddleware } from '../../../nmd_core/common/middlewares/bearer.middleware';
import { ValidationPipe } from '../../../nmd_core/common/pipes/validation.pipe';
import { ReturnInternalServerError } from '../../../nmd_core/common/utils/custom.error';
import { ProductService } from '../../../am_modules/service/product.service';
import { PagingPipe } from '../../../nmd_core/common/pipes/paging.pipe';

@Controller('/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly authMiddleWare: AuthMiddleware,
  ) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createProduct(
    @Req() req: Request,
    @Body() createProductReq: CreateProductReq,
  ) {
    try {
      const res = await this.productService.createProduct(createProductReq);

      return {
        statusCode: 200,
        message: 'Create product successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('')
  async getSubVideoByVideoId(@Req() req: Request, @Query() query) {
    // await this.authMiddleWare.validateBearer(req);

    try {
      const res = await this.productService.scanProductInfo(query);
      return {
        statusCode: 200,
        message: 'get product successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Put('')
  async updateOwner(
    @Req() req: Request,
    @Body() updateProductReq: UpdateProductReq,
  ) {
    // await this.authMiddleWare.validateBearer(req);

    try {
      const res = await this.productService.updateOwner(updateProductReq);
      return {
        statusCode: 200,
        message: 'Update product successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }
}

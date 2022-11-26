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
import { CreateButtonReq, UpdateButtonStatusReq } from '../request';
import { AuthMiddleware } from '../../nmd_core/common/middlewares/bearer.middleware';
import { ValidationPipe } from '../../nmd_core/common/pipes/validation.pipe';
import { ReturnInternalServerError } from '../../nmd_core/common/utils/custom.error';
import { PagingPipe } from '../../nmd_core/common/pipes/paging.pipe';
import { ButtonService } from '../service/button.service';

@Controller('/button')
export class ButtonController {
  constructor(private readonly buttonService: ButtonService) {} // private readonly authMiddleWare: AuthMiddleware, // private readonly productService: ProductService,

  @Post('/create')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createButton(
    @Req() req: Request,
    @Body() createButtonReq: CreateButtonReq,
  ) {
    try {
      const res = await this.buttonService.createButton(createButtonReq);

      return {
        statusCode: 200,
        message: 'Create button successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('')
  async getButton(
    @Req() req: Request,
    // @Body() createButtonReq: CreateButtonReq,
    @Query() query,
  ) {
    try {
      const res = await this.buttonService.getById(query.id);

      return {
        statusCode: 200,
        message: 'Get button successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }

  @Get('/all')
  async getButtonsByOwnerId(@Req() req: Request, @Query() query) {
    try {
      const res = await this.buttonService.getByOwnerId(query.ownerId);
      return {
        statusCode: 200,
        message: 'Get buttons successfully',
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
    @Body() updateProductReq: UpdateButtonStatusReq,
  ) {
    // await this.authMiddleWare.validateBearer(req);

    try {
      const res = await this.buttonService.updateButtonStatus(updateProductReq);
      return {
        statusCode: 200,
        message: 'Update button successfully',
        data: res,
      };
    } catch (error) {
      if (error.status) throw error;
      else throw ReturnInternalServerError(error);
    }
  }
}

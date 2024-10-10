import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { CreateProductDto } from "./dtos/create-product.dto";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { ProductDetailsDto } from "./dtos/product-details.dto";
import { GetProductsDto } from "./dtos/get-products.dto";
@Controller("products")
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  @Get()
  async getProducts(@Query("page") page: string | undefined) {
    const pageNumber = Number(page) || 1;
    const pageSize = 4;
    const [products, total] = await this.productsService.findAndCount(
      pageSize,
      pageNumber,
    );
    return new GetProductsDto({
      products,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    });
  }
  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  async getProduct(@Param("id", ParseIntPipe) id: number) {
    const product = await this.productsService.findOneByWithReviewsJoinUser({
      id,
    });
    if (!product) {
      throw new NotFoundException("product not found");
    }
    return new ProductDetailsDto(product);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  createProduct(
    @Body() body: CreateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpg|jpeg|png/,
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          exceptionFactory: () => "invalid file type",
        }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    const SERVER_URL = this.configService.getOrThrow<string>("SERVER_URL");
    const image = SERVER_URL + "/" + file.path.replace("\\", "/");
    return this.productsService.createProduct({ ...body, image, user });
  }

  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Patch("/:id")
  updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: CreateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpg|jpeg|png/,
        })

        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          exceptionFactory: (error) => {
            throw new UnprocessableEntityException(error);
          },
          fileIsRequired: false,
        }),
    )
    file: Express.Multer.File | undefined,
  ) {
    let image: string | null = null;
    if (file) {
      const SERVER_URL = this.configService.getOrThrow<string>("SERVER_URL");
      image = SERVER_URL + "/" + file.path.replace("\\", "/");
    }

    const updateProductInfo = image ? { ...body, image } : body;
    return this.productsService.updateProduct(id, updateProductInfo);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete("/:id")
  deleteProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.removeProduct(id);
  }
}

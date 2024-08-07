import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ProductsModule,
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}.local`, // set the NODE_ENV in the cli commands in package.json
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

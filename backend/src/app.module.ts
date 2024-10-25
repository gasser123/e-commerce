import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ReviewsModule } from "./reviews/reviews.module";
import { UsersModule } from "./users/users.module";
import { OrdersModule } from "./orders/orders.module";
import { OrderItemsModule } from "./order-items/order-items.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { PaypalConfigModule } from "./paypal-config/paypal-config.module";
import * as cookieParser from "cookie-parser";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
          ? `.env.${process.env.NODE_ENV}.local`
          : ".env", // set the NODE_ENV in the cli commands in package.json
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          synchronize: false,
          type: "postgres",
          database: config.get<string>("POSTGRES_DB"),
          host: config.get<string>("POSTGRES_HOST"),
          username: config.get<string>("POSTGRES_USER"),
          password: config.get<string>("POSTGRES_PASSWORD"),
          entities: ["**/*.entity.js"],
          migrations: ["migrations/*.js"],
        };
      },
    }),
    ProductsModule,
    ReviewsModule,
    UsersModule,
    OrdersModule,
    OrderItemsModule,
    AuthModule,
    PaypalConfigModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "uploads"),
      serveRoot: "/uploads/",
      serveStaticOptions: { index: false },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*"); // * indicates that this middleware should be applied to all routes
  }
}

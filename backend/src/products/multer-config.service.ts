import { Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from "@nestjs/platform-express";
import * as multer from "multer";
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, callBack) => {
          callBack(null, "uploads");
        },
        //defines how the file should be named
        filename: (req, file, callBack) => {
          callBack(null, crypto.randomUUID() + "-" + file.originalname);
        },
      }),
    };
  }
}

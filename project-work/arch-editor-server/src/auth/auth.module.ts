import { Module } from '@nestjs/common';
import * as fromControllers from './controllers';
import * as fromServices from './services';

@Module({
  controllers: [...fromControllers.controllers],
  providers: [...fromServices.services],
  exports: [...fromServices.services],
})
export class AuthModule {}

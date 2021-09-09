import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import * as fromControllers from './controllers';
import * as fromServices from './services';

@Module({
	imports: [AuthModule],
	controllers: [...fromControllers.controllers],
	providers: [...fromServices.services],
})
export class ProjectModule { }

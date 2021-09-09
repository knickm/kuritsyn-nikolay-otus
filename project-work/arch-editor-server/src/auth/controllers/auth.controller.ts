import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { IResponseMessage } from 'src/core/models';
import { b64DecodeUnicode } from 'src/core/util/base64';
import { IUserDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';

@Controller('authorize')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Get()
	authorize(@Headers('authorization') authorization: string): IUserDto | IResponseMessage {
		const astr = authorization.replace(/^Basic\s+/, '');
		const lp = b64DecodeUnicode(astr).split(':');
		const user = this.authService.userInfo(lp[0]);
		if (user && user.password === lp[1]) {
			return user;
		}
		return {
			success: false,
			message: 'Bad password'
		}
	}
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { b64DecodeUnicode } from './core/util/base64';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) { }

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		if (request.headers['authorization']) {
			const astr = request.headers['authorization'].replace(/^Basic\s+/, '');
			const lp = b64DecodeUnicode(astr).split(':');
			return this.authService.userInfo(lp[0]) != null;
		}
		return false;
	}
}

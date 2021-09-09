import { Injectable } from '@nestjs/common';
import { IUserDto } from '../dto/user.dto';

const USERS: Array<IUserDto> = [
	{
		id: 123,
		login: 'demo',
		password: 'demo'
	},
];

@Injectable()
export class AuthService {
	userInfo(login: string): IUserDto {
		const user = USERS.find((u) => u.login === login);
		return user;
	}
}

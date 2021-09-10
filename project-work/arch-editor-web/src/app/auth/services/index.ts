import { AuthService } from './auth.service';
import { LoginService } from './login.service';

export const services = [
	AuthService,
	LoginService,
];

export * from './token.interceptor';

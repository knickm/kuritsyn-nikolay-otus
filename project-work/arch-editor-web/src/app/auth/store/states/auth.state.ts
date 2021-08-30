import { IAuthParams, IUser } from 'src/app/core/models/user';
import { IResponseMessage } from 'src/app/core/interfaces';

export interface IAuthState {
	user: IUser | null;
	params: IAuthParams | null;
	loading: boolean;
	error: IResponseMessage | null;
	message: string | IResponseMessage | null;
}

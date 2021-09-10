export enum UserRole {
	head,
	secretary,
	member
}

type CMRoleList = { [id in UserRole]: string };

const UserRoleMap: CMRoleList = {
	[UserRole.head]: 'Руководитель',
	[UserRole.secretary]: 'Секретарь',
	[UserRole.member]: 'Член комиссии',
};

export const getUserRoleName = (role: UserRole): string => UserRoleMap[role] || 'роль не указана';


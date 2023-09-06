import { useMsal } from '@azure/msal-react';

export const useAdminUserRole = () => {
	const { instance } = useMsal();
	const ADMIN_NAME = 'super_user';

	const user = instance.getActiveAccount();

	return user?.idTokenClaims?.roles?.includes(ADMIN_NAME);
};

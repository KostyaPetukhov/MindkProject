import { createContext } from 'react';

const authContext = createContext({
	authData: {},
	setAuthData: () => {},
});

export default authContext;

import { createContext } from 'react';

const authContext = createContext({
	isAuth: false,
	user: null,
});

export default authContext;

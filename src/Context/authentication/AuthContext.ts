import { createContext } from 'react';
import { Auth } from './model';

const AuthContext = createContext<Partial<Auth>>({});

export default AuthContext;

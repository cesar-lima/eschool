import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../services/api';

interface User{
    nome: string;
    id: number
    tipo_usuario: {id: number, nome: string}
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    senha: string;
}

interface AuthContextData {
    user: User;
    token: string
    signIn(credencials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

const AuthProvider: React.FC = ({ children }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Eschool:token');
        const user = localStorage.getItem('@Eschool:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, senha }) => {
        const response = await api.post('api/signin',{
            email,
            senha,
        });

        const { token, user } = response.data;

        localStorage.setItem('@Eschool:token', token);
        localStorage.setItem('@Eschool:user', JSON.stringify(user));

        setData({ token, user,  });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Eschool:token');
        localStorage.removeItem('@Eschool:user');
        navigate('/login')

        setData({} as AuthState);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be user within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
import type { User } from "interfaces/User";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextType } from "types/AuthContextType";
import { LOGIN_QUERY } from "queries/login";
import { fetcher, fetchGraphQl } from "lib/fetcher";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

interface LoginResponse {
    login: {
        accessToken: string;
        user: User;
    }
}

interface Autentication {
    auth: {
        email: string;
        password: string;
    }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = sessionStorage.getItem('auth_token');
        const savedUser = sessionStorage.getItem('auth_user');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);

        try {

            const data = await fetchGraphQl<LoginResponse, Autentication>(LOGIN_QUERY, { auth :{ email, password }});

            if (!data?.login) {
                throw new Error('Error');
            }

            const { accessToken, user } = data.login;

            sessionStorage.setItem('auth_token', accessToken);
            sessionStorage.setItem('auth_user', JSON.stringify(user));

            setToken(accessToken);
            setUser(user);
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = (): void => {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_user');
        setToken(null);
        setUser(null);
    };


    const value: AuthContextType = useMemo(
        () => ({
            user,
            token,
            login,
            logout,
            isAuthenticated: !!token && !!user,
            isLoading,
        }),
        [user, token, login, logout, isLoading] // dependencias
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
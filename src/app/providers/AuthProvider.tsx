'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { User, LoginCredentials, AuthContextType } from '@/types/auth';
import { LOGIN_QUERY } from '@/queries/login';
import SessionStorage, { TTL } from '@/lib/SessionStorage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const token = SessionStorage.getItem('auth_token');
        const userData = SessionStorage.getItem('user_data');
        console.log("TOKEN", token);
        console.log("USERDATA", userData);
        
        // TODO - Validar....
        if (token && userData) {
            try {
                setUser(userData);
            } catch (error) {
                console.error(error);
                SessionStorage.removeItem('auth_token');
                SessionStorage.removeItem('user_data');
            }
        }

        setIsLoading(false);
    }, []);

    const login = async (auth: LoginCredentials): Promise<void> => {
        setIsLoading(true);

        try {
            
            const response = await fetch('http://127.9.0.1:3000/graphql/v1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    query: LOGIN_QUERY,
                    variables: { auth },
                }),
            });

            const data = await response.json();

            if (data.errors) {
                throw new Error(data.errors[0].message);
            }

            const { accessToken: token, user: userData } = data?.data.login;
            
            SessionStorage.setItem({
                key: 'auth_token',
                value: token,
                ttlInMinutes: TTL
            });

            SessionStorage.setItem({
                key: 'user_data',
                value: userData,
                ttlInMinutes: TTL
            });

            setUser(userData);

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        SessionStorage.removeItem('auth_token');
        SessionStorage.removeItem('user_data');
        setUser(null);
    };

    const value = useMemo<AuthContextType>(
        () => ({
            user,
            isLoading,
            login,
            logout,
            isAuthenticated: !!user,
        }),
    [user, isLoading, login, logout])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
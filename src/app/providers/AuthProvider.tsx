'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { User, LoginCredentials, AuthContextType } from '@/types/auth';
import { LOGIN_QUERY } from '@/queries/login';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('auth_token');
        const userData = sessionStorage.getItem('user_data');

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error(error);
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('user_data');
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

            const { token, user: userData } = data.data.login;

            sessionStorage.setItem('auth_token', token);
            sessionStorage.setItem('user_data', JSON.stringify(userData));

            setUser(userData);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('user_data');
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
'use client';

import React from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import AuthGuard from '@/components/AuthGuard';

function DashboardContent() {
  const { user, logout } = useAuth();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-white">
              Reserva de Habitaciones
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Hola, {user?.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Dashboard
          </h2>
          <p className="text-gray-400">
            Bienvenido al sistema de reserva de habitaciones. 
            Aquí podrás gestionar tus reservas y ver las habitaciones disponibles.
          </p>

          {/* Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-900 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-200">Mis Reservas</h3>
              <p className="text-blue-300 text-sm mt-1">
                Ver y gestionar reservas
              </p>
            </div>

            <div className="bg-green-900 p-4 rounded-lg">
              <h3 className="font-semibold text-green-200">Habitaciones</h3>
              <p className="text-green-300 text-sm mt-1">
                Explorar habitaciones disponibles
              </p>
            </div>

            <div className="bg-purple-900 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-200">Mi Perfil</h3>
              <p className="text-purple-300 text-sm mt-1">
                Configurar mi cuenta
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
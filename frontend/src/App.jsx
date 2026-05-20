import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { TimerProvider } from './contexts/TimerContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { MusicProvider } from './contexts/MusicContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Goals } from './pages/Goals';
import { Timer } from './pages/Timer';
import { Gym } from './pages/Gym';
import { Journal } from './pages/Journal';
import { Analytics } from './pages/Analytics';
import { Character } from './pages/Character';
import { Settings } from './pages/Settings';
import { WallOfShame } from './pages/WallOfShame';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

const queryClient = new QueryClient();
window.queryClient = queryClient;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <TimerProvider>
            <MusicProvider>
              <Router>
                <Routes>
                  {/* Public Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected OS Cockpit Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="tasks" element={<Tasks />} />
                      <Route path="goals" element={<Goals />} />
                      <Route path="timer" element={<Timer />} />
                      <Route path="gym" element={<Gym />} />
                      <Route path="journal" element={<Journal />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="rpg" element={<Character />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="shame" element={<WallOfShame />} />
                    </Route>
                  </Route>
                </Routes>
              </Router>
            </MusicProvider>
          </TimerProvider>
        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
export { queryClient };

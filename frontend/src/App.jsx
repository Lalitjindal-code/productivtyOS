import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { TimerProvider } from './contexts/TimerContext';

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimerProvider>
        <Router>
          <Routes>
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
          </Routes>
        </Router>
      </TimerProvider>
    </QueryClientProvider>
  );
}

export default App;

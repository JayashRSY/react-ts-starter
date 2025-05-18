import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Layout components
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/Header';
import Loader from './components/Loader';
import AuthRoute from './components/AuthRoute';
import { Toaster } from 'sonner';

// Auth components

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<AuthRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Toaster position="top-right" />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

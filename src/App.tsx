import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout components
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/Header';
import Loader from './components/Loader';
import AuthRoute from './components/AuthRoute';

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
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ErrorBoundary>
  );
};

export default App;

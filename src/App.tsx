import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout components
import { ErrorBoundary } from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import Layout from "./components/layout/Layout";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));

// 404 Page
const NotFound = lazy(() => import("./pages/NotFound"));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 404 route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
        <Toaster position="top-right" />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

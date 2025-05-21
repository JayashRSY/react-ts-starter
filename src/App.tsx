import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Layout components
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));

// Bike rental pages
const BikesList = lazy(() => import('./pages/BikesList'));
const BikeDetails = lazy(() => import('./pages/BikeDetails'));
const Booking = lazy(() => import('./pages/Booking'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
// const Checkout = lazy(() => import('./pages/Checkout'));
// const BookingSuccess = lazy(() => import('./pages/BookingSuccess'));
// const ContactUs = lazy(() => import('./pages/ContactUs'));
// const FAQ = lazy(() => import('./pages/FAQ'));

// 404 Page
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarExpanded(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar 
            expanded={sidebarExpanded} 
            setExpanded={setSidebarExpanded} 
          />
          <div 
            className={`flex-1 transition-all duration-300 ${!isMobile ? 
              (sidebarExpanded ? "lg:ml-64" : "lg:ml-[70px]") : ""}`}
          >
            <Navbar />
            <main className="container mx-auto px-4 py-4">
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/bikes" element={<BikesList />} />
                  <Route path="/bikes/:bikeId" element={<BikeDetails />} />
                  {/* <Route path="/contact" element={<ContactUs />} />
                  <Route path="/faq" element={<FAQ />} /> */}
                  
                  {/* Protected routes - require authentication */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/booking/:bikeId" element={<Booking />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    {/* <Route path="/checkout" element={<Checkout />} /> */}
                    {/* <Route path="/booking-success" element={<BookingSuccess />} /> */}
                  </Route>
                  
                  {/* 404 route - must be last */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
        <Toaster position="top-right" />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

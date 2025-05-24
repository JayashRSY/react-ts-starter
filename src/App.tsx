import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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

// Lazy load dashboard feature modules
const DashboardLayout = lazy(
  () => import("@/pages/Dashboard/DashboardLayout")
);
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Calculators = lazy(
  () => import("@/pages/Dashboard/Calculators/index")
);
const MfCommission = lazy(
  () => import("@/pages/Dashboard/Calculators/MFCommission")
);
const TaxRegime = lazy(() => import("@/pages/Dashboard/Calculators/TaxRegime"));
const FloatingInterest = lazy(
  () => import("@/pages/Dashboard/Calculators/FloatingInterest")
);
const MfOverlap = lazy(() => import("@/pages/Dashboard/Calculators/MFOverlap"));
const SurrenderValue = lazy(
  () => import("@/pages/Dashboard/Calculators/SurrenderValue")
);
const RetirementCorpus = lazy(
  () => import("@/pages/Dashboard/Calculators/RetirementCorpus")
);
const LoanRefinance = lazy(
  () => import("@/pages/Dashboard/Calculators/LoanRefinance")
);
const InsuranceCommission = lazy(
  () => import("@/pages/Dashboard/Calculators/InsuranceCommission")
);
const IncreasingSIP = lazy(
  () => import("@/pages/Dashboard/Calculators/IncreasingSIP")
);
const HRAExemption = lazy(
  () => import("@/pages/Dashboard/Calculators/HRAExemption")
);
const NPSCalculator = lazy(
  () => import("@/pages/Dashboard/Calculators/NPSCalculator")
);

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

              {/* Dashboard routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="calculators" element={<Calculators />} />
                <Route
                  path="calculators/mf-commission"
                  element={<MfCommission />}
                />
                <Route path="calculators/tax-regime" element={<TaxRegime />} />
                <Route
                  path="calculators/floating-interest"
                  element={<FloatingInterest />}
                />
                <Route path="calculators/mf-overlap" element={<MfOverlap />} />
                <Route
                  path="calculators/surrender-value"
                  element={<SurrenderValue />}
                />
                <Route
                  path="calculators/retirement-corpus"
                  element={<RetirementCorpus />}
                />
                <Route
                  path="calculators/loan-refinance"
                  element={<LoanRefinance />}
                />
                <Route
                  path="calculators/insurance-commission"
                  element={<InsuranceCommission />}
                />
                <Route
                  path="calculators/increasing-sip"
                  element={<IncreasingSIP />}
                />
                <Route
                  path="calculators/hra-exemption"
                  element={<HRAExemption />}
                />
                <Route
                  path="calculators/nps-calculator"
                  element={<NPSCalculator />}
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
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

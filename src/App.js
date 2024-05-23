// src/App.js
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Loader from "./components/Loader";
import RestaurantRegister from "./components/RestaurantRegister";
import RestaurantLogin from "./components/RestaurantLogin";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <RegistrationForm />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/rest"
            element={
              <PublicRoute>
                <RestaurantRegister />
              </PublicRoute>
            }
          />
          <Route
            path="/rest/login"
            element={
              <PublicRoute>
                <RestaurantLogin />
              </PublicRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;

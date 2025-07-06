import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../contexts/SecurityContext";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
  // লগইন পেজে প্রটেকশন প্রয়োজন নেই
  const isLoginPage = router.pathname === "/login";

  return (
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          {isLoginPage ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;

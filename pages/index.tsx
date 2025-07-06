import React from "react";
import Head from "next/head";
import PhoneNumberFormatter from "../components/PhoneNumberFormatter";
import { useTheme } from "../contexts/SecurityContext";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { loginKey, logout } = useAuth();

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Head>
        <title>ফোন নম্বর ফরম্যাটার</title>
        <meta name="description" content="ফোন নম্বর ফরম্যাট করার সহজ টুল" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={`py-4 px-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } shadow-md`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ফোন নম্বর ফরম্যাটার</h1>
          <div className="flex items-center space-x-4">
            {loginKey && (
              <div className="text-sm">
                <span className="mr-2">লগইন কী:</span>
                <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {loginKey}
                </span>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              লগআউট
            </button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <PhoneNumberFormatter />
      </main>

      <footer
        className={`py-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} ফোন নম্বর ফরম্যাটার। সর্বস্বত্ব
            সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
}

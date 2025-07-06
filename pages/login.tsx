import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "../contexts/SecurityContext";

export default function Login() {
  const { isDarkMode } = useTheme();
  const [loginKey, setLoginKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // যদি ইউজার ইতিমধ্যে লগইন করা থাকে, তাহলে হোম পেজে রিডাইরেক্ট করুন
    const storedKey = localStorage.getItem("loginKey");
    if (storedKey) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (loginKey === "bb" || loginKey === "rr") {
      localStorage.setItem("loginKey", loginKey);
      router.replace("/").catch(console.error); // router.push() এর পরিবর্তে router.replace() ব্যবহার করুন
    } else {
      setError("অবৈধ লগইন কী। দয়া করে আবার চেষ্টা করুন।");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } flex flex-col justify-center py-12 sm:px-6 lg:px-8`}
    >
      <Head>
        <title>লগইন - ফোন নম্বর ফরম্যাটার</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          ফোন নম্বর ফরম্যাটারে লগইন করুন
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="loginKey" className="block text-sm font-medium">
                লগইন কী
              </label>
              <div className="mt-1">
                <input
                  id="loginKey"
                  name="loginKey"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginKey}
                  onChange={e => setLoginKey(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-2 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  ব্যবহারের নির্দেশনা
                </span>
              </div>
            </div>

            <div className="mt-6 text-sm text-center">
              <p>লগইন করতে 'bb' অথবা 'rr' কী ব্যবহার করুন।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

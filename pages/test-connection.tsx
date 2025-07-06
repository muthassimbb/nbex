import React, { useState, useEffect } from "react";
import { supabase, testSupabaseConnection } from "../utils/supabase";
import Head from "next/head";
import { useAuth } from "../contexts/AuthContext";

export default function TestConnection() {
  const { loginKey } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<string>(
    "পরীক্ষা করা হচ্ছে..."
  );
  const [testResult, setTestResult] = useState<any>(null);
  const [testNumber, setTestNumber] = useState<string>("123456789");
  const [insertResult, setInsertResult] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    checkConnection();
    loadTableData();
  }, [loginKey]);

  const checkConnection = async () => {
    try {
      const result = await testSupabaseConnection();
      setTestResult(result);
      setConnectionStatus(result.success ? "সংযোগ সফল" : "সংযোগ ব্যর্থ");
    } catch (error) {
      console.error("Connection test error:", error);
      setConnectionStatus("সংযোগ পরীক্ষা করতে ত্রুটি");
      setTestResult({ success: false, error });
    }
  };

  const loadTableData = async () => {
    try {
      let query = supabase
        .from("phone_numbers")
        .select("*")
        .order("created_at", { ascending: false });

      if (loginKey) {
        query = query.eq("login_key", loginKey);
      }

      const { data, error } = await query.limit(10);

      if (error) {
        console.error("Error loading data:", error);
      } else {
        setTableData(data || []);
      }
    } catch (error) {
      console.error("Unexpected error loading data:", error);
    }
  };

  const handleTestInsert = async () => {
    if (!loginKey) {
      setInsertResult({ status: "ব্যর্থ", error: "লগইন কী নেই" });
      return;
    }

    try {
      setInsertResult({ status: "অপেক্ষা করুন..." });

      const { data, error } = await supabase.from("phone_numbers").insert([
        {
          number: testNumber,
          login_key: loginKey,
        },
      ]);

      if (error) {
        console.error("Insert error:", error);
        setInsertResult({ status: "ব্যর্থ", error });
      } else {
        setInsertResult({ status: "সফল", data });
        loadTableData();
      }
    } catch (error) {
      console.error("Unexpected insert error:", error);
      setInsertResult({ status: "ত্রুটি", error });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Head>
        <title>Supabase কানেকশন টেস্ট</title>
      </Head>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Supabase কানেকশন টেস্ট
          </h1>

          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">লগইন স্ট্যাটাস</h2>
              <div className="text-lg font-medium">
                {loginKey ? (
                  <div className="text-green-600">লগইন কী: {loginKey}</div>
                ) : (
                  <div className="text-red-600">লগইন করা নেই</div>
                )}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">কানেকশন স্ট্যাটাস</h2>
              <div
                className={`text-lg font-medium ${
                  connectionStatus === "সংযোগ সফল"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {connectionStatus}
              </div>

              <div className="mt-2">
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>

              <button
                onClick={checkConnection}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                আবার পরীক্ষা করুন
              </button>
            </div>

            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">ডাটা ইনসার্ট টেস্ট</h2>
              <div className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={testNumber}
                  onChange={e => setTestNumber(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="টেস্ট নম্বর"
                />
                <button
                  onClick={handleTestInsert}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  disabled={!loginKey}
                >
                  ইনসার্ট টেস্ট
                </button>
              </div>

              {insertResult && (
                <div className="mt-2">
                  <div
                    className={`font-medium ${
                      insertResult.status === "সফল"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    স্ট্যাটাস: {insertResult.status}
                  </div>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40 mt-2">
                    {JSON.stringify(insertResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                টেবিল ডাটা ({tableData.length})
              </h2>

              {tableData.length > 0 ? (
                <div className="overflow-auto max-h-60">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">নম্বর</th>
                        <th className="p-2 text-left">লগইন কী</th>
                        <th className="p-2 text-left">তারিখ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map(item => (
                        <tr key={item.id} className="border-t">
                          <td className="p-2 text-sm font-mono">
                            {item.id.substring(0, 8)}...
                          </td>
                          <td className="p-2 font-medium">{item.number}</td>
                          <td className="p-2">{item.login_key || "N/A"}</td>
                          <td className="p-2 text-sm text-gray-600">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 italic">কোন ডাটা নেই</div>
              )}

              <button
                onClick={loadTableData}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                রিফ্রেশ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

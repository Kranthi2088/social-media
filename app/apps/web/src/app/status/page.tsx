"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface ServiceStatus {
  name: string;
  url: string;
  port: string;
  icon: string;
  status: "online" | "offline" | "checking";
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Auth Service", url: "http://localhost:3001", port: "3001", icon: "🔐", status: "checking" },
    { name: "Users Service", url: "http://localhost:3002", port: "3002", icon: "👥", status: "checking" },
    { name: "Posts Service", url: "http://localhost:3003", port: "3003", icon: "📝", status: "checking" },
    { name: "Media Service", url: "http://localhost:3004", port: "3004", icon: "📸", status: "checking" },
    { name: "Feed Service", url: "http://localhost:3005", port: "3005", icon: "📰", status: "checking" },
  ]);
  const [isChecking, setIsChecking] = useState(false);

  const checkServiceStatus = async (service: ServiceStatus): Promise<"online" | "offline" | "checking"> => {
    try {
      const response = await fetch(service.url, { 
        method: 'GET',
        mode: 'no-cors' // This will work for same-origin requests
      });
      return "online";
    } catch (error) {
      return "offline";
    }
  };

  const checkAllServices = async () => {
    setIsChecking(true);
    
    const updatedServices = await Promise.all(
      services.map(async (service) => {
        const status = await checkServiceStatus(service);
        return { ...service, status };
      })
    );
    
    setServices(updatedServices);
    setIsChecking(false);
  };

  useEffect(() => {
    checkAllServices();
    
    // Check every 30 seconds
    const interval = setInterval(checkAllServices, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "border-green-200 bg-green-50";
      case "offline":
        return "border-red-200 bg-red-50";
      default:
        return "border-yellow-200 bg-yellow-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "offline":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      default:
        return "Checking...";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialConnect
              </span>
            </div>
            <button
              onClick={checkAllServices}
              disabled={isChecking}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Service Status Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Real-time status of all SocialConnect microservices
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-6 shadow-md border ${getStatusColor(service.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{service.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                </div>
                {getStatusIcon(service.status)}
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Port:</span> {service.port}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Status:</span> {getStatusText(service.status)}
                </p>
                <a 
                  href={service.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Service →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🗄️</span>
              <h3 className="text-lg font-semibold text-gray-800">PostgreSQL Database</h3>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Port:</span> 5432
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Status:</span> Online (via Docker)
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Database:</span> social_media
            </p>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><span className="font-medium">Environment:</span> Development</p>
              <p><span className="font-medium">Architecture:</span> Microservices</p>
              <p><span className="font-medium">Containerization:</span> Docker</p>
            </div>
            <div>
              <p><span className="font-medium">Last Updated:</span> {new Date().toLocaleString()}</p>
              <p><span className="font-medium">Auto Refresh:</span> Every 30 seconds</p>
              <p><span className="font-medium">Total Services:</span> 5 + Database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

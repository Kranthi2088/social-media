import Link from "next/link";
import { Heart, MessageCircle, Share2, Users, Globe, Shield, CheckCircle, AlertCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SocialConnect
          </span>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/status"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Status
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Connect with the World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your moments, discover amazing stories, and build meaningful connections with people around the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Service Status Section */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🚀 Service Status
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">🔐 Auth Service</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-2">localhost:3001</p>
              <a 
                href="http://localhost:3001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Service →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">👥 Users Service</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-2">localhost:3002</p>
              <a 
                href="http://localhost:3002" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Service →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">📝 Posts Service</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-2">localhost:3003</p>
              <a 
                href="http://localhost:3003" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Service →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">📸 Media Service</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-2">localhost:3004</p>
              <a 
                href="http://localhost:3004" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Service →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">📰 Feed Service</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-2">localhost:3005</p>
              <a 
                href="http://localhost:3005" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Service →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">🗄️ Database</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-gray-600 mb-2">PostgreSQL:5432</p>
              <span className="text-gray-500 text-sm">Database running</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose SocialConnect?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Global Community</h3>
              <p className="text-gray-600">
                Connect with millions of users worldwide and discover diverse perspectives and cultures.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Share Everything</h3>
              <p className="text-gray-600">
                Share photos, videos, stories, and thoughts with your friends and followers instantly.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Privacy First</h3>
              <p className="text-gray-600">
                Your privacy and security are our top priorities. Control who sees your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Join Our Growing Community
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-blue-100">Posts Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join millions of people who are already sharing their world on SocialConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SocialConnect</span>
            </div>
            <div className="flex space-x-6 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SocialConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

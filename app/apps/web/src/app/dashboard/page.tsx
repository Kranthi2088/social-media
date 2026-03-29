"use client";

import Link from "next/link";
import { MessageSquare, Image, Users, Activity } from "lucide-react";

export default function Dashboard() {
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
            href="/posts"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Posts
          </Link>
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

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your social media presence, create engaging content, and connect with your audience.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            href="/posts"
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Post</h3>
            <p className="text-gray-600 text-sm">
              Share your thoughts, images, and stories with your followers.
            </p>
          </Link>

          <Link
            href="/posts"
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Image className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Media</h3>
            <p className="text-gray-600 text-sm">
              Upload and share photos with your community.
            </p>
          </Link>

          <Link
            href="/posts"
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View Feed</h3>
            <p className="text-gray-600 text-sm">
              See what's happening in your social network.
            </p>
          </Link>

          <Link
            href="/status"
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Status</h3>
            <p className="text-gray-600 text-sm">
              Check the status of all services and APIs.
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Posts Service</p>
                <p className="text-sm text-gray-600">Ready to create and manage your posts</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Image className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Media Storage</p>
                <p className="text-sm text-gray-600">MongoDB configured for image storage</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Database</p>
                <p className="text-sm text-gray-600">PostgreSQL ready for post metadata</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            href="/posts"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Creating Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

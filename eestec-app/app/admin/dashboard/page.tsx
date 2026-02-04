'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, Calendar, Tag, MapPin, BookOpen } from 'lucide-react';
import AdminNav from '@/components/AdminNav';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const sections = [
    {
      icon: Calendar,
      title: 'Events',
      description: 'Manage EESTEC events and announcements',
      href: '/admin/events',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Tag,
      title: 'Discounts',
      description: 'Create and manage partner discounts',
      href: '/admin/discounts',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: BookOpen,
      title: 'Members',
      description: 'Manage member profiles and data',
      href: '/admin/members',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: MapPin,
      title: 'Location & Info',
      description: 'Configure office info and general settings',
      href: '/admin/settings',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo-red.png" alt="EESTEC" className="h-10 w-auto" />
            <div>
              <h1 className="text-3xl font-bold text-eestec-dark">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage all EESTEC LC Sarajevo content and members</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-eestec-red hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <a
                key={index}
                href={section.href}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 block group"
              >
                <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-eestec-dark mb-1">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </a>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-eestec-dark mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">Total Members</p>
              <p className="text-3xl font-bold text-eestec-red">0</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">Upcoming Events</p>
              <p className="text-3xl font-bold text-eestec-red">0</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-2">Active Discounts</p>
              <p className="text-3xl font-bold text-eestec-red">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

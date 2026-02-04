'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import AdminNav from '@/components/AdminNav';
import type { Discount } from '@/lib/types';

export default function DiscountsManagement() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    percentage: '',
    location: '',
    category: '',
    expiryDate: '',
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) router.push('/admin/login');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = editingId 
        ? `/api/admin/discounts/${editingId}` 
        : '/api/admin/discounts';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          title: '',
          description: '',
          percentage: '',
          location: '',
          category: '',
          expiryDate: '',
        });
        setEditingId(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving discount:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eestec-dark">Discounts Management</h1>
            <p className="text-gray-600 mt-2">Create and manage partner discounts for members</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-eestec-red text-white rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5" />
            New Discount
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="E.g., Coffee Shop Discount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="Discount details..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Discount %
                  </label>
                  <input
                    type="number"
                    value={formData.percentage}
                    onChange={(e) =>
                      setFormData({ ...formData, percentage: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="E.g., 15"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="food">Food & Beverage</option>
                    <option value="retail">Retail</option>
                    <option value="tech">Tech & Electronics</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Location/Business Name
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="Business name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Expiry Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-eestec-red text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                >
                  {editingId ? 'Update Discount' : 'Create Discount'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      title: '',
                      description: '',
                      percentage: '',
                      location: '',
                      category: '',
                      expiryDate: '',
                    });
                  }}
                  className="flex-1 bg-gray-200 text-eestec-dark font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Discounts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discounts.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg">
              No discounts yet. Create your first discount!
            </div>
          ) : (
            discounts.map((discount) => (
              <div key={discount.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-eestec-dark">{discount.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{discount.partnerName}</p>
                  </div>
                  <span className="badge-primary text-lg font-bold">
                    {discount.discountPercentage}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{discount.description}</p>
                <div className="flex gap-2">
                  <button className="flex-1 p-2 hover:bg-gray-100 rounded-lg transition">
                    <Edit2 className="w-4 h-4 inline mr-2" />
                    Edit
                  </button>
                  <button className="flex-1 p-2 hover:bg-red-50 rounded-lg transition">
                    <Trash2 className="w-4 h-4 inline mr-2 text-red-600" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

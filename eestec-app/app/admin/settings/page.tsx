'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import { Save, Link as LinkIcon } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    address: 'Zmaja od Bosne bb, Sarajevo',
    emails: 'cp@eestec-sa.ba, board@eestec-sa.ba',
    phones: '+387 33 123 456, +387 61 123 456',
    googleMapsUrl: 'https://www.google.com/maps/place/Zmaja+od+Bosne,+Sarajevo',
    linktreeUrl: '',
  });

  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) router.push('/admin/login');
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Save to backend/Google Sheets
      console.log('Saving settings:', formData);
      setSaving(false);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-eestec-dark mb-8">Settings</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Location & Contact */}
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <h2 className="text-xl font-bold text-eestec-dark mb-6">Location & Contact Info</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Office Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="Zmaja od Bosne bb, Sarajevo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Email Addresses (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.emails}
                  onChange={(e) =>
                    setFormData({ ...formData, emails: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="cp@eestec-sa.ba, board@eestec-sa.ba"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Phone Numbers (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.phones}
                  onChange={(e) =>
                    setFormData({ ...formData, phones: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="+387 33 123 456"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  value={formData.googleMapsUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, googleMapsUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>

          {/* Social & Links */}
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <h2 className="text-xl font-bold text-eestec-dark mb-6 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-eestec-red" />
              External Links
            </h2>

            <div>
              <label className="block text-sm font-semibold text-eestec-dark mb-2">
                Linktree URL
              </label>
              <input
                type="url"
                value={formData.linktreeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linktreeUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                placeholder="https://linktr.ee/eestec_sarajevo"
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be displayed on the location page for easy access to all social links
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-eestec-red text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

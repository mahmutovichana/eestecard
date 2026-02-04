'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import AdminNav from '@/components/AdminNav';
import type { Event } from '@/lib/types';

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    numberOfParticipants: '',
    capacity: '100',
    isSingleDay: true,
    duration: '',
    registrationFormLink: '',
    websiteLink: '',
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchEvents();
    }
  }, [router]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const body = {
        ...formData,
        id: editingId,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        participantCount: formData.numberOfParticipants ? parseInt(formData.numberOfParticipants) : null,
      };

      let res;
      if (editingId) {
        // Update existing event
        res = await fetch('/api/admin/events', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      } else {
        // Create new event
        res = await fetch('/api/admin/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      }

      if (res.ok) {
        resetForm();
        fetchEvents();
        alert('Event saved successfully!');
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/events?id=${eventId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchEvents();
        alert('Event deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time || '',
      location: event.location,
      image: event.imageUrl || '',
      numberOfParticipants: event.participantCount?.toString() || '',
      capacity: event.capacity?.toString() || '100',
      isSingleDay: event.isSingleDay || true,
      duration: '',
      registrationFormLink: event.registrationFormUrl || '',
      websiteLink: event.websiteUrl || '',
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: '',
      numberOfParticipants: '',
      capacity: '100',
      isSingleDay: true,
      duration: '',
      registrationFormLink: '',
      websiteLink: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><AdminNav /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eestec-dark">Events Management</h1>
            <p className="text-gray-600 mt-2">Create and manage EESTEC events with full details</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-eestec-red text-white rounded-lg hover:bg-red-700 transition"
            >
              <Plus className="w-5 h-5" />
              New Event
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-eestec-dark">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="E.g., IoT Workshop 2026"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Banner/Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="Event details and important information..."
                  rows={4}
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Duration (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="E.g., 3 hours, 2 days"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSingleDay}
                    onChange={(e) => setFormData({ ...formData, isSingleDay: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-eestec-dark">
                    {formData.isSingleDay ? '✓ Single Day Event' : '📅 Multi-Day Event'}
                  </span>
                </label>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="Event venue address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="Max participants"
                    required
                  />
                </div>
              </div>

              {/* Participants */}
              <div>
                <label className="block text-sm font-semibold text-eestec-dark mb-2">
                  Current Participants (optional)
                </label>
                <input
                  type="number"
                  value={formData.numberOfParticipants}
                  onChange={(e) => setFormData({ ...formData, numberOfParticipants: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  placeholder="Number of registered participants"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Registration Form Link *
                  </label>
                  <input
                    type="url"
                    value={formData.registrationFormLink}
                    onChange={(e) => setFormData({ ...formData, registrationFormLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="https://forms.google.com/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-eestec-dark mb-2">
                    Website Link (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.websiteLink}
                    onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-eestec-red text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                >
                  {editingId ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-eestec-dark font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-lg shadow">
          {events.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No events yet. Create your first event!
            </div>
          ) : (
            <div className="divide-y">
              {events.map((event) => (
                <div key={event.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full lg:w-32 h-32 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-eestec-dark text-lg">{event.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{event.description.substring(0, 100)}...</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                        <span>📅 {event.date} @ {event.time}</span>
                        <span>📍 {event.location}</span>
                        <span>👥 {event.registeredCount || 0}/{event.capacity}</span>
                        {event.duration && <span>⏱️ {event.duration}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                      >
                        <Edit2 className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

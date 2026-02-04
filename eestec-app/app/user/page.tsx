'use client';

import { useState, useEffect } from 'react';
import { QrCode, User, Tag, Calendar, MapPin, Menu, X } from 'lucide-react';
import MemberCard from '@/components/MemberCard';
import EventCard from '@/components/EventCard';
import DiscountCard from '@/components/DiscountCard';
import LocationInfo from '@/components/LocationInfo';
import type { Event, Discount } from '@/lib/types';

const MEMBER_DATA = {
  name: 'Demo User',
  studentId: 'EESTEC-2024-001',
  qrCodeData: 'https://eestec-sa.example.com/verify?id=EESTEC-2024-001',
};

export default function UserHome() {
  const [activeTab, setActiveTab] = useState('card');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [searchDiscount, setSearchDiscount] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);

  // Učitaj sve evente iz baze
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/admin/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  // Učitaj sve diskonte iz baze
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch('/api/admin/discounts');
        if (response.ok) {
          const data = await response.json();
          setDiscounts(data);
        }
      } catch (error) {
        console.error('Error fetching discounts:', error);
      } finally {
        setLoadingDiscounts(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleRegister = (eventId: string) => {
    setRegisteredEvents([...registeredEvents, eventId]);
  };

  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch = discount.title.toLowerCase().includes(searchDiscount.toLowerCase()) ||
                         discount.description.toLowerCase().includes(searchDiscount.toLowerCase());
    const matchesCategory = !filterCategory || discount.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'card', label: 'My Card', icon: QrCode },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'discounts', label: 'Discounts', icon: Tag },
    { id: 'location', label: 'Location', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sf-pro">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center justify-center flex-1">
            <img src="/logo-red.png" alt="EESTEC" className="h-11 w-auto" />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold ${
                      activeTab === tab.id
                        ? 'bg-eestec-red text-white'
                        : 'text-eestec-dark hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 flex flex-col items-center py-8">
            <div className="mb-8">
              <img src="/logo-red.png" alt="EESTEC" className="h-20 w-auto" />
            </div>

            <nav className="space-y-2 w-full">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold ${
                      activeTab === tab.id
                        ? 'bg-eestec-red text-white'
                        : 'text-eestec-dark hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Card Section */}
            {activeTab === 'card' && (
              <div>
                <h2 className="section-title">Your Member Card</h2>
                <MemberCard
                  memberName={MEMBER_DATA.name}
                  studentId={MEMBER_DATA.studentId}
                  qrCodeData={MEMBER_DATA.qrCodeData}
                />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-700">
                    💡 <span className="font-semibold">Tip:</span> Save this card to your phone and show it at partner locations for instant discounts!
                  </p>
                </div>
              </div>
            )}

            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="section-title">My Profile</h2>
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="bg-white rounded-lg shadow p-6 md:p-8">
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-eestec-dark mb-4">
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 font-semibold mb-1">Name</p>
                          <p className="text-lg text-eestec-dark">{MEMBER_DATA.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold mb-1">Student ID</p>
                          <p className="text-lg text-eestec-dark font-mono">
                            {MEMBER_DATA.studentId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold mb-1">Email</p>
                          <p className="text-lg text-eestec-dark">student@example.com</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold mb-1">Member Since</p>
                          <p className="text-lg text-eestec-dark">February 2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Registered Events */}
                    <div>
                      <h3 className="text-lg font-bold text-eestec-dark mb-4">
                        Your Registrations
                      </h3>
                      {registeredEvents.length === 0 ? (
                        <p className="text-gray-600">
                          No event registrations yet. Check out our events!
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {registeredEvents.map((eventId) => {
                            const event = events.find((e) => e.id === eventId);
                            return (
                              <div
                                key={eventId}
                                className="p-3 bg-green-50 border border-green-200 rounded-lg"
                              >
                                <p className="font-semibold text-green-900">
                                  ✓ {event?.title}
                                </p>
                                <p className="text-sm text-green-700 mt-1">
                                  {event?.date} at {event?.time}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Events Section */}
            {activeTab === 'events' && (
              <div>
                <h2 className="section-title">Upcoming Events</h2>
                {loadingEvents ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading events...</p>
                  </div>
                ) : events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onRegister={handleRegister}
                        isRegistered={registeredEvents.includes(event.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No events available at the moment.</p>
                  </div>
                )}
              </div>
            )}

            {/* Discounts Section */}
            {activeTab === 'discounts' && (
              <div>
                <h2 className="section-title">Partner Discounts</h2>
                <div className="mb-6 flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={searchDiscount}
                    onChange={(e) => setSearchDiscount(e.target.value)}
                    placeholder="Search discounts..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  />
                  <select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eestec-red"
                  >
                    <option value="">All Categories</option>
                    <option value="food">Food & Beverage</option>
                    <option value="tech">Tech & Electronics</option>
                    <option value="retail">Retail</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>

                {loadingDiscounts ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading discounts...</p>
                  </div>
                ) : filteredDiscounts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDiscounts.map((discount) => (
                      <DiscountCard key={discount.id} discount={discount} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No discounts found matching your search.</p>
                  </div>
                )}
              </div>
            )}

            {/* Location Section */}
            {activeTab === 'location' && (
              <div>
                <h2 className="section-title">Contact & Location</h2>
                <LocationInfo
                  address="Zmaja od Bosne bb, Sarajevo"
                  emails={['cp@eestec-sa.ba', 'board@eestec-sa.ba']}
                  phones={['+387 33 123 456', '+387 61 123 456']}
                  mapUrl="https://www.google.com/maps/place/Zmaja+od+Bosne,+Sarajevo"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

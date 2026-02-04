'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import type { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  isRegistered?: boolean;
}

export default function EventCard({
  event,
  onRegister,
  isRegistered,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
      {/* Image */}
      {event.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-eestec-dark mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-eestec-red" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-eestec-red" />
            <span>{event.location}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-eestec-red" />
              <span>
                {event.registeredCount} / {event.capacity} registered
              </span>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => onRegister?.(event.id)}
          className={`w-full py-2 font-semibold rounded-lg transition ${
            isRegistered
              ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
              : 'bg-eestec-red text-white hover:bg-red-700'
          }`}
          disabled={isRegistered}
        >
          {isRegistered ? '✓ Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}

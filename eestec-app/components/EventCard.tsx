'use client';

import { Calendar, MapPin, Users, Clock, Link as LinkIcon } from 'lucide-react';
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
      {/* Image/Banner */}
      {event.image && (
        <div className="h-48 overflow-hidden bg-gray-200">
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
        
        {/* Event Type Badge */}
        <div className="mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            event.isSingleDay 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-purple-100 text-purple-700'
          }`}>
            {event.isSingleDay ? '📅 Single Day' : '📅 Multi-Day'}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-eestec-red flex-shrink-0" />
            <span>{event.date} @ {event.time}</span>
          </div>
          
          {event.duration && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-eestec-red flex-shrink-0" />
              <span>{event.duration}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-eestec-red flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          
          {event.capacity && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-eestec-red flex-shrink-0" />
              <span>
                {event.registeredCount || 0} / {event.capacity} registered
              </span>
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="space-y-2 mb-4">
          <a
            href={event.registrationFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-eestec-red text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            <LinkIcon className="w-4 h-4" />
            Registration Form
          </a>
          
          {event.websiteLink && (
            <a
              href={event.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-eestec-dark font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              <LinkIcon className="w-4 h-4" />
              Learn More
            </a>
          )}
        </div>

        {/* Register Button (Optional) */}
        {onRegister && (
          <button
            onClick={() => onRegister?.(event.id)}
            className={`w-full py-2 font-semibold rounded-lg transition ${
              isRegistered
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-eestec-red text-white hover:bg-red-700'
            }`}
            disabled={isRegistered}
          >
            {isRegistered ? '✓ Registered' : 'Add to Calendar'}
          </button>
        )}
      </div>
    </div>
  );
}

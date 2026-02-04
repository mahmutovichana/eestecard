'use client';

import { MapPin, Mail, Phone } from 'lucide-react';

interface LocationInfoProps {
  address: string;
  emails: string[];
  phones: string[];
  mapUrl: string;
}

export default function LocationInfo({
  address,
  emails,
  phones,
  mapUrl,
}: LocationInfoProps) {
  return (
    <div className="w-full space-y-4">
      {/* Address */}
      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        <h3 className="text-lg font-bold text-eestec-dark mb-4">Our Location</h3>
        
        <div className="mb-6">
          <div className="flex gap-3 mb-4">
            <MapPin className="w-6 h-6 text-eestec-red flex-shrink-0" />
            <div>
              <p className="font-semibold text-eestec-dark">{address}</p>
              <button
                onClick={() => window.open(mapUrl, '_blank')}
                className="text-eestec-red text-sm font-semibold hover:underline mt-2"
              >
                View on Google Maps →
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.949434461326!2d18.393220463924056!3d43.85687672589363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c9985a13d5b9%3A0x5ec81e894b445043!2sEESTEC%20LC%20Sarajevo!5e0!3m2!1sen!2sba!4v1770239422807!5m2!1sen!2sba"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-3">
            <Mail className="w-6 h-6 text-eestec-red flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-2">Email</p>
              {emails.map((email, idx) => (
                <a
                  key={idx}
                  href={`mailto:${email}`}
                  className="block text-eestec-red hover:underline font-semibold text-sm"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-3">
            <Phone className="w-6 h-6 text-eestec-red flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-2">Phone</p>
              {phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="block text-eestec-red hover:underline font-semibold text-sm"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

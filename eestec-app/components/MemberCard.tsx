'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { Download, Scan } from 'lucide-react';

interface MemberCardProps {
  memberName: string;
  studentId: string;
  qrCodeData: string;
}

export default function MemberCard({
  memberName,
  studentId,
  qrCodeData,
}: MemberCardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${studentId}-card.png`;
      link.click();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      {/* Card */}
      <div className="bg-gradient-to-br from-eestec-red to-red-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <p className="text-red-100 text-sm font-semibold uppercase tracking-wider">
              EESTEC LC Sarajevo
            </p>
            <h2 className="text-2xl font-bold mt-2">Member Card</h2>
          </div>

          {/* QR Code */}
          <div
            ref={qrRef}
            className="bg-white rounded-lg p-4 mb-6 flex justify-center"
          >
            <QRCode
              value={qrCodeData}
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>

          {/* Member Info */}
          <div className="mb-6">
            <p className="text-red-100 text-xs uppercase tracking-widest mb-1">
              Member Name
            </p>
            <p className="text-xl font-bold">{memberName}</p>
          </div>

          <div>
            <p className="text-red-100 text-xs uppercase tracking-widest mb-1">
              Student ID
            </p>
            <p className="text-lg font-mono font-semibold">{studentId}</p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-red-400">
            <p className="text-red-100 text-xs text-center">
              Scan or tap to access discounts & events
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={downloadQR}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-eestec-red text-white rounded-lg hover:bg-red-700 transition font-semibold"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-eestec-dark rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          <Scan className="w-4 h-4" />
          {isScanning ? 'Stop' : 'Scan'}
        </button>
      </div>

      {isScanning && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-sm text-blue-700">
          📱 Use device camera or NFC reader
        </div>
      )}
    </div>
  );
}

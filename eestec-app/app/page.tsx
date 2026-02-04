export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eestec-red to-red-700 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <img src="/logo-white.png" alt="EESTEC Logo" className="h-24 w-auto" />
        </div>
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            EESTEC LC Sarajevo
          </h1>
          <p className="text-xl text-red-100 mb-8">Member Card & Event Management</p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <a
            href="/user"
            className="block bg-white text-eestec-red font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            👥 Access Member Portal
          </a>
          <a
            href="/admin/login"
            className="block bg-red-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-700 transition text-lg"
          >
            🔐 Admin Login
          </a>
        </div>

        <div className="mt-12 text-white text-sm">
          <p>📧 cp@eestec-sa.ba | board@eestec-sa.ba</p>
          <p>📍 Zmaja od Bosne bb, Sarajevo</p>
        </div>
      </div>
    </div>
  )
}

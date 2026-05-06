export default function Profile() {
  const userStr = localStorage.getItem('eepip_user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Your AI Engineer account details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="card flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold mb-4">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user?.fullName || 'Unknown'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{user?.email || '—'}</p>
          <span className="mt-3 inline-block text-xs font-medium bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
            {user?.roles?.[0] || 'AI_ENGINEER'}
          </span>
        </div>

        {/* Details */}
        <div className="card lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Account Information</h3>
          <div className="space-y-4">
            {[
              { label: 'Username', value: user?.username || '—' },
              { label: 'Full Name', value: user?.fullName || '—' },
              { label: 'Email', value: user?.email || '—' },
              { label: 'Roles', value: user?.roles?.join(', ') || '—' },
              { label: 'Member State', value: 'INVESTED' },
              { label: 'Rank', value: 'Starter' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className="text-sm text-gray-800 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Settings</h1>
          <p className="text-green-800/80 mb-8">Manage your account preferences and farm settings.</p>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Settings</h2>
              <p className="text-gray-600">Profile, security, and notification preferences will be configured here.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Farm Configuration</h2>
              <p className="text-gray-600">Crop types, field layouts, and equipment settings will be managed here.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Team Management</h2>
              <p className="text-gray-600">Invite team members and manage permissions will be available here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
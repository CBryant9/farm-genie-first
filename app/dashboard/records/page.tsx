export default function RecordsPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Your Records</h1>
          <p className="text-green-800/80 mb-8">Access and manage your farm data and historical records.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-semibold text-indigo-800 mb-2">Financial Records</h3>
              <p className="text-indigo-700 text-sm mb-4">Income, expenses, and budget tracking</p>
              <div className="text-2xl font-bold text-indigo-600">$45,230</div>
              <p className="text-indigo-600 text-sm">Total Revenue (2024)</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">Crop History</h3>
              <p className="text-green-700 text-sm mb-4">Past harvests and yield data</p>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-green-600 text-sm">Crops Planted</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-2">Equipment Logs</h3>
              <p className="text-blue-700 text-sm mb-4">Maintenance and usage records</p>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-blue-600 text-sm">Active Equipment</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-semibold text-orange-800 mb-2">Weather Data</h3>
              <p className="text-orange-700 text-sm mb-4">Historical weather patterns</p>
              <div className="text-2xl font-bold text-orange-600">365</div>
              <p className="text-orange-600 text-sm">Days Tracked</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-2">Soil Reports</h3>
              <p className="text-purple-700 text-sm mb-4">Soil health and composition</p>
              <div className="text-2xl font-bold text-purple-600">6.8</div>
              <p className="text-purple-600 text-sm">Average pH</p>
            </div>
            
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <h3 className="font-semibold text-teal-800 mb-2">Pest Management</h3>
              <p className="text-teal-700 text-sm mb-4">Treatment and prevention logs</p>
              <div className="text-2xl font-bold text-teal-600">3</div>
              <p className="text-teal-600 text-sm">Active Issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Analytics Dashboard</h1>
          
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">$45,230</p>
              <p className="text-green-100 text-sm">+12% from last month</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Crop Yield</h3>
              <p className="text-3xl font-bold">2,450kg</p>
              <p className="text-blue-100 text-sm">+8% from last month</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
              <p className="text-3xl font-bold">87%</p>
              <p className="text-orange-100 text-sm">+3% from last month</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
              <p className="text-3xl font-bold">12</p>
              <p className="text-purple-100 text-sm">2 new this week</p>
            </div>
          </div>
          
          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Trend</h2>
              <div className="h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Chart will be implemented here</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Crop Performance</h2>
              <div className="h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Chart will be implemented here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
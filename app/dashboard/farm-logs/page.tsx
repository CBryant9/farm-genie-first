export default function FarmLogsPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Farm Logs</h1>
          <p className="text-green-800/80 mb-8">Track your daily activities and farm operations.</p>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Field A - Irrigation</h3>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </div>
              <p className="text-gray-600">Completed irrigation cycle for Field A. Water level optimal.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Harvest - Wheat</h3>
                <span className="text-gray-500 text-sm">Yesterday</span>
              </div>
              <p className="text-gray-600">Harvested 2.5 acres of wheat. Yield: 3.2 tons.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Equipment - Tractor Maintenance</h3>
                <span className="text-gray-500 text-sm">3 days ago</span>
              </div>
              <p className="text-gray-600">Performed routine maintenance on Tractor #3. Oil changed, filters replaced.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default function RemindersPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Reminders & Alerts</h1>
          <p className="text-green-800/80 mb-8">Stay on top of important tasks and deadlines.</p>
          
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="font-semibold text-orange-800">Harvest Planning Due</h3>
                <span className="text-orange-600 text-sm ml-auto">Today</span>
              </div>
              <p className="text-orange-700 mt-2">Complete harvest planning for Field A by end of day.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold text-blue-800">Equipment Maintenance</h3>
                <span className="text-blue-600 text-sm ml-auto">Tomorrow</span>
              </div>
              <p className="text-blue-700 mt-2">Schedule maintenance for tractor #3.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold text-green-800">Weather Alert</h3>
                <span className="text-green-600 text-sm ml-auto">This Week</span>
              </div>
              <p className="text-green-700 mt-2">Rain expected on Friday - adjust irrigation schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
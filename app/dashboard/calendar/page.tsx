export default function CalendarPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Calendar</h1>
          <p className="text-green-800/80 mb-8">Plan and schedule your farming activities.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar View */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">This Week's Schedule</h2>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Harvest Planning</h3>
                        <p className="text-gray-600 text-sm">Field A - Wheat</p>
                      </div>
                      <span className="text-green-600 text-sm font-medium">Today</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Equipment Maintenance</h3>
                        <p className="text-gray-600 text-sm">Tractor #3</p>
                      </div>
                      <span className="text-blue-600 text-sm font-medium">Tomorrow</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Irrigation Schedule</h3>
                        <p className="text-gray-600 text-sm">Field B & C</p>
                      </div>
                      <span className="text-orange-600 text-sm font-medium">Wednesday</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Soil Testing</h3>
                        <p className="text-gray-600 text-sm">Field D</p>
                      </div>
                      <span className="text-purple-600 text-sm font-medium">Friday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
                <h3 className="font-semibold text-rose-800 mb-2">Quick Add</h3>
                <p className="text-rose-700 text-sm mb-4">Add new events to your calendar</p>
                <button className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors">
                  Add Event
                </button>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-green-800 mb-2">Upcoming</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">5</span>
                    <span className="text-green-700"> events this week</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">12</span>
                    <span className="text-green-700"> events this month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-2">Weather</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">72°F</div>
                  <p className="text-blue-700 text-sm">Partly Cloudy</p>
                  <p className="text-blue-600 text-xs mt-1">Perfect for fieldwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
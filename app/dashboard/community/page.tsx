export default function CommunityPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Updates & Community</h1>
          <p className="text-green-800/80 mb-8">Stay connected with other farmers and get the latest updates.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Updates Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Latest Updates</h2>
              
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-teal-800 font-medium">New Feature</span>
                  <span className="text-teal-600 text-sm ml-auto">2 hours ago</span>
                </div>
                <p className="text-teal-700">Weather integration now available for all regions.</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-800 font-medium">Maintenance</span>
                  <span className="text-blue-600 text-sm ml-auto">1 day ago</span>
                </div>
                <p className="text-blue-700">Scheduled maintenance completed. Performance improved by 15%.</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">Community</span>
                  <span className="text-green-600 text-sm ml-auto">3 days ago</span>
                </div>
                <p className="text-green-700">New community forum launched. Share tips with fellow farmers!</p>
              </div>
            </div>
            
            {/* Community Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Community Highlights</h2>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">JS</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">John Smith</p>
                    <p className="text-gray-500 text-sm">Wheat Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">"Just harvested my best wheat crop in 10 years using Farm Genie's analytics!"</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Maria Johnson</p>
                    <p className="text-gray-500 text-sm">Organic Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">"The weather alerts saved my crops during last week's storm. Amazing tool!"</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">RD</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Robert Davis</p>
                    <p className="text-gray-500 text-sm">Dairy Farmer</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">"Equipment maintenance reminders are a game-changer for my operation."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
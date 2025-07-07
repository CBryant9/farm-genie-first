export default function UploadPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Upload Documents</h1>
          <p className="text-green-800/80 mb-8">Add new files, records, and documents to your farm management system.</p>
          
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-gray-500 text-sm">Supports: PDF, DOC, XLS, JPG, PNG (Max 10MB)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 mb-2">Recent Uploads</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">harvest_report_2024.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">equipment_maintenance.xlsx</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 mb-2">Upload Categories</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">• Financial Records</div>
                  <div className="text-sm text-gray-600">• Crop Reports</div>
                  <div className="text-sm text-gray-600">• Equipment Logs</div>
                  <div className="text-sm text-gray-600">• Weather Data</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
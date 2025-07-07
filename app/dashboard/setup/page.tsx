"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, CheckCircle, Circle, ArrowRight, ExternalLink, Clock, MessageCircle, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const setupSteps = [
  {
    id: 1,
    title: "Farm Information",
    description: "Tell us about your farm and what you grow",
    icon: <Sparkles className="w-6 h-6" />,
    completed: false
  },
  {
    id: 2,
    title: "Connect Google Sheet",
    description: "Set up your genie logs spreadsheet",
    icon: <FileSpreadsheet className="w-6 h-6" />,
    completed: false
  },
  {
    id: 3,
    title: "Link to Genie",
    description: "Connect to your Telegram bot",
    icon: <MessageCircle className="w-6 h-6" />,
    completed: false
  },
  {
    id: 4,
    title: "Daily Reminders",
    description: "Set your preferred reminder time",
    icon: <Clock className="w-6 h-6" />,
    completed: false
  }
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < setupSteps.length) {
      setCurrentStep(stepId + 1);
    } else {
      setIsComplete(true);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepActive = (stepId: number) => stepId === currentStep;

  if (isComplete) {
    return (
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-green-700 mb-4">All Set Up!</h1>
              <p className="text-xl text-green-600 mb-8">
                Your Farm Genie is ready to help you manage your farm efficiently.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200 mb-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">What's Next?</h2>
              <p className="text-green-600 mb-6">
                Let's take a quick tour of the dashboard to show you all the features available to you.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <FileSpreadsheet className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700">Logs & Records</h3>
                  <p className="text-sm text-green-600">All your farm data in one place</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700">Genie Chat</h3>
                  <p className="text-sm text-green-600">Talk to your AI assistant anytime</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700">Daily Reminders</h3>
                  <p className="text-sm text-green-600">Never miss important tasks</p>
                </div>
              </div>

              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Dashboard Tour
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-700">Set up your genie</h1>
              <p className="text-green-600">Let's get your Farm Genie configured for your specific needs</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-green-700">Setup Progress</h2>
            <span className="text-sm text-green-600">
              {completedSteps.length} of {setupSteps.length} completed
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {setupSteps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.id * 0.1 }}
                className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                  isStepCompleted(step.id)
                    ? 'border-green-500 bg-green-50'
                    : isStepActive(step.id)
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isStepCompleted(step.id)
                      ? 'bg-green-500 text-white'
                      : isStepActive(step.id)
                      ? 'bg-green-400 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isStepCompleted(step.id) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium text-sm ${
                      isStepCompleted(step.id) || isStepActive(step.id)
                        ? 'text-green-700'
                        : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  </div>
                </div>
                
                {isStepActive(step.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-green-200"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              {setupSteps[currentStep - 1].title}
            </h3>
            <p className="text-green-600">
              {setupSteps[currentStep - 1].description}
            </p>
          </div>

          {/* Step-specific content */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Farm Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your farm name"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Farm Size (acres)
                </label>
                <input
                  type="number"
                  placeholder="Enter farm size"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Farm Type
                </label>
                <select className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select farm type</option>
                  <option value="crop">Crop Farm</option>
                  <option value="livestock">Livestock Farm</option>
                  <option value="mixed">Mixed Farm</option>
                  <option value="organic">Organic Farm</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Why Google Sheets?</h4>
                <p className="text-blue-700 text-sm">
                  We need you to create a Google Sheet where all your genie logs will be stored. This keeps your data organized and accessible.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-green-700">Step 1: Create Your Sheet</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Go to <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Google Sheets <ExternalLink className="w-3 h-3" /></a></li>
                    <li>Click "Blank" to create a new spreadsheet</li>
                    <li>Name it "Farm Genie Logs" or similar</li>
                    <li>Copy our template structure (we'll provide this)</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-green-700">Step 2: Share with Service Account</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Click "Share" in the top right of your sheet</li>
                    <li>Add this email: <code className="bg-gray-200 px-2 py-1 rounded">farm-genie@service-account.com</code></li>
                    <li>Give "Editor" permissions</li>
                    <li>Click "Send"</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-green-700">Step 3: Enter Your Sheet Link</h4>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Google Sheet URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Copy the URL from your browser's address bar when viewing the sheet
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">How to Talk to Your Genie</h4>
                <p className="text-blue-700 text-sm">
                  We communicate with your Farm Genie through Telegram. This allows you to chat naturally and get instant responses about your farm.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-green-700">Step 1: Access the Bot</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Open Telegram on your phone or computer</li>
                    <li>Search for <code className="bg-gray-200 px-2 py-1 rounded">@FarmGenieBot</code></li>
                    <li>Click "Start" to begin chatting</li>
                    <li>The bot will ask for your setup code</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-green-700">Step 2: Enter Your Setup Code</h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700 mb-2">Your unique setup code:</p>
                  <div className="bg-white border border-green-300 rounded px-3 py-2 font-mono text-lg text-green-800">
                    FG-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Enter this code in the Telegram bot to connect your account
                  </p>
                </div>

                <h4 className="font-semibold text-green-700">Step 3: Start Chatting</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">Try these example messages:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>"What's the weather like today?"</li>
                    <li>"Log that I planted corn in field 3"</li>
                    <li>"When should I harvest the wheat?"</li>
                    <li>"Show me my farm summary"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Daily Reminder Time</h4>
                <p className="text-blue-700 text-sm">
                  Choose a time when you're usually feeling good and have time to chat with your genie. This will become your daily routine for farm management.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Reminder Context (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., morning coffee, taking boots off, cooking dinner"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This helps us personalize your reminder message
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 mb-2">Example Reminder Messages:</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• "Time for your morning coffee chat with Farm Genie ☕"</li>
                    <li>• "Boots off? Perfect time to log today's work with your genie 👢"</li>
                    <li>• "Dinner cooking? Let's check in with Farm Genie 🍽️"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-green-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <button
              onClick={() => handleStepComplete(currentStep)}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              {currentStep < setupSteps.length ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Complete Setup
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
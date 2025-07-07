import { DemoHeroGeometric } from "@/components/ui/shape-landing-hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      {/* Top bar with Login */}
      <nav className="flex justify-end items-center px-8 py-6">
        <Link
          href="/auth"
          className="px-5 py-2 rounded-full bg-green-200 text-green-900 font-semibold shadow hover:bg-green-300 transition"
        >
          Login
        </Link>
      </nav>
      {/* Hero Section */}
      <DemoHeroGeometric />
      {/* Features Section */}
      <section id="features" className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Smart Insights</h3>
            <p className="text-green-800/80">AI-powered analytics for better crop and resource management.</p>
          </div>
          <div className="bg-white/80 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Easy Collaboration</h3>
            <p className="text-green-800/80">Invite your team and share updates in real time, from anywhere.</p>
          </div>
          <div className="bg-white/80 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Automated Tasks</h3>
            <p className="text-green-800/80">Let Farm Genie handle reminders, schedules, and repetitive work.</p>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Pricing</h2>
        <div className="bg-white/90 rounded-2xl p-10 shadow-lg flex flex-col items-center">
          <div className="text-5xl font-extrabold text-green-600 mb-2">$99</div>
          <div className="text-green-700 mb-4">per year, all features included</div>
          <ul className="text-green-800/80 mb-6 space-y-1">
            <li>✔ Unlimited team members</li>
            <li>✔ All analytics & automation</li>
            <li>✔ Priority support</li>
          </ul>
          <a
            href="#top"
            className="px-8 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
          >
            Get Started
          </a>
        </div>
      </section>
      {/* CTA Button to scroll to top hero */}
      <div className="flex justify-center py-8">
        <a
          href="#top"
          className="px-8 py-3 rounded-full bg-green-400 text-white font-semibold shadow-lg hover:bg-green-500 transition"
        >
          Back to Top
        </a>
      </div>
    </main>
  );
}

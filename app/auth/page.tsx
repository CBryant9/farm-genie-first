import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <form className="bg-white/90 rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">Login</h1>
        <label className="flex flex-col gap-2">
          <span className="text-green-800 font-medium">Email</span>
          <input
            type="email"
            className="px-4 py-2 rounded border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@email.com"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-green-800 font-medium">Password</span>
          <input
            type="password"
            className="px-4 py-2 rounded border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="••••••••"
            required
          />
        </label>
        <Link
          href="/dashboard"
          className="mt-4 px-6 py-3 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition text-center"
        >
          Login
        </Link>
      </form>
    </div>
  );
} 
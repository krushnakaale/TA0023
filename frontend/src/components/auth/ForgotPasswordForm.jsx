// src/components/auth/ForgotPasswordForm.jsx
import { useState } from "react";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function ForgotPasswordForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForgot = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      console.log("Forgot password for:", email);
    }, 1200);
  };

  // Success state
  if (sent) {
    return (
      <div className="w-full max-w-sm mx-auto text-center">
        {/* Success icon */}
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle className="w-7 h-7 text-accent" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          Check your inbox
        </h2>
        <p className="text-sm text-gray-400 mb-1">We sent a reset link to</p>
        <p className="text-sm font-semibold text-gray-700 mb-8">{email}</p>

        <button
          onClick={() => onSwitch("login")}
          className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-3 px-4 rounded-xl
            transition-all duration-200 flex items-center justify-center gap-2
            hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
        >
          Back to Sign In
          <ArrowRight size={16} />
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Didn't receive it?{" "}
          <button
            onClick={() => setSent(false)}
            className="text-primary font-medium hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Form */}
      <form onSubmit={handleForgot} className="flex flex-col gap-4">
        {/* Email field */}
        <div className="group">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <Mail size={16} />
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                placeholder:text-gray-300 text-gray-800 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-3 px-4 rounded-xl
            transition-all duration-200 flex items-center justify-center gap-2 mt-1
            hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5
            disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Reset Link
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Back to login */}
      <button
        onClick={() => onSwitch("login")}
        className="mt-6 flex items-center justify-center gap-1.5 w-full text-sm text-gray-400
          hover:text-gray-600 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Sign In
      </button>
    </div>
  );
}

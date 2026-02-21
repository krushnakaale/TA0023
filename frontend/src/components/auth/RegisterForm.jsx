// src/components/auth/RegisterForm.jsx
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

export default function RegisterForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      console.log("Registering:", { name, email, password });
    }, 1200);
  };

  // Password strength indicator
  const getStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10 || !/[0-9]/.test(password)) return 2;
    return 3;
  };
  const strength = getStrength();
  const strengthLabel = ["", "Weak", "Fair", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-emerald-500"];
  const strengthText = [
    "",
    "text-red-500",
    "text-yellow-500",
    "text-emerald-500",
  ];

  // Success state
  if (done) {
    return (
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle className="w-7 h-7 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          Account created!
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Welcome, <span className="font-semibold text-gray-700">{name}</span>.
          Your account is ready.
        </p>
        <button
          onClick={() => onSwitch("login")}
          className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-3 px-4 rounded-xl
            transition-all duration-200 flex items-center justify-center gap-2
            hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
        >
          Sign In Now
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Form */}
      <form onSubmit={handleRegister} className="flex flex-col gap-4 ">
        {/* Full Name */}
        <div className="group ">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <User size={16} />
            </span>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                placeholder:text-gray-300 text-gray-800 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
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

        {/* Password */}
        <div className="group">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <Lock size={16} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white
                placeholder:text-gray-300 text-gray-800 transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Password strength */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      strength >= level
                        ? strengthColor[strength]
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs font-medium ${strengthText[strength]}`}>
                {strengthLabel[strength]} password
              </p>
            </div>
          )}
        </div>

        {/* Submit */}
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
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Back to login */}
      <button
        onClick={() => onSwitch("login")}
        className="mt-0 flex items-center justify-center gap-1.5 w-full text-sm text-gray-400
          hover:text-gray-600 transition-colors"
      >
        <ArrowLeft size={15} />
        Already have an account?{" "}
        <span className="text-primary font-semibold hover:text-primaryHover">
          Sign In
        </span>
      </button>
    </div>
  );
}

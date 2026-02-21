import { useState, useEffect } from "react";

const steps = [
  {
    id: "01",
    label: "Choose a Hospital",
    desc: "Browse nearby hospitals and view the list of available doctors.",
    tag: "GET /hospitals/:id/doctors",
    color: "blue",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
        <polyline
          strokeLinecap="round"
          strokeLinejoin="round"
          points="9 22 9 12 15 12 15 22"
        />
      </svg>
    ),
  },
  {
    id: "02",
    label: "Book an Appointment",
    desc: "Fill in the appointment form with your preferred doctor, date, and time.",
    tag: "POST /appointments",
    color: "emerald",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "03",
    label: "Doctor Responds",
    desc: "The doctor reviews pending appointments and confirms or reschedules.",
    tag: "GET + PUT /appointments/:id",
    color: "blue",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "04",
    label: "Get Email Notification",
    desc: "The system automatically sends a confirmation email to the patient.",
    tag: "System → Email",
    color: "emerald",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const stats = [
  { value: "500+", label: "Hospitals" },
  { value: "2,000+", label: "Doctors" },
  { value: "50K+", label: "Appointments" },
  { value: "98%", label: "Satisfaction" },
];

// Color maps for Tailwind classes
const colorMap = {
  blue: {
    badge: "bg-blue-50 text-blue-600 border-blue-200",
    icon: "bg-blue-50 text-blue-600",
    num: "text-blue-500",
    activeCard: "border-blue-500 bg-blue-50/40",
    activeShadow: "shadow-blue-100",
    tag: "bg-blue-50 text-blue-600 border-blue-200",
  },
  emerald: {
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    icon: "bg-emerald-50 text-emerald-600",
    num: "text-emerald-500",
    activeCard: "border-emerald-500 bg-emerald-50/40",
    activeShadow: "shadow-emerald-100",
    tag: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
};

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [visible, setVisible] = useState(false);

  // Auto-cycle through steps
  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-transparent py-12">
      <div className="max-w-5xl mx-auto">
        {/* Top badge */}
        <div
          className={`inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600
            text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8
            transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Hospital Appointment System
        </div>

        {/* Headline */}
        <div
          className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Booking a doctor
            <br />
            <span className="text-primary">just got easier.</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mb-12">
            Pick a hospital, book a slot, get confirmed by the doctor, and
            receive an email — all in one seamless flow.
          </p>
        </div>

        {/* Step cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6
            transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            const isActive = activeStep === i;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`
                  p-5 rounded-2xl border cursor-pointer
                  transition-all duration-300
                  hover:-translate-y-1
                  ${
                    isActive
                      ? `${c.activeCard} shadow-lg ${c.activeShadow} -translate-y-1 scale-[1.02]`
                      : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                  }
                `}
              >
                {/* Step number */}
                <p
                  className={`text-xs font-bold tracking-widest mb-3 ${c.num}`}
                >
                  {step.id}
                </p>

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${c.icon}`}
                >
                  {step.icon}
                </div>

                {/* Label */}
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {step.label}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {step.desc}
                </p>

                {/* API tag */}
                <span
                  className={`text-[10px] font-mono px-2 py-1 rounded border ${c.tag}`}
                >
                  {step.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step progress dots */}
        <div
          className={`flex items-center justify-center gap-2 mb-10
            transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`rounded-full transition-all duration-300 ${
                activeStep === i
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border border-gray-200
            rounded-2xl bg-white overflow-hidden mb-10
            transition-all duration-700 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-6 px-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl font-extrabold text-gray-900">
                {s.value}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <button className="bg-primary hover:bg-primaryHover text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
            Book an Appointment →
          </button>
          <button className="bg-transparent text-gray-500 border border-gray-200 hover:border-primary hover:text-primary font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

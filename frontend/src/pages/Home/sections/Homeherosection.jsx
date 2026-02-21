import { useState, useEffect, useRef } from "react";
import { ArrowRight, Star, MapPin, Award, Users, Calendar, CheckCircle, ChevronRight } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const doctors = [
  {
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    experience: "12 yrs",
    rating: 4.9,
    reviews: 214,
    location: "Mumbai",
    available: true,
    initials: "AK",
    color: "blue",
  },
  {
    name: "Dr. Rajan Mehta",
    specialty: "Dermatologist",
    experience: "8 yrs",
    rating: 4.7,
    reviews: 178,
    location: "Pune",
    available: true,
    initials: "RM",
    color: "emerald",
  },
  {
    name: "Dr. Priya Nair",
    specialty: "General Physician",
    experience: "15 yrs",
    rating: 4.8,
    reviews: 342,
    location: "Nashik",
    available: false,
    initials: "PN",
    color: "violet",
  },
  {
    name: "Dr. Suresh Patil",
    specialty: "Orthopedic",
    experience: "10 yrs",
    rating: 4.6,
    reviews: 129,
    location: "Nagpur",
    available: true,
    initials: "SP",
    color: "amber",
  },
];

const stats = [
  { value: "500+", label: "Hospitals", icon: Award },
  { value: "2,000+", label: "Doctors", icon: Users },
  { value: "50K+", label: "Appointments", icon: Calendar },
  { value: "98%", label: "Satisfaction", icon: CheckCircle },
];

const avatarColor = {
  blue:   { bg: "bg-blue-100",   text: "text-blue-700",   ring: "ring-blue-200"   },
  emerald:{ bg: "bg-emerald-100",text: "text-emerald-700",ring: "ring-emerald-200" },
  violet: { bg: "bg-violet-100", text: "text-violet-700", ring: "ring-violet-200"  },
  amber:  { bg: "bg-amber-100",  text: "text-amber-700",  ring: "ring-amber-200"   },
};

// ── Animated counter ─────────────────────────────────────────────────────────

function useCounter(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ""));
    if (!num) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start]);
  return count;
}

function StatCard({ value, label, icon: Icon, animate }) {
  const num = useCounter(value, 1400, animate);
  const suffix = value.replace(/[0-9,]/g, "");
  const display = value.includes(",")
    ? num.toLocaleString() + suffix
    : num + suffix;

  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 group hover:bg-blue-50/60 transition-colors duration-300">
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon size={20} className="text-primary" />
      </div>
      <p className="text-3xl font-extrabold text-gray-900 tracking-tight tabular-nums">{display}</p>
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

// ── Doctor Card ───────────────────────────────────────────────────────────────

function DoctorCard({ doctor }) {
  const c = avatarColor[doctor.color];
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ring-2 shrink-0 ${c.bg} ${c.text} ${c.ring}`}>
          {doctor.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm truncate">{doctor.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{doctor.specialty}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
          doctor.available
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
            : "bg-gray-100 text-gray-400 border border-gray-200"
        }`}>
          {doctor.available ? "Available" : "Busy"}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="font-semibold text-gray-700">{doctor.rating}</span>
          <span>({doctor.reviews})</span>
        </span>
        <span className="w-px h-3 bg-gray-200" />
        <span className="flex items-center gap-1">
          <MapPin size={11} /> {doctor.location}
        </span>
        <span className="w-px h-3 bg-gray-200" />
        <span>{doctor.experience} exp</span>
      </div>

      {/* CTA */}
      <button
        disabled={!doctor.available}
        className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
          doctor.available
            ? "bg-primary text-white hover:bg-primaryHover hover:shadow-md hover:shadow-blue-200"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {doctor.available ? (
          <><Calendar size={13} /> Book Appointment</>
        ) : (
          "Not Available"
        )}
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    // Page load animation
    const t = setTimeout(() => setVisible(true), 80);

    // Intersection observer for stats counter
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);

    return () => { clearTimeout(t); observer.disconnect(); };
  }, []);

  return (
    <div className="w-full bg-transparent">

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="w-full px-6 pt-20 pb-24">
        <div className="min-w-5xl max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Trusted Healthcare Platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-5">
                Find the right<br />
                <span className="text-primary">doctor,</span> fast.
              </h1>

              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                Browse verified doctors, pick your preferred hospital, and book appointments in minutes — all in one place.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3">
                <button className="bg-primary hover:bg-primaryHover text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5">
                  Book an Appointment
                  <ArrowRight size={16} />
                </button>
                <button className="text-gray-500 border border-gray-200 hover:border-primary hover:text-primary bg-transparent font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200">
                  Learn More
                </button>
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-4 mt-8">
                {/* Stacked avatars */}
                <div className="flex -space-x-2">
                  {["AK", "RM", "PN", "SP"].map((init, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
                      style={{ opacity: 1 - i * 0.15 }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    <span className="font-semibold text-gray-700">2,000+</span> doctors trust us
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Visual card stack */}
            <div className={`hidden lg:block transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="relative h-80">

                {/* Background card */}
                <div className="absolute top-6 left-6 right-0 bottom-0 bg-blue-50 border border-blue-100 rounded-3xl" />

                {/* Main card */}
                <div className="absolute top-0 left-0 right-6 bottom-6 bg-white border border-gray-100 rounded-3xl shadow-xl p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Next Appointment</p>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center ring-2 ring-blue-200">
                        AK
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Dr. Ayesha Khan</p>
                        <p className="text-xs text-gray-400">Cardiologist · Mumbai</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Date</p>
                        <p className="text-sm font-bold text-gray-800">Feb 24, 2026</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Time</p>
                        <p className="text-sm font-bold text-gray-800">10:00 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-lg">
                      Confirmed ✓
                    </span>
                    <button className="text-primary text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      View details <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Floating stat pill */}
                <div className="absolute -bottom-4 -right-2 bg-white border border-gray-100 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900">50K+</p>
                    <p className="text-[10px] text-gray-400 font-medium">Appointments done</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────────────────────── */}
      <section ref={statsRef} className="w-full px-6 pb-20">
        <div className="min-w-5xl max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} animate={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTORS SECTION ──────────────────────────────────── */}
      <section className="w-full px-6 pb-24">
        <div className="min-w-5xl max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Our Specialists</p>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Meet our top doctors
              </h2>
              <p className="text-sm text-gray-400 mt-1">Verified, experienced, and ready to help.</p>
            </div>
            <button className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-semibold hover:gap-2.5 transition-all duration-200">
              View all <ArrowRight size={15} />
            </button>
          </div>

          {/* Doctor grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctors.map((doc) => (
              <DoctorCard key={doc.name} doctor={doc} />
            ))}
          </div>

          {/* Mobile view-all */}
          <div className="flex sm:hidden justify-center mt-6">
            <button className="text-sm text-primary font-semibold border border-blue-200 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              View all doctors <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
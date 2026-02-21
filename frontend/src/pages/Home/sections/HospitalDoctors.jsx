import { useState, useEffect } from "react";

export default function HospitalDoctors({ hospital, doctors, onRequest }) {
  const [loading, setLoading] = useState(false);

  if (!hospital) return null;

  return (
    <div className="mt-12 p-6 bg-white rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{hospital.name}</h2>
      <p className="text-gray-600 mb-4">
        {hospital.address}, {hospital.city}
      </p>
      <p>
        🛏 Beds: {hospital.availableBeds}, ICU: {hospital.icuBeds}
      </p>
      <p>OPD Status: {hospital.opdStatus}</p>

      <h3 className="mt-6 text-xl font-semibold">Doctors</h3>

      {loading && <p className="text-gray-500 mt-2">Loading doctors...</p>}

      {!loading && doctors.length === 0 && (
        <p className="text-gray-500 mt-2">
          No doctors found for this hospital.
        </p>
      )}

      {!loading && doctors.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="p-4 border rounded-xl flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold">{doc.name}</h4>
                <p className="text-sm text-gray-500">
                  {doc.specialization || "N/A"}
                </p>
              </div>
              <button
                disabled={loading}
                className={`px-3 py-1 rounded-lg text-sm ${loading ? "bg-gray-400" : "bg-green-500 text-white"}`}
                onClick={() => onRequest(doc)}
              >
                Request Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

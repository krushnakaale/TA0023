import HeroSection from "./sections/HeroSection";
import DoctorDashboard from "./sections/DoctorDashboard";

export default function DashboardPage() {
  return (
    <>
      <HeroSection />
      <DoctorDashboard doctorId="699963640f7a1bc1b0e1ec81" />
      {/* _id: ObjectId('699963640f7a1bc1b0e1ec81'), */}
    </>
  );
}

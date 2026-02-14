import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pt-14">{children}</div>
    </div>
  );
};

export default DashboardLayout;

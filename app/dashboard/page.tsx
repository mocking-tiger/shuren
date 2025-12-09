import LoginChecker from "../components/auth/LoginChecker";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <LoginChecker />
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;

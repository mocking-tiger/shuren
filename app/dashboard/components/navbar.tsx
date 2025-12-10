import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="w-full h-14 px-4 absolute top-0 left-0 bg-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold font-yuji">Shuren - 修錬</h1>
      <div></div>
    </div>
  );
};

export default Navbar;

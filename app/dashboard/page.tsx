import Link from "next/link";
import GradeBox from "./components/GradeBox";
import { getServerUser } from "@/lib/api/server-user-api";

const bgConfigs = [
  { url: "/images/bg/sprout.jpg", positionClass: "bg-center" },
  { url: "/images/bg/bamboo.jpg", positionClass: "bg-center" },
  { url: "/images/bg/sakura.jpg", positionClass: "bg-center" },
  { url: "/images/bg/momiji.jpg", positionClass: "bg-center" },
  { url: "/images/bg/susuki.jpg", positionClass: "bg-[left_0%_top_50%]" },
  { url: "/images/bg/ume.jpg", positionClass: "bg-center" },
  { url: "/images/bg/pine.jpg", positionClass: "bg-center" },
  { url: "/images/bg/stone.jpg", positionClass: "bg-center" },
  { url: "/images/bg/mountain.jpg", positionClass: "bg-[left_0%_top_30%]" },
];

const DashboardPage = async () => {
  const userData = await getServerUser();
  const currentGrade = userData?.userProgress?.currentGrade ?? 9;

  return (
    <div>
      <div className="px-4 md:px-32 py-4 md:py-16 flex flex-col gap-4 overflow-y-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <Link href={`/dashboard/${9 - index}`} key={index}>
            <GradeBox
              key={index}
              grade={9 - index}
              bg={bgConfigs[index].url}
              positionClass={bgConfigs[index].positionClass}
              isLocked={9 - index < currentGrade}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

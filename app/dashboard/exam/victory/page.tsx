import Button from "@/app/components/ui/Button";
import Link from "next/link";

const VictoryPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
      <h1 className="text-[120px] md:text-[160px] font-bold font-yuji">勝利</h1>
      <div className="flex gap-4">
        <Link href="/dashboard/exam">
          <Button type="button" className="w-20! bg-white text-black!">
            재도전
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button type="button" className="w-20! bg-white text-black!">
            메인으로
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VictoryPage;

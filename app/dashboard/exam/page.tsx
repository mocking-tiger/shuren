"use client";

import { ExamData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExamPage = () => {
  const router = useRouter();
  const [examData, setExamData] = useState<ExamData>();

  useEffect(() => {
    const getExamData = async () => {
      const data = JSON.parse(
        sessionStorage.getItem("examData") || "{}"
      ) as ExamData;
      if (!data) {
        router.push("/dashboard");
        return;
      }
      setExamData(data);
    };
    getExamData();
  }, [router]);

  if (!examData) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        {examData.grade}급 {examData.step}단계 시험
        <br />
        {examData.isPromotion ? "승급 시험" : "일반 시험"}
      </h1>
    </div>
  );
};

export default ExamPage;

"use client"; // QueryClient는 브라우저에서 상태를 관리하므로 필수

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // QueryClient를 useState내부에서 만드는 이유: 컴포넌트 리렌더링 시 초기화 방지
  const [queryClient] = useState(
    // 객체를 매번 생성하지 않도록 lazy initialization
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // staleTime 동안에는 fresh 상태를 유지하며 refetch를 하지 않음
            gcTime: 5 * 60 * 1000, // gcTime 동안에는 캐시 데이터를 유지하며 가비지 컬렉션을 하지 않음
            refetchOnWindowFocus: false, // 다른 탭에서 돌아올 때 자동으로 refetch 할지 여부
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

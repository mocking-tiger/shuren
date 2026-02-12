기획 문서: https://www.figma.com/board/wjZ6thDw200T6OJSB03TLJ/shuren?node-id=0-1&t=fCIzZDnghByjBouv-1

📌 프로젝트 개요

일본어 형용사를 단계별로 학습할 수 있는 웹 애플리케이션입니다. 9급부터 1급까지 총 243개의 형용사를 게임화된 방식으로 학습하며, 각 단계를 클리어하면 다음 단계로 승급할 수 있습니다.

배포 링크: https://shuren.vercel.app/

※ supabase 무료 플랜 사용으로 첫 접속 시 3-5초의 콜드 스타트가 발생할 수 있습니다.

---

🎯 프로젝트 시작 계기

일본어를 학습하면서 형용사를 체계적으로 암기할 수 있는 서비스의 부재를 느꼈습니다. 단순한 단어장 앱이 아닌, 게임화(Gamification) 요소를 접목하여 학습 동기를 부여하고, 단계별 성취감을 느낄 수 있는 플랫폼을 만들고자  
 했습니다.

또한, 실무에서 사용되는 최신 기술 스택을 활용한 풀스택 프로젝트를 통해 프론트엔드부터 백엔드, 배포까지 전체 개발 사이클을 경험하고자 이 프로젝트를 시작했습니다.

---

🛠 주요 기술 스택

Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query (React Query) - 서버 상태 관리 및 캐싱
- React Hook Form - 폼 상태 관리

Backend & Database

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)
- NextAuth v4 - 인증/세션 관리

Deployment & DevOps

- Vercel - 자동 배포
- Vercel Cron Jobs - 데모 계정 자동 리셋
- GitHub Actions - CI/CD

Additional Features

- Web Speech API - 일본어 TTS (음성 재생)

---

🏗 주요 기능

1. 단계별 학습 시스템

- 9급 → 1급: 총 9개 등급, 각 등급당 27개 단어 (3스텝 × 9단어)
- 현재 등급에 맞는 단어만 접근 가능 (등급 잠금 시스템)
- 승급 조건 충족 시 다음 등급 해금

2. 2가지 시험 모드

- 일반 시험: 현재 스텝의 9개 단어 테스트
- 승급 시험: 현재 등급의 27개 단어 중 랜덤 20개, 100% 정답 필수

3. 객관식 문제 생성

- 4지선다형 (정답 1개 + 오답 3개)
- 문제 순서 및 선택지 순서 랜덤 셔플

4. 사용자 진행도 추적

- 실시간 경험치 시스템 (0 → 33% → 66% → 100%)
- 애니메이션이 포함된 프로그레스 바
- 학습 이력 저장

5. 음성 지원 (TTS)

- 일본어 여성 음성 자동 선택 (Kyoko/Ayumi)
- 속도 및 피치 조절로 자연스러운 발음

6. 체험 계정

- 별도 회원가입 없이 즉시 체험 가능
- 매일 자동으로 초기 상태로 리셋 (Vercel Cron Jobs)

---

💡 기술적 도전과 해결

1. TanStack Query 캐싱 전략

문제: 단어 데이터는 정적이지만, 사용자 진행도는 동적으로 변경됩니다.

해결:

- 단어/뜻 데이터: staleTime: Infinity로 설정하여 한 번만 fetch
- 사용자 데이터: useMutation의 onSuccess에서 invalidateQueries로 자동 갱신
- dashboard 진입 시 prefetchQuery로 의미 데이터 미리 로드

useQuery({  
 queryKey: ["allMeanings"],  
 queryFn: fetchAllMeanings,  
 staleTime: Infinity, // 정적 데이터는 재요청 불필요  
 gcTime: 60 _ 60 _ 1000 \* 24  
 });

2. Next.js 15+ Params Promise 변경

문제: params가 동기 객체에서 비동기 Promise로 변경되어 기존 코드 에러 발생

해결:  
 // Before (Next.js 14)  
 const layout = ({ params }: { params: { grade: string } }) => {  
 const { grade } = params;  
 }

// After (Next.js 15+)  
 const layout = async ({ params }: { params: Promise<{ grade: string }> }) => {  
 const { grade } = await params;  
 }

3. SSR 환경에서 sessionStorage 접근

문제: 빌드 시 sessionStorage is not defined 에러 발생

해결: useState의 lazy initialization 활용  
 const [examData] = useState<ExamData | null>(() => {  
 if (typeof window === 'undefined') return null;  
 const data = sessionStorage.getItem("examData");  
 return data ? JSON.parse(data) : null;  
 });

4. React 19 Strict Mode: useEffect setState 경고

문제: useEffect 내부에서 동기적으로 setState 호출 시 cascading renders 경고

해결: useEffect 대신 useState lazy initialization 사용 (위 해결책과 동일)

5. 이미지 로딩 최적화

문제: 9개의 배경 이미지가 순차적으로 로드되어 뚝뚝 끊기는 UX

해결: 이미지 프리로딩 후 화면 표시  
 useEffect(() => {  
 const preloadImages = async () => {  
 const imagePromises = bgConfigs.map((config) => {  
 return new Promise((resolve, reject) => {  
 const img = new Image();  
 img.onload = resolve;  
 img.onerror = reject;  
 img.src = config.url;  
 });  
 });

      await Promise.all(imagePromises);
      setIsImagesLoaded(true);
    };

    preloadImages();

}, []);

6. 중복 시험 방지 로직

문제: 사용자가 이미 완료한 단계를 반복해서 클리어하는 것 방지

해결: 백엔드 검증 로직 추가  
 // 현재 등급과 시험 등급이 일치하는지 확인  
 if (userProgress.currentGrade === examInfo.grade &&  
 userProgress.exp >= examInfo.step) {  
 return "이미 클리어한 단계";  
 }

7. Next.js 16 middleware → proxy 변경

문제: Next.js 16 업데이트로 middleware.ts 파일명 및 함수명 deprecated

해결:

- middleware.ts → proxy.ts로 파일명 변경
- export function middleware → export function proxy로 함수명 변경

8. 보안 취약점 대응

문제: Vercel 배포 시 CVE-2025-66478 보안 취약점으로 배포 차단

해결: yarn upgrade next --latest로 패치 버전 업데이트

---

📚 배운 점

기술적 성장

1. Server/Client Component 구분: Next.js App Router에서 sessionStorage, useSearchParams 등 클라이언트 전용 API 사용 시 주의점 학습
2. 상태 관리 최적화: TanStack Query의 staleTime, gcTime, invalidateQueries 등을 활용한 효율적인 캐싱 전략 수립
3. 타입 안정성: TypeScript를 활용한 API 응답 타입 정의 및 Prisma 스키마와의 통합
4. 배포 자동화: Vercel의 자동 배포 파이프라인 및 Cron Jobs 활용
5. 성능 최적화: 이미지 프리로딩, loading.tsx를 활용한 UX 개선

소프트 스킬

1. 문제 해결 능력: 마이그레이션 이슈, SSR 관련 에러 등 다양한 문제를 독립적으로 디버깅하고 해결
2. 사용자 중심 사고: 체험 계정, 로딩 컴포넌트 등 채용 담당자의 편의를 고려한 기능 구현
3. 문서 읽기: Next.js 공식 문서, TanStack Query 문서 등을 참고하여 최신 모범 사례 적용

---

🚀 향후 개선 계획

1. 반복 학습 모드: 완료한 단어를 복습할 수 있는 기능
2. 오답 노트: 틀린 문제를 모아서 다시 풀 수 있는 기능
3. 학습 통계: 학습 시간, 정답률 등 통계 대시보드
4. 명사/동사 편 추가: 형용사 외 다른 품사로 확장
5. PWA 지원: 오프라인에서도 사용 가능하도록 개선

---

📞 Contact

- GitHub: https://github.com/mocking-tiger
- Email: dyden119@gmail.com
- Portfolio: https://portfolio-sandy-ten-48.vercel.app/

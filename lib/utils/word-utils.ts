export const getWordRange = (grade: number) => {
  const gradeIndex = 9 - grade;

  return {
    skip: gradeIndex * 27,
    take: 27,
  };
};

export const runTTS = (kana: string, speed: number = 0.3) => {
  // Web Speech API 사용
  const utterance = new SpeechSynthesisUtterance(kana);
  utterance.lang = "ja-JP"; // 일본어 설정

  // 목소리 설정 함수
  const setVoice = () => {
    const japaneseVoice = window.speechSynthesis.getVoices().find(
      (voice) =>
        voice.lang === "ja-JP" &&
        (voice.name.includes("Female") ||
          voice.name.includes("Kyoko") || // macOS
          voice.name.includes("Ayumi") || // Windows
          voice.name.includes("female"))
    );

    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    utterance.rate = speed; // 속도 (0.1 ~ 10, 기본 1)
    utterance.pitch = 1; // 음높이 (0 ~ 2, 기본 1)

    window.speechSynthesis.speak(utterance);
  };

  // 음성 목록이 이미 로드되어 있으면 바로 실행
  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    // 음성 목록 로드를 기다림
    window.speechSynthesis.addEventListener("voiceschanged", setVoice, {
      once: true,
    });
  }
};

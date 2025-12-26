export const getWordRange = (grade: number) => {
  const gradeIndex = 9 - grade;

  return {
    skip: gradeIndex * 27,
    take: 27,
  };
};

export const runTTS = (kana: string) => {
  // Web Speech API 사용
  const utterance = new SpeechSynthesisUtterance(kana);
  utterance.lang = "ja-JP"; // 일본어 설정

  // 목소리 설정
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

  utterance.rate = 0.3; // 속도 (0.1 ~ 10, 기본 1)
  utterance.pitch = 1; // 음높이 (0 ~ 2, 기본 1)

  window.speechSynthesis.speak(utterance);
};

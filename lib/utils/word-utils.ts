export const getWordRange = (grade: number) => {
  const gradeIndex = 9 - grade;

  return {
    skip: gradeIndex * 27,
    take: 27,
  };
};

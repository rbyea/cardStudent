export const ageText = (age) => {
  if (age === 1 || age % 10 === 1) {
    return `${age} год`;
  } else if ((age > 1 && age < 5) || (age % 10 > 1 && age % 10 < 5)) {
    return `${age} года`;
  } else {
    return `${age} лет`;
  }
};
export const transformFeedbackCount = (data) => {
  if (!data || data.length === 0) {
    return { positive: 0, negative: 0, neutral: 0 };
  }
  const result = data.reduce(
    (acc, curr) => {
       acc[curr.rating] = acc[curr.rating] += 1;
       return acc
    },
    { positive: 0, negative: 0, neutral: 0 }
  );
  return result;
};

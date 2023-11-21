export const categorizeTasks = (data) => {
  console.log("data", data);
  if (!data) {
    return { todo: [], inProgress: [], done: [] };
  }
  const result = data.reduce(
    (acc, curr) => {
      console.log("curr", curr);
      acc[curr.progress].push(curr);
      return acc;
    },
    { todo: [], inProgress: [], done: [] }
  );
  return result;
};

export const transformCheckList = (data) => {
  return data.map((item) => {
    return {
      ...item,
      id: item._id,
    };
  });
};

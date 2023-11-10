import { truncateString } from "helpers/common.helper";
export const transformServiceTableData = (data) => {
  return data.map((item, index) => {
    return {
      key: index,
      id: item._id,
      name: `${item.owner.first_name} ${item.owner.last_name} `,
      title: truncateString(item.title, 25),
      type: item.type,
      area: item.area,
      category: item.category,
      date: item.date,
    };
  });
};

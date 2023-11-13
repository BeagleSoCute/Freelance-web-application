import {truncateString} from 'helpers/common.helper'
export const transformPrivideServiceTableData = (data) => {
  return data.map((item, index) => {
    return {
      key: index,
      id: item._id,
      title: truncateString(item.title,30),
      type: item.type,
      area: item.area,
      category: item.category,
      date: item.date,
      status: item.status
    };
  });
};

export const transformRequestTableData = (data) => {
  return data.map((item, index) => {
    return {
      key: index,
      id: item._id,
      name: `${item.owner.first_name} ${item.owner.last_name} `,
      title: truncateString(item.title,30),
      type: item.type,
      area: item.area,
      category: item.category,
      date: item.date,
      status: item.candidateStatus,
      serviceType:item.serviceType
    };
  });
};


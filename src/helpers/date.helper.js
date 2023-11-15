import dayjs from "dayjs";
import { DATE_FORMAT, DATE_FORMAT_DD_MM_YYYY } from "constants/index";

export const showDiffDate = (pastDateStr) => {
  const pastDate = dayjs(pastDateStr, DATE_FORMAT);
  return dayjs().from(pastDate);
};

export const getCurrentDate = () => {
  return dayjs().format(DATE_FORMAT);
};

export const getFormatedDate = (date) => {
  return dayjs(date).format(DATE_FORMAT_DD_MM_YYYY);
};

import dayjs from "dayjs";
import { DATE_FORMAT } from "constants/index";

export const showDiffDate = (pastDateStr) => {
  const pastDate = dayjs(pastDateStr, DATE_FORMAT);
  return dayjs().from(pastDate);
};

export const getCurrentDate = () => {
  return dayjs().format(DATE_FORMAT);
};

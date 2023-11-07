import dayjs from "dayjs";
import { DATE_FORMAT } from "constants/index";

export const showDiffDate = (pastDateStr) => {
  const now = dayjs();
  const pastDate = dayjs(pastDateStr, DATE_FORMAT);
  return now.from(pastDate);
};

export const getCurrentDate = () => {
  return dayjs().format(DATE_FORMAT);
};

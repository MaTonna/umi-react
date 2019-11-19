import moment from 'moment';
const checkRangePickerDate = (date: any[]): boolean => {
  if ((Array.isArray(date) && date.length) || moment.isMoment(date)) {
    return true;
  }
  return false;
};

export const formatRangePickerDate = (date: any[], min: string, max: string, formatConfig = 'YYYY-MM-DD'): {} => {
  const isData = checkRangePickerDate(date);
  const minData = isData ? date[0].format(formatConfig) : null;
  const maxData = isData ? date[1].format(formatConfig) : null;

  console.log(2222, minData, maxData)
  return {
    [min]: minData,
    [max]: maxData,
  };
};

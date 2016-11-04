import moment from 'moment';
import timeAgo from 'damals';

export const getLocalDateTime = (dateInput) => {
  if (dateInput && dateInput == null || dateInput === '') return '';
  return moment(moment.utc(dateInput).toDate()).format('MM/DD/YYYY h:mma');
};

export const getTimeAgo = (dateInput) => {
  if (dateInput && dateInput == null || dateInput === '') return '';
  return timeAgo(moment.utc(dateInput).toDate());
};

export const getMilliseconds = (lastModified) => {
  const matchArray = lastModified.match(new RegExp('\\.[0-9]*Z'));
  return parseInt(matchArray[0].substring(1, matchArray[0].length - 1), 10);
};

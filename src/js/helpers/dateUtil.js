import moment from 'moment';

export const getLocalDateTime = (dateInput) => {
  if (dateInput && dateInput == null || dateInput === '') return '';
  return moment(moment.utc(dateInput).toDate()).format('MM/DD/YYYY h:mma');
};

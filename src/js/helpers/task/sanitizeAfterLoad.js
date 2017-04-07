// import moment from 'moment';
import { calcTaskStatus } from './calcTaskStatus';
// import timeAgo from 'damals';
// import { getTimeRemaining } from './getTimeRemaining';

const translateStatus = (status) => {
  switch (status) {
    case 'DUE':
      return 'history';

    case 'COMPLETED':
      return 'done_all';

    case 'TERMINATED':
      return 'close';

    case 'ACTIVE':
      return 'view_list';

    default:
      return null;
  }
};

const calculateStyle = (status) => {
  const defaultStyle = {};
  const dueStyle = { color: 'orange' };
  const completedStyle = { color: 'green' };
  const activeStyle = { color: '#388AC3' };

  switch (status) {
    case 'DUE':
      return dueStyle;

    case 'COMPLETED':
      return completedStyle;

    case 'ACTIVE':
      return activeStyle;

    default:
      return defaultStyle;
  }
};

export const sanitizeAfterLoad = (task) => {
  const status = calcTaskStatus(task);

  /* task.dueDate = (task.dueDate === null) ? {} : {
    title: moment(task.dueDate, moment.ISO_8601).format('ddd, MMMM Do YYYY HH:MM'),
    value: getTimeRemaining(task.dueDate).rem
  };

  task.createdOn = {
    title: moment(task.createdOn, moment.ISO_8601).format('ddd, MMMM Do YYYY HH:MM'),
    value: timeAgo(moment.utc(task.createdOn).toDate())
  }; */
  return { ...task,
    viewInternalData: {
      status,
      icon: translateStatus(status),
      iconStyle: calculateStyle(status)
    } };
};

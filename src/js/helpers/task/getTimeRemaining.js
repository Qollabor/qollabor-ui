import moment from 'moment';

export const getTimeRemaining = (dueAt) => {
  if (dueAt === '') {
    return {
      rem: '',
      ms: ''
    };
  }

  const now = moment();
  const dueTime = moment(dueAt);
  const ms = dueTime.diff(now);
  const duration = moment.duration(Math.abs(ms));
  let timeRemaining = Math.floor(duration.asHours());
  if (timeRemaining > 48) {
    const fullDays = Math.floor(timeRemaining / 24);
    timeRemaining = `${fullDays} days, ${timeRemaining % 24}`;
  }
  timeRemaining += moment.utc(Math.floor(Math.abs(ms))).format(':mm');
  if (ms <= 0 && timeRemaining !== '0:00') {
    timeRemaining = `-${timeRemaining}`;
  }
  return {
    rem: timeRemaining,
    ms,
    readableFormat: duration.humanize()
  };
};

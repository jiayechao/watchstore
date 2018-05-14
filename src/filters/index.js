import moment from 'moment';

// 时间过滤
const moments = (value, format) => {
  if (!value) return '';
  return moment(value).format(format ? format : 'YYYY-MM-DD HH:mm:ss');
};
const countDown = (value, format) => {
  if (!value) return '';
  return moment.duration({
    seconds: value,
    minutes: value,
    hours:value,
    days: value
  })
}
const fixed = (value, length = 2) => {
  return Number(value).toFixed(length);
};

export {
  moments,
  countDown,
  fixed
}

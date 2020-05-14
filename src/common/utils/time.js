import moment from 'moment-timezone';

export function getCurrentTime() {
  return moment.tz('EST').format('lll z')
}
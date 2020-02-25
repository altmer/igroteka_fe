import dayjs from 'dayjs';

import { IMPORTANT_PLATFORMS, BACKLOG_STATUSES, GAME_SCORES } from './constants';

const sortByName = (platforms) => platforms.sort((left, right) => (left.name < right.name ? -1 : 1));

export const selectImportantPlatforms = (platforms) => sortByName(platforms.filter((pl) => IMPORTANT_PLATFORMS.includes(pl.name)));

export const selectRestPlatforms = (platforms) => sortByName(platforms.filter((pl) => !IMPORTANT_PLATFORMS.includes(pl.name)));

export const backlogStatusById = (id) => BACKLOG_STATUSES.find((status) => status.id === id);

export const gameScoreById = (id) => GAME_SCORES.find((score) => score.id === id);

export const yearFromDate = (date) => {
  if (!date || date === '') {
    return '';
  }
  return dayjs(date).format('YYYY');
};

export const renderDate = (date) => {
  if (!date || date === '') {
    return 'TBD';
  }
  return dayjs(date).format('MMM D, YYYY');
};

export const yupToFormErrors = (yupException) => {
  const errors = {};
  if (yupException.inner.length === 0) {
    errors[yupException.path] = yupException.message;
    return errors;
  }
  yupException.inner.forEach((err) => {
    if (!errors[err.path]) {
      errors[err.path] = err.message;
    }
  });
  return errors;
};

export default selectImportantPlatforms;

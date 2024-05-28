export const convertToNormalTime = (dateTimeString, format) => {
  // Parse the date string into a Date object
  const date = new Date(dateTimeString);

  let options = {};

  if (format === 'v_short') {
    options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'EST', // Assuming the input string is in UTC timezone
    };
  } else if (format === 'short') {
    options = {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'EST', // Assuming the input string is in UTC timezone
    };
  } else {
    options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'EST', // Assuming the input string is in UTC timezone
    };
  }

  const normalTime = date.toLocaleString('en-US', options);

  return normalTime;
};

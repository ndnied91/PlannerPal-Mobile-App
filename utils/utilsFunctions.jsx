export const convertToNormalTime = (dateTimeString, format) => {
  // Parse the date string into a Date object
  const date = new Date(dateTimeString);

  let options = {};

  if (format === 'just_time') {
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
  } else if (format === 'date_no_year') {
    options = {
      month: '2-digit',
      day: '2-digit',
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

export const hexToRgba = (hex, opacity) => {
  let r = 0,
    g = 0,
    b = 0;
  // Handling 3 digit hex
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // Handling 6 digit hex
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r},${g},${b},${opacity})`;
};

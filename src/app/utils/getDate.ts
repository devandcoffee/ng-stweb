// Convert a string to a date form matching input type="date"
export const getDateFromString = (dateString) => {
  return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
};

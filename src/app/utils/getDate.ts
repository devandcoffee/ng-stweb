// Convert 
export const getDateFromString = (dateString) => {
  return dateString ? new Date(dateString).toISOString().split('T')[0] : ''
}
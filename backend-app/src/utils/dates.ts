function dateDiff(initialDate: Date, endDate: Date) {
  return Math.abs(initialDate.getTime() - endDate.getTime());
}

export function getDaysBetweenDates(initialDate: Date, endDate: Date) {
  return Math.ceil(dateDiff(initialDate, endDate) / (1000 * 3600 * 24));
}

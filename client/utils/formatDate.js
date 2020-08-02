export const getHours = (date2, date1) => {
  let diff = (Date.parse(date2) - Date.parse(date1)) / 1000
  diff /= 60 * 60
  return Math.abs(Math.round(diff))
}

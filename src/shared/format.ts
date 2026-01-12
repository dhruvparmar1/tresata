export const formatTaskDate = (iso: string) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(d)
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(d)
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d)
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(d)
  return `${weekday} ${day}, ${month} ${year}`
}

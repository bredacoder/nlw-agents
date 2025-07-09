const TIME_UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: 'day', ms: 24 * 60 * 60 * 1000 },
  { unit: 'hour', ms: 60 * 60 * 1000 },
  { unit: 'minute', ms: 60 * 1000 },
  { unit: 'second', ms: 1000 },
]

export function getRelativeTime(date: Date, locale = 'en') {
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffAbs = Math.abs(diffMs)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  for (const { unit, ms } of TIME_UNITS) {
    if (diffAbs >= ms || unit === 'second') {
      const value = Math.round(diffMs / ms)
      return rtf.format(value, unit)
    }
  }
}

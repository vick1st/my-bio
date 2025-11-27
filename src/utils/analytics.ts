export function trackClick(linkId: string): void {
  const key = `analytics:clicks:${linkId}`
  const current = Number(localStorage.getItem(key) || '0')
  localStorage.setItem(key, String(current + 1))
}

export function getClicks(linkId: string): number {
  const key = `analytics:clicks:${linkId}`
  return Number(localStorage.getItem(key) || '0')
}

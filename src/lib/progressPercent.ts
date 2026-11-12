/** Returns value as a whole percentage of max, clamped to 0-100. A non-positive max gives 0. */
export function progressPercent(value: number, max: number): number {
  if (max <= 0) return 0
  return Math.min(100, Math.max(0, Math.round((value / max) * 100)))
}

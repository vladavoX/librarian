export const since = (date: Date) => {
	const now = new Date()
	const diff = now.getTime() - date.getTime()

	const diffInSeconds = Math.floor(diff / 1000)
	const diffInMinutes = Math.floor(diffInSeconds / 60)
	const diffInHours = Math.floor(diffInMinutes / 60)
	const diffInDays = Math.floor(diffInHours / 24)
	const diffInMonths =
		now.getMonth() -
		date.getMonth() +
		12 * (now.getFullYear() - date.getFullYear())

	if (diffInMonths > 1) return date.toLocaleString()
	if (diffInDays >= 1) return `${diffInDays} days ago`
	if (diffInHours >= 1) return `${diffInHours} hours ago`
	if (diffInMinutes >= 1) return `${diffInMinutes} minutes ago`
	return `${diffInSeconds} seconds ago`
}

/**
 * Calculates the time elapsed since the input date and returns a human-readable string representing the duration.
 *
 * @param {Date} date - The date to calculate the time elapsed since.
 * @return {string} A human-readable string representing the duration since the input date.
 */
export const since = (date: Date): string => {
	const now = new Date()
	const diff = now.getTime() - date.getTime()

	const diffInSeconds = Math.floor(diff / 1000)
	const diffInMinutes = Math.floor(diffInSeconds / 60)
	const diffInHours = Math.floor(diffInMinutes / 60)
	const diffInDays = Math.floor(diffInHours / 24)
	const diffInMonths = now.getMonth() - date.getMonth() + 12 * (now.getFullYear() - date.getFullYear())

	if (diffInMonths > 1) return date.toLocaleString()
	if (diffInDays === 1) return `${diffInDays} day ago`
	if (diffInDays > 1) return `${diffInDays} days ago`
	if (diffInHours === 1) return `${diffInHours} hour ago`
	if (diffInHours > 1) return `${diffInHours} hours ago`
	if (diffInMinutes === 1) return `${diffInMinutes} minute ago`
	if (diffInMinutes >= 1) return `${diffInMinutes} minutes ago`
	return `${diffInSeconds} seconds ago`
}

/**
 * A function that takes a text input, removes non-alphanumeric characters, and capitalizes the first letter of first word.
 *
 * @param {string} text - The input text to be prettified
 * @return {string} The prettified text with only alphanumeric characters and capitalized first letter
 */
export const prettifyText = (text: string): string => {
	// replace all dashes and underscores with spaces
	const spaces = text.replace(/[-_]/g, ' ')
	// only alphanumeric
	const alphanumeric = spaces.replace(/[^a-zA-Z0-9 ]/g, '')
	// capitalize the first word
	const capitalized = alphanumeric.charAt(0).toUpperCase() + alphanumeric.slice(1)

	return capitalized
}

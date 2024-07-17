import type { UserDocument, UserSettings } from '@/models/User'

export async function getUser(email?: string): Promise<UserDocument> {
	const res = await fetch(`http://localhost:3000/api/users?email=${email}`)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export async function getUserSettings(id?: string): Promise<UserSettings> {
	const res = await fetch(`http://localhost:3000/api/users/${id}/settings`, {
		next: { tags: ['users'] }
	})

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

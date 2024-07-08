'use server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export const updateUserTheme = async (email: string, theme: string) => {
	try {
		await connectDB()

		await User.updateOne({ email }, { $set: { 'settings.theme': theme } })
	} catch (error) {
		console.log(error)
	}
}

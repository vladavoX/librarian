'use server'
import { connectDB } from '@/lib/mongodb'
import User, { type UserDocument } from '@/models/User'

export async function getUser(
	email: string | null | undefined
): Promise<UserDocument | undefined> {
	if (!email) return

	try {
		await connectDB()

		const response = await User.findOne<UserDocument>({ email })
		const user = JSON.parse(JSON.stringify(response))
		if (!user) return

		return user
	} catch (error) {
		console.log(error)
	}
}

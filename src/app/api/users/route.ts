import { connectDB } from '@/lib/mongodb'
import User, { type UserDocument } from '@/models/User'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const email = searchParams.get('email')

	try {
		await connectDB()

		const user = await User.findOne<UserDocument>({ email })

		return new Response(JSON.stringify(user), {
			status: 200
		})
	} catch (error) {
		console.log(error)
	}
}

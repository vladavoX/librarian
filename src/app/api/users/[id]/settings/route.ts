import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	try {
		await connectDB()

		const settings = await User.findOne({ _id: id }).select('settings')

		return new Response(JSON.stringify(settings), {
			status: 200
		})
	} catch (error) {
		console.log(error)
	}
}

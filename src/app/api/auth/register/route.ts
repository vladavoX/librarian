import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import client from '@/lib/mongodb'

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json()
		// TODO: validate email and password

		console.log({ email, password })

		const hashedPassword = await hash(password, 10)

		const db = client.db('librarian')
		const users = await db.collection('users').insertOne({
			email,
			password: hashedPassword
		})

		return NextResponse.json({ message: 'success' })
	} catch (error) {
		console.log(error)
	}
}

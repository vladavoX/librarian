'use server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const register = async (email: string, password: string) => {
	try {
		await connectDB()

		const userFound = await User.findOne({ email })
		if (userFound) {
			return { error: 'Email already exists!' }
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		await User.create({
			email: email,
			password: hashedPassword
		})
	} catch (error) {
		console.log(error)
	}
}

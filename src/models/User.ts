import mongoose, { Schema, model } from 'mongoose'

export interface UserDocument {
	_id: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
	username: string
	avatar?: string
	firstName?: string
	lastName?: string
	settings: UserSettings
	likes?: string[]
	comments?: { [id: string]: string }[]
}

export interface UserSettings {
	theme: string
	profileSetup: boolean
}

const UserSchema = new Schema<UserDocument>(
	{
		email: {
			index: true,
			type: String,
			unique: true,
			required: [true, 'Email is required'],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Email is invalid'
			]
		},
		password: {
			type: String,
			required: true,
			minlength: [8, 'Password must be at least 8 characters long']
		},
		username: {
			type: String,
			unique: true,
			required: [true, 'Username is required']
		},
		avatar: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		settings: {
			theme: { type: String, default: 'system' },
			profileSetup: { type: Boolean, default: false }
		},
		likes: { type: [String] },
		comments: { type: [Object] }
	},
	{
		timestamps: true,
		autoIndex: true
	}
)

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema)
export default User

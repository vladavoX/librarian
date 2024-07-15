import mongoose, { Schema, model } from 'mongoose'

export interface PostDocument {
	_id: string
	image?: string
	text: string
	likes: number
	createdAt: Date
	updatedAt: Date
	author: string
	comments: string[]
	tags: string[]
	views: number
}

const PostSchema = new Schema<PostDocument>(
	{
		image: { type: String },
		text: { type: String, required: true },
		likes: { type: Number, default: 0 },
		author: { type: String, required: true },
		comments: { type: [String], default: [] },
		tags: { type: [String], default: [] },
		views: { type: Number, default: 0 }
	},
	{
		timestamps: true,
		autoIndex: true
	}
)

const Post = mongoose.models?.Post || model<PostDocument>('Post', PostSchema)
export default Post

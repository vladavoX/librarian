'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'

const NotesQuotes = () => {
	const [notes, setNotes] = useState<{ id: number; note: string }[]>([])
	const [quotes, setQuotes] = useState<{ id: number; quote: string }[]>([])

	return (
		<>
			<div className="grid gap-2 col-span-3">
				<Label>Notes</Label>
				{notes.map((note) => (
					<div
						key={note.id}
						className="flex items-center justify-between gap-2"
					>
						<Input
							id={`note-${note.id}`}
							name={`note-${note.id}`}
							placeholder="Leave a note"
							value={note.note}
							onChange={(e) =>
								setNotes(
									notes.map((n) =>
										n.id === note.id ? { ...n, note: e.target.value } : n
									)
								)
							}
						/>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}
						>
							<TrashIcon />
						</Button>
					</div>
				))}
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => setNotes([...notes, { id: notes.length, note: '' }])}
					>
						<PlusIcon />
					</Button>
					Add a note
				</div>
			</div>
			<div className="grid gap-2 col-span-3">
				<Label htmlFor="quotes">Quotes</Label>
				{quotes.map((quote) => (
					<div
						key={quote.id}
						className="flex items-center justify-between gap-2"
					>
						<Input
							id={`quote-${quote.id}`}
							name={`quote-${quote.id}`}
							placeholder="Leave a quote"
							value={quote.quote}
							onChange={(e) =>
								setQuotes(
									quotes.map((q) =>
										q.id === quote.id ? { ...q, quote: e.target.value } : q
									)
								)
							}
						/>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => setQuotes(quotes.filter((q) => q.id !== quote.id))}
						>
							<TrashIcon />
						</Button>
					</div>
				))}
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() =>
							setQuotes([...quotes, { id: quotes.length, quote: '' }])
						}
					>
						<PlusIcon />
					</Button>
					Add a quote
				</div>
			</div>
		</>
	)
}

export { NotesQuotes }

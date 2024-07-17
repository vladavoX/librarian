import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
	CardContent
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const BooksHeader = () => {
	return (
		<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3">
					<CardTitle>Your book</CardTitle>
					<CardDescription className="max-w-lg text-balance leading-relaxed">
						This is a place for you to keep track of your books.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button>Add new book</Button>
				</CardFooter>
			</Card>
			<Card x-chunk="dashboard-05-chunk-1">
				<CardHeader className="pb-2">
					<CardDescription>Pages read this week</CardDescription>
					<CardTitle className="text-4xl">329</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">
						+25% from last week
					</div>
				</CardContent>
				<CardFooter>
					<Progress value={25} aria-label="25% increase" />
				</CardFooter>
			</Card>
			<Card x-chunk="dashboard-05-chunk-2">
				<CardHeader className="pb-2">
					<CardDescription>Books read this month</CardDescription>
					<CardTitle className="text-4xl">3</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">
						+100% from last month
					</div>
				</CardContent>
				<CardFooter>
					<Progress value={100} aria-label="100% increase" />
				</CardFooter>
			</Card>
		</div>
	)
}

export { BooksHeader }

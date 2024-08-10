import { NewBookForm } from '@/app/components/form/NewBookForm'

export default async function NewBook() {
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<NewBookForm />
			</div>
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
				something else
			</div>
		</main>
	)
}

import { NewPostForm } from '../components/form/NewPostForm'

export default function Home() {
	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4'>
			<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1'>something else</div>
			<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
				<NewPostForm />
			</div>
			<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1'>something else</div>
		</main>
	)
}

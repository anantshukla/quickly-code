/*
	File: src/app/error.tsx
	Description: This file contains the default error component.
*/

"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => (
	<main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-gray-900">
		<div className="text-center">
			<p className="text-base font-semibold text-emerald-700 dark:text-emerald-500">There was a problem</p>
			<h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">{error.message || "Something went wrong"}</h1>
			<p className="mt-6 text-base leading-7 text-zinc-600 dark:text-gray-400">Please try again.</p>
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<button
					onClick={reset}
					className="px-6 py-3 text-base font-semibold text-white bg-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-700">
					Try Again
				</button>
			</div>
		</div>
	</main>
);

export default error;

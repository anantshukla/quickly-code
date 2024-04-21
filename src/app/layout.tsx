/*
	File: src/app/layout.tsx
	Description: This file contains the layout for the application.
*/

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Quickly Code Challenge",
	description: "Submissionb by Anant Shukla",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
					theme="colored"
				/>
			</body>
		</html>
	);
}

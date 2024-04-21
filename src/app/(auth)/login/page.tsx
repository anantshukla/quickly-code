"use client";

/*
	File: src/app/auth/login/page.tsx
	Description: This page displays the login form.
*/

import React, { useState } from "react";
import axios from "axios";
import { validateEmail, validatePassword } from "../validations";
import AuthLayout from "../authLayout";
import { useRouter } from "next/navigation";
import { APIErrorFailureDTO } from "@/app/lib/APIErrorFailureDTO";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let validationErrors: { [key: string]: string } = {};

		if (!email || !validateEmail(email)) {
			validationErrors.email = "Please enter a valid email address";
		}

		if (!password || !validatePassword(password)) {
			validationErrors.password = "Password should be at least 6 characters long";
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		const requestBody = {
			email: email,
			password: password,
		};

		const apiCall = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, requestBody, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		toast.promise(apiCall, {
			pending: {
				render() {
					return "Logging in...";
				},
			},
			success: {
				render({ data }: { data: any }) {
					console.log(data.data);
					const { message, token } = data.data;

					// Save jwt token to session storage
					window.sessionStorage.setItem("jwt_bearer_token", token);

					router.push("/myprofile");
					return `Success! ${message}`;
				},
			},
			error: {
				render({ data }: { data: any }) {
					console.log(data);
					const { message } = data.response.data;
					return `${message}`;
				},
			},
		});
	};

	return (
		<AuthLayout>
			<div className="absolute top-10 right-10 mt-4 mr-4">
				<button
					className="TextButton peer relative inline-flex items-center whitespace-nowrap underline-offset-4 transition-colors duration-300 focus-visible:underline focus-visible:outline-none disabled:pointer-events-none items-center"
					type="button"
					onClick={() => router.push("/signup")}>
					<p className="text-gray-900 font-medium text-md underline-offset-4 hover:underline peer-hover:underline">
						Sign Up &nbsp;
					</p>
					<svg
						className="h-8 w-8 text-gray-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<circle cx="12" cy="12" r="10" />
						<polyline points="12 16 16 12 12 8" />
						<line x1="8" y1="12" x2="16" y2="12" />
					</svg>
				</button>
			</div>
			<h1 className="text-3xl font-bold mb-4">Log in</h1>
			<h2 className="text-lg font-semibold mb-6">And Unlock the Power of Early Payments!</h2>

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<div className="flex space-x-4">
					<div className="TextInput relative w-full max-w-full">
						<input
							id="Work email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
							placeholder="Work email"
						/>
						<label
							htmlFor="Work email"
							className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
							Work email
						</label>
						{errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
					</div>
				</div>

				<div className="TextInput relative w-full max-w-full">
					<input
						id="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Password"
					/>
					<label
						htmlFor="Password"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Password
					</label>
					{errors.password ? (
						<div className="text-sm text-red-500">{errors.password}</div>
					) : (
						<p className="text-sm mt-1">&nbsp;</p>
					)}
				</div>

				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Login
				</button>
			</form>
		</AuthLayout>
	);
};

export default LoginForm;

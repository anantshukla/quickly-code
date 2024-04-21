"use client";

/*
	File: src/app/auth/signup/page.tsx
	Description: This page displays the signup form.
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { validateEmail, validatePassword, validatePhone } from "../validations";
import AuthLayout from "../authLayout";
import { APIErrorFailureDTO } from "@/app/lib/APIErrorFailureDTO";
import RadioWithTickMark from "@/app/lib/RadioWithTickMark";
import { SignupApiDto } from "@/app/lib/SignupApiDto";
import { toast } from "react-toastify";
import { NextRouterWrapper } from "@/app/lib/NextRouterWrapper";

interface SignUpFormDataSchema {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	businessRegistrationType: string;
	companyType: string;
	legalName: string;
	hasTradeName: boolean;
	operatingName: string;
	industry: string;
	website: string;
	phone: string;
	businessNumber: string;
	expectedActivity: string;
}

interface FormErrors {
	[key: string]: string;
}

const SignupForm: React.FC = () => {
	const router = NextRouterWrapper.getAppRouter();

	const [signupFormData, setSignupFormData] = useState<SignUpFormDataSchema>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		businessRegistrationType: "",
		companyType: "",
		legalName: "",
		hasTradeName: false,
		operatingName: "",
		industry: "",
		website: "",
		phone: "",
		businessNumber: "",
		expectedActivity: "",
	});
	const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

	useEffect(() => {
		if (isSubmittedOnce) {
			isSignUpFormValid();
		}
	}, [signupFormData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | EventTarget>): void => {
		const { name, value, type, checked } = e.target as any;
		setSignupFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const isSignUpFormValid = (): boolean => {
		const validationErrors: FormErrors = {};
		setErrors(validationErrors);

		if (!signupFormData.firstName) {
			validationErrors.firstName = "First Name is required";
		}
		if (!signupFormData.lastName) {
			validationErrors.lastName = "Last Name is required";
		}
		if (!signupFormData.email || !validateEmail(signupFormData.email)) {
			validationErrors.email = "Please enter a valid email address";
		}
		if (!signupFormData.password || !validatePassword(signupFormData.password)) {
			validationErrors.password = "Password should be at least 6 characters long";
		}
		if (signupFormData.password !== signupFormData.confirmPassword) {
			validationErrors.confirmPassword = "The passwords do not match";
		}
		if (!signupFormData.businessRegistrationType) {
			validationErrors.businessRegistrationType = "Business registration type is required";
		}
		if (!signupFormData.legalName) {
			validationErrors.legalName = "Legal name is required";
		}
		if (!signupFormData.companyType) {
			validationErrors.companyType = "Company type is required";
		}
		if (!signupFormData.industry) {
			validationErrors.industry = "Industry is required";
		}
		if (signupFormData.expectedActivity === "") {
			validationErrors.expectedActivity = "Expected activity is required";
		}
		if (signupFormData.phone && !validatePhone(signupFormData.phone)) {
			validationErrors.phone = "Please enter a valid phone number";
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		setIsSubmittedOnce(true);

		if (!isSignUpFormValid()) {
			return;
		}

		const requestBody: SignupApiDto = {
			user: {
				first_name: signupFormData.firstName,
				last_name: signupFormData.lastName,
				email: signupFormData.email,
				password: signupFormData.password,
			},
			company: {
				activity: {
					early_pay_intent: true,
					expected_activity: signupFormData.expectedActivity,
				},
				early_pay_intent: true,
				industry: { value: signupFormData.industry, label: signupFormData.industry },
				business_type: {
					label: signupFormData.companyType,
					value: signupFormData.companyType,
				},
				website: signupFormData.website,
				business_registration: signupFormData.businessRegistrationType,
				phone: signupFormData.phone,
				business_number: signupFormData.businessNumber,
				has_trade_name: signupFormData.hasTradeName,
				legal_name: signupFormData.legalName,
				expected_activity: signupFormData.expectedActivity,
			},
		};

		const apiCall = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, requestBody, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		toast.promise(apiCall, {
			pending: {
				render() {
					return "Signing up...";
				},
			},
			success: {
				render({ data }: { data: any }) {
					const { message } = data.data;
					router.push("/login");
					return `${message} Please Login to continue.`;
				},
			},
			error: {
				render({ data }: { data: APIErrorFailureDTO }) {
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
					onClick={() => router.push("/login")}>
					<p className="text-gray-900 font-medium text-md underline-offset-4 hover:underline peer-hover:underline">
						Log in &nbsp;
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

			<h1 className="text-3xl font-bold mb-4">Get Started</h1>
			<h2 className="text-lg font-semibold mb-6">Open an account in less than 3 minutes</h2>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<div className="flex space-x-4">
					<div className="TextInput relative w-full max-w-full">
						<input
							id="First name"
							type="text"
							name="firstName"
							value={signupFormData.firstName}
							onChange={handleChange}
							className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
							placeholder="First name"
						/>
						<label
							htmlFor="First name"
							className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
							First name
						</label>
						{errors.firstName && <div className="text-sm text-red-500">{errors.firstName}</div>}
					</div>
					<div className="TextInput relative w-full max-w-full">
						<input
							id="Last name"
							type="text"
							name="lastName"
							value={signupFormData.lastName}
							onChange={handleChange}
							className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
							placeholder="Last name"
						/>
						<label
							htmlFor="Last name"
							className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
							Last name
						</label>
						{errors.lastName && <div className="text-sm text-red-500">{errors.lastName}</div>}
					</div>
				</div>
				<div className="TextInput relative w-full max-w-full">
					<input
						id="Work email (required)"
						type="text"
						name="email"
						value={signupFormData.email}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Work email (required)"
					/>
					<label
						htmlFor="Work email (required)"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Work email (required)
					</label>
					{errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
				</div>
				<div className="TextInput relative w-full max-w-full">
					<input
						id="Password"
						type="password"
						name="password"
						value={signupFormData.password}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Password (required)"
					/>
					<label
						htmlFor="Password"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Password (required)
					</label>
					{errors.password ? (
						<div className="text-sm text-red-500">{errors.password}</div>
					) : (
						<p className="text-sm text-gray-600 mt-1">Password must be at least 6 characters long.</p>
					)}
				</div>
				<div className="TextInput relative w-full max-w-full">
					<input
						id="Confirm Password"
						type="password"
						name="confirmPassword"
						value={signupFormData.confirmPassword}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Confirm Password (required)"
					/>
					<label
						htmlFor="Confirm Password"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Confirm Password (required)
					</label>
					{errors.confirmPassword && <div className="text-sm text-red-500">{errors.confirmPassword}</div>}
				</div>

				<hr className="my-8" />

				<h3 className="text-2xl font-bold">Tell us more about your company</h3>
				<div className="flex flex-col w-full">
					<RadioWithTickMark
						options={[
							{ id: "soleProprietor", value: "Sole Proprietor", label: "Sole Proprietor" },
							{ id: "corporation", value: "Corporation", label: "Corporation" },
						]}
						name="businessRegistrationType"
						selectedValue={signupFormData.businessRegistrationType}
						onChange={handleChange}
					/>

					{errors.businessRegistrationType && <div className="text-sm text-red-500">{errors.businessRegistrationType}</div>}

					{signupFormData.businessRegistrationType && (
						<div
							style={{
								backgroundColor: "#f3f4f6",
								padding: "1rem",
								marginTop: "0.5rem",
								width: "100%",
							}}>
							{signupFormData.businessRegistrationType === "Sole Proprietor" ? (
								<p>
									You are a sole proprietor. Your name might be John Smith, and you advertise your business as ABC
									Framing. In this case, your legal business name is John Smith and your operating name is ABC Framing.
								</p>
							) : (
								<p>
									You are a corporation. Your legal business name might be 12345 Canada Inc. and the business advertises
									as ABC Properties. In this case, the legal business name is 12345 Canada Inc. and the operating name is
									ABC Properties.
								</p>
							)}
						</div>
					)}
				</div>
				<div className="TextInput relative w-full max-w-full">
					<input
						id="Legal business name (required)"
						type="text"
						name="legalName"
						value={signupFormData.legalName}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Legal business name (required)"
					/>
					<label
						htmlFor="Legal business name (required)"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Legal business name (required)
					</label>
					{errors.legalName && <div className="text-sm text-red-500">{errors.legalName}</div>}
				</div>

				<label className="flex items-center space-x-2">
					<input
						id="My company has an operating name or trade name"
						data-testid="My company has an operating name or trade name"
						className="rounded-sm border-[1.5px] bg-white focus:ring-0 focus:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-0 text-black focus-visible:outline-gray-900 border-gray-500 hover:cursor-pointer hover:border-gray-800 h-4 w-4"
						type="checkbox"
						name="hasTradeName"
						checked={signupFormData.hasTradeName}
						onChange={handleChange}
					/>
					<span>My company has an operating name or trade name.</span>
				</label>

				{signupFormData.hasTradeName && (
					<div className="TextInput relative w-full max-w-full">
						<input
							id="Operating name"
							type="text"
							name="operatingName"
							value={signupFormData.operatingName}
							onChange={handleChange}
							className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
							placeholder="Operating name"
						/>
						<label
							htmlFor="Operating name"
							className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
							Operating name
						</label>
					</div>
				)}

				<div className="TextInput relative w-full max-w-full">
					<input
						id="Business number"
						type="number"
						name="businessNumber"
						value={signupFormData.businessNumber}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Business number"
					/>
					<label
						htmlFor="Business number"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Business number
					</label>
				</div>

				<div className="SelectInput relative w-full max-w-full">
					<label className="block text-sm text-gray-500" htmlFor="company-type-select">
						Company type (required)
					</label>
					<select
						id="company-type-select"
						value={signupFormData.companyType}
						name="companyType"
						onChange={handleChange}
						className="block w-full h-full cursor-pointer border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm text-gray-900 focus:border-gray-900 focus:outline-none">
						<option value="">Select...</option>
						<option value="Retail">Retail</option>
						<option value="Digital products">Digital products</option>
						<option value="Food and drink">Food and drink</option>
						<option value="Professional services">Professional services</option>
						<option value="Membership organizations">Membership organizations</option>
						<option value="Personal services">Personal services</option>
						<option value="Transportation">Transportation</option>
						<option value="Travel and lodging">Travel and lodging</option>
						<option value="Medical services">Medical services</option>
						<option value="Education">Education</option>
						<option value="Entertainment and recreation">Entertainment and recreation</option>
						<option value="Building services">Building services</option>
						<option value="Financial services">Financial services</option>
						<option value="Regulated and age-restricted products">Regulated and age-restricted products</option>
					</select>
					{errors.companyType && <div className="text-sm text-red-500">{errors.companyType}</div>}
				</div>

				<div className="SelectInput relative w-full">
					<label className="block text-sm text-gray-500" htmlFor="industry-select">
						Industry (required)
					</label>
					<select
						id="industry-select"
						value={signupFormData.industry}
						name="industry"
						onChange={handleChange}
						className="block w-full h-full cursor-pointer border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm text-gray-900 focus:border-gray-900 focus:outline-none">
						<option value="">Select...</option>
						<option value="Software as a service">Software as a service</option>
						<option value="Apps">Apps</option>
						<option value="Books">Books</option>
						<option value="Music or other media">Music or other media</option>
						<option value="Games">Games</option>
						<option value="Blogs and written content">Blogs and written content</option>
						<option value="Other digital goods">Other digital goods</option>
						<option value="Other eCommerce/Marketplace">Other eCommerce/Marketplace</option>
					</select>
				</div>

				{errors.industry && <div className="text-red-500 text-sm">{errors.industry}</div>}

				<hr className="my-8" />

				<div className="TextInput relative w-full max-w-full">
					<input
						id="Website"
						type="text"
						name="website"
						value={signupFormData.website}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Website"
					/>
					<label
						htmlFor="Website"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Website
					</label>
				</div>
				<div className="TextInput relative w-full max-w-full">
					<input
						id="Phone"
						type="number"
						name="phone"
						value={signupFormData.phone}
						onChange={handleChange}
						className="z-10 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-[15px] pb-2.5 pt-4 peer placeholder:text-transparent focus:border-gray-900 focus:pb-2.5 focus:pt-4 focus:outline-none focus:ring-0 overflow-ellipsis text-sm text-gray-900 autofill:text-sm autofill:text-gray-900"
						placeholder="Phone number"
					/>
					<label
						htmlFor="Phone"
						className="absolute left-4 top-3.5 cursor-text text-sm text-gray-500 duration-300 origin-[0] -translate-y-3 scale-75 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-autofill:-translate-y-3 peer-autofill:scale-75 peer-focus:-translate-y-3 peer-focus:scale-75 transition-all">
						Phone
					</label>
				</div>
				{errors.phone && <div className="text-sm text-red-500">{errors.phone}</div>}

				<hr className="my-8" />

				<h3 className="text-2xl font-bold">Expected Activity</h3>
				<div className="flex flex-col space-y-2">
					<span className="text-lg font-semibold">How do you plan on using the platform?</span>
					<RadioWithTickMark
						options={[
							{ id: "getInvoicesPaidEarly", value: "Get my invoices paid early", label: "Get my invoices paid early" },
							{
								id: "offerVendorsEarlyPayments",
								value: "Offer vendors early payments",
								label: "Offer vendors early payments",
							},
							{
								id: "earnValuableDiscounts",
								value: "Earn valuable discounts on payables",
								label: "Earn valuable discounts on payables",
							},
							{ id: "justCheckingItOut", value: "Just checking it out", label: "Just checking it out" },
						]}
						name="expectedActivity"
						selectedValue={signupFormData.expectedActivity}
						onChange={handleChange}
					/>
				</div>
				{errors.expectedActivity && <div className="text-sm text-red-500">{errors.expectedActivity}</div>}

				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
					Sign up
				</button>
			</form>
		</AuthLayout>
	);
};

export default SignupForm;

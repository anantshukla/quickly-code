"use client";

import React, { useState } from "react";
import axios from "axios";
import { validateEmail, validatePassword, validatePhone } from "../validations";
import AuthLayout from "../authLayout";
import { APIErrorFailureDTO } from "@/app/lib/APIErrorFailureDTO";
import RadioWithTickMark from "@/app/lib/RadioWithTickMark";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignupForm: React.FC = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [businessRegistrationType, setBusinessRegistrationType] = useState("");

	const [companyType, setCompanyType] = useState("");

	const [legalName, setLegalName] = useState("");
	const [hasTradeName, setHasTradeName] = useState(false);
	const [operatingName, setOperatingName] = useState("");
	const [industry, setIndustry] = useState("");

	const [website, setWebsite] = useState("");
	const [phone, setPhone] = useState("");
	const [businessNumber, setBusinessNumber] = useState("");
	const [expectedActivity, setExpectedActivity] = useState("");

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let validationErrors: { [key: string]: string } = {};

		if (!firstName) {
			validationErrors.firstName = "First Name is required";
		}
		if (!lastName) {
			validationErrors.lastName = "Last Name is required";
		}
		if (!email || !validateEmail(email)) {
			validationErrors.email = "Please enter a valid email address";
		}
		if (!password || !validatePassword(password)) {
			validationErrors.password = "Password should be at least 6 characters long";
		}
		if (password !== confirmPassword) {
			validationErrors.confirmPassword = "The passwords do not match";
		}
		if (!businessRegistrationType) {
			validationErrors.businessRegistrationType = "Business registration type is required";
		}
		if (!legalName) {
			validationErrors.legalName = "Legal name is required";
		}
		if (!companyType) {
			validationErrors.companyType = "Company type is required";
		}
		if (!industry) {
			validationErrors.industry = "Industry is required";
		}
		if (expectedActivity === "") {
			validationErrors.expectedActivity = "Expected activity is required";
		}
		if (phone && !validatePhone(phone)) {
			validationErrors.phone = "Please enter a valid phone number";
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		const requestBody = {
			user: {
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
			},
			company: {
				activity: {
					early_pay_intent: true,
					expected_activity: expectedActivity,
				},
				early_pay_intent: true,
				industry: { value: industry, label: industry },
				business_type: {
					label: companyType,
					value: companyType,
				},
				website: website,
				business_registration: businessRegistrationType,
				phone: phone,
				business_number: businessNumber,
				has_trade_name: hasTradeName,
				legal_name: legalName,
				expected_activity: expectedActivity,
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
					console.log(data.data);
					const { message } = data.data;
					router.push("/login");
					return `${message} Please Login to continue.`;
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

	const router = useRouter();

	return (
		<AuthLayout>
			<div className="absolute top-10 right-10 mt-4 mr-4">
				<button
					className="TextButton peer relative inline-flex items-center whitespace-nowrap underline-offset-4 transition-colors duration-300 focus-visible:underline focus-visible:outline-none disabled:pointer-events-none items-center"
					type="button"
					onClick={() => router.push("/login")}>
					<React.Fragment>
						<p className="text-gray-900 font-medium text-md underline-offset-4 hover:underline peer-hover:underline">Log in</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 256 256"
							fill="currentColor"
							className="arrow-up-right fill-gray-900 ml-1  flex-shrink-0"
							width="20"
							height="20">
							<path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
						</svg>
					</React.Fragment>
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
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
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
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
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
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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
						selectedValue={businessRegistrationType}
						onChange={(value) => setBusinessRegistrationType(value)}
					/>

					{errors.businessRegistrationType && <div className="text-sm text-red-500">{errors.businessRegistrationType}</div>}

					{businessRegistrationType && (
						<div
							style={{
								backgroundColor: "#f3f4f6",
								padding: "1rem",
								marginTop: "0.5rem",
								width: "100%",
							}}>
							{businessRegistrationType === "Sole Proprietor" ? (
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
						value={legalName}
						onChange={(e) => setLegalName(e.target.value)}
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
						checked={hasTradeName}
						onChange={(e) => setHasTradeName(e.target.checked)}
					/>
					<span>My company has an operating name or trade name.</span>
				</label>

				{hasTradeName && (
					<div className="TextInput relative w-full max-w-full">
						<input
							id="Operating name"
							type="text"
							value={operatingName}
							onChange={(e) => setOperatingName(e.target.value)}
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
						value={businessNumber}
						onChange={(e) => setBusinessNumber(e.target.value)}
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
						value={companyType}
						onChange={(e) => setCompanyType(e.target.value)}
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
						value={industry}
						onChange={(e) => setIndustry(e.target.value)}
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
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
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
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
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
						selectedValue={expectedActivity}
						onChange={setExpectedActivity}
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

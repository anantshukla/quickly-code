"use client";

/*
	File: src/app/myprofile/page.tsx
	Description: This page displays the user profile details.
*/

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProfileDTO } from "@/app/lib/ProfileDTO";
import { filterNullAndEmptyStrings, sortFields } from "@/app/lib/utils";
import Head from "next/head";
import { NextRouterWrapper } from "../lib/NextRouterWrapper";

const page: React.FC = () => {
	const router = NextRouterWrapper.getAppRouter();

	const [jwtToken, setJwtToken] = useState("");
	const [showJsonView, setShowJsonView] = useState(false);
	const [userDetails, setUserDetails] = useState<ProfileDTO | null>(null);

	const getTokenFromSessionStorage = () => {
		const tokenFromStorage = window.sessionStorage.getItem("jwt_bearer_token");

		if (!tokenFromStorage || tokenFromStorage === "") {
			toast.error("You are not logged in. Please login.");
			router.push("/login");
		} else {
			setJwtToken(tokenFromStorage || "");
		}
	};

	const fetchUserProfileDetails = async (tokenValue: string) => {
		const userAPIDetails = await axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenValue}`,
				},
			})
			.then((response) => response.data.user)
			.then((response) => {
				console.log(response);
				setUserDetails(response as ProfileDTO);
			})
			.catch((error) => {
				console.log(error);
				toast.error("An error occurred while fetching user details. Please try again later.");
			});
		return userAPIDetails;
	};

	const logoutFromApp = () => {
		window.sessionStorage.removeItem("jwt_bearer_token");
		setJwtToken("");
		router.push("/login");
	};

	const toggleJsonView = () => {
		setShowJsonView(!showJsonView);
	};

	const renderUserDetails = () => {
		const filteredDetails = filterNullAndEmptyStrings(userDetails);
		if (showJsonView) {
			return <pre>{JSON.stringify(filteredDetails, null, 2)}</pre>;
		} else {
			return (
				<div className="bg-white shadow-md rounded-lg px-8 py-6">
					{userDetails && (
						<div>
							<div className="mb-8">
								<h2 className="text-xl font-bold mb-4">{userDetails.full_name}</h2>
								<p className="text-gray-600 mb-2">Email: {userDetails.email}</p>
								{userDetails.phone && <p className="text-gray-600 mb-2">Phone: {userDetails.phone}</p>}
							</div>
							<hr className="my-8" />
							<div className="mb-8">
								<h3 className="text-lg font-bold mb-4">Company Details</h3>
								<p className="text-gray-600 mb-2">
									<span className="font-bold">Name:</span> {userDetails.Company.name}
								</p>
								<p className="text-gray-600 mb-2">
									<span className="font-bold">Type:</span> {userDetails.Company.business_type}
								</p>
								<p className="text-gray-600 mb-2">
									<span className="font-bold">Industry:</span> {userDetails.Company.industry}
								</p>
								<p className="text-gray-600 mb-2">
									<span className="font-bold">Website:</span> {userDetails.Company.website}
								</p>
								{sortFields(Object.entries(userDetails.Company)).map(([key, value]) => {
									if (!["name", "business_type", "industry", "website"].includes(key) && typeof value !== "object") {
										if (typeof value === "boolean") {
											return (
												<div key={key} className="flex text-gray-600 mb-2">
													<p className="font-bold">{key}:</p>
													<p className="ml-2">{value ? "Yes" : "No"}</p>
												</div>
											);
										} else {
											return (
												<div key={key} className="flex text-gray-600 mb-2">
													<p className="font-bold">{key}:</p>
													<p className="ml-2">{value}</p>
												</div>
											);
										}
									}
									return null;
								})}
							</div>
							<hr className="my-8" />
							<div>
								<h3 className="text-lg font-bold mb-4">Other Users in Company</h3>
								{userDetails.Company.Users.map((user) => (
									<div key={user.id} className="flex text-gray-600 mb-2">
										<p className="font-bold flex text-gray-600 mb-2">{user.full_name}: </p>
										<p className="ml-2">{user.email}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			);
		}
	};

	// Default useEffect to check if user is logged in
	useEffect(() => {
		getTokenFromSessionStorage();
	}, []);

	// Only call this useEffect when jwtToken is updated by getTokenFromSessionStorage
	useEffect(() => {
		if (jwtToken && jwtToken !== "") {
			fetchUserProfileDetails(jwtToken);
		}
	}, [jwtToken]);

	return (
		<div className="bg-gray-100 min-h-screen">
			<Head>
				<title>User Profile</title>
			</Head>
			<div className="container mx-auto p-4">
				<div className="bg-white shadow-md rounded-lg px-8 py-6">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-3xl font-bold text-center">User Profile</h1>
						<div className="flex justify-end mb-4">
							<label className="inline-flex items-center cursor-pointer">
								<input type="checkbox" value="" className="sr-only peer" checked={showJsonView} onChange={toggleJsonView} />
								<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
									{showJsonView ? "JSON View" : "Regular View"}
								</span>
							</label>
						</div>
						<button
							className="TextButton peer relative inline-flex items-center whitespace-nowrap underline-offset-4 transition-colors duration-300 focus-visible:underline focus-visible:outline-none disabled:pointer-events-none items-center"
							type="button"
							onClick={logoutFromApp}>
							<p className="text-gray-900 font-medium text-md underline-offset-4 hover:underline peer-hover:underline">
								Logout &nbsp;
							</p>
							<svg
								className="h-8 w-8 text-gray-500"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" />
								<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
								<path d="M7 12h14l-3 -3m0 6l3 -3" />
							</svg>
						</button>
					</div>
					{renderUserDetails()}
				</div>
			</div>
		</div>
	);
};

export default page;

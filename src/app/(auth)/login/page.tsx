"use client";

import React, { useState } from "react";

const loginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const isEmailValid = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const isPasswordValid = () => {
		if (password.length < 6) {
			return false;
		}
		return true;
	};

	const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isEmailValid() || !isPasswordValid()) {
			return;
		}
	};

	return (
		<div>
			<form onSubmit={handleLoginSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={handleEmailChange}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default loginPage;

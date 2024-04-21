import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";

import LoginForm from "../src/app/(auth)/login/page";

import { NextRouterWrapper } from "../src/app/lib/NextRouterWrapper";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

jest.mock("axios");

describe("LoginForm", () => {
	const mockAppInstance: DeepMockProxy<AppRouterInstance> = mockDeep<AppRouterInstance>();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(NextRouterWrapper, "getAppRouter").mockReturnValue(mockAppInstance);
	});

	it("should render the login form", () => {
		const { getByLabelText } = render(<LoginForm />);
		expect(getByLabelText("Work email")).toBeInTheDocument();
		expect(getByLabelText("Password")).toBeInTheDocument();
	});

	it("displays validation errors for empty fields", async () => {
		const { getByText } = render(<LoginForm />);
		const loginButton = getByText("Login");

		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(getByText("Please enter a valid email address")).toBeInTheDocument();
			expect(getByText("Password should be at least 6 characters long")).toBeInTheDocument();
		});
	});

	it("displays validation error for invalid email", async () => {
		const { getByText, getByPlaceholderText } = render(<LoginForm />);
		const emailInput = getByPlaceholderText("Work email");
		const loginButton = getByText("Login");

		fireEvent.change(emailInput, { target: { value: "ThisIsMyEmailAddress" } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(getByText("Please enter a valid email address")).toBeInTheDocument();
		});
	});

	it("displays validation error for short password", async () => {
		const { getByText, getByPlaceholderText } = render(<LoginForm />);
		const passwordInput = getByPlaceholderText("Password");
		const loginButton = getByText("Login");

		fireEvent.change(passwordInput, { target: { value: "qwer" } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(getByText("Password should be at least 6 characters long")).toBeInTheDocument();
		});
	});
});

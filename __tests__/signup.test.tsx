import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "../src/app/(auth)/signup/page";

import { NextRouterWrapper } from "../src/app/lib/NextRouterWrapper";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

jest.mock("axios");

describe("SignupForm", () => {
	const mockAppInstance: DeepMockProxy<AppRouterInstance> = mockDeep<AppRouterInstance>();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(NextRouterWrapper, "getAppRouter").mockReturnValue(mockAppInstance);
	});

	it("should render the signup form", () => {
		const { getByLabelText, getByText } = render(<SignupForm />);
		expect(getByLabelText("First name")).toBeInTheDocument();
		expect(getByLabelText("Last name")).toBeInTheDocument();
		expect(getByLabelText("Work email (required)")).toBeInTheDocument();
		expect(getByLabelText("Password (required)")).toBeInTheDocument();
		expect(getByLabelText("Confirm Password (required)")).toBeInTheDocument();
		expect(getByLabelText("Business number")).toBeInTheDocument();
		expect(getByLabelText("Company type (required)")).toBeInTheDocument();
		expect(getByLabelText("Industry (required)")).toBeInTheDocument();
		expect(getByText("Expected Activity")).toBeInTheDocument();
	});

	it("displays validation errors for empty fields", async () => {
		const { getByText } = render(<SignupForm />);
		const signupButton = getByText("Sign up");

		fireEvent.click(signupButton);

		await waitFor(() => {
			expect(getByText("First Name is required")).toBeInTheDocument();
			expect(getByText("Last Name is required")).toBeInTheDocument();
			expect(getByText("Please enter a valid email address")).toBeInTheDocument();
			expect(getByText("Password should be at least 6 characters long")).toBeInTheDocument();
			expect(getByText("Business registration type is required")).toBeInTheDocument();
			expect(getByText("Legal name is required")).toBeInTheDocument();
			expect(getByText("Company type is required")).toBeInTheDocument();
			expect(getByText("Industry is required")).toBeInTheDocument();
			expect(getByText("Expected activity is required")).toBeInTheDocument();
		});
	});

	it("displays validation error for invalid email", async () => {
		const { getByText, getByPlaceholderText } = render(<SignupForm />);
		const emailInput = getByPlaceholderText("Work email (required)");
		const signupButton = getByText("Sign up");

		fireEvent.change(emailInput, { target: { value: "ThisIsMyEmailAddress" } });
		fireEvent.click(signupButton);

		await waitFor(() => {
			expect(getByText("Please enter a valid email address")).toBeInTheDocument();
		});
	});

	it("displays validation error for short password", async () => {
		const { getByText, getByPlaceholderText } = render(<SignupForm />);
		const passwordInput = getByPlaceholderText("Password (required)");
		const signupButton = getByText("Sign up");

		fireEvent.change(passwordInput, { target: { value: "qwer" } });
		fireEvent.click(signupButton);

		await waitFor(() => {
			expect(getByText("Password should be at least 6 characters long")).toBeInTheDocument();
		});
	});

	it("displays validation error when passwords do not match", async () => {
		const { getByText, getByPlaceholderText } = render(<SignupForm />);
		const passwordInput = getByPlaceholderText("Password (required)");
		const confirmPasswordInput = getByPlaceholderText("Confirm Password (required)");
		const signupButton = getByText("Sign up");

		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.change(confirmPasswordInput, { target: { value: "password456" } });
		fireEvent.click(signupButton);

		await waitFor(() => {
			expect(getByText("The passwords do not match")).toBeInTheDocument();
		});
	});

	it("renders select dropdown", () => {
		const { getByText } = render(<SignupForm />);
		expect(getByText("Company type (required)")).toBeInTheDocument();
		expect(getByText("Industry (required)")).toBeInTheDocument();
	});

	it("allows checking the My company has an operating name or trade name checkbox", () => {
		const { getByTestId } = render(<SignupForm />);
		const checkbox = getByTestId("My company has an operating name or trade name") as HTMLInputElement;

		fireEvent.click(checkbox);

		expect(checkbox.checked).toEqual(true);
	});

	it("renders radio options for business registration type", () => {
		const { getByLabelText } = render(<SignupForm />);
		expect(getByLabelText("Sole Proprietor")).toBeInTheDocument();
		expect(getByLabelText("Corporation")).toBeInTheDocument();
	});

	it("renders radio options for expected activity", () => {
		const { getByLabelText } = render(<SignupForm />);
		expect(getByLabelText("Get my invoices paid early")).toBeInTheDocument();
		expect(getByLabelText("Offer vendors early payments")).toBeInTheDocument();
		expect(getByLabelText("Earn valuable discounts on payables")).toBeInTheDocument();
		expect(getByLabelText("Just checking it out")).toBeInTheDocument();
	});

	it("allows selecting: Company type", () => {
		const { getByLabelText } = render(<SignupForm />);

		const soleProprietorOption: HTMLInputElement = getByLabelText("Sole Proprietor") as HTMLInputElement;
		const corporationOption: HTMLInputElement = getByLabelText("Corporation") as HTMLInputElement;

		fireEvent.click(soleProprietorOption);
		expect(soleProprietorOption.checked).toEqual(true);
		expect(corporationOption.checked).toEqual(false);

		fireEvent.click(corporationOption);
		expect(soleProprietorOption.checked).toEqual(false);
		expect(corporationOption.checked).toEqual(true);
	});

	it("allows selecting: Expected Activity", () => {
		const { getByLabelText } = render(<SignupForm />);

		const getInvoicesPaidEarlyOption: HTMLInputElement = getByLabelText("Get my invoices paid early") as HTMLInputElement;
		const offerVendorsEarlyPaymentsOption: HTMLInputElement = getByLabelText("Offer vendors early payments") as HTMLInputElement;
		const earnValuableDiscountsOption: HTMLInputElement = getByLabelText("Earn valuable discounts on payables") as HTMLInputElement;
		const justCheckingItOutOption: HTMLInputElement = getByLabelText("Just checking it out") as HTMLInputElement;

		fireEvent.click(getInvoicesPaidEarlyOption);
		expect(getInvoicesPaidEarlyOption.checked).toEqual(true);
		expect(offerVendorsEarlyPaymentsOption.checked).toEqual(false);
		expect(earnValuableDiscountsOption.checked).toEqual(false);
		expect(justCheckingItOutOption.checked).toEqual(false);

		fireEvent.click(offerVendorsEarlyPaymentsOption);
		expect(getInvoicesPaidEarlyOption.checked).toEqual(false);
		expect(offerVendorsEarlyPaymentsOption.checked).toEqual(true);
		expect(earnValuableDiscountsOption.checked).toEqual(false);
		expect(justCheckingItOutOption.checked).toEqual(false);
	});
});

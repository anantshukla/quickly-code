export interface SignupApiDto {
	user: {
		first_name: string;
		last_name: string;
		email: string;
		password: string;
	};
	company: {
		activity: {
			early_pay_intent: boolean;
			expected_activity: string;
		};
		early_pay_intent: boolean;
		industry: {
			value: string;
			label: string;
		};
		business_type: {
			label: string;
			value: string;
		};
		website: string;
		business_registration: string;
		phone: string;
		business_number: string;
		has_trade_name: boolean;
		legal_name: string;
		expected_activity: string;
	};
}

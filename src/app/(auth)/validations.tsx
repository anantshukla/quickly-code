export const validateEmail = (email: string) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

export const validatePassword = (password: string) => password.length > 6;

export const validatePhone = (phone: string) => {
	const re = /^\d{10}$/;
	return re.test(phone);
};

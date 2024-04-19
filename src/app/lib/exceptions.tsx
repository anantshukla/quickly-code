class UserNotAuthenticated extends Error {
	constructor(message = "User is not Authenticated") {
		super(message);
		this.name = "UserNotAuthenticated";
	}
}

export { UserNotAuthenticated };

/*
	File: src/app/lib/exceptions.tsx
	Description: This file contains custom exceptions.
*/

class UserNotAuthenticated extends Error {
	constructor(message = "User is not Authenticated") {
		super(message);
		this.name = "UserNotAuthenticated";
	}
}

export { UserNotAuthenticated };

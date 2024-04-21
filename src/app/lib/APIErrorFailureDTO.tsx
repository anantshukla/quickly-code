/*
	File: src/app/lib/APIErrorFailureDTO.tsx
	Description: This file contains the APIErrorFailureDTO interface.
*/

export interface APIErrorFailureDTO {
	response: {
		data: {
			message: string;
			isSuccessful: boolean;
		};
	};
}

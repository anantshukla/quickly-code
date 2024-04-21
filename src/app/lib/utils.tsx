/*
	File: src/app/lib/utils.tsx
	Description: This file contains utility functions.
*/

// The function filters out null and empty strings from an object.
export const filterNullAndEmptyStrings = (obj: any): any => {
	if (Array.isArray(obj)) {
		return obj.map((item) => filterNullAndEmptyStrings(item)).filter((item) => item !== null);
	} else if (typeof obj === "object" && obj !== null) {
		return Object.entries(obj)
			.map(([key, value]) => [key, filterNullAndEmptyStrings(value)])
			.filter(([_, value]) => value !== null)
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
	} else {
		return obj !== "" && obj !== null ? obj : null;
	}
};

// The function sorts the fields of an object by type and then by key name.
export const sortFields = (entries: [string, any][]) => {
	return entries.sort(([keyA, valueA], [keyB, valueB]) => {
		const typeOrder = { string: 1, number: 2, boolean: 3, other: 4 };
		const getType = (value: any) => {
			if (typeof value === "string") return "string";
			if (typeof value === "number") return "number";
			if (typeof value === "boolean") return "boolean";
			return "other";
		};

		const typeA = getType(valueA);
		const typeB = getType(valueB);
		console.log(keyA, typeA);
		if (typeOrder[typeA] !== typeOrder[typeB]) {
			return typeOrder[typeA] - typeOrder[typeB];
		}

		return keyA.localeCompare(keyB);
	});
};

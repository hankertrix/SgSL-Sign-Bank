import type { Link } from "@lib/types";

// The interface for a collection item
interface CollectionItem {
	data: {
		title: string | number;
	};
}

// The regular expression to match all the symbols
const symbolRegex = /[!$%^&*()_+|~=`{}[\]:";'<>?,./]/g;

// Function to change the title into a url friendly string
export function makeUrlFriendlyString(str: string): string {
	return str.replace(symbolRegex, "").replaceAll(" ", "-").toLowerCase();
}

// Function to make a string titlecase
export function titlecase(str: string): string {
	//

	// Gets the length of the string
	const strLen = str.length;

	// If the length of the string is less than 1, return the string
	if (strLen < 1) return str;

	// Change all the characters to lowercase first
	str = str.toLowerCase();

	// Initialise the list of characters
	const chars = new Array(strLen);

	// Adds the first character in uppercase to the list of characters
	chars[0] = str[0].toUpperCase();

	// Iterates the string
	for (let i = 1; i < strLen; ++i) {
		//

		// Gets the current character
		const currentChar = str[i];

		// Gets the character before the current one
		const charBefore = str[i - 1];

		// If the character before the current one is a space,
		// adds the uppercase version of the current character
		// to the list of characters
		if (!charBefore.trim()) {
			chars[i] = currentChar.toUpperCase();
		}

		// Otherwise, just add the current character without changing anything
		else chars[i] = currentChar;
	}

	// Returns the new titlecased string
	return chars.join("");
}

// Function to create a list of links for the link grid
export function createLinks(links: Iterable<string>, baseUrl: string): Link[] {
	//

	// The list of link objects
	const linkObjects: Link[] = [];

	// Iterate over each of the links
	for (const link of links) {
		//

		// Create the link object
		const linkObject: Link = {
			title: link,
			url: `${baseUrl}${makeUrlFriendlyString(link)}`,
		};

		// Add the link object to the list of link objects
		linkObjects.push(linkObject);
	}

	// Return the list of link objects
	return linkObjects;
}

// Sorter function to sort collection items based on their title
export function alphabeticalSorter(
	a: CollectionItem,
	b: CollectionItem,
): number {
	//

	// Get the title of the first item in uppercase
	const titleA = `${a.data.title}`.toUpperCase();

	// Get the title of the second item in uppercase
	const titleB = `${b.data.title}`.toUpperCase();

	// If the first title is greater than the second title,
	// return -1 to put the first item before the second item
	if (titleA < titleB) {
		return -1;
	}

	// If the first title is greater than the second title,
	// return 1 to put the first item after the second item
	if (titleA > titleB) {
		return 1;
	}

	// Otherwise, the titles are equal so return 0
	return 0;
}

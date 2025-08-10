import type { MarkdownHeading } from "astro";

// The type a table of contents item
export type Heading = MarkdownHeading & {
	subheadings: Heading[];
};

// The type of a link
export type Link = {
	title: string;
	url: string;
};

// The type of the heading map
export type HeadingMap = Map<string, Link[]>;

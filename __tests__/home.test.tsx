import React from "react";
import { render } from "@testing-library/react";
import Page from "../src/app/page";

describe("Page", () => {
	it("Checks whether the Page functional component exists", () => {
		render(<Page />);
	});
});

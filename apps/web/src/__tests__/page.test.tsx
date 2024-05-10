import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("renders a div", () => {
    render(<Page />);

    const div = screen.getByText("home page");

    expect(div).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";

import NotFound from "./NotFound";

jest.mock("../components/NotFoundBlock/NotFoundBlock", () => () => (
  <div data-testid="not-found-block">Not Found Block</div>
));

describe("NotFound Component", () => {
  it("renders NotFoundBlock component", () => {
    render(<NotFound />);

    expect(screen.getByTestId("not-found-block")).toBeInTheDocument();
  });
});

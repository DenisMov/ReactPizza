import { render, screen } from "@testing-library/react";

import Skeleton from "./Skeleton";

describe("Skeleton Component", () => {
  it("renders without crashing", () => {
    render(<Skeleton />);
    const skeletonElement = screen.getByRole("img", { hidden: true });
    expect(skeletonElement).toBeInTheDocument();
  });
});

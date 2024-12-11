import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const mockOnChangePage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with given props", () => {
    render(<Pagination currentPage={2} onChangePage={mockOnChangePage} />);

    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("calls onChangePage with correct page number", async () => {
    render(<Pagination currentPage={1} onChangePage={mockOnChangePage} />);
    const user = userEvent.setup();

    const secondPageButton = screen.getByText("2");
    await user.click(secondPageButton);

    expect(mockOnChangePage).toHaveBeenCalledTimes(1);
    expect(mockOnChangePage).toHaveBeenCalledWith(2);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";

import Categories from "./Categories";

describe("Categories Component", () => {
  const mockOnClickCategory = jest.fn();
  const categoriesNames = [
    "Всі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  const renderComponent = (value: number) =>
    render(<Categories value={value} onClickCategory={mockOnClickCategory} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all categories correctly", () => {
    renderComponent(0);
    categoriesNames.forEach((categoryName) => {
      expect(screen.getByText(categoryName)).toBeInTheDocument();
    });
  });

  it("applies 'active' class to the correct category", () => {
    renderComponent(1);
    const activeCategory = screen.getByText("М'ясні");
    expect(activeCategory).toHaveClass("active");

    categoriesNames
      .filter((category) => category !== "М'ясні")
      .forEach((category) => {
        expect(screen.getByText(category)).not.toHaveClass("active");
      });
  });

  it("calls onClickCategory with the correct id when a category is clicked", () => {
    renderComponent(0);

    const categoryElement = screen.getByText("Гриль");
    fireEvent.click(categoryElement);

    expect(mockOnClickCategory).toHaveBeenCalledWith(3);
    expect(mockOnClickCategory).toHaveBeenCalledTimes(1);
  });

  it("updates the active category on click", () => {
    renderComponent(2);
    const newCategory = screen.getByText("Гострі");

    fireEvent.click(newCategory);

    expect(mockOnClickCategory).toHaveBeenCalledWith(4);
  });
});

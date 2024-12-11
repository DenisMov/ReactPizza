import { render, screen } from "@testing-library/react";

import NotFoundBlock from "./NotFoundBlock";

describe("NotFoundBlock Component", () => {
  it("renders the correct heading and description", () => {
    render(<NotFoundBlock />);

    expect(screen.getByText(/нічого не знайдено/i)).toBeInTheDocument();

    expect(
      screen.getByText(/на жаль, цієї сторінки не існує/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/😕/)).toBeInTheDocument();
  });
});

export {};

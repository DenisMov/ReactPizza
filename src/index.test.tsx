import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./redux/store";

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("App component", () => {
  it("should render the App component correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Всі піцци/i)).toBeInTheDocument();
  });
});

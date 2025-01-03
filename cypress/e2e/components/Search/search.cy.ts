/// <reference types="cypress" />

describe("Search Component Tests", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.window().then((win) => {
      cy.spy(win.store, "dispatch").as("dispatchSpy");
    });
  });

  it("Повинен викликати debounce-функцію після затримки", () => {
    const searchText = "Пепероні";

    cy.get('[data-testid="search-input"]').type(searchText);

    cy.wait(500);
    cy.get("@dispatchSpy").should("have.been.calledWithMatch", {
      type: "filters/setSearchValue",
      payload: searchText,
    });
  });
});

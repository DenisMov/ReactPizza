/// <reference types="cypress" />

describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display a list of pizzas", () => {
    cy.contains("h2", "Всі піцци").should("be.visible");

    cy.get(".content__items .pizza-block").should("have.length.at.least", 1);
  });

  it("Should display skeletons when loading", () => {
    cy.intercept("GET", "**/items*", (req) => {
      req.reply((res) => {
        res.delay = 1000;
      });
    }).as("delayedPizzas");

    cy.visit("/");

    cy.get(".pizza-block circle").should("exist");
    cy.get(".pizza-block rect").should("exist");

    cy.wait("@delayedPizzas");

    cy.get(".pizza-block circle").should("not.exist");
    cy.get(".pizza-block rect").should("not.exist");
    cy.get(".content__items .pizza-block").should("have.length.at.least", 1);
  });

  it("Should show an error when the server crashes", () => {
    cy.intercept("GET", "**/items*", {
      statusCode: 500,
      body: {},
    }).as("getPizzasError");

    cy.visit("/");
    cy.wait("@getPizzasError");

    cy.get('[data-testid="error-message"]').should("be.visible");
    cy.contains("Схоже, відбулась якась помилка").should("be.visible");
  });
});

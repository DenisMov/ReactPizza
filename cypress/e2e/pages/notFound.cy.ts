/// <reference types="cypress" />

describe("Not Found Page", () => {
  it("Displays the 404 page for non-existent routes", () => {
    cy.visit("/some-non-existent-route", { failOnStatusCode: false });
    cy.contains("Нічого не знайдено").should("be.visible");
    cy.get("a").contains("Повернутися на головну").should("exist");
  });

  it('Redirects back to home page when clicking "Повернутися на головну"', () => {
    cy.visit("/some-non-existent-route", { failOnStatusCode: false });
    cy.get("a").contains("Повернутися на головну").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});

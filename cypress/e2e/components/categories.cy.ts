/// <reference types="cypress" />

describe("Categories Component Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Повинен відображати всі категорії", () => {
    const categories = [
      "Всі",
      "М'ясні",
      "Вегетаріанські",
      "Гриль",
      "Гострі",
      "Закриті",
    ];

    categories.forEach((category) => {
      cy.contains("li", category).should("exist").and("be.visible");
    });
  });

  it("Повинен підсвічувати обрану категорію при кліку", () => {
    cy.contains("li", "М'ясні").click();
    cy.contains("li", "М'ясні").should("have.class", "active");

    cy.contains("li", "Гриль").click();
    cy.contains("li", "Гриль").should("have.class", "active");

    cy.contains("li", "М'ясні").should("not.have.class", "active");
  });
});

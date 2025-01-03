/// <reference types="cypress" />

describe("CartEmpty Component Tests", () => {
  beforeEach(() => {
    cy.visit("/cart");
  });

  it("Повинен відображати заголовок 'Корзина пуста'", () => {
    cy.contains("h2", "Корзина пуста 😕").should("exist").and("be.visible");
  });

  it("Повинен відображати опис для користувача", () => {
    cy.contains("Скоріше за все, ви ще не замовили піццу.")
      .should("exist")
      .and("be.visible");
  });

  it("Повинен відображати зображення порожнього кошика", () => {
    cy.get('img[alt="Empty cart"]').should("exist").and("be.visible");
    cy.get('img[alt="Empty cart"]').should(
      "have.attr",
      "src",
      "/img/empty-cart.png"
    );
  });

  it("Повинен мати кнопку для повернення на головну сторінку", () => {
    cy.contains("span", "Повернутись назад").should("exist").and("be.visible");

    cy.get("a.button.button--black").should("have.attr", "href", "/").click();

    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});

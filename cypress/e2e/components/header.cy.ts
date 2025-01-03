/// <reference types="cypress" />

describe("Header Component Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Повинен відобразити логотип, заголовок та підзаголовок", () => {
    cy.get(".header__logo img")
      .should("have.attr", "alt", "Pizza logo")
      .and("be.visible");

    cy.contains("h1", "Texas Pizza").should("exist").and("be.visible");

    cy.contains("p", "найсмачніша піцца на дикому заході").should("be.visible");
  });

  it("Повинен відображати загальну суму та кількість товарів у кошику", () => {
    cy.get(".button--cart span").first().should("contain", "грн");

    cy.get(".button--cart span").last().should("contain", "0");
  });

  it("Повинен перенаправляти на сторінку кошика та показувати порожній кошик", () => {
    cy.get(".header__cart").click();

    cy.url().should("include", "/cart");

    cy.contains("Корзина пуста").should("be.visible");
  });

  it("Повинен відображати компонент пошуку на головній сторінці", () => {
    cy.get(".header__logo").click();
    cy.get('[data-testid="search-input"]').should("exist").and("be.visible");
  });

  it("Не повинен відображати компонент пошуку на сторінці кошика", () => {
    cy.get(".header__cart").click();
    cy.url().should("include", "/cart");

    cy.get("input[type='text']").should("not.exist");
  });
});

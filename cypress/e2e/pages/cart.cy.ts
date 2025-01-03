/// <reference types="cypress" />

describe("Cart Component Tests", () => {
  const pizza = {
    id: 1,
    name: "Піца Дабл Чізбургер",
    price: 350,
    size: 26,
    type: "Тонке",
    imageUrl: "https://adriano.com.ua/wp-content/uploads/2024/03/pizza.png",
  };

  beforeEach(() => {
    cy.visit("/");

    cy.get('[data-testid="pizza-block"]')
      .first()
      .within(() => {
        cy.get("button.button--add").click();
      });

    cy.wait(500);
    cy.visit("/cart");
  });

  it("Should display the 'Cart' header", () => {
    cy.get('[data-testid="cart-title"]')
      .should("be.visible")
      .and("contain", "Корзина");
  });

  it("Must display the cart item", () => {
    cy.get('[data-testid="cart-items"]').within(() => {
      cy.get(".cart__item").should("exist").and("have.length", 1);
      cy.contains(".cart__item", pizza.name).should("be.visible");
    });
  });

  it("Must reflect the total amount", () => {
    cy.get('[data-testid="cart-bottom-details"]').within(() => {
      cy.contains("Сума замовлення:").should("contain", `${pizza.price} грн.`);
    });
  });
});

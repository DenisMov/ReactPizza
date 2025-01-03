/// <reference types="cypress" />

describe("FullPizza Component Tests", () => {
  const pizza = {
    id: 0,
    name: "Піца Мюнхенська",
    price: 310,
    imageUrl:
      "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
  };

  beforeEach(() => {
    cy.intercept(
      "GET",
      `https://6665b6f7d122c2868e418276.mockapi.io/items/0`,
      pizza
    ).as("getPizza");

    cy.visit("/pizza/0");
    cy.wait("@getPizza");
  });

  it("Should display the bootloader before receiving data", () => {
    cy.intercept(
      "GET",
      `https://6665b6f7d122c2868e418276.mockapi.io/items/0`,
      (req) => {
        req.reply((res) => {
          res.delay = 1000;
          res.send(pizza);
        });
      }
    ).as("delayedPizza");

    cy.visit("/pizza/0");
    cy.get('[data-testid="loader"]').should("be.visible");
    cy.wait("@delayedPizza");
    cy.get('[data-testid="loader"]').should("not.exist");
  });

  it("Must display information about the pizza", () => {
    cy.contains(pizza.name).should("be.visible");
    cy.contains(`${pizza.price} грн.`).should("be.visible");
    cy.get("img");
  });

  it("Must add pizza to cart", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart.items")
      .should("have.length", 0);

    cy.get("button.button--add").click({ force: true });

    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart.items")
      .should("have.length", 1);

    cy.location("pathname").should("eq", "/");
  });

  it("Must handle an error when loading data", () => {
    cy.intercept("GET", `https://6665b6f7d122c2868e418276.mockapi.io/items/0`, {
      statusCode: 500,
      body: {},
    }).as("getPizzaError");

    cy.visit("/pizza/0");
    cy.wait("@getPizzaError");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Помилка при отриманні піцци");
    });
  });
});

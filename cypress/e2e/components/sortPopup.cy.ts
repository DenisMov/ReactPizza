/// <reference types="cypress" />
import { store } from "../../../src/redux/store";

declare global {
  interface Window {
    store: typeof store;
  }
}

describe("CartItemBlock Component Tests", () => {
  const item = {
    id: "1",
    name: "Тестова піца",
    type: "Традиційне",
    size: 30,
    count: 1,
    price: 150,
    imageUrl: "/img/pizza.jpg",
  };

  beforeEach(() => {
    cy.visit("/cart");

    cy.window().then((win) => {
      win.store.dispatch({
        type: "cart/addItem",
        payload: item,
      });
    });
  });

  it("Повинен відображати інформацію про товар у кошику", () => {
    cy.contains("h3", item.name).should("be.visible");
    cy.contains("p", `${item.type} тісто, ${item.size} см.`).should(
      "be.visible"
    );
    cy.contains("b", `${item.price} грн.`).should("be.visible");
  });

  it("Повинен збільшувати кількість товарів", () => {
    cy.get(".cart__item-count-plus").click();
    cy.contains(".cart__item-count b", "2").should("be.visible");
    cy.contains("b", `${item.price * 2} грн.`).should("be.visible");
  });

  it("Повинен зменшувати кількість товарів", () => {
    cy.get(".cart__item-count-plus").click();
    cy.get(".cart__item-count-minus").click();
    cy.contains(".cart__item-count b", "1").should("be.visible");
    cy.contains("b", `${item.price} грн.`).should("be.visible");
  });

  it("Повинен видаляти товар з кошика", () => {
    cy.get(".cart__item-remove button").click();
    cy.contains("h3", item.name).should("not.exist");
  });
});

export {};

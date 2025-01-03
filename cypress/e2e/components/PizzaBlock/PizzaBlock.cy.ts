describe("PizzaBlock Component Tests", () => {
  const pizza = {
    id: 4,
    imageUrl:
      "https://adriano.com.ua/wp-content/uploads/2023/04/%D0%9F%D0%BE-%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B8-500%D1%85500-1-238x238.png",
    name: "Піца По-Київськи",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 215,
  };

  beforeEach(() => {
    cy.intercept("GET", "https://6665b6f7d122c2868e418276.mockapi.io/items*", [
      pizza,
    ]).as("getPizzas");

    cy.visit("/");
    cy.wait("@getPizzas");
  });

  it("Повинен відображати назву, ціну та зображення піци", () => {
    cy.get('[data-testid="pizza-block"]')
      .first()
      .within(() => {
        cy.get(".pizza-block__title").should("contain", pizza.name);
        cy.get(".pizza-block__price").should("contain", `${pizza.price} грн.`);
        cy.get(".pizza-block__image").should(
          "have.attr",
          "src",
          pizza.imageUrl
        );
      });
  });

  it("Повинен змінювати тип тіста при кліку", () => {
    cy.get('[data-testid="pizza-block"]')
      .first()
      .within(() => {
        cy.contains("Тонке").click().should("have.class", "active");
        cy.contains("Традиційне").click().should("have.class", "active");
        cy.contains("Тонке").should("not.have.class", "active");
      });
  });

  it("Повинен змінювати розмір піци при кліку", () => {
    cy.get('[data-testid="pizza-block"]')
      .first()
      .within(() => {
        pizza.sizes.forEach((size) => {
          cy.contains(`${size} см.`).click().should("have.class", "active");
        });
      });
  });

  it("Повинен додавати піцу до кошика та оновлювати кількість", () => {
    cy.get('[data-testid="pizza-block"]')
      .first()
      .within(() => {
        cy.get("button.button--add").click();
        cy.get("button.button--add i").should("contain", "1");

        cy.get("button.button--add").click();
        cy.get("button.button--add i").should("contain", "2");
      });
  });

  it("Повинен перенаправляти на сторінку піци при кліку на заголовок", () => {
    cy.get('[data-testid="pizza-block"]')
      .first()
      .within(() => {
        cy.get("a").first().click();
      });

    cy.url().should("include", `/pizza/${pizza.id}`);
  });
});

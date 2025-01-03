describe("Pagination Component Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/items*", {
      statusCode: 200,
      body: Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `Піца ${index + 1}`,
        imageUrl: "https://adriano.com.ua/wp-content/uploads/2024/03/pizza.png",
        types: [0, 1],
        sizes: [26, 30, 40],
        price: 200 + index,
      })),
    }).as("getPizzas");

    cy.visit("/");
    cy.wait("@getPizzas");
  });

  it("Повинен відображати компонент Pagination", () => {
    cy.get('[aria-label="Pagination"]').should("be.visible");
  });

  it("Повинен перемикатися на наступну сторінку при кліку на '>'", () => {
    cy.get('[aria-label="Pagination"]').contains(">").click();
    cy.get('[aria-label="Pagination"] .selected').should("contain", "2");
  });

  it("Повинен змінювати сторінку при кліку на номер сторінки", () => {
    cy.get('[aria-label="Pagination"]').contains("2").click();
    cy.get('[aria-label="Pagination"] .selected').should("contain", "2");
  });

  it("Не повинен виходити за межі сторінок", () => {
    cy.get('[aria-label="Pagination"]').contains(">").click();
    cy.get('[aria-label="Pagination"]').contains(">").click();

    cy.get('[aria-label="Pagination"] .selected').should("contain", "3");

    cy.get('[aria-label="Pagination"]').contains("<").click();
    cy.get('[aria-label="Pagination"] .selected').should("contain", "2");
  });
});

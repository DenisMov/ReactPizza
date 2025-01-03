describe("NotFoundBlock Component Tests", () => {
  beforeEach(() => {
    cy.visit("/some-non-existing-page"); // Переконайтеся, що маршрут налаштований
  });

  it("Повинен відображати компонент NotFoundBlock", () => {
    cy.get('[data-testid="not-found-block"]').should("be.visible");
  });

  it("Повинен відображати заголовок з текстом 'Нічого не знайдено'", () => {
    cy.get('[data-testid="not-found-title"]')
      .should("be.visible")
      .and("contain", "Нічого не знайдено");
  });

  it("Повинен відображати опис з текстом 'На жаль, цієї сторінки не існує'", () => {
    cy.get('[data-testid="not-found-description"]')
      .should("be.visible")
      .and("contain", "На жаль, цієї сторінки не існує");
  });
});

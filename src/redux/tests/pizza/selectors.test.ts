import { selectPizzaData } from "../../pizza/selectors";

describe("Pizza Selectors", () => {
  const mockState = {
    pizza: {
      items: [
        {
          id: "0",
          name: "Піца Мюнхенська",
          imageUrl:
            "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
          types: [0, 1],
          sizes: [26, 30, 40],
          price: 310,
          category: 0,
          rating: 4,
        },
      ],
      status: "loaded",
    },
  };

  it("should return the entire pizza state", () => {
    const pizzaState = selectPizzaData(mockState as any);
    expect(pizzaState).toEqual(mockState.pizza);
  });
});

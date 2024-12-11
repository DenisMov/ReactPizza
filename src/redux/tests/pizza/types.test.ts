import {
  SearchPizzaParams,
  Status,
  Pizza,
  PizzaSliceState,
} from "../../pizza/types";

describe("Types tests", () => {
  it("should correctly define a SearchPizzaParams type", () => {
    const mockSearchParams: SearchPizzaParams = {
      search: "Маргарита",
      category: "1",
      currentPage: "2",
      sort: "price",
    };

    expect(mockSearchParams).toEqual({
      search: "Маргарита",
      category: "1",
      currentPage: "2",
      sort: "price",
    });
  });

  it("should correctly define a Status enum", () => {
    expect(Status.LOADING).toBe("loading");
    expect(Status.SUCCESS).toBe("success");
    expect(Status.ERROR).toBe("error");
  });

  it("should correctly define a Pizza type", () => {
    const mockPizza: Pizza = {
      id: "1",
      name: "Піца Гавайська",
      price: 250,
      imageUrl: "https://example.com/image.png",
      type: 1,
      size: 30,
      count: 3,
    };

    expect(mockPizza).toEqual({
      id: "1",
      name: "Піца Гавайська",
      price: 250,
      imageUrl: "https://example.com/image.png",
      type: 1,
      size: 30,
      count: 3,
    });
  });

  it("should correctly define a PizzaSliceState interface", () => {
    const mockPizzaState: PizzaSliceState = {
      items: [
        {
          id: "1",
          name: "Піца Гавайська",
          price: 250,
          imageUrl: "https://example.com/image.png",
          type: 1,
          size: 30,
          count: 3,
        },
      ],
      status: Status.SUCCESS,
    };

    expect(mockPizzaState).toEqual({
      items: [
        {
          id: "1",
          name: "Піца Гавайська",
          price: 250,
          imageUrl: "https://example.com/image.png",
          type: 1,
          size: 30,
          count: 3,
        },
      ],
      status: Status.SUCCESS,
    });
  });
});

import axios from "axios";

import { fetchPizzas } from "../../pizza/asyncActions";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchPizzas thunk", () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("dispatches fulfilled action with pizzas data on success", async () => {
    const mockData = [
      {
        id: 0,
        imageUrl:
          "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
        name: "Піца Мюнхенська",
        types: [0, 1],
        sizes: [26, 30, 40],
        price: 310,
        category: 0,
        rating: 4,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const params = {
      search: "",
      category: "",
      currentPage: "1",
      sort: "price",
    };

    await fetchPizzas(params)(dispatch, () => {}, undefined);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://6665b6f7d122c2868e418276.mockapi.io/items?page=1&limit=4&&sortBy=price&order=desc&"
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: "pizza/fetchPizzasStatus/pending",
      meta: expect.anything(),
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "pizza/fetchPizzasStatus/fulfilled",
      payload: mockData,
      meta: expect.anything(),
    });
  });

  it("dispatches rejected action on API failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    const params = {
      search: "",
      category: "",
      currentPage: "1",
      sort: "price",
    };

    await fetchPizzas(params)(dispatch, () => {}, undefined);

    expect(dispatch).toHaveBeenCalledWith({
      type: "pizza/fetchPizzasStatus/pending",
      meta: expect.anything(),
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "pizza/fetchPizzasStatus/rejected",
      error: expect.anything(),
      meta: expect.anything(),
    });
  });
});

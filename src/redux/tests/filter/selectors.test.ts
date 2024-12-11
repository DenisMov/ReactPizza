import { selectFilter, selectSort } from "../../filter/selectors";

describe("Filter Selectors", () => {
  const mockState = {
    filter: {
      category: 2,
      search: "pizza",
      sort: {
        name: "rating",
        order: "desc",
      },
    },
  };

  it("should return the entire filter state", () => {
    const filter = selectFilter(mockState as any);
    expect(filter).toEqual({
      category: 2,
      search: "pizza",
      sort: {
        name: "rating",
        order: "desc",
      },
    });
  });

  it("should return the sort property from the filter state", () => {
    const sort = selectSort(mockState as any);
    expect(sort).toEqual({
      name: "rating",
      order: "desc",
    });
  });
});

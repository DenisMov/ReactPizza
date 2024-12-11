import { SortPropertyEnum, Sort, FilterSliceState } from "../../filter/types";

describe("Types tests", () => {
  it("should correctly define a Sort type", () => {
    const mockSort: Sort = {
      name: "Price (descending)",
      sortProperty: SortPropertyEnum.PRICE_DESC,
    };

    expect(mockSort).toEqual({
      name: "Price (descending)",
      sortProperty: SortPropertyEnum.PRICE_DESC,
    });
  });

  it("should correctly define a FilterSliceState", () => {
    const mockFilterState: FilterSliceState = {
      searchValue: "Піца",
      categoryId: 1,
      currentPage: 2,
      sort: {
        name: "Price (descending)",
        sortProperty: SortPropertyEnum.PRICE_DESC,
      },
    };

    expect(mockFilterState).toEqual({
      searchValue: "Піца",
      categoryId: 1,
      currentPage: 2,
      sort: {
        name: "Price (descending)",
        sortProperty: SortPropertyEnum.PRICE_DESC,
      },
    });
  });
});

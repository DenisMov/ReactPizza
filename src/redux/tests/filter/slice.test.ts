import filterReducer, {
  setCategoryId,
  setSearchValue,
  setSort,
  setCurrentPage,
  setFilters,
} from "../../filter/slice";
import { FilterSliceState, SortPropertyEnum } from "../../filter/types";

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярностю",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

describe("Filter Slice tests", () => {
  it("should handle setCategoryId correctly", () => {
    const newState = filterReducer(initialState, setCategoryId(2));
    expect(newState.categoryId).toBe(2);
  });

  it("should handle setSearchValue correctly", () => {
    const newState = filterReducer(initialState, setSearchValue("Маргарита"));
    expect(newState.searchValue).toBe("Маргарита");
  });

  it("should handle setSort correctly", () => {
    const newSort = {
      name: "ціною",
      sortProperty: SortPropertyEnum.PRICE_DESC,
    };
    const newState = filterReducer(initialState, setSort(newSort));
    expect(newState.sort).toEqual(newSort);
  });

  it("should handle setCurrentPage correctly", () => {
    const newState = filterReducer(initialState, setCurrentPage(2));
    expect(newState.currentPage).toBe(2);
  });

  it("should handle setFilters correctly when provided with a full payload", () => {
    const newState = filterReducer(
      initialState,
      setFilters({
        searchValue: "Піца",
        categoryId: 1,
        currentPage: 3,
        sort: {
          name: "цінова категорія",
          sortProperty: SortPropertyEnum.PRICE_DESC,
        },
      })
    );
    expect(newState).toEqual({
      searchValue: "Піца",
      categoryId: 1,
      currentPage: 3,
      sort: {
        name: "цінова категорія",
        sortProperty: SortPropertyEnum.PRICE_DESC,
      },
    });
  });

  it("should handle setFilters correctly when given an empty payload", () => {
    const emptyPayload: FilterSliceState = {
      searchValue: "",
      categoryId: 0,
      currentPage: 1,
      sort: {
        name: "популярностю",
        sortProperty: SortPropertyEnum.RATING_DESC,
      },
    };

    const newState = filterReducer(initialState, setFilters(emptyPayload));
    expect(newState).toEqual(initialState);
  });
});

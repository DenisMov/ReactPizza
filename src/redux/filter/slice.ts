import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярностю",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = action.payload.currentPage ?? state.currentPage;
        state.categoryId = action.payload.categoryId ?? state.categoryId;
        state.sort = action.payload.sort ?? state.sort;
        state.searchValue = action.payload.searchValue ?? state.searchValue;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "популярностю",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        state.searchValue = "";
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  TITLE_DESC = "title",
  PRICE_DESC = "price",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

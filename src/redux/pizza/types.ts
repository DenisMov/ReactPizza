export type SearchPizzaParams = {
  search: string;
  category: string;
  currentPage: string;
  sort: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type Pizza = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

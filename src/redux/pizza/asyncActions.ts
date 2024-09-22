import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, category, currentPage, sort } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6665b6f7d122c2868e418276.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc&${search}`
    );
    return data;
  }
);

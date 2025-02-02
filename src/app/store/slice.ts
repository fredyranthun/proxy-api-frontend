import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result, ResultsApiResponse } from "../interfaces/result";

interface AppState {
  query: string;
  results: Result[];
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
  queryHistory: string[];
}

const initialState: AppState = {
  query: "",
  results: [],
  currentPage: 1,
  totalPages: 0,
  nextPage: null,
  prevPage: null,
  queryHistory: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setResults(state, action: PayloadAction<Result[]>) {
      state.results = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setNextPage(state, action: PayloadAction<number | null>) {
      state.nextPage = action.payload;
    },
    setPrevPage(state, action: PayloadAction<number | null>) {
      state.prevPage = action.payload;
    },
    updateSearchResults(state, action: PayloadAction<ResultsApiResponse>) {
      state.results = action.payload.data;
      state.currentPage = action.payload.pagination.currentPage;
      state.totalPages = action.payload.pagination.totalPages;
      state.nextPage = action.payload.pagination.nextPage;
      state.prevPage = action.payload.pagination.prevPage;
    },
    updateQueryHistory(state, action: PayloadAction<string[]>) {
      state.queryHistory = action.payload;
    },
    setQueryHistory(state, action: PayloadAction<string[]>) {
      state.queryHistory = action.payload;
    },
    addQueryToHistory(state, action: PayloadAction<string>) {
      if (!state.queryHistory.includes(action.payload)) {
        state.queryHistory = [action.payload, ...state.queryHistory].slice(0, 10);
        localStorage.setItem("queryHistory", JSON.stringify(state.queryHistory));
      }
    },
    loadQueryHistory(state) {
      const storedHistory = localStorage.getItem("queryHistory");
      if (storedHistory) {
        state.queryHistory = JSON.parse(storedHistory);
      }
    },
    removeQueryFromHistory(state, action: PayloadAction<string>) {
      state.queryHistory = state.queryHistory.filter((item) => item !== action.payload);
      localStorage.setItem("queryHistory", JSON.stringify(state.queryHistory));
    },
  },
});

export const {
  setQuery,
  setResults,
  setCurrentPage,
  setTotalPages,
  updateSearchResults,
  updateQueryHistory,
  setQueryHistory,
  addQueryToHistory,
  loadQueryHistory,
  removeQueryFromHistory,
} = appSlice.actions;
export default appSlice.reducer;

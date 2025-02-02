export interface Result {
  title: string;
  url: string;
}

export interface ResultsApiResponse {
  data: Result[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

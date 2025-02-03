"use client";

import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import ResultsList from "./ResultsList";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addQueryToHistory, loadQueryHistory, removeQueryFromHistory, updateSearchResults } from "../store/slice";

export default function MainPage() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { results, currentPage, totalPages, queryHistory } = useAppSelector((state) => state.app);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  useEffect(() => {
    dispatch(loadQueryHistory());
  }, [dispatch]);

  const searchResults = async (searchQuery: string, page = 1) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results?q=${searchQuery}&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const json = await response.json();
      dispatch(updateSearchResults(json));
      dispatch(addQueryToHistory(searchQuery));
    } catch (error) {
      console.error("Error fetching results:", error);
      setErrorAlertVisible(true);
      setTimeout(() => {
        setErrorAlertVisible(false);
      }, 5000);
    }
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    searchResults(newQuery);
  };

  const handleHistoryItemClick = (historyQuery: string) => {
    setQuery(historyQuery);
    searchResults(historyQuery);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDeleteHistoryItem = (itemToDelete: string) => {
    dispatch(removeQueryFromHistory(itemToDelete));
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar
          queryHistory={queryHistory}
          onHistoryItemClick={handleHistoryItemClick}
          onDeleteHistoryItem={handleDeleteHistoryItem}
        />
      </div>
      <main className={`flex-grow transition-all duration-300 ease-in-out ${sidebarVisible ? "ml-64" : "ml-0"}`}>
        <div className="p-4 flex items-center fixed top-0 left-0 right-0 bg-black z-10 border-b border-gray-800 mb-4">
          <button onClick={toggleSidebar} className="text-white focus:outline-none" aria-label="Toggle Sidebar">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {sidebarVisible ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-center flex-grow">Search Results</h1>
        </div>
        <div className="pt-24 px-8 pb-8 max-w-4xl mx-auto">
          <div className={`${results.length === 0 ? "flex justify-center items-center min-h-[calc(100vh-80px)]" : ""}`}>
            <div className={`${results.length === 0 ? "w-full max-w-md" : "w-full"}`}>
              <SearchForm onSearch={handleSearch} initialQuery={query} />
            </div>
          </div>
          {errorAlertVisible && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">Error fetching results. Please try again.</div>
          )}
          {results.length > 0 && (
            <>
              <ResultsList results={results} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => searchResults(query, page)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

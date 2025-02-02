import { useState, type FormEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export default function SearchForm({ onSearch, initialQuery }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-2xl mx-auto">
      <div className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            required
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query"
            className="w-full p-2 pl-10 bg-gray-900 border border-gray-700 rounded-l-md text-white focus:outline-none focus:border-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
}

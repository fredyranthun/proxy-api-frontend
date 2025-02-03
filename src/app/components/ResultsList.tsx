import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchTerm } from "../store/slice";

interface Result {
  title: string;
  url: string;
}

interface ResultsListProps {
  results: Result[];
}

export default function ResultsList({ results }: ResultsListProps) {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.app);

  const highlightTerm = (text: string, term: string) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search term"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="p-2 pl-4 mb-4 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
      />
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="bg-gray-900 p-4 rounded-md shadow-md">
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {highlightTerm(result.title, searchTerm)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

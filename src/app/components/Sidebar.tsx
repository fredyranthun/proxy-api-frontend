interface SidebarProps {
  queryHistory: string[];
  onHistoryItemClick: (query: string) => void;
  onDeleteHistoryItem: (query: string) => void;
}

export default function Sidebar({ queryHistory, onHistoryItemClick, onDeleteHistoryItem }: SidebarProps) {
  return (
    <aside className="h-full w-64 bg-gray-900 p-4 pt-8 border-r border-gray-800">
      <h2 className="text-xl font-semibold mb-6 text-white text-center">Query History</h2>
      <ul className="space-y-2">
        {queryHistory.map((query, index) => (
          <li key={index} className="flex items-center justify-between hover:bg-gray-800 p-2 rounded-md text-gray-300">
            <span className="cursor-pointer flex-grow" onClick={() => onHistoryItemClick(query)}>
              {query}
            </span>
            <button
              onClick={() => onDeleteHistoryItem(query)}
              className="ml-2 text-gray-500 hover:text-gray-300 focus:outline-none"
              aria-label="Delete query"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

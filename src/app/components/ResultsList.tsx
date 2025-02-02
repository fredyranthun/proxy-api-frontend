interface Result {
  title: string
  url: string
}

interface ResultsListProps {
  results: Result[]
}

export default function ResultsList({ results }: ResultsListProps) {
  return (
    <ul className="space-y-4">
      {results.map((result, index) => (
        <li key={index} className="bg-gray-900 p-4 rounded-md shadow-md">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            {result.title}
          </a>
        </li>
      ))}
    </ul>
  )
}


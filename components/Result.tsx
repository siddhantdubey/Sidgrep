export interface ResultProps {
    text: string
    link: string
    id: string
}

export default function Result({ result }: { result: ResultProps }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <h1 className="text-2xl font-bold">{result.text}</h1>
            <a href={result.link} className="text-blue-500">Video Link</a>
        </div>
    )
}

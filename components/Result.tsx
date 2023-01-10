import Image from 'next/image'

export interface ResultProps {
    text: string
    link: string
    id: string
}

function extractVideoID(url: string) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        return match[7];
    } else {
        alert('Could not extract video ID.');
    }
}

export default function Result({ result }: { result: ResultProps }) {
    const thumbURL = `https://img.youtube.com/vi/${extractVideoID(result.link)}/maxresdefault.jpg`
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <h1 className="text-2xl font-bold">{result.text}</h1>
            <a href={result.link} className="text-blue-500">Video Link</a>
            <Image src={thumbURL} alt="youtube thumbnail" width={480} height={360} />

        </div>
    )
}
